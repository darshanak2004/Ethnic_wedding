/* Edit services and packages here. Both the home page and /services read from this file. */
export const PRIMARY = {
  name: "Wedding Photography",
  ta: "திருமண புகைப்படம்",
  text: "Capture every beautiful moment of your wedding, from the first ritual to the final farewell.",
};

export const SERVICES = [
  { name: "Cinematic Couple Outdoor Shoots", ta: "வெளிப்புற ஜோடி படப்பிடிப்பு", text: "Beautiful cinematic couple portraits at stunning outdoor locations across Tamil Nadu.", icon: "❀" },
  { name: "Concept Shoots & Recreation", ta: "கான்செப்ட் ஷூட்", text: "Turn your favorite memories and creative ideas into beautiful wedding photographs.", icon: "✺" },
  { name: "Candid Wedding Photography", ta: "இயல்பான தருணங்கள்", text: "Natural smiles, emotional moments, and genuine laughter captured as they happen.", icon: "✦" },
  { name: "Traditional Wedding Photography", ta: "பாரம்பரிய படங்கள்", text: "Timeless wedding portraits and family photographs that bring everyone together.", icon: "❖" },
  { name: "Wedding Videography & Cinematography", ta: "ஒளிப்பதிவு", text: "Relive your special day with professional video coverage, clear audio, and cinematic storytelling.", icon: "▶" },
  { name: "Pre-Wedding Photography", ta: "திருமணத்திற்கு முன்", text: "Celebrate your love story with beautiful pre-wedding photos at your favorite locations.", icon: "◈" },
  { name: "Engagement Photography", ta: "நிச்சயதார்த்தம்", text: "Capture every smile, ring exchange, and joyful moment of your engagement ceremony.", icon: "◇" },
  { name: "Wedding Films & Highlight Videos", ta: "திருமண திரைப்படம்", text: "Beautifully edited wedding films and highlight videos to relive and share your memories forever.", icon: "❋" },
];

/* Packages are bundles of the services above. Price is left as "On request" until you add one (e.g. price: "₹…"). */
export const PACKAGES = [
  { name: "Photography", ta: "புகைப்படம்", text: "Photographs of the wedding day.", price: "", items: ["Wedding Photography", "Candid Wedding Photography", "Traditional Wedding Photography"] },
  { name: "Photo & Film", ta: "புகைப்படம் & திரைப்படம்", text: "Photographs and film from one team.", price: "", featured: true, items: ["Wedding Photography", "Candid Wedding Photography", "Traditional Wedding Photography", "Wedding Videography & Cinematography", "Wedding Films & Highlight Videos"] },
  { name: "Pre-Wedding & Engagement", ta: "திருமணத்திற்கு முன்", text: "Shoots before the wedding.", price: "", items: ["Pre-Wedding Photography", "Cinematic Couple Outdoor Shoots", "Concept Shoots & Recreation", "Engagement Photography"] },
];
