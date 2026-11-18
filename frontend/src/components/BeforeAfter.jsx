import { useState, useRef, useCallback } from "react";
import ResponsiveImage from "./ResponsiveImage";
import { HOMEPAGE_PHOTOS } from "../data/homepagePhotos";

export default function BeforeAfter() {
  const { title, ta, desc, beforeImg, afterImg, beforeLabel, afterLabel } = HOMEPAGE_PHOTOS.beforeAfter;
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    updatePosition(e.clientX || (e.touches && e.touches[0].clientX));
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX || (e.touches && e.touches[0].clientX));
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPos((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <section className="before-after-sec alt" aria-label="Before and After Photo Color Grading">
      <div className="wrap">
        <div className="sh rv center" style={{ marginBottom: 36 }}>
          <span className="ta">{ta}</span>
          <span className="kick">Color Craft</span>
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>

        <div
          ref={containerRef}
          className="ba-container"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          tabIndex={0}
          role="slider"
          aria-valuenow={Math.round(sliderPos)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Before and after color grading comparison slider"
          onKeyDown={handleKeyDown}
        >
          {/* AFTER Image (Full width background layer) */}
          <div className="ba-layer ba-after">
            <ResponsiveImage
              src={afterImg}
              alt="Ethnic Weddings color graded edited photograph"
              sizes="(max-width: 1024px) 100vw, 1160px"
              aspectRatio="16/10"
              loading="lazy"
              className="ba-img"
            />
            <span className="ba-tag tag-after">{afterLabel}</span>
          </div>

          {/* BEFORE Image (Clipped layer) */}
          <div
            className="ba-layer ba-before"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <ResponsiveImage
              src={beforeImg}
              alt="Original in-camera unedited photograph"
              sizes="(max-width: 1024px) 100vw, 1160px"
              aspectRatio="16/10"
              loading="lazy"
              className="ba-img"
            />
            <span className="ba-tag tag-before">{beforeLabel}</span>
          </div>

          {/* Draggable Divider Line & Handle */}
          <div className="ba-handle-line" style={{ left: `${sliderPos}%` }}>
            <div className="ba-handle-button">
              <span>‹</span>
              <span>›</span>
            </div>
          </div>
        </div>

        <p className="ba-hint">
          ↔ Drag the slider left or right or use keyboard arrow keys to compare post-processing artistry
        </p>
      </div>
    </section>
  );
}
