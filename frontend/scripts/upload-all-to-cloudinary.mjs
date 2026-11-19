import fs from "fs";
import path from "path";
import crypto from "crypto";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../../");

const CLOUD_NAME = "crzdfzqc";
const API_KEY = "782149781775256";
const API_SECRET = "prOAm5Y4CLWgE1-oeUdNJBfar8k";
const FOLDER_IMG = "ethnic-weddings/homepage";
const FOLDER_VID = "ethnic-weddings/videos";

const mapFilePath = path.resolve(rootDir, "frontend/src/data/cloudinaryMap.json");

let map = {};
if (fs.existsSync(mapFilePath)) {
  try {
    map = JSON.parse(fs.readFileSync(mapFilePath, "utf-8"));
  } catch (e) {
    map = {};
  }
}

// Add the ones we already uploaded
if (!map["/assets/more photos/day 2/103A2488.jpg"]) {
  map["/assets/more photos/day 2/103A2488.jpg"] = "https://res.cloudinary.com/crzdfzqc/image/upload/v1795066435/ethnic-weddings/homepage/s8lpbx5rhfne6w2ydjgl.jpg";
}
if (!map["/assets/videos/pravin-archu-trending-reel.mp4"]) {
  map["/assets/videos/pravin-archu-trending-reel.mp4"] = "https://res.cloudinary.com/crzdfzqc/video/upload/v1795066469/ethnic-weddings/videos/vjlsadsn2c27blkeqfuv.mp4";
}

const sha1 = (s) => crypto.createHash("sha1").update(s).digest("hex");

async function uploadImage(relPath) {
  if (map[relPath]) {
    console.log(`[SKIP] Already in map: ${relPath}`);
    return map[relPath];
  }

  const fullPath = path.join(rootDir, "frontend/public", relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`[WARN] File not found: ${fullPath}`);
    return null;
  }

  const tmpOut = `/tmp/cld_tmp_${Date.now()}_${path.basename(fullPath)}`;
  try {
    execSync(`sips -Z 2200 -s formatOptions 85 "${fullPath}" --out "${tmpOut}"`, { stdio: "pipe" });
  } catch (err) {
    console.error(`[ERROR] sips failed for ${fullPath}:`, err.message);
    return null;
  }

  const fileBuf = fs.readFileSync(tmpOut);
  try { fs.unlinkSync(tmpOut); } catch {}

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = sha1(`folder=${FOLDER_IMG}&timestamp=${timestamp}${API_SECRET}`);

  const formData = new FormData();
  formData.append("file", new Blob([fileBuf]), path.basename(fullPath));
  formData.append("api_key", API_KEY);
  formData.append("timestamp", String(timestamp));
  formData.append("folder", FOLDER_IMG);
  formData.append("signature", signature);

  console.log(`[UPLOAD IMG] ${relPath} (${(fileBuf.length / (1024 * 1024)).toFixed(2)} MB)...`);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      console.error(`[ERROR] Failed to upload ${relPath}:`, data);
      return null;
    }
    const secureUrl = data.secure_url;
    console.log(`[DONE IMG] ${relPath} -> ${secureUrl}`);
    map[relPath] = secureUrl;
    fs.writeFileSync(mapFilePath, JSON.stringify(map, null, 2), "utf-8");
    return secureUrl;
  } catch (err) {
    console.error(`[ERROR] Exception uploading ${relPath}:`, err.message);
    return null;
  }
}

