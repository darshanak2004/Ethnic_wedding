import crypto from "node:crypto";
import { env } from "./config.js";

const sha1 = (s) => crypto.createHash("sha1").update(s).digest("hex");
export const cloudReady = () => !!(env.CLOUD_NAME && env.CLOUD_KEY && env.CLOUD_SECRET);

/** Signed upload parameters, so only a signed-in admin can upload to your Cloudinary account. */
export function uploadSignature(kind) {
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "ethnic-weddings";
  const signature = sha1(`folder=${folder}&timestamp=${timestamp}${env.CLOUD_SECRET}`);
  return { cloudName: env.CLOUD_NAME, apiKey: env.CLOUD_KEY, timestamp, folder, signature, resourceType: kind === "video" ? "video" : "image" };
}

export const isOurUrl = (url) => typeof url === "string" && url.startsWith(`https://res.cloudinary.com/${env.CLOUD_NAME}/`);

/** Delete a file from Cloudinary so removed photos and videos do not use up free storage. Never throws. */
export async function destroy(publicId, urlOrType = "") {
  if (!publicId || !cloudReady()) return;
  const isVideo = urlOrType === "video" || urlOrType.includes("/video/") || /\.(mp4|mov|webm|m4v)($|\?)/i.test(urlOrType);
  const resource = isVideo ? "video" : "image";
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = sha1(`public_id=${publicId}&timestamp=${timestamp}${env.CLOUD_SECRET}`);
  const body = new URLSearchParams({ public_id: publicId, timestamp: String(timestamp), api_key: env.CLOUD_KEY, signature });
  try {
    const r = await fetch(`https://api.cloudinary.com/v1_1/${env.CLOUD_NAME}/${resource}/destroy`, { method: "POST", body });
    if (!r.ok) {
      // If destroying under this type failed (e.g. video vs raw/image), attempt alternate
      const altResource = resource === "video" ? "image" : "video";
      const altBody = new URLSearchParams({ public_id: publicId, timestamp: String(timestamp), api_key: env.CLOUD_KEY, signature });
      await fetch(`https://api.cloudinary.com/v1_1/${env.CLOUD_NAME}/${altResource}/destroy`, { method: "POST", body: altBody });
    }
  } catch (e) { console.warn("[cloudinary] destroy error", e.message); }
}
