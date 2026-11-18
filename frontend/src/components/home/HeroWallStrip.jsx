import { heroRow1, heroRow2 } from "../../data/homepagePhotos";

export default function HeroWallStrip() {
  const rows = [heroRow1, heroRow2];

  return (
    <div className="ew-hero-wall-wrap" aria-hidden="true">
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
  );
}
