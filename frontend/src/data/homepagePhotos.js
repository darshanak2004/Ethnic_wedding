/**
 * src/data/homepagePhotos.js
 *
 * Single source of truth for all homepage photos.
 * Every photo appears in EXACTLY ONE section — no duplicates across the page.
 * Photos are mixed from all available asset folders:
 *   D2  = /assets/more photos/day 2/
 *   KO  = /assets/more photos/kavin outdoor/
 *   PO  = /assets/more photos/pravin outdoor/
 *   P1  = /assets/more photos/pravin outdoor day 1/
 *   TC  = /assets/more photos/tenny couple/
 *   WD  = /assets/portfolio/weddings/
 *   PW  = /assets/portfolio/pre-wedding/
 *   EN  = /assets/portfolio/engagement/
 *   CS  = /assets/portfolio/concept-shoots/
 *   MQ  = /assets/marquee-xx.jpg
 *   PH  = /assets/photo-x.jpg
 *
 * Files with commas or "copy" in names are intentionally skipped (URL-unsafe).
 */

const D2 = "/assets/more%20photos/day%202";
const KO = "/assets/more%20photos/kavin%20outdoor";
const PO = "/assets/more%20photos/pravin%20outdoor";
const P1 = "/assets/more%20photos/pravin%20outdoor%20day%201";
const TC = "/assets/more%20photos/tenny%20couple";
const WD = "/assets/portfolio/weddings";
const PW = "/assets/portfolio/pre-wedding";
const EN = "/assets/portfolio/engagement";
const CS = "/assets/portfolio/concept-shoots";

// ─── HERO WALL STRIP (2 rows × 10 = 20 photos) ───────────────────────────────
export const heroRow1 = [
  `${D2}/103A2488.jpg`,           // D2  - wedding ritual
  `${WD}/103a3710.jpg`,           // WD  - mandapam couple
  `${KO}/SES_6126.jpg`,           // KO  - outdoor couple
  `${PO}/103A8643.jpg`,           // PO  - pravin outdoor
  `${TC}/103A0494.jpg`,           // TC  - tenny couple
  `${PW}/ses_6102.jpg`,           // PW  - pre-wedding hills
  `${P1}/103A8025.1.jpg`,         // P1  - pravin day1 outdoor
  `${EN}/103a9782.jpg`,           // EN  - engagement portrait
  "/assets/marquee-03.jpg",       // MQ  - root marquee
  `${CS}/103a8025-1.jpg`,         // CS  - concept shoot
];

export const heroRow2 = [
  `${KO}/SES_6285.jpg`,           // KO  - kavin outdoor
  `${CS}/103a8078-1.jpg`,         // CS  - concept shoot
  `${D2}/103A2715.jpg`,           // D2  - wedding
  `${TC}/103A1308.jpg`,           // TC  - tenny couple
  `${WD}/103a3750.jpg`,           // WD  - wedding ritual
  `${P1}/103A8126.1.jpg`,         // P1  - pravin day1
  `${PW}/103a0149.jpg`,           // PW  - pre-wedding
  `${PO}/103A8784.jpg`,           // PO  - pravin outdoor
  "/assets/marquee-07.jpg",       // MQ  - root marquee
  `${EN}/2j3a7639.jpg`,           // EN  - engagement
];

// ─── MARQUEE / PHOTOWALL SECTION (10 photos) ─────────────────────────────────
export const marqueePhotos = [
  { src: `${P1}/103A7726.4.jpg`,  alt: "Couple romantic outdoor portrait" },
  { src: `${D2}/103A3018.jpg`,    alt: "Wedding ceremony sacred moment" },
  { src: `${KO}/SES_6346.jpg`,    alt: "Outdoor couple candid portrait" },
  { src: `${PO}/103A9010.jpg`,    alt: "Couple laughing outdoor session" },
  { src: `${TC}/103A0603.jpg`,    alt: "Tenny couple romantic moment" },
  { src: `${PW}/ses_6439.jpg`,    alt: "Pre-wedding outdoor shoot" },
  { src: `${WD}/103a3729.jpg`,    alt: "Traditional wedding ritual" },
  { src: `${EN}/103a9785.jpg`,    alt: "Engagement couple portrait" },
  { src: "/assets/marquee-05.jpg", alt: "Golden hour couple embrace" },
  { src: `${CS}/103a8246-0.jpg`,  alt: "Concept shoot outdoor portrait" },
];

// ─── ABOUT SECTION (1 photo) ──────────────────────────────────────────────────
export const aboutPhoto = `${D2}/103A3740.jpg`;

// ─── PORTFOLIO GRID (8 photos, mix of tall/std/wide) ─────────────────────────
export const portfolioPhotos = [
  { src: `${PO}/103A8870.jpg`,    alt: "Pravin couple outdoor portrait",    cls: "ew-grid-tall", w: 600, h: 800 },
  { src: `${D2}/103A2503.jpg`,    alt: "Wedding ceremony joyful moment",    cls: "ew-grid-std",  w: 600, h: 420 },
  { src: `${TC}/103A0699.jpg`,    alt: "Tenny couple engagement portrait",  cls: "ew-grid-std",  w: 600, h: 420 },
  { src: `${P1}/103A8173.1.jpg`,  alt: "Couple outdoor natural light",      cls: "ew-grid-tall", w: 600, h: 800 },
  { src: `${KO}/SES_6225.jpg`,    alt: "Kavin outdoor couple wide shot",    cls: "ew-grid-wide", w: 800, h: 420 },
  { src: `${WD}/103a3724.jpg`,    alt: "Wedding reception celebration",     cls: "ew-grid-std",  w: 600, h: 420 },
  { src: `${EN}/103a9779.jpg`,    alt: "Engagement romantic portrait",      cls: "ew-grid-std",  w: 600, h: 420 },
  { src: `${PW}/ses_6208.jpg`,    alt: "Pre-wedding outdoor wide shot",     cls: "ew-grid-wide", w: 800, h: 420 },
];

// ─── SERVICES SECTION — photo cluster (3 photos) ─────────────────────────────
export const servicesTallPhoto    = `${P1}/103A8255.1.jpg`;
export const servicesStack1Photo  = `${D2}/103A2669.jpg`;
export const servicesStack2Photo  = `${TC}/103A0941.jpg`;

// ─── CINEMATIC FILMS — poster thumbnails (3 photos) ──────────────────────────
export const filmPosters = [
  { poster: `${P1}/103A8495.1.jpg`,  title: "Pravin & Archana",    loc: "Traditional Hindu Wedding · Thoothukudi", time: "3:45" },
  { poster: `${TC}/103A1297.jpg`,    title: "Manisha & Tennyson",  loc: "Grand Church Ceremony · Tirunelveli",     time: "4:12" },
  { poster: `${KO}/SES_6362.jpg`,    title: "Vignesh & Sowmya",    loc: "Golden Hour Celebration · Madurai",       time: "3:20" },
];

// ─── PROCESS / STEPS (1 photo) ───────────────────────────────────────────────
export const processPhoto = `${P1}/103A8177.1.jpg`;

// ─── TESTIMONIALS (3 photos) ─────────────────────────────────────────────────
export const testimonialPhotos = [
  `${D2}/103A2692.jpg`,           // D2  - wedding
  `${PO}/103A8858.jpg`,           // PO  - pravin outdoor
  `${TC}/103A0735.jpg`,           // TC  - tenny couple
];

// ─── FAQ SECTION (1 photo) ───────────────────────────────────────────────────
export const faqPhoto = `${PO}/103A8882.jpg`;
