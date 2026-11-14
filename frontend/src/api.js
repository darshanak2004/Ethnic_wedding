import { DEFAULTS } from "./data/defaults";

export const API = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
export const WA = import.meta.env.VITE_WA_NUMBER || "";

export const token = {
  get: () => sessionStorage.getItem("ew_admin") || "",
  set: (t) => sessionStorage.setItem("ew_admin", t),
  clear: () => sessionStorage.removeItem("ew_admin"),
};

/* ---------- helpers ---------- */

/** Cloudinary delivers a smaller, modern-format copy (WebP/AVIF) when asked. Other URLs pass through unchanged. */
export function cdn(url, w) {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  const kind = url.includes("/video/upload/") ? "q_auto" : `f_auto,q_auto${w ? `,w_${w}` : ""}`;
  return url.replace("/upload/", `/upload/${kind}/`);
}

class ApiError extends Error { constructor(msg, status) { super(msg); this.status = status; } }

async function call(path, { method = "GET", body, auth = false, timeout = 20000 } = {}) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeout);
  try {
    const r = await fetch(`${API}/api${path}`, {
      method,
      signal: ctl.signal,
      headers: { ...(body ? { "Content-Type": "application/json" } : {}), ...(auth ? { Authorization: `Bearer ${token.get()}` } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new ApiError(data.error || "Something went wrong", r.status);
    return data;
  } catch (e) {
    if (e instanceof ApiError) throw e;
    throw new ApiError("Could not reach the server. Please try again.", 0);
  } finally { clearTimeout(t); }
}

/* ---------- public content ---------- */

const CACHE = "ew_content_v2";
export function cachedContent() {
  try { return JSON.parse(localStorage.getItem(CACHE)) || DEFAULTS; } catch { return DEFAULTS; }
}

/** Returns live content from the server, or null if the server is asleep or unreachable. */
export async function getContent() {
  try {
    const c = await call("/content", { timeout: 60000 }); // a sleeping free host can take ~50s to wake
    try { localStorage.setItem(CACHE, JSON.stringify(c)); } catch {}
    return c;
  } catch { return null; }
}

/* ---------- admin ---------- */

export async function login(password) {
  return (await call("/admin/login", { method: "POST", body: { password } })).token;
}

const MAX_SIDE = 2200;
/** Shrinks big phone/camera photos in the browser before upload: faster, and keeps free storage from filling up. */
async function shrink(file) {
  if (!file.type.startsWith("image/") || /gif|svg/.test(file.type) || file.size < 500 * 1024) return file;
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
    const k = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
    const blob = await new Promise((ok) => c.toBlob(ok, "image/jpeg", 0.85));
    return blob && blob.size < file.size ? new File([blob], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" }) : file;
  } catch { return file; }
}

/** Uploads straight to Cloudinary using a signature from our server. Returns { url, publicId }. */
export async function uploadFile(file) {
  const kind = file.type.startsWith("video") ? "video" : "image";
  if (kind === "video" && file.size > 100 * 1024 * 1024) throw new Error("Video is over 100 MB. Please compress it first.");
  const f = kind === "image" ? await shrink(file) : file;
  const s = await call(`/admin/upload-signature?type=${kind}`, { auth: true });
  const fd = new FormData();
  fd.append("file", f);
  fd.append("api_key", s.apiKey);
  fd.append("timestamp", s.timestamp);
  fd.append("folder", s.folder);
  fd.append("signature", s.signature);
  const r = await fetch(`https://api.cloudinary.com/v1_1/${s.cloudName}/${s.resourceType}/upload`, { method: "POST", body: fd });
  if (!r.ok) throw new Error("Upload failed. Check the file type and size.");
  const d = await r.json();
  return { url: d.secure_url, publicId: d.public_id };
}

export async function saveImage(section, { url, publicId }, alt) {
  return call("/admin/images", { method: "POST", auth: true, body: { section, url, publicId, alt } });
}
export const removeImage = (id) => call(`/admin/images/${id}`, { method: "DELETE", auth: true });
export const saveHeroVideo = (up) => call("/admin/hero", { method: "PUT", auth: true, body: { videoUrl: up?.url || "", publicId: up?.publicId || "" } });

export async function addEvent(title) {
  return call("/admin/events", { method: "POST", auth: true, body: { title } });
}
export const deleteEvent = (slug) => call(`/admin/events/${slug}`, { method: "DELETE", auth: true });

export const getEnquiries = () => call("/admin/enquiries", { auth: true });
export const resendEnquiry = (id) => call(`/admin/enquiries/${id}/resend`, { method: "POST", auth: true });
export const deleteEnquiry = (id) => call(`/admin/enquiries/${id}`, { method: "DELETE", auth: true });

export const waStatus = () => call("/admin/whatsapp", { auth: true });
export const waPair = (phone) => call("/admin/whatsapp/pair", { method: "POST", auth: true, body: { phone } });
export const waTest = () => call("/admin/whatsapp/test", { method: "POST", auth: true });
export const waReset = () => call("/admin/whatsapp/reset", { method: "POST", auth: true });

/* ---------- customer enquiry ---------- */

/** Saves the enquiry on the server (which messages the admin on WhatsApp). Throws if it could not be saved. */
export async function sendEnquiry(data) {
  return call("/enquiries", { method: "POST", body: data, timeout: 70000 }); // long timeout: the server may be waking up
}
