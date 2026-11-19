import { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

/**
 * MobileVideoHero
 * Full-screen video hero for mobile (max-width: 768px).
 *
 * iOS Safari autoplay rules:
 *   - <video> MUST have `muted` and `playsinline` as actual HTML attributes.
 *   - React's JSX `muted` is unreliable — also set via ref: video.muted = true.
 *   - Call video.play() explicitly after mount and catch rejections.
 *
 * Performance:
 *   - Skips video when navigator.connection.saveData is true (Android only;
 *     iOS Safari doesn't expose this API, so it's safe).
 *   - Pauses when hero scrolls off-screen, resumes when back in view.
 *   - On autoplay rejection: retries once on first touch or scroll.
 */
export default function MobileVideoHero({ onBookClick }) {
  const videoRef = useRef(null);
  const retryRef = useRef(false); // tracks whether we've set up the retry listener

  // ── Save-data / slow-connection check ─────────────────────────────────────
  const shouldSkipVideo = useCallback(() => {
    try {
      if (typeof navigator !== "undefined" && navigator.saveData) return true;
      const conn =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      if (conn) {
        if (conn.saveData) return true;
        if (["slow-2g", "2g"].includes(conn.effectiveType)) return true;
      }
    } catch (_) {
      /* navigator.connection doesn't exist on iOS Safari — that's OK */
    }
    return false;
  }, []);

  // ── Try to play, with retry-on-touch fallback ─────────────────────────────
  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force attributes that iOS requires
    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("muted", "");

    const promise = video.play();
    if (promise && typeof promise.catch === "function") {
      promise.catch(() => {
        // Autoplay was blocked — set up a one-time retry on user interaction
        if (!retryRef.current) {
          retryRef.current = true;
          const retryPlay = () => {
            video.play().catch(() => {});
            window.removeEventListener("touchstart", retryPlay, true);
            window.removeEventListener("scroll", retryPlay, true);
            window.removeEventListener("click", retryPlay, true);
          };
          window.addEventListener("touchstart", retryPlay, { once: true, capture: true, passive: true });
          window.addEventListener("scroll", retryPlay, { once: true, capture: true, passive: true });
          window.addEventListener("click", retryPlay, { once: true, capture: true, passive: true });
        }
      });
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // If on a slow/data-saver connection, don't load video at all — poster stays
    if (shouldSkipVideo()) {
      video.removeAttribute("autoplay");
      video.querySelectorAll("source").forEach((s) => s.remove());
      video.load(); // triggers poster display only
      return;
    }

    // Force muted + playsinline via DOM (React JSX muted is flaky on iOS)
    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("muted", "");

    // Initial play attempt
    tryPlay();

    // IntersectionObserver: pause off-screen, resume on-screen
    const section = video.closest(".ew-mvh-section") || video;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, [shouldSkipVideo, tryPlay]);

  return (
    <section className="ew-mvh-section" aria-label="Ethnic Weddings — Video Hero">
      {/* ── Background video ───────────────────────────────────────────────── */}
      <div className="ew-mvh-media">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          className="ew-mvh-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
