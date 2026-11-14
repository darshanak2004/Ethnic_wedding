import { Router } from "express";
import rateLimit from "express-rate-limit";
import { q, pool } from "./db.js";
import { passwordOk, signToken, requireAdmin } from "./auth.js";
import { cloudReady, uploadSignature, isOurUrl, destroy } from "./cloudinary.js";
import { deliverEnquiry, getStatus, requestPairing, resetSession, sendText } from "./whatsapp.js";

export const api = Router();
const limiter = (windowMin, limit, message) =>
  rateLimit({ windowMs: windowMin * 60_000, limit, standardHeaders: "draft-7", legacyHeaders: false, message: { error: message } });

const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const bad = (res, msg, code = 400) => res.status(code).json({ error: msg });
const slugify = (t) => t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
const img = (r) => ({ id: r.id, url: r.url, alt: r.alt, ...(r.pos ? { pos: r.pos } : {}), ...(r.posm ? { posm: r.posm } : {}) });

/* In-memory content cache for sub-millisecond page loads on free hosting tiers */
let contentCache = null;
let cacheTime = 0;
const CACHE_TTL_MS = 60 * 1000;
const invalidateCache = () => { contentCache = null; cacheTime = 0; };

/* ---------- public ---------- */

api.get("/content", async (_req, res) => {
  const now = Date.now();
  if (contentCache && now - cacheTime < CACHE_TTL_MS) {
    res.set("Cache-Control", "public, max-age=60, s-maxage=300, stale-while-revalidate=600");
    return res.json(contentCache);
  }
  try {
    const [ev, im, set] = await Promise.all([
      q("SELECT slug,title,description,video_url as \"videoUrl\",video_title as \"videoTitle\",video_desc as \"videoDesc\" FROM events ORDER BY sort_order, created_at"),
      q("SELECT id,section,url,alt,pos,posm FROM images ORDER BY seq"),
      q("SELECT value FROM settings WHERE key='hero_video_url'"),
    ]);
    contentCache = {
      hero: { videoUrl: set.rows[0]?.value || "/assets/outdoor-reel.mp4", slides: im.rows.filter((r) => r.section === "hero").map(img) },
      events: ev.rows.map((e) => ({ ...e, images: im.rows.filter((r) => r.section === e.slug).map(img) })),
    };
    cacheTime = now;
    res.set("Cache-Control", "public, max-age=60, s-maxage=300, stale-while-revalidate=600");
    res.json(contentCache);
  } catch (err) {
    if (contentCache) {
      res.set("Cache-Control", "public, max-age=15");
      return res.json(contentCache);
    }
    throw err;
  }
});

api.post("/enquiries", limiter(10, 5, "Too many enquiries from this network. Please message us on WhatsApp instead."), async (req, res) => {
  const b = req.body ?? {};
  if (str(b.website, 50)) return res.status(201).json({ ok: true }); // honeypot: bots fill hidden fields
  const name = str(b.name, 100), phone = str(b.phone, 30);
  if (!name) return bad(res, "Please enter your name");
  if (phone.replace(/\D/g, "").length < 8) return bad(res, "Please enter a valid phone number");
  const services = Array.isArray(b.services) ? b.services.map((s) => str(s, 60)).filter(Boolean).slice(0, 12).join(", ") : "";
  const r = await q(
    "INSERT INTO enquiries(name,role,phone,event_date,place,services,note) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id",
    [name, str(b.role, 30), phone, str(b.date, 20), str(b.place, 150), services, str(b.note, 1000)]
  );
  deliverEnquiry(r.rows[0].id).catch(() => {}); // runs in the background; the enquiry is already safely saved
  res.status(201).json({ ok: true });
});

/* ---------- admin ---------- */

api.post("/admin/login", limiter(15, 10, "Too many attempts. Try again in a few minutes."), (req, res) => {
  if (!passwordOk(str(req.body?.password, 200))) return bad(res, "Wrong password", 401);
  res.json({ token: signToken() });
});

const admin = Router();
api.use("/admin", requireAdmin, admin);

admin.get("/upload-signature", (req, res) => {
  if (!cloudReady()) return bad(res, "Cloudinary is not configured on the server", 503);
  res.json(uploadSignature(req.query.type));
});

