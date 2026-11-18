import { useEffect, useRef } from "react";
import ResponsiveImage from "./ResponsiveImage";
import { HOMEPAGE_PHOTOS } from "../data/homepagePhotos";

export default function PhotoBreak() {
  const { src, alt, tagline, subtext } = HOMEPAGE_PHOTOS.photoBreak;
  const breakRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let rafId = null;
    const handleScroll = () => {
      if (!breakRef.current) return;
      const rect = breakRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh && rect.bottom > 0) {
        // Slight parallax offset
        const offset = (rect.top / vh) * 40;
        breakRef.current.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={breakRef} className="photo-break-sec" aria-label="Photo Break">
      <div className="photo-break-bg">
        <ResponsiveImage
          src={src}
          alt={alt}
          sizes="100vw"
          loading="lazy"
          className="photo-break-img"
        />
        <div className="photo-break-scrim" />
      </div>

      <div className="photo-break-content wrap">
        <span className="ta photo-break-ta">{subtext}</span>
        <h2 className="photo-break-heading">{tagline}</h2>
        <div className="photo-break-divider" />
      </div>
    </section>
  );
}