async function uploadVideo(relPath) {
  if (map[relPath]) {
    console.log(`[SKIP] Already in map: ${relPath}`);
    return map[relPath];
  }

  const fullPath = path.join(rootDir, "frontend/public", relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`[WARN] Video not found: ${fullPath}`);
    return null;
  }

  const fileBuf = fs.readFileSync(fullPath);
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = sha1(`folder=${FOLDER_VID}&timestamp=${timestamp}${API_SECRET}`);

  const formData = new FormData();
  formData.append("file", new Blob([fileBuf]), path.basename(fullPath));
  formData.append("api_key", API_KEY);
  formData.append("timestamp", String(timestamp));
  formData.append("folder", FOLDER_VID);
  formData.append("signature", signature);

  console.log(`[UPLOAD VID] ${relPath} (${(fileBuf.length / (1024 * 1024)).toFixed(1)} MB)...`);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      console.error(`[ERROR] Failed to upload video ${relPath}:`, data);
      return null;
    }
    const secureUrl = data.secure_url;
    console.log(`[DONE VID] ${relPath} -> ${secureUrl}`);
    map[relPath] = secureUrl;
    fs.writeFileSync(mapFilePath, JSON.stringify(map, null, 2), "utf-8");
    return secureUrl;
  } catch (err) {
    console.error(`[ERROR] Exception uploading video ${relPath}:`, err.message);
    return null;
  }
}

async function main() {
  console.log("=== Cloudinary Asset Uploader ===");

  const photos = [
    "/assets/more photos/day 2/103A2488.jpg",
    "/assets/more photos/day 2/103A2503.jpg",
    "/assets/more photos/day 2/103A2669.jpg",
    "/assets/more photos/day 2/103A2692.jpg",
    "/assets/more photos/day 2/103A2715.jpg",
    "/assets/more photos/day 2/103A3018.jpg",
    "/assets/more photos/day 2/103A3740.jpg",
    "/assets/more photos/kavin outdoor/SES_6126.jpg",
    "/assets/more photos/kavin outdoor/SES_6225.jpg",
    "/assets/more photos/kavin outdoor/SES_6285.jpg",
    "/assets/more photos/kavin outdoor/SES_6346.jpg",
    "/assets/more photos/kavin outdoor/SES_6362.jpg",
    "/assets/more photos/pravin outdoor day 1/103A7726.4.jpg",
    "/assets/more photos/pravin outdoor day 1/103A8025.1.jpg",
    "/assets/more photos/pravin outdoor day 1/103A8126.1.jpg",
    "/assets/more photos/pravin outdoor day 1/103A8173.1.jpg",
    "/assets/more photos/pravin outdoor day 1/103A8177.1.jpg",
    "/assets/more photos/pravin outdoor day 1/103A8255.1.jpg",
    "/assets/more photos/pravin outdoor day 1/103A8495.1.jpg",
    "/assets/more photos/pravin outdoor/103A8643.jpg",
    "/assets/more photos/pravin outdoor/103A8784.jpg",
    "/assets/more photos/pravin outdoor/103A8858.jpg",
    "/assets/more photos/pravin outdoor/103A8870.jpg",
    "/assets/more photos/pravin outdoor/103A8882.jpg",
    "/assets/more photos/pravin outdoor/103A9010.jpg",
    "/assets/more photos/tenny couple/103A0494.jpg",
    "/assets/more photos/tenny couple/103A0603.jpg",
    "/assets/more photos/tenny couple/103A0699.jpg",
    "/assets/more photos/tenny couple/103A0735.jpg",
    "/assets/more photos/tenny couple/103A0941.jpg",
    "/assets/more photos/tenny couple/103A1297.jpg",
    "/assets/more photos/tenny couple/103A1308.jpg",
  ];

  for (let i = 0; i < photos.length; i++) {
    console.log(`[${i + 1}/${photos.length}] Processing photo...`);
    await uploadImage(photos[i]);
  }

  const videos = [
    "/assets/videos/pravin-archu-trending-reel.mp4",
    "/assets/videos/manisha-reel-3.mp4",
    "/assets/videos/tennyson-reel.mp4",
  ];

  for (let i = 0; i < videos.length; i++) {
    console.log(`[${i + 1}/${videos.length}] Processing video...`);
    await uploadVideo(videos[i]);
  }

  console.log("=== All uploads completed successfully! ===");
}

main().catch(console.error);
