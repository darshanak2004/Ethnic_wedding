import { useState, useRef, useEffect, useCallback } from "react";
import ResponsiveImage from "./ResponsiveImage";
import { HOMEPAGE_PHOTOS } from "../data/homepagePhotos";

export default function WeddingFilms() {
  const films = HOMEPAGE_PHOTOS.filmPosters;
  const [activeFilm, setActiveFilm] = useState(null);
  const [showTitleCard, setShowTitleCard] = useState(false);
  const videoRef = useRef(null);

  const openCinema = (film) => {
    setActiveFilm(film);
    setShowTitleCard(true);
    document.body.style.overflow = "hidden";
  };

  const closeCinema = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveFilm(null);
    setShowTitleCard(false);
    document.body.style.overflow = "";
  }, []);

  // Esc key closes cinema
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && activeFilm) {
        closeCinema();
      }
    };
    if (activeFilm) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [activeFilm, closeCinema]);

  // Title card 2s fade out
  useEffect(() => {
    if (activeFilm && showTitleCard) {
      const timer = setTimeout(() => setShowTitleCard(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [activeFilm, showTitleCard]);

  const featured = films[0];
  const secondary = films.slice(1);

  return (
    <section className="films-sec" aria-label="Cinematic Wedding Films">
      <div className="wrap">
        <div className="sh rv center" style={{ marginBottom: 40 }}>
          <span className="ta">திரைப்படப் பதிவுகள்</span>
          <span className="kick">Wedding Films</span>
          <h2>Motion, Music & Unforgettable Emotions</h2>
          <p>
            Experience your special celebrations in breathtaking 4K cinematic storytelling.
          </p>
        </div>

        {/* 1 Large Featured Video + 2 Smaller Previews */}
        <div className="films-layout">
          {/* Main Featured Video */}
          <div className="film-featured-card" onClick={() => openCinema(featured)}>
            <div className="film-poster-box">
              <ResponsiveImage
                src={featured.poster}
                alt={featured.alt}
                sizes="(max-width: 900px) 100vw, 65vw"
                aspectRatio="16/9"
                loading="lazy"
                className="film-poster-img"
              />
              <div className="film-poster-scrim" />

              <div className="film-badge-row">
                <span className="film-badge">⭐ FEATURED FILM</span>
                <span className="film-duration">{featured.duration}</span>
              </div>

              <div className="film-play-center">
                <div className="film-play-circle">
                  <span className="film-play-arrow">▶</span>
                </div>
                <span className="film-play-text">Play the film</span>
              </div>

              <div className="film-info-bottom">
                <span className="ta film-ta">{featured.ta}</span>
                <h3 className="film-title">{featured.title}</h3>
                <p className="film-sub">{featured.subtitle}</p>
              </div>
            </div>
          </div>

          {/* 2 Smaller Side Previews */}
          <div className="film-side-list">
            {secondary.map((film) => (
              <div
                key={film.id}
                className="film-side-card"
                onClick={() => openCinema(film)}
              >
                <div className="film-side-media">
                  <ResponsiveImage
                    src={film.poster}
                    alt={film.alt}
                    sizes="(max-width: 900px) 100vw, 35vw"
                    aspectRatio="16/10"
                    loading="lazy"
                    className="film-side-img"
                  />
                  <div className="film-side-scrim" />
                  <div className="film-side-play-btn">▶</div>
                  <span className="film-side-dur">{film.duration}</span>
                </div>
                <div className="film-side-meta">
                  <span className="ta film-side-ta">{film.ta}</span>
                  <h4 className="film-side-title">{film.title}</h4>
                  <p className="film-side-sub">{film.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Letterboxed Cinema Modal */}
      {activeFilm && (
        <div
          className="cinema-modal-backdrop"
          onClick={closeCinema}
          role="dialog"
          aria-modal="true"
          aria-label={`Cinema mode: ${activeFilm.title}`}
        >
          <button
            type="button"
            className="cinema-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              closeCinema();
            }}
          >
            <span>✕</span> Close <small>[Esc]</small>
          </button>

          <div className="cinema-letterbox" onClick={(e) => e.stopPropagation()}>
            {showTitleCard && (
              <div className="cinema-title-card">
                <span className="ta cinema-title-ta">{activeFilm.ta}</span>
                <h1 className="cinema-title-heading">{activeFilm.title}</h1>
                <p className="cinema-title-sub">{activeFilm.subtitle}</p>
                <div className="cinema-title-bar" />
              </div>
            )}

            <video
              ref={videoRef}
              src={activeFilm.videoSrc}
              poster={activeFilm.poster}
              controls
              autoPlay
              playsInline
              className="cinema-player"
            />
          </div>
        </div>
      )}
    </section>
  );
}
