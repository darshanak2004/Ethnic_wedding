import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { env } from "./config.js";
import { migrate, q } from "./db.js";
import { api } from "./routes.js";
import { initWhatsApp } from "./whatsapp.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "../../frontend/dist");
const publicPath = path.resolve(__dirname, "../../frontend/public");

const app = express();
app.set("trust proxy", 1); // Render/Railway/Fly/GoDaddy sit behind a proxy
app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: "cross-origin" } }));

// Serve frontend build & static media assets
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
}

const isLocal = (origin) => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || "");
const allowed = new Set([...env.FRONTEND_URLS, "http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"]);
app.use(cors({
  origin: (origin, cb) => cb(null, !origin || allowed.has(origin) || isLocal(origin)),
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({ limit: "20kb" }));

// Healthcheck endpoints
app.get("/health", (_req, res) => res.status(200).send("OK"));
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

// Warmup on launch in background so it doesn't block server start
ensureReady().catch((e) => console.error("[db] warmup error:", e));

app.use("/api", async (_req, res, next) => {
  if (!ready) await ensureReady();
  if (!ready) return res.status(503).json({ error: "Database starting up, try again in a moment" });
  next();
}, api);

// SPA fallback: send index.html for all page routes
app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) {
    return next();
  }
  const indexPath = path.join(distPath, "index.html");
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.status(200).send("Ethnic Weddings App Running");
});

app.use((_req, res) => res.status(404).json({ error: "Not found" }));
app.use((err, _req, res, _next) => {
  if (err?.status >= 400 && err.status < 500) return res.status(err.status).json({ error: "Invalid request" });
  console.error("[error]", err);
  res.status(500).json({ error: "Something went wrong" });
});

if (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {
  const host = "0.0.0.0";
  app.listen(env.PORT, host, () => console.log(`API and Web App listening on ${host}:${env.PORT}`));
}

process.on("unhandledRejection", (e) => console.error("[unhandledRejection]", e));

export default app;
