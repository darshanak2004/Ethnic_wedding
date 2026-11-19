import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config.js";
import { migrate, q } from "./db.js";
import { api } from "./routes.js";
import { initWhatsApp } from "./whatsapp.js";

const app = express();
app.set("trust proxy", 1); // Render/Railway/Fly sit behind a proxy, needed for correct per-visitor rate limits
app.disable("x-powered-by");
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

const isLocal = (origin) => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || "");
const allowed = new Set([...env.FRONTEND_URLS, "http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"]);
app.use(cors({
  origin: (origin, cb) => cb(null, !origin || allowed.has(origin) || isLocal(origin)),
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({ limit: "20kb" }));

// Lightweight healthcheck for uptime monitors and free host keep-alive without burning free Neon DB compute hours
app.get("/api/health", (req, res) => {
  if (req.query.db === "1") {
    return q("SELECT 1")
      .then(() => res.json({ ok: true, db: "connected" }))
      .catch(() => res.status(503).json({ ok: false, db: "unreachable" }));
  }
  res.json({ ok: true });
});

let ready = false;
let initPromise = null;

async function ensureReady() {
  if (ready) return true;
  if (!initPromise) {
    initPromise = (async () => {
      for (let i = 1; i <= 6; i++) {
        try {
          await migrate();
          ready = true;
          initWhatsApp();
          return true;
        } catch (e) {
          console.error(`[db] startup attempt ${i} failed:`, e.message);
          if (i < 6) await new Promise((r) => setTimeout(r, 1500 * i));
        }
      }
      return false;
    })();
  }
  return initPromise;
}

// Warmup on launch
ensureReady();

app.use(async (_req, res, next) => {
  if (!ready) await ensureReady();
  if (!ready) return res.status(503).json({ error: "Starting up, try again in a moment" });
  next();
});
app.use("/api", api);
app.use(api);
app.use((_req, res) => res.status(404).json({ error: "Not found" }));
app.use((err, _req, res, _next) => {
  if (err?.status >= 400 && err.status < 500) return res.status(err.status).json({ error: "Invalid request" });
  console.error("[error]", err);
  res.status(500).json({ error: "Something went wrong" });
});

if (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {
  app.listen(env.PORT, () => console.log(`API listening on :${env.PORT}`));
}

process.on("unhandledRejection", (e) => console.error("[unhandledRejection]", e));

export default app;
