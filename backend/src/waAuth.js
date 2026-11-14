import baileys from "@whiskeysockets/baileys";
import { pool, q } from "./db.js";

const { BufferJSON, initAuthCreds, proto } = baileys;

/**
 * WhatsApp login session kept in Postgres instead of files.
 * Free hosts wipe the disk on every restart/deploy; keeping the session in the database
 * means you scan the QR code once and it stays linked.
 */
export async function usePgAuthState() {
  const read = async (key) => {
    const r = await q("SELECT value FROM wa_auth WHERE key=$1", [key]);
    return r.rowCount ? JSON.parse(r.rows[0].value, BufferJSON.reviver) : null;
  };
  const write = (key, val) =>
    q("INSERT INTO wa_auth(key,value) VALUES($1,$2) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value", [key, JSON.stringify(val, BufferJSON.replacer)]);

  const creds = (await read("creds")) || initAuthCreds();

  return {
    state: {
      creds,
      keys: {
        get: async (type, ids) => {
          const out = {};
          if (!ids.length) return out;
          const r = await q("SELECT key,value FROM wa_auth WHERE key = ANY($1)", [ids.map((id) => `${type}-${id}`)]);
          const byKey = new Map(r.rows.map((row) => [row.key, row.value]));
          for (const id of ids) {
            const raw = byKey.get(`${type}-${id}`);
            if (!raw) continue;
            let v = JSON.parse(raw, BufferJSON.reviver);
            if (type === "app-state-sync-key" && v) v = proto.Message.AppStateSyncKeyData.fromObject(v);
            out[id] = v;
          }
          return out;
        },
        set: async (data) => {
          const upKeys = [], upVals = [], del = [];
          for (const type of Object.keys(data)) {
            for (const id of Object.keys(data[type])) {
              const v = data[type][id], key = `${type}-${id}`;
              if (v) { upKeys.push(key); upVals.push(JSON.stringify(v, BufferJSON.replacer)); } else del.push(key);
            }
          }
          const c = await pool.connect();
          try {
            await c.query("BEGIN");
            if (upKeys.length) await c.query("INSERT INTO wa_auth(key,value) SELECT * FROM unnest($1::text[],$2::text[]) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value", [upKeys, upVals]);
            if (del.length) await c.query("DELETE FROM wa_auth WHERE key = ANY($1)", [del]);
            await c.query("COMMIT");
          } catch (e) { await c.query("ROLLBACK"); throw e; } finally { c.release(); }
        },
      },
    },
    saveCreds: () => write("creds", creds),
  };
}

export const clearAuthState = () => q("DELETE FROM wa_auth");
