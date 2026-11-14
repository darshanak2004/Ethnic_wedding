/* Edit services and packages here. Both the home page and /services read from this file. */
export const PRIMARY = {
  name: "Wedding Photography",
  ta: "திருமண புகைப்படம்",
  text: "Complete wedding photography capturing every ritual, emotion, and celebration.",
};

export const SERVICES = [
  { name: "Cinematic Couple Outdoor Shoots", ta: "வெளிப்புற ஜோடி படப்பிடிப்பு", text: "Beautiful couple portraits at stunning outdoor locations.", icon: "❀" },
  { name: "Concept & Recreation Shoots", ta: "கான்செப்ட் ஷூட்", text: "Creative themed photoshoots that bring your love story to life.", icon: "✺" },
  { name: "Candid Wedding Photography", ta: "இயல்பான தருணங்கள்", text: "Natural smiles, genuine emotions, and beautiful unposed moments.", icon: "✦" },
  { name: "Traditional Wedding Photography", ta: "பாரம்பரிய படங்கள்", text: "Beautiful family portraits and traditional wedding memories.", icon: "❖" },
  { name: "Wedding Videography", ta: "ஒளிப்பதிவு", text: "Professional wedding videos capturing every special moment.", icon: "▶" },
  { name: "Pre-Wedding Photography", ta: "திருமணத்திற்கு முன்", text: "Romantic couple photoshoots before your big day.", icon: "◈" },
  { name: "Engagement Photography", ta: "நிச்சயதார்த்தம்", text: "Capturing every joyful moment of your engagement celebration.", icon: "◇" },
  { name: "Wedding Films & Highlight Videos", ta: "திருமண திரைப்படம்", text: "Cinematic wedding highlights and full-length films to cherish forever.", icon: "❋" },
];

/* Packages are bundles of the services above. Price is left as "On request" until you add one (e.g. price: "₹…"). */
export const PACKAGES = [
  { name: "Photography", ta: "புகைப்படம்", text: "Photographs of the wedding day.", price: "", items: ["Wedding Photography", "Candid Wedding Photography", "Traditional Wedding Photography"] },
  { name: "Photo & Film", ta: "புகைப்படம் & திரைப்படம்", text: "Photographs and film from one team.", price: "", featured: true, items: ["Wedding Photography", "Candid Wedding Photography", "Traditional Wedding Photography", "Wedding Videography", "Wedding Films & Highlight Videos"] },
  { name: "Pre-Wedding & Engagement", ta: "திருமணத்திற்கு முன்", text: "Shoots before the wedding.", price: "", items: ["Pre-Wedding Photography", "Cinematic Couple Outdoor Shoots", "Concept & Recreation Shoots", "Engagement Photography"] },
];
