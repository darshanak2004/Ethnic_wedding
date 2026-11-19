/**
 * MobileServiceStrip
 * A slim scrolling text band shown ONLY on mobile (display:none on desktop).
 * Placed directly below the video hero.
 * Text: service keywords looping seamlessly.
 */
const ITEMS = [
  "Hindu Weddings",
  "✦",
  "Christian Weddings",
  "✦",
  "Muslim Weddings",
  "✦",
  "Pre-Wedding",
  "✦",
  "Candid Photography",
  "✦",
  "Cinematic Films",
  "✦",
];

export default function MobileServiceStrip() {
  return (
    <div className="ew-svc-strip" aria-hidden="true">
      <div className="ew-svc-strip-track">
        {/* Original set */}
        {ITEMS.map((item, i) => (
          <span key={`ss-a-${i}`} className="ew-svc-strip-item">{item}</span>
        ))}
        {/* Duplicate for seamless loop */}
        {ITEMS.map((item, i) => (
          <span key={`ss-b-${i}`} className="ew-svc-strip-item" aria-hidden="true">{item}</span>
        ))}
      </div>
    </div>
  );
}
