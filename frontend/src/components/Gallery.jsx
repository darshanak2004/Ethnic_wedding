import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { cdn } from "../api";

const PORTFOLIO_REELS = [
  {
    title: "Wedding",
    category: "Weddings",
    url: "/assets/videos/tennyson-reel.mp4",
    poster: "/assets/portfolio/weddings/103a1456.jpg",
    desc: "Cinematic wedding celebration and sacred ceremony highlight reel.",
  },
  {
    title: "Wedding Film",
    category: "Wedding",
    slug: "pre-wedding",
    url: "/assets/videos/manisha-reel-3.mp4",
    poster: "/assets/portfolio/engagement/2j3a7568.jpg",
    desc: "Scenic outdoor couple romance film captured across natural light and coastal breeze.",
  },
  {
    title: "Outdoor",
    category: "Concept & Recreation Shoots",
    slug: "concept-shoots",
    url: "/assets/videos/pravin-archu-trending-reel.mp4",
    poster: "/assets/portfolio/concept-shoots/103a8325-1.jpg",
    desc: "Creative concept outdoor film with artistic motion grading and cinematic pacing.",
  },
  {
    title: "Engagement Film",
    category: "Engagement",
    slug: "engagement",
    url: "/assets/videos/engagement-reel-1.mp4",
    poster: "/assets/portfolio/engagement/103a9782.jpg",
    desc: "Heartwarming ring ceremony and joyful celebration highlights with family and friends.",
  },
];

