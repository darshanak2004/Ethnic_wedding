import "dotenv/config";

const getEnv = (k, fallback = "") => process.env[k] || fallback;

export const env = {
  PORT: Number(process.env.PORT) || 4000,
  DATABASE_URL: getEnv("DATABASE_URL", "postgresql://neondb_owner:npg_30DWwxetpVTN@ep-tiny-unit-bd5ehxo2-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"),
  ADMIN_PASSWORD: getEnv("ADMIN_PASSWORD", "EthnicWeddings2026!"),
  JWT_SECRET: getEnv("JWT_SECRET", "03ed2fe6bdd60460a55959f61c718dedb72ea286ab1d72c8b556f544c0028740"),
  FRONTEND_URLS: (process.env.FRONTEND_URL || "").split(",").map((s) => s.trim().replace(/\/$/, "")).filter(Boolean),
  CLOUD_NAME: getEnv("CLOUDINARY_CLOUD_NAME", "crzdfzqc"),
  CLOUD_KEY: getEnv("CLOUDINARY_API_KEY", "782149781775256"),
  CLOUD_SECRET: getEnv("CLOUDINARY_API_SECRET", "prOAm5Y4CLWgE1-oeUdNJBfar8k"),
  WA_ENABLED: (process.env.WHATSAPP_ENABLED || "false") === "true",
  ADMIN_WHATSAPP: (process.env.ADMIN_WHATSAPP || "").split(",").map((s) => s.replace(/\D/g, "")).filter(Boolean),
};
