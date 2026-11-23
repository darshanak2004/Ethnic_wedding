import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/**
 * MobileVideoHero
 * Full-screen video hero for mobile (max-width: 768px).
 *
 * iOS Safari autoplay requirements:
 *   - <video> MUST have `muted`, `playsinline`, `webkit-playsinline`, `autoplay`, and `preload="auto"`
 *   - Both JSX attributes and DOM properties (video.muted = true, setAttribute('playsinline', ''))
 *   - Video format: H.264 + yuv420p + faststart MP4
 *   - Fallback: if play() is rejected (e.g. iOS Low Power Mode), poster remains visible
 *     and we retry playback on the first user interaction (touch/scroll).
 *   - IntersectionObserver: pause only when hero is completely off-screen, resume when visible.
 */
export default function MobileVideoHero({ onBookClick }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 1. Force real HTML attributes and properties for iPhone Safari autoplay
    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("autoplay", "");

    // 2. Play helper with fallback retry on first user interaction (touch/scroll)
    let retryAttached = false;
    const attachRetryListeners = () => {
      if (retryAttached) return;
      retryAttached = true;
      const retryPlay = () => {
        if (video) {
          video.play().catch(() => {});
        }
        window.removeEventListener("touchstart", retryPlay);
        window.removeEventListener("touchend", retryPlay);
        window.removeEventListener("scroll", retryPlay);
        window.removeEventListener("click", retryPlay);
      };
      window.addEventListener("touchstart", retryPlay, { once: true, passive: true });
      window.addEventListener("touchend", retryPlay, { once: true, passive: true });
      window.addEventListener("scroll", retryPlay, { once: true, passive: true });
      window.addEventListener("click", retryPlay, { once: true, passive: true });
    };

    const attemptPlay = () => {
      // Respect user data saver if explicitly requested
      if (typeof navigator !== "undefined" && navigator.connection?.saveData) {
        return;
      }
      const promise = video.play();
      if (promise !== undefined && typeof promise.catch === "function") {
        promise.catch(() => {
          // Autoplay blocked by iOS Low Power Mode or browser policy
          // Keep poster visible and retry on the first user interaction
          attachRetryListeners();
        });
      }
    };

    // Attempt autoplay immediately
    attemptPlay();

    // 3. IntersectionObserver: only pause when hero is completely off-screen
    const section = video.closest(".ew-mvh-section") || video;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          attemptPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0 } // fires as soon as any part is visible or fully off-screen
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

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
          poster="/hero-poster.jpg?v=3"
          aria-hidden="true"
        >
          {/* Outdoor reel video sources */}
          <source src="/assets/outdoor-reel.mp4?v=3" type="video/mp4" />
          <source src="/hero-mobile.mp4?v=3" type="video/mp4" />
          <source src="/assets/hero-mobile.mp4?v=3" type="video/mp4" />
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