export default function Gallery({ events = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const folderParam = searchParams.get("folder");

  // If a folder is selected via query param or state
  const activeEvent = events.find((e) => e.slug === folderParam);
  const [openPhotoIdx, setOpenPhotoIdx] = useState(null);
  const [activeReelIdx, setActiveReelIdx] = useState(0);

  const selectFolder = (slug) => {
    if (slug) {
      setSearchParams({ folder: slug });
    } else {
      setSearchParams({});
    }
    setOpenPhotoIdx(null);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const imgs = activeEvent?.images || [];
  const folderVideo = activeEvent?.videoUrl;

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (openPhotoIdx === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setOpenPhotoIdx(null);
      if (e.key === "ArrowRight") setOpenPhotoIdx((o) => (o + 1) % imgs.length);
      if (e.key === "ArrowLeft") setOpenPhotoIdx((o) => (o - 1 + imgs.length) % imgs.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openPhotoIdx, imgs.length]);

  return (
    <section id="gallery" className="sec">
      <div className="wrap">
        {/* If a folder is opened */}
        {activeEvent ? (
          <div className="folder-detail-view">
            <div className="folder-detail-header">
              <button className="btn line sm" onClick={() => selectFolder(null)} style={{ marginBottom: 16 }}>
                ← Back to all folders
              </button>
              <div className="folder-meta-head">
                <span className="tag">
                  📁 {activeEvent.images.length} Photographs {folderVideo ? "· 1 Video Reel" : ""}
                </span>
                <h2>{activeEvent.title}</h2>
                {activeEvent.description && <p className="lead-text">{activeEvent.description}</p>}
              </div>

              {/* Folder switcher tabs */}
              <div className="tabs" style={{ marginTop: 24 }}>
                {events.map((e) => (
                  <button
                    key={e.slug}
                    className={e.slug === activeEvent.slug ? "on" : ""}
                    onClick={() => selectFolder(e.slug)}
                  >
                    📁 {e.title} ({e.images.length}{e.videoUrl ? " + Video" : ""})
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Video inside this folder */}
            {folderVideo && (
              <div className="folder-featured-video-sec rv">
                <div className="sh">
                  <span className="kick">Featured Video Reel</span>
                  <h3>{activeEvent.videoTitle || `${activeEvent.title} Highlight Film`}</h3>
                  <p>{activeEvent.videoDesc || "Cinematic film highlights captured with artistry and care."}</p>
                </div>
                <div className="landscape-player-wrap" style={{ marginTop: 14 }}>
                  <video
                    key={folderVideo}
                    src={folderVideo}
                    controls
                    playsInline
                    preload="metadata"
                    poster={activeEvent.images[0]?.url || "/assets/portfolio/weddings/103a3710.jpg"}
                    className="landscape-reel-video"
                  />
                </div>
              </div>
            )}

            {/* Photos inside this folder */}
            <div className="folder-photos-sec">
              <div className="sh" style={{ marginBottom: 18 }}>
                <span className="kick">Photo Collection</span>
                <h3 style={{ fontSize: "1.6rem", color: "var(--wine)" }}>Curated Photographs ({imgs.length})</h3>
              </div>

              {imgs.length > 0 ? (
                <div className="masonry">
                  {imgs.map((im, k) => (
                    <button
                      key={im.id || im.url}
                      onClick={() => setOpenPhotoIdx(k)}
                      aria-label={`View ${im.alt || activeEvent.title}`}
                      className="gallery-photo-btn"
                    >
                      <img src={cdn(im.url, 900)} alt={im.alt || activeEvent.title} loading="lazy" />
                      <span className="photo-overlay">
                        <span className="view-pill">🔍 View Photo</span>
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="empty-folder">
                  <p>No photos added to this folder yet.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Folders overview view (cards) */
          <div className="folders-grid-view">
            <div className="sh center rv">
              <span className="kick">Portfolio Folders</span>
              <h2>Browse Our Work by <em>Category</em></h2>
              <p>Each folder contains curated memories from weddings, pre-wedding shoots, and celebrations across Tamil Nadu. Click any folder card to view photos and videos inside.</p>
            </div>

            <div className="grid g2 folder-cards-deck" style={{ marginTop: 36 }}>
              {events.map((e) => {
                const cover = e.images[0]?.url || "/assets/portfolio/weddings/103a3710.jpg";
                const hasVid = !!e.videoUrl;
                return (
                  <div
                    key={e.slug}
                    className="portfolio-folder-card rv"
                    onClick={() => selectFolder(e.slug)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(evt) => evt.key === "Enter" && selectFolder(e.slug)}
                  >
                    <div className="folder-card-thumb">
                      <img src={cdn(cover, 800)} alt={e.title} loading="lazy" />
                      <div className="folder-card-badge">
                        <span>📁 {e.images.length} Photos{hasVid ? " · 1 Video" : ""}</span>
                      </div>
                    </div>
                    <div className="folder-card-body">
                      <span className="folder-kicker">Album Folder</span>
                      <h3>{e.title}</h3>
                      <p>{e.description || "Curated photography collection."}</p>
                      <div className="folder-action">
                        <span className="open-lnk">Open Folder {hasVid ? "(Photos & Video)" : ""} →</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Video reel showcase in portfolio (Switch between the 4 Portfolio reels) */}
            <div className="portfolio-video-reel-sec rv" style={{ marginTop: 64 }}>
              <div className="sh center">
                <span className="kick">Cinematic Video Reels</span>
                <h2>Portfolio <em>Video Reels</em></h2>
                <p>Explore our cinematic wedding films, pre-wedding reels, and outdoor shoots in wide 16:9 landscape format.</p>
              </div>

              {/* Reel switcher tabs */}
              <div className="tabs center-tabs" style={{ marginTop: 24, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10 }}>
                {PORTFOLIO_REELS.map((reel, idx) => (
                  <button
                    key={reel.title}
                    className={idx === activeReelIdx ? "on" : ""}
                    onClick={() => setActiveReelIdx(idx)}
                    style={{ padding: "8px 18px", borderRadius: 24 }}
                  >
                    🎬 {reel.title} ({reel.category})
                  </button>
                ))}
              </div>

              <div className="landscape-video-card rv" style={{ marginTop: 24 }}>
                <div className="landscape-player-wrap">
                  <video
                    key={PORTFOLIO_REELS[activeReelIdx].url}
                    src={PORTFOLIO_REELS[activeReelIdx].url}
                    controls
                    playsInline
                    preload="metadata"
                    poster={PORTFOLIO_REELS[activeReelIdx].poster}
                    className="landscape-reel-video"
                  />
                </div>
                <div className="landscape-video-foot" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                  <div>
                    <h4 style={{ margin: "0 0 4px", fontSize: "1.1rem", color: "var(--wine)" }}>
                      {PORTFOLIO_REELS[activeReelIdx].title} · <span style={{ fontWeight: 400, color: "var(--charcoal-subtle)" }}>{PORTFOLIO_REELS[activeReelIdx].category}</span>
                    </h4>
                    <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--charcoal-subtle)" }}>{PORTFOLIO_REELS[activeReelIdx].desc}</p>
                  </div>
                  <div className="arow" style={{ margin: 0 }}>
                    <button className="btn line sm" onClick={() => selectFolder(PORTFOLIO_REELS[activeReelIdx].slug)}>
                      Open {PORTFOLIO_REELS[activeReelIdx].category} Folder →
                    </button>
                    <button className="btn wine sm" onClick={() => (window.location.href = "/contact")}>
                      Book Video Shoot
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox view */}
      {openPhotoIdx !== null && imgs[openPhotoIdx] && (
        <div className="lb" onClick={() => setOpenPhotoIdx(null)} role="dialog" aria-modal="true">
          <button className="x" aria-label="Close">✕</button>
          <button
            className="nv p"
            onClick={(e) => {
              e.stopPropagation();
              setOpenPhotoIdx((openPhotoIdx - 1 + imgs.length) % imgs.length);
            }}
            aria-label="Previous photo"
          >
            ←
          </button>
          <div className="lb-content" onClick={(e) => e.stopPropagation()}>
            <img src={cdn(imgs[openPhotoIdx].url, 2000)} alt={imgs[openPhotoIdx].alt || "Wedding photo"} />
            <div className="lb-caption">
              <span>{imgs[openPhotoIdx].alt || activeEvent.title}</span>
              <span className="lb-counter">{openPhotoIdx + 1} of {imgs.length}</span>
            </div>
          </div>
          <button
            className="nv n"
            onClick={(e) => {
              e.stopPropagation();
              setOpenPhotoIdx((openPhotoIdx + 1) % imgs.length);
            }}
            aria-label="Next photo"
          >
            →
          </button>
        </div>
      )}
    </section>
  );
}
