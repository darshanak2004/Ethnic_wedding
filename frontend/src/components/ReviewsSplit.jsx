import { useState, useEffect, useRef, useCallback } from "react";
import ResponsiveImage from "./ResponsiveImage";
import { HOMEPAGE_PHOTOS } from "../data/homepagePhotos";

export default function ReviewsSplit() {
  const reviews = HOMEPAGE_PHOTOS.reviews;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const nextReview = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prevReview = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  // 6-second auto-rotation with hover pause
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(nextReview, 6000);
    return () => clearInterval(timerRef.current);
  }, [isPaused, nextReview]);

  // Keyboard arrow keys
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") prevReview();
    if (e.key === "ArrowRight") nextReview();
  };

  const active = reviews[currentIdx];

  return (
    <section
      className="reviews-split-sec"
      aria-label="Client Reviews and Testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="wrap">
        <div className="sh rv center" style={{ marginBottom: 36 }}>
          <span className="ta">மணமக்களின் வாழ்த்துக்கள்</span>
          <span className="kick">Words of Love</span>
          <h2>Stories From Our Couples</h2>
        </div>

        <div className="reviews-split-container">
          {/* Half 1: Large Couple Photo */}
          <div className="reviews-split-photo-wrap">
            <ResponsiveImage
              src={active.photo.src}
              alt={active.photo.alt}
              width={active.photo.w}
              height={active.photo.h}
              sizes="(max-width: 900px) 100vw, 50vw"
              aspectRatio="4/5"
              loading="lazy"
              className="reviews-split-img"
              key={active.photo.src}
            />
            <div className="reviews-split-badge">
              <span>📍 {active.location}</span>
              <span>· {active.celebration}</span>
            </div>
          </div>

          {/* Half 2: Big Serif Quote and Couple Details */}
          <div className="reviews-split-text-wrap" key={currentIdx}>
            <span className="reviews-quote-mark">“</span>
            <blockquote className="reviews-quote-body">
              {active.quote}
            </blockquote>

            <div className="reviews-author-meta">
              <h3 className="reviews-couple-names">{active.names}</h3>
              <p className="reviews-couple-loc">{active.location}, Tamil Nadu</p>
            </div>

            {/* Navigation Controls: Dots + Arrows */}
            <div className="reviews-controls">
              <div className="reviews-dots" role="tablist" aria-label="Review selection">
                {reviews.map((r, i) => (
                  <button
                    key={r.names}
                    type="button"
                    role="tab"
                    aria-selected={i === currentIdx}
                    className={`reviews-dot ${i === currentIdx ? "dot-active" : ""}`}
                    onClick={() => setCurrentIdx(i)}
                    aria-label={`Go to review by ${r.names}`}
                  />
                ))}
              </div>

              <div className="reviews-arrows">
                <button
                  type="button"
                  className="reviews-arrow-btn"
                  onClick={prevReview}
                  aria-label="Previous review"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="reviews-arrow-btn"
                  onClick={nextReview}
                  aria-label="Next review"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
