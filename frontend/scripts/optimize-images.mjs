import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicAssetsDir = path.join(rootDir, "public", "assets");
const optimizedDir = path.join(publicAssetsDir, "optimized");

const WIDTHS = [480, 960, 1600];
const QUALITY = 78;

async function getAllImages(dir, relative = "") {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name === "optimized" || entry.name === "videos") continue;
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(relative, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(await getAllImages(fullPath, relPath));
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      results.push({ fullPath, relPath, name: entry.name });
    }
  }
  return results;
}

async function optimize() {
  const images = await getAllImages(publicAssetsDir);
  console.log(`Found ${images.length} source images in ${publicAssetsDir}`);
  let count = 0;
  let skipped = 0;

  for (const img of images) {
    const ext = path.extname(img.name);
    const baseName = path.basename(img.name, ext);
    const relDir = path.dirname(img.relPath);
    const targetDir = path.join(optimizedDir, relDir === "." ? "" : relDir);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const imageBuffer = fs.readFileSync(img.fullPath);
    const meta = await sharp(imageBuffer).metadata();

    for (const w of WIDTHS) {
      const outPath = path.join(targetDir, `${baseName}-${w}.webp`);
      if (fs.existsSync(outPath)) {
        skipped++;
        continue;
      }

      const targetWidth = meta.width && meta.width < w ? meta.width : w;

      await sharp(imageBuffer)
        .resize({ width: targetWidth, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath);

      count++;
    }
  }

  console.log(`Optimization finished! Generated: ${count} webp files, Skipped: ${skipped} existing.`);
}

optimize().catch((err) => {
  console.error("Error optimizing images:", err);
  process.exit(1);
});
