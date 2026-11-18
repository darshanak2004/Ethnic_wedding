import { useState } from "react";
import { marqueePhotos } from "../../data/homepagePhotos";

export default function Marquee() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="ew-marquee-container"
      role="region"
      aria-label="Recent wedding portraits"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={`ew-marquee-track ${paused ? "ew-marquee-paused" : ""}`}>
        {marqueePhotos.map((photo, i) => (
          <div key={`m1-${i}`} className="ew-marquee-item">
            <img src={photo.src} alt={i < 4 ? photo.alt : ""}
              loading={i < 4 ? "eager" : "lazy"} width="260" height="260" className="ew-marquee-img" />
          </div>
        ))}
        {marqueePhotos.map((photo, i) => (
          <div key={`m2-${i}`} className="ew-marquee-item" aria-hidden="true">
            <img src={photo.src} alt="" loading="lazy" width="260" height="260" className="ew-marquee-img" />
          </div>
        ))}
      </div>
    </div>
  );
}
