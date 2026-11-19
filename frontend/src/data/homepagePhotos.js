/**
 * src/data/homepagePhotos.js
 *
 * Single source of truth for all homepage photos.
 * Every photo appears in EXACTLY ONE section — no duplicates across the page.
 * Sourced from high-speed Cloudinary CDN with local fallback.
 */

import cldMap from "./cloudinaryMap.json";

export function cld(pathStr) {
  if (!pathStr) return pathStr;
  const decoded = decodeURIComponent(pathStr);
  const found = cldMap[decoded] || cldMap[pathStr];
  if (!found) return pathStr;
  // Apply Cloudinary modern format and quality auto-delivery
  if (found.includes("/image/upload/")) {
    return found.replace("/image/upload/", "/image/upload/f_auto,q_auto/");
  }
  return found;
}

const D2 = "/assets/more photos/day 2";
const KO = "/assets/more photos/kavin outdoor";
const PO = "/assets/more photos/pravin outdoor";
const P1 = "/assets/more photos/pravin outdoor day 1";
const TC = "/assets/more photos/tenny couple";
const WD = "/assets/portfolio/weddings";
const PW = "/assets/portfolio/pre-wedding";
const EN = "/assets/portfolio/engagement";
const CS = "/assets/portfolio/concept-shoots";

// ─── HERO WALL STRIP (2 rows × 10 = 20 photos) ───────────────────────────────
export const heroRow1 = [
  cld(`${D2}/103A2488.jpg`),           // D2  - wedding ritual
  cld(`${WD}/103a3710.jpg`),           // WD  - mandapam couple
  cld(`${KO}/SES_6126.jpg`),           // KO  - outdoor couple
  cld(`${PO}/103A8643.jpg`),           // PO  - pravin outdoor
  cld(`${TC}/103A0494.jpg`),           // TC  - tenny couple
  cld(`${PW}/ses_6102.jpg`),           // PW  - pre-wedding hills
  cld(`${P1}/103A8025.1.jpg`),         // P1  - pravin day1 outdoor
  cld(`${EN}/103a9782.jpg`),           // EN  - engagement portrait
  cld("/assets/marquee-03.jpg"),       // MQ  - root marquee
  cld(`${CS}/103a8025-1.jpg`),         // CS  - concept shoot
];

export const heroRow2 = [
  cld(`${KO}/SES_6285.jpg`),           // KO  - kavin outdoor
  cld(`${CS}/103a8078-1.jpg`),         // CS  - concept shoot
  cld(`${D2}/103A2715.jpg`),           // D2  - wedding
  cld(`${TC}/103A1308.jpg`),           // TC  - tenny couple
  cld(`${WD}/103a3750.jpg`),           // WD  - wedding ritual
  cld(`${P1}/103A8126.1.jpg`),         // P1  - pravin day1
  cld(`${PW}/103a0149.jpg`),           // PW  - pre-wedding
  cld(`${PO}/103A8784.jpg`),           // PO  - pravin outdoor
  cld("/assets/marquee-07.jpg"),       // MQ  - root marquee
  cld(`${EN}/2j3a7639.jpg`),           // EN  - engagement
];

// ─── MARQUEE / PHOTOWALL SECTION (10 photos) ─────────────────────────────────
export const marqueePhotos = [
  { src: cld(`${P1}/103A7726.4.jpg`),  alt: "Couple romantic outdoor portrait" },
  { src: cld(`${D2}/103A3018.jpg`),    alt: "Wedding ceremony sacred moment" },
  { src: cld(`${KO}/SES_6346.jpg`),    alt: "Outdoor couple candid portrait" },
  { src: cld(`${PO}/103A9010.jpg`),    alt: "Couple laughing outdoor session" },
  { src: cld(`${TC}/103A0603.jpg`),    alt: "Tenny couple romantic moment" },
  { src: cld(`${PW}/ses_6439.jpg`),    alt: "Pre-wedding outdoor shoot" },
  { src: cld(`${WD}/103a3729.jpg`),    alt: "Traditional wedding ritual" },
  { src: cld(`${EN}/103a9785.jpg`),    alt: "Engagement couple portrait" },
  { src: cld("/assets/marquee-05.jpg"), alt: "Golden hour couple embrace" },
  { src: cld(`${CS}/103a8246-0.jpg`),  alt: "Concept shoot outdoor portrait" },
];

// ─── ABOUT SECTION (1 photo) ──────────────────────────────────────────────────
export const aboutPhoto = cld(`${D2}/103A3740.jpg`);

// ─── PORTFOLIO GRID (8 photos, mix of tall/std/wide) ─────────────────────────
export const portfolioPhotos = [
  { src: cld(`${PO}/103A8870.jpg`),    alt: "Pravin couple outdoor portrait",    cls: "ew-grid-tall", w: 600, h: 800 },
  { src: cld(`${D2}/103A2503.jpg`),    alt: "Wedding ceremony joyful moment",    cls: "ew-grid-std",  w: 600, h: 420 },
  { src: cld(`${TC}/103A0699.jpg`),    alt: "Tenny couple engagement portrait",  cls: "ew-grid-std",  w: 600, h: 420 },
  { src: cld(`${P1}/103A8173.1.jpg`),  alt: "Couple outdoor natural light",      cls: "ew-grid-tall", w: 600, h: 800 },
  { src: cld(`${KO}/SES_6225.jpg`),    alt: "Kavin outdoor couple wide shot",    cls: "ew-grid-wide", w: 800, h: 420 },
  { src: cld(`${WD}/103a3724.jpg`),    alt: "Wedding reception celebration",     cls: "ew-grid-std",  w: 600, h: 420 },
  { src: cld(`${EN}/103a9779.jpg`),    alt: "Engagement romantic portrait",      cls: "ew-grid-std",  w: 600, h: 420 },
  { src: cld(`${PW}/ses_6208.jpg`),    alt: "Pre-wedding outdoor wide shot",     cls: "ew-grid-wide", w: 800, h: 420 },
];

// ─── SERVICES SECTION — photo cluster (3 photos) ─────────────────────────────
export const servicesTallPhoto    = cld(`${P1}/103A8255.1.jpg`);
export const servicesStack1Photo  = cld(`${D2}/103A2669.jpg`);
export const servicesStack2Photo  = cld(`${TC}/103A0941.jpg`);

// ─── CINEMATIC FILMS — poster thumbnails (3 photos) ──────────────────────────
export const filmPosters = [
  { poster: cld(`${P1}/103A8495.1.jpg`),  title: "Pravin & Archana",    loc: "Traditional Hindu Wedding · Thoothukudi", time: "3:45" },
  { poster: cld(`${TC}/103A1297.jpg`),    title: "Manisha & Tennyson",  loc: "Grand Church Ceremony · Tirunelveli",     time: "4:12" },
  { poster: cld(`${KO}/SES_6362.jpg`),    title: "Vignesh & Sowmya",    loc: "Golden Hour Celebration · Madurai",       time: "3:20" },
];

// ─── PROCESS / STEPS (1 photo) ───────────────────────────────────────────────
export const processPhoto = cld(`${P1}/103A8177.1.jpg`);

// ─── TESTIMONIALS (3 photos) ─────────────────────────────────────────────────
export const testimonialPhotos = [
  cld(`${D2}/103A2692.jpg`),           // D2  - wedding
  cld(`${PO}/103A8858.jpg`),           // PO  - pravin outdoor
  cld(`${TC}/103A0735.jpg`),           // TC  - tenny couple
];

// ─── FAQ SECTION (1 photo) ───────────────────────────────────────────────────
export const faqPhoto = cld(`${PO}/103A8882.jpg`);
