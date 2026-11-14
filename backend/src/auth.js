import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { env } from "./config.js";

const h = (s) => crypto.createHash("sha256").update(String(s)).digest();

export const passwordOk = (pw) => crypto.timingSafeEqual(h(pw ?? ""), h(env.ADMIN_PASSWORD));
export const signToken = () => jwt.sign({ role: "admin" }, env.JWT_SECRET, { expiresIn: "12h" });

export function requireAdmin(req, res, next) {
  const m = /^Bearer (.+)$/.exec(req.headers.authorization || "");
  try {
    if (!m) throw new Error("no token");
    jwt.verify(m[1], env.JWT_SECRET);
    next();
  } catch { res.status(401).json({ error: "Please sign in again" }); }
}