admin.post("/images", async (req, res) => {
  const section = str(req.body?.section, 60), url = str(req.body?.url, 500);
  if (!isOurUrl(url)) return bad(res, "Image must be uploaded through the admin panel");
  if (section !== "hero" && !(await q("SELECT 1 FROM events WHERE slug=$1", [section])).rowCount) return bad(res, "Unknown section");
  const r = await q("INSERT INTO images(section,url,public_id,alt) VALUES($1,$2,$3,$4) RETURNING id,url,alt", [section, url, str(req.body?.publicId, 200) || null, str(req.body?.alt, 120)]);
  invalidateCache();
  res.status(201).json(r.rows[0]);
});

admin.delete("/images/:id", async (req, res) => {
  if (!/^[0-9a-f-]{36}$/i.test(req.params.id)) return bad(res, "Bad id");
  const r = await q("DELETE FROM images WHERE id=$1 RETURNING url,public_id", [req.params.id]);
  if (r.rowCount) destroy(r.rows[0].public_id, r.rows[0].url);
  invalidateCache();
  res.json({ ok: true });
});

admin.put("/hero", async (req, res) => {
  const url = str(req.body?.videoUrl, 500), publicId = str(req.body?.publicId, 200);
  if (url && !isOurUrl(url)) return bad(res, "Video must be uploaded through the admin panel");
  const old = await q("SELECT key,value FROM settings WHERE key IN ('hero_video_url','hero_video_public_id')");
  const prev = Object.fromEntries(old.rows.map((r) => [r.key, r.value]));
  if (url) {
    for (const [k, v] of [["hero_video_url", url], ["hero_video_public_id", publicId]])
      await q("INSERT INTO settings(key,value) VALUES($1,$2) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value", [k, v]);
  } else await q("DELETE FROM settings WHERE key IN ('hero_video_url','hero_video_public_id')");
  if (prev.hero_video_public_id && prev.hero_video_public_id !== publicId) destroy(prev.hero_video_public_id, "video");
  invalidateCache();
  res.json({ ok: true });
});

admin.post("/events", async (req, res) => {
  const title = str(req.body?.title, 40), slug = slugify(title);
  if (!slug || slug === "hero") return bad(res, "Please enter a valid event name");
  const r = await q("INSERT INTO events(slug,title,sort_order) VALUES($1,$2,COALESCE((SELECT MAX(sort_order) FROM events),0)+1) ON CONFLICT DO NOTHING RETURNING slug,title", [slug, title]);
  if (!r.rowCount) return bad(res, "An event with this name already exists", 409);
  invalidateCache();
  res.status(201).json({ ...r.rows[0], images: [] });
});

admin.delete("/events/:slug", async (req, res) => {
  const imgs = await q("DELETE FROM images WHERE section=$1 RETURNING url,public_id", [req.params.slug]);
  await q("DELETE FROM events WHERE slug=$1", [req.params.slug]);
  for (const i of imgs.rows) await destroy(i.public_id, i.url);
  invalidateCache();
  res.json({ ok: true });
});

admin.get("/enquiries", async (_req, res) => {
  const r = await q("SELECT id,name,role,phone,event_date,place,services,note,wa_status,created_at FROM enquiries ORDER BY id DESC LIMIT 200");
  res.json(r.rows);
});
admin.post("/enquiries/:id/resend", async (req, res) => {
  const id = Number(req.params.id);
  await q("UPDATE enquiries SET wa_status='pending', wa_attempts=0 WHERE id=$1", [id]);
  deliverEnquiry(id).catch(() => {});
  res.json({ ok: true });
});
admin.delete("/enquiries/:id", async (req, res) => {
  await q("DELETE FROM enquiries WHERE id=$1", [Number(req.params.id)]);
  res.json({ ok: true });
});

admin.get("/whatsapp", async (_req, res) => res.json(await getStatus()));
admin.post("/whatsapp/pair", async (req, res) => {
  try { res.json({ code: await requestPairing(req.body?.phone) }); } catch (e) { bad(res, e.message); }
});
admin.post("/whatsapp/test", async (_req, res) => {
  try { await sendText("✅ Ethnic Weddings website: WhatsApp notifications are working."); res.json({ ok: true }); } catch (e) { bad(res, e.message); }
});
admin.post("/whatsapp/reset", async (_req, res) => { await resetSession(); res.json({ ok: true }); });

void pool;
