import { useState } from "react";
import { heroRow1, heroRow2 } from "../../data/homepagePhotos";

// Photos used for the mobile marquee row (all of heroRow1 for variety)
const mobileMarqueePhotos = heroRow1;

export default function HeroWallStrip() {
  const rows = [heroRow1, heroRow2];
  const [paused, setPaused] = useState(false);

  return (
    <>
      {/* Desktop Tilted Wall Strip (unchanged on desktop >= 768px) */}
      <div className="ew-hero-wall-wrap ew-desktop-hero-wall" aria-hidden="true">
        <div className="ew-photowall-stage">
          {rows.map((row, rowIdx) => {
            const isReverse = rowIdx % 2 === 1;
            return (
              <div
                key={rowIdx}
                className={`ew-photowall-row ${isReverse ? "ew-row-reverse" : "ew-row-normal"}`}
              >
                <div className="ew-photowall-track">
                  {row.map((src, i) => (
                    <div key={`hw-1-${rowIdx}-${i}`} className="ew-photowall-card">
                      <img src={src} alt="" loading={rowIdx === 0 && i < 4 ? "eager" : "lazy"}
                        width="240" height="240" className="ew-photowall-img" />
                    </div>
                  ))}
                  {row.map((src, i) => (
                    <div key={`hw-2-${rowIdx}-${i}`} className="ew-photowall-card" aria-hidden="true">
                      <img src={src} alt="" loading="lazy" width="240" height="240" className="ew-photowall-img" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: single horizontal auto-scrolling marquee row */}
      <div
        className="ew-mobile-hero-marquee"
        aria-hidden="true"
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div className={`ew-mobile-hero-marquee-track${paused ? " ew-mobile-marquee-paused" : ""}`}>
          {/* Original set */}
          {mobileMarqueePhotos.map((src, i) => (
            <div key={`mhm-a-${i}`} className="ew-mobile-hero-marquee-tile">
              <img src={src} alt="" loading={i < 3 ? "eager" : "lazy"} className="ew-mobile-hero-marquee-img" />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {mobileMarqueePhotos.map((src, i) => (
            <div key={`mhm-b-${i}`} className="ew-mobile-hero-marquee-tile" aria-hidden="true">
              <img src={src} alt="" loading="lazy" className="ew-mobile-hero-marquee-img" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
