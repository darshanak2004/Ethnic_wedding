import fs from "fs";
import path from "path";
import crypto from "crypto";

const CLOUD_NAME = "crzdfzqc";
const API_KEY = "782149781775256";
const API_SECRET = "prOAm5Y4CLWgE1-oeUdNJBfar8k";
const FOLDER = "ethnic-weddings";

const sha1 = (str) => crypto.createHash("sha1").update(str).digest("hex");

async function uploadFile(filePath, resourceType = "image", publicIdCustom = null) {
  if (!fs.existsSync(filePath)) {
    console.error(`File does not exist: ${filePath}`);
    return null;
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const baseName = path.basename(filePath, path.extname(filePath)).replace(/[^a-zA-Z0-9_-]/g, "_");
  const publicId = publicIdCustom || `${FOLDER}/${baseName}`;

  const paramsToSign = `folder=${FOLDER}&public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`;
  const signature = sha1(paramsToSign);

  const fileData = fs.readFileSync(filePath);
  const blob = new Blob([fileData]);

  const formData = new FormData();
  formData.append("file", blob, path.basename(filePath));
  formData.append("api_key", API_KEY);
  formData.append("timestamp", String(timestamp));
  formData.append("folder", FOLDER);
  formData.append("public_id", publicId);
  formData.append("signature", signature);

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;
  
  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      console.error(`Upload error for ${filePath}:`, data);
      return null;
    }
    console.log(`Uploaded [${resourceType}]: ${path.basename(filePath)} -> ${data.secure_url}`);
    return data;
  } catch (err) {
    console.error(`Fetch exception for ${filePath}:`, err.message);
    return null;
  }
}

// Export for runner
export { uploadFile, CLOUD_NAME, FOLDER };
