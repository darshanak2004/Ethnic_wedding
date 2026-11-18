import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ResponsiveImage from "./ResponsiveImage";
import { HOMEPAGE_PHOTOS } from "../data/homepagePhotos";

export default function HorizontalGallery() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const photos = HOMEPAGE_PHOTOS.gallery;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (prefersReducedMotion || isMobile) return;

    let rafId = null;
    const onScroll = () => {
      if (!containerRef.current || !trackRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = containerRef.current.offsetHeight - window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= window.innerHeight && totalScroll > 0) {
        const scrolled = -rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / totalScroll));
        const maxTranslate = trackRef.current.scrollWidth - window.innerWidth + 120;
        trackRef.current.style.transform = `translateX(-${(progress * maxTranslate).toFixed(1)}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={containerRef} className="hz-gallery-sec" aria-label="Horizontal Portfolio Gallery">
      <div className="hz-sticky-wrap">
        <div className="wrap hz-header-wrap">
          <div className="sh rv">
            <span className="ta">எங்கள் படைப்புகள்</span>
            <span className="kick">Visual Showcase</span>
            <h2>Moments Across Tamil Nadu</h2>
          </div>
          <Link className="btn line sm hz-view-all" to="/portfolio">
            Full Portfolio →
          </Link>
        </div>

        {/* Sideways Moving Track on Desktop, Swipeable on Mobile */}
        <div className="hz-scroll-viewport">
          <div ref={trackRef} className="hz-track">
            {photos.map((item, idx) => (
              <div key={idx} className="hz-card">
                <div className="hz-card-media">
                  <ResponsiveImage
                    src={item.src}
                    alt={`${item.title} - ${item.location}`}
                    sizes="(max-width: 768px) 80vw, 420px"
                    aspectRatio="3/4"
                    loading="lazy"
                    className="hz-card-img"
                  />
                  <div className="hz-card-scrim" />
                  <div className="hz-card-meta">
                    <span className="hz-card-loc">📍 {item.location}</span>
                    <h3 className="hz-card-title">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
