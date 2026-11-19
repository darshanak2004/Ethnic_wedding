import { heroRow1, heroRow2 } from "../../data/homepagePhotos";

export default function HeroWallStrip() {
  const rows = [heroRow1, heroRow2];
  const mobilePhotos = [heroRow1[0], heroRow1[1], heroRow2[0], heroRow2[1]];

  return (
    <>
      {/* Desktop Tilted Wall Strip (Untouched on desktop >= 768px) */}
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

      {/* Mobile Clean 2x2 Grid Collage (Zero tilt, no edge cropping, equal 4/5 tiles) */}
      <div className="ew-mobile-hero-grid" aria-hidden="true">
        {mobilePhotos.map((src, idx) => (
          <div key={`m-hero-${idx}`} className="ew-mobile-hero-tile">
            <img src={src} alt="" loading="eager" className="ew-mobile-hero-img" />
          </div>
        ))}
      </div>
    </>
  );
}
