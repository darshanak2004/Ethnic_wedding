import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/**
 * MobileVideoHero
 * Full-screen video hero for mobile (max-width: 768px).
 * - Respects saveData / slow connection — shows poster only.
 * - Pauses when hero scrolls off screen (IntersectionObserver).
 * - Autoplay failure safe: poster stays visible via the poster attribute.
 * - No audio (muted + no controls). playsinline required for iOS.
 */
export default function MobileVideoHero({ onBookClick, onFilmsClick }) {
  const videoRef = useRef(null);

  // ── Save-data / slow-connection check ─────────────────────────────────────
  const shouldSkipVideo = () => {
    try {
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (navigator.saveData) return true;
      if (conn) {
        if (conn.saveData) return true;
        if (["slow-2g", "2g"].includes(conn.effectiveType)) return true;
      }
    } catch (_) {}
    return false;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // If on a slow/data-saver connection, remove all sources so only poster shows
    if (shouldSkipVideo()) {
      video.querySelectorAll("source").forEach((s) => s.remove());
      video.load(); // triggers poster display
      return;
    }

    // Pause when hero is scrolled off-screen to save battery/CPU
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {}); // play — catch autoplay block silently
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(video.closest(".ew-mvh-section") || video);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="ew-mvh-section" aria-label="Ethnic Weddings — Video Hero">
      {/* ── Background video ───────────────────────────────────────────────── */}
      <div className="ew-mvh-media">
        <video
          ref={videoRef}
          className="ew-mvh-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/assets/hero-mobile.webm" type="video/webm" />
          <source src="/assets/hero-mobile.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay: transparent top → dark maroon bottom */}
        <div className="ew-mvh-overlay" aria-hidden="true" />
      </div>

      {/* ── Bottom-aligned content ─────────────────────────────────────────── */}
      <div className="ew-mvh-content">
        <span className="ew-mvh-eyebrow">Wedding Photography &amp; Films</span>

        <h1 className="ew-mvh-title">
          Every Moment Tells a{" "}
          <span className="ew-mvh-title-gold">Beautiful Story</span>
        </h1>

        <div className="ew-mvh-actions">
          <a
            href="#inquiry"
            onClick={onBookClick}
            className="ew-btn-gold ew-mvh-btn-book"
          >
            Book Your Date
          </a>
          <Link to="/portfolio" className="ew-mvh-link-films">
            Watch our films
          </Link>
        </div>
      </div>
    </section>
  );
}
