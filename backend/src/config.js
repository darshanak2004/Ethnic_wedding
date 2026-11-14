import "dotenv/config";

const need = (k) => {
  const v = process.env[k];
  if (!v) { console.error(`Missing required environment variable: ${k}`); process.exit(1); }
  return v;
};

export const env = {
  PORT: Number(process.env.PORT) || 4000,
  DATABASE_URL: need("DATABASE_URL"),
  ADMIN_PASSWORD: need("ADMIN_PASSWORD"),
  JWT_SECRET: need("JWT_SECRET"),
  FRONTEND_URLS: (process.env.FRONTEND_URL || "").split(",").map((s) => s.trim().replace(/\/$/, "")).filter(Boolean),
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUD_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUD_SECRET: process.env.CLOUDINARY_API_SECRET || "",
  WA_ENABLED: (process.env.WHATSAPP_ENABLED || "true") !== "false",
  // numbers that receive enquiries: country code + digits, comma separated, no plus sign
  ADMIN_WHATSAPP: (process.env.ADMIN_WHATSAPP || "").split(",").map((s) => s.replace(/\D/g, "")).filter(Boolean),
};
