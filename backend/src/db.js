import pg from "pg";
import { env } from "./config.js";
import { DEFAULTS } from "../../frontend/src/data/defaults.js";

const u = new URL(env.DATABASE_URL);
const local = ["localhost", "127.0.0.1"].includes(u.hostname);
u.searchParams.delete("sslmode");
u.searchParams.delete("channel_binding");

export const pool = new pg.Pool({
  connectionString: u.toString(),
  ssl: local ? false : { rejectUnauthorized: true },
  max: 5,
  idleTimeoutMillis: 10_000, // Neon free closes idle connections, so do not hold them
  connectionTimeoutMillis: 20_000, // first query after Neon wakes from idle can be slow
  keepAlive: true,
});
pool.on("error", (e) => console.error("[db] idle client error:", e.message));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const transient = (e) => /terminat|timeout|ECONNRESET|ECONNREFUSED|EPIPE|Connection/i.test(e?.message || "");

/** Query with one automatic retry (covers Neon waking up from idle). */
export async function q(text, params) {
  try { return await pool.query(text, params); }
  catch (e) {
    if (!transient(e)) throw e;
    await sleep(1200);
    return pool.query(text, params);
  }
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS events (
  slug text PRIMARY KEY,
  title text NOT NULL,
  description text,
  video_url text,
  video_title text,
  video_desc text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE events ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE events ADD COLUMN IF NOT EXISTS video_url text;
ALTER TABLE events ADD COLUMN IF NOT EXISTS video_title text;
ALTER TABLE events ADD COLUMN IF NOT EXISTS video_desc text;

CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seq bigserial,
  section text NOT NULL,            -- 'hero' or an events.slug
  url text NOT NULL,                -- only the URL is stored, never the file
  public_id text,                   -- Cloudinary id, used to delete the file when the photo is removed
  alt text NOT NULL DEFAULT '',
  pos text,
  posm text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS images_section_seq ON images (section, seq);
CREATE TABLE IF NOT EXISTS settings (key text PRIMARY KEY, value text NOT NULL);
CREATE TABLE IF NOT EXISTS enquiries (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  role text,
  phone text NOT NULL,
  event_date text,
  place text,
  services text,
  note text,
  wa_status text NOT NULL DEFAULT 'pending',   -- pending | sent | failed
  wa_attempts int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS enquiries_created ON enquiries (created_at DESC);
CREATE TABLE IF NOT EXISTS wa_auth (key text PRIMARY KEY, value text NOT NULL);
`;

export async function migrate() {
  await q(SCHEMA);
  const seeded = await q("SELECT 1 FROM settings WHERE key='seeded_v2'");
  if (seeded.rowCount) return;
  const c = await pool.connect();
  try {
    await c.query("BEGIN");
    // Clear old placeholder events if any
    await c.query("DELETE FROM images WHERE section IN ('hero', 'wedding', 'birthday')");
    await c.query("DELETE FROM events WHERE slug IN ('wedding', 'birthday')");

    // Seed events from DEFAULTS
    for (const [i, e] of DEFAULTS.events.entries()) {
      await c.query(
        `INSERT INTO events(slug, title, description, video_url, video_title, video_desc, sort_order)
         VALUES($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (slug) DO UPDATE SET
           title = EXCLUDED.title,
           description = EXCLUDED.description,
           video_url = EXCLUDED.video_url,
           video_title = EXCLUDED.video_title,
           video_desc = EXCLUDED.video_desc,
           sort_order = EXCLUDED.sort_order`,
        [e.slug, e.title, e.description || "", e.videoUrl || "", e.videoTitle || "", e.videoDesc || "", i + 1]
      );
      for (const im of e.images || []) {
        await c.query("INSERT INTO images(section, url, alt) VALUES($1, $2, $3)", [e.slug, im.url, im.alt || e.title]);
      }
    }

    // Seed hero slides
    for (const s of DEFAULTS.hero.slides || []) {
      await c.query("INSERT INTO images(section, url, alt) VALUES('hero', $1, $2)", [s.url, s.alt || "Hero photo"]);
    }

    // Seed hero video setting
    if (DEFAULTS.hero.videoUrl) {
      await c.query("INSERT INTO settings(key, value) VALUES('hero_video_url', $1) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value", [DEFAULTS.hero.videoUrl]);
    }

    await c.query("INSERT INTO settings(key, value) VALUES('seeded_v2', '1') ON CONFLICT (key) DO UPDATE SET value = '1'");
    await c.query("COMMIT");
    console.log("[db] seeded live curated content (events, photos, videos)");
  } catch (e) {
    await c.query("ROLLBACK");
    throw e;
  } finally {
    c.release();
  }
}
