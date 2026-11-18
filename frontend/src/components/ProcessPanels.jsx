import { useState } from "react";
import ResponsiveImage from "./ResponsiveImage";
import { HOMEPAGE_PHOTOS } from "../data/homepagePhotos";

export default function ProcessPanels() {
  const panels = HOMEPAGE_PHOTOS.processPanels;
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="process-panels-sec alt" aria-label="Our Wedding Photography Process">
      <div className="wrap">
        <div className="sh rv center" style={{ marginBottom: 36 }}>
          <span className="ta">எங்கள் செயல்முறை</span>
          <span className="kick">Simple & Seamless</span>
          <h2>From Your First Call to Memories Forever</h2>
          <p>
            We take care of every detail so you and your families can relax and immerse yourselves in the celebrations.
          </p>
        </div>

        {/* 4 Tall Full-Height Photo Panels Expanding on Hover */}
        <div className="process-panels-strip">
          {panels.map((p, idx) => {
            const isExpanded = activeIdx === idx;

            return (
              <div
                key={p.step}
                className={`process-panel ${isExpanded ? "panel-active" : ""}`}
                onMouseEnter={() => setActiveIdx(idx)}
                onFocus={() => setActiveIdx(idx)}
                tabIndex={0}
                role="region"
                aria-label={`Step ${p.step}: ${p.title}`}
              >
                <div className="process-panel-bg">
                  <ResponsiveImage
                    src={p.photo.src}
                    alt={p.photo.alt}
                    width={p.photo.w}
                    height={p.photo.h}
                    sizes="(max-width: 900px) 100vw, 30vw"
                    aspectRatio="9/16"
                    loading="lazy"
                    className="process-panel-img"
                  />
                  <div className="process-panel-gradient" />
                </div>

                <div className="process-panel-content">
                  <span className="process-step-num">{p.step}</span>
                  <span className="ta process-step-ta">{p.ta}</span>
                  <h3 className="process-step-title">{p.title}</h3>
                  <p className="process-step-desc">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
