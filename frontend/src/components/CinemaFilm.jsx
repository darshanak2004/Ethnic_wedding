import { useState, useEffect, useRef, useCallback } from "react";
import ResponsiveImage from "./ResponsiveImage";

export default function CinemaFilm({
  poster = "/assets/portfolio/concept-shoots/103a8325-1.jpg",
  title = "Pravin & Archana",
  subtitle = "A Cinematic Wedding Film · Thoothukudi",
  ta = "வெளிப்புற திரைப்படப் பதிவுகள்",
  tagline = "Emotion, light, and movement captured in timeless cinematic motion across scenic Tamil Nadu.",
  videoSrc = "/assets/outdoor-reel.mp4",
  embedUrl = "",
  duration = "4K UHD · 03:45",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTitleCard, setShowTitleCard] = useState(false);
  const videoRef = useRef(null);

  const openCinema = () => {
    setIsOpen(true);
    setShowTitleCard(true);
    document.body.style.overflow = "hidden";
  };

  const closeCinema = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsOpen(false);
    setShowTitleCard(false);
    document.body.style.overflow = "";
  }, []);

  // Title card 2s fade out
  useEffect(() => {
    if (isOpen && showTitleCard) {
      const timer = setTimeout(() => {
        setShowTitleCard(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showTitleCard]);

  // Esc key listener to close cinema mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeCinema();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, closeCinema]);

  // Autoplay self-hosted video once opened
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: user can click unmuted controls
      });
    }
  }, [isOpen]);

  return (
    <section className="sec cinema-sec" aria-label="Cinematic Wedding Film">
      <div className="wrap">
        <div className="sh rv center">
          {ta && <span className="ta">{ta}</span>}
          <h2>Cinematic Couple Films & Outdoor Reels</h2>
          <p>{tagline}</p>
        </div>

        {/* Large Poster Facade on Page */}
        <div className="cinema-poster-wrap rv">
          <div className="cinema-poster-inner" onClick={openCinema} role="button" tabIndex={0} aria-label={`Play film: ${title}`}>
            <ResponsiveImage
              src={poster}
              alt={`${title} - Cinematic Wedding Film Poster`}
              sizes="(max-width: 1024px) 100vw, 1160px"
              aspectRatio="16/9"
              className="cinema-poster-img"
            />
            <div className="cinema-poster-scrim" />

            {/* Badges */}
            <div className="cinema-poster-top">
              <span className="cinema-badge">🎞️ {duration}</span>
              <span className="cinema-badge-film">Ethnic Weddings Cinema</span>
            </div>

            {/* Centered Glowing Play Button */}
            <div className="cinema-play-btn-wrap">
              <div className="cinema-play-btn">
                <span className="cinema-play-icon">▶</span>
              </div>
              <span className="cinema-play-label">Play the film</span>
            </div>

            {/* Bottom Film Details */}
            <div className="cinema-poster-bottom">
              <h3 className="cinema-film-title">{title}</h3>
              <p className="cinema-film-subtitle">{subtitle}</p>
            </div>
          </div>

          <div className="cinema-foot">
            <p>Outdoor Reel & Cinematic Films · Available across Thoothukudi & all Tamil Nadu</p>
            <div className="arow" style={{ margin: 0 }}>
              <a className="btn wine sm" href="#book">Book Your Shoot</a>
              <button type="button" className="btn line sm" onClick={openCinema}>
                ▶ Watch Full Film
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Letterboxed Cinema Mode Modal */}
      {isOpen && (
        <div
          className="cinema-modal-backdrop"
          onClick={closeCinema}
          role="dialog"
          aria-modal="true"
          aria-label={`Cinema mode: ${title}`}
        >
          {/* Close Button top-right */}
          <button
            type="button"
            className="cinema-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              closeCinema();
            }}
            aria-label="Close cinema mode"
          >
            <span>✕</span> Close <small>[Esc]</small>
          </button>

          {/* Letterboxed Video Container */}
          <div className="cinema-letterbox" onClick={(e) => e.stopPropagation()}>
            {/* Title Card Overlay (fades out after 2s) */}
            {showTitleCard && (
              <div className="cinema-title-card">
                <span className="ta cinema-title-ta">ஒரு அழகான திருமணக் காவியம்</span>
                <h1 className="cinema-title-heading">{title}</h1>
                <p className="cinema-title-sub">{subtitle}</p>
                <div className="cinema-title-bar" />
              </div>
            )}

            {/* Lazy Video Player (iframe or self-hosted video) */}
            {embedUrl ? (
              <iframe
                src={`${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1`}
                title={title}
                className="cinema-player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                ref={videoRef}
                src={videoSrc}
                poster={poster}
                controls
                autoPlay
                playsInline
                className="cinema-player"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
