import { useState, useRef } from "react";
import SplitSection from "./SplitSection";

const FILMS = [
  {
    id: 1,
    title: "Concept Reel",
    loc: "Traditional Ceremony & Reception Highlights",
    time: "3:45",
    video: "/assets/videos/pravin-archu-trending-reel.mp4",
  },
  {
    id: 2,
    title: "Wedding Film",
    loc: "Creative Outdoor Cinematic Reel",
    time: "2:58",
    video: "/assets/videos/manisha-reel-3.mp4",
  },
  {
    id: 3,
    title: "Pre Wedding Film",
    loc: "Romantic Scenic Couple Story",
    time: "3:20",
    video: "/assets/videos/tennyson-reel.mp4",
  },
];

export default function FilmFeature() {
  const [activeFilm, setActiveFilm] = useState(FILMS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 100);
  };

  const handleSelectFilm = (film) => {
    setActiveFilm(film);
    setIsPlaying(false);
  };

  const videoMedia = (
    <div className="ew-film-player-tile">
      {isPlaying ? (
        <video
          ref={videoRef}
          src={activeFilm.video}
          controls
          autoPlay
          className="ew-film-video"
        >
          Your browser does not support HTML5 video.
        </video>
      ) : (
        <div className="ew-film-poster-wrap" onClick={handlePlayClick} style={{ cursor: "pointer", position: "relative" }}>
          {/* Cover page photo rendered directly from the video itself at 2s */}
          <video
            key={activeFilm.video}
            src={`${activeFilm.video}#t=2`}
            preload="metadata"
            muted
            playsInline
            className="ew-film-poster-img"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
          />
          <div className="ew-film-scrim" />
          <button
            type="button"
            className="ew-film-play-btn"
            aria-label={`Play ${activeFilm.title}`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <div className="ew-film-badge">
            <span>{activeFilm.title}</span> · <span>{activeFilm.time}</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <SplitSection
      id="films"
      className="ew-films-sec"
      reverse={true} // Text & thumbs LEFT, video RIGHT
      media={videoMedia}
      ariaLabel="Cinematic Wedding Films"
    >
      <span className="ew-kicker ew-kicker-gold">CINEMATIC FILMS · <span className="ew-ta">திரைப்படப் பதிவுகள்</span></span>
      <h2 className="ew-sec-heading ew-heading-light">
        Capturing Every Emotion <em>In Motion</em>
      </h2>
      <p className="ew-sec-intro ew-intro-light">
        More than just video, we create timeless wedding cinema that lets you relive sacred
        vows, joyous laughter, and heartwarming moments for years to come.
      </p>

      {/* 3 Video Thumbnails with cover frames extracted directly from the video */}
      <div className="ew-films-thumb-list" role="tablist" aria-label="Featured wedding films">
        {FILMS.map((film) => {
          const isSelected = activeFilm.id === film.id;
          return (
            <button
              key={film.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => handleSelectFilm(film)}
              className={`ew-film-tab-btn ${isSelected ? "ew-film-tab-active" : ""}`}
            >
              <div className="ew-film-tab-thumb" style={{ position: "relative", overflow: "hidden" }}>
                <video
                  src={`${film.video}#t=1.5`}
                  preload="metadata"
                  muted
                  playsInline
                  className="ew-film-tab-img"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
                />
                <span className="ew-film-tab-duration">{film.time}</span>
              </div>
              <div className="ew-film-tab-info">
                <h3 className="ew-film-tab-title">{film.title}</h3>
                <span className="ew-film-tab-loc">{film.loc}</span>
              </div>
            </button>
          );
        })}
      </div>
    </SplitSection>
  );
}
