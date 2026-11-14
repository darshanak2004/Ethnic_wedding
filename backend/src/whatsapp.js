import baileys from "@whiskeysockets/baileys";
import pino from "pino";
import QRCode from "qrcode";
import { env } from "./config.js";
import { q } from "./db.js";
import { usePgAuthState, clearAuthState } from "./waAuth.js";

const { DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, Browsers } = baileys;
const makeWASocket = baileys.default || baileys.makeWASocket;
const logger = pino({ level: "warn" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let sock = null;
let state = env.WA_ENABLED ? "starting" : "disabled"; // disabled | starting | qr | connecting | open | closed
let qrText = null;
let timer = null;
let starting = false;
let attempts = 0;
let registered = false;
const inflight = new Set();

const clean = (s, n) => String(s ?? "").replace(/\s+/g, " ").trim().slice(0, n);

export async function getStatus() {
  return {
    enabled: env.WA_ENABLED,
    state,
    linkedAs: state === "open" ? (sock?.user?.id || "").split(":")[0].split("@")[0] : null,
    qr: state === "qr" && qrText ? await QRCode.toDataURL(qrText, { margin: 1, width: 280 }) : null,
    receivers: env.ADMIN_WHATSAPP,
  };
}

function schedule(ms) {
  clearTimeout(timer);
  timer = setTimeout(() => connect().catch((e) => console.error("[wa] connect error", e.message)), ms);
}

async function connect() {
  if (!env.WA_ENABLED || starting) return;
  starting = true;
  try {
    try { sock?.end?.(undefined); } catch {}
    const { state: auth, saveCreds } = await usePgAuthState();
    registered = !!auth.creds.registered;
    const { version } = await fetchLatestBaileysVersion().catch(() => ({}));
    const s = makeWASocket({
      ...(version ? { version } : {}),
      logger,
      auth: { creds: auth.creds, keys: makeCacheableSignalKeyStore(auth.keys, logger) },
      browser: Browsers.ubuntu("Chrome"),
      markOnlineOnConnect: false,
      syncFullHistory: false,
      generateHighQualityLinkPreview: false,
      getMessage: async () => undefined,
    });
    sock = s;
    state = qrText ? "qr" : "connecting";

    s.ev.on("creds.update", () => saveCreds().catch((e) => console.error("[wa] saveCreds", e.message)));
    s.ev.on("connection.update", async (u) => {
      if (s !== sock) return; // ignore events from an old socket
      const { connection, lastDisconnect, qr } = u;
      if (qr) { qrText = qr; state = "qr"; }
      if (connection === "open") {
        state = "open"; qrText = null; attempts = 0; registered = true;
        console.log("[wa] connected");
        sweepPending().catch(() => {});
      }
      if (connection === "close") {
        const code = lastDisconnect?.error?.output?.statusCode;
        qrText = null;
        if (code === DisconnectReason.loggedOut) {
          console.log("[wa] logged out from phone, clearing session");
          await clearAuthState().catch(() => {});
          state = "starting"; attempts = 0;
          schedule(1500);
        } else {
          state = "closed";
          attempts += 1;
          schedule(Math.min(60_000, 2000 * attempts)); // gentle backoff
        }
      }
    });
  } finally { starting = false; }
}

export function initWhatsApp() {
  if (!env.WA_ENABLED) { console.log("[wa] disabled (WHATSAPP_ENABLED=false)"); return; }
  if (!env.ADMIN_WHATSAPP.length) console.warn("[wa] ADMIN_WHATSAPP is empty, enquiries will be saved but nobody will be messaged");
  schedule(10);
}

/** Link by 8-character code (WhatsApp > Linked devices > Link with phone number) instead of scanning a QR. */
export async function requestPairing(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length < 8) throw new Error("Enter the number with country code, e.g. 919876543210");
  if (registered || state === "open") throw new Error("Already linked. Use Reset if you want to link a different number");
  if (!sock || state === "starting") throw new Error("Still starting, try again in a few seconds");
  const code = await sock.requestPairingCode(digits);
  return String(code).replace(/(.{4})(?=.)/, "$1-");
}

export async function resetSession() {
  try { await sock?.logout?.(); } catch {}
  try { sock?.end?.(undefined); } catch {}
  await clearAuthState();
  sock = null; qrText = null; registered = false; attempts = 0;
  state = env.WA_ENABLED ? "starting" : "disabled";
  schedule(500);
}

async function waitOpen(ms) {
  const end = Date.now() + ms;
  while (state !== "open" && Date.now() < end) await sleep(500);
  return state === "open";
}

export async function sendText(text, { wait = 0 } = {}) {
  if (state !== "open" && !(wait && (await waitOpen(wait)))) throw new Error("WhatsApp is not connected");
  if (!env.ADMIN_WHATSAPP.length) throw new Error("ADMIN_WHATSAPP is not set");
  for (const n of env.ADMIN_WHATSAPP) {
    await sock.sendMessage(`${n}@s.whatsapp.net`, { text });
    await sleep(800);
  }
}

const waLink = (phone) => {
  let d = String(phone).replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  if (d.length === 10) d = "91" + d; // assume India when no country code is typed
  return `https://wa.me/${d}`;
};

export const formatEnquiry = (e) =>
  [
    "🔔 *New enquiry · Ethnic Weddings*", "",
    `*Name:* ${clean(e.name, 100)}`,
    `*I am a:* ${clean(e.role, 30) || "-"}`,
    `*Phone:* ${clean(e.phone, 30)}`,
    `*Event date:* ${clean(e.event_date, 20) || "to be decided"}`,
    `*Venue:* ${clean(e.place, 150) || "-"}`,
    `*Services:* ${clean(e.services, 400) || "to be discussed"}`,
    `*Notes:* ${clean(e.note, 1000) || "-"}`, "",
    `Reply to the customer: ${waLink(e.phone)}`,
  ].join("\n");

/** Send one saved enquiry to the admin(s) and record the result. Safe to call repeatedly. */
export async function deliverEnquiry(id) {
  if (!env.WA_ENABLED || inflight.has(id)) return;
  inflight.add(id);
  try {
    const r = await q("SELECT * FROM enquiries WHERE id=$1 AND wa_status <> 'sent'", [id]);
    if (!r.rowCount) return;
    try {
      await sendText(formatEnquiry(r.rows[0]), { wait: 20_000 });
      await q("UPDATE enquiries SET wa_status='sent', wa_attempts=wa_attempts+1 WHERE id=$1", [id]);
    } catch (e) {
      console.warn(`[wa] enquiry ${id} not delivered yet:`, e.message);
      await q("UPDATE enquiries SET wa_status = CASE WHEN wa_attempts+1 >= 5 THEN 'failed' ELSE 'pending' END, wa_attempts=wa_attempts+1 WHERE id=$1", [id]);
    }
  } finally { inflight.delete(id); }
}

/** After (re)connecting, deliver anything that arrived while WhatsApp was offline or the server was asleep. */
export async function sweepPending() {
  const r = await q("SELECT id FROM enquiries WHERE wa_status='pending' AND created_at > now() - interval '7 days' ORDER BY id LIMIT 20");
  for (const row of r.rows) { await deliverEnquiry(row.id); await sleep(1500); }
}
