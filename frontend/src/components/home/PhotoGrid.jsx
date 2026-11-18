import { Link } from "react-router-dom";
import { portfolioPhotos } from "../../data/homepagePhotos";

export default function PhotoGrid() {
  return (
    <section className="ew-portfolio-sec" id="portfolio" aria-label="Our Portfolio">
      <div className="ew-container">
        <div className="ew-sec-header-compact" style={{ textAlign: "center", marginBottom: "36px" }}>
          <span className="ew-kicker">OUR PORTFOLIO · <span className="ew-ta">எங்கள் படைப்புகள்</span></span>
          <h2 className="ew-sec-heading" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", margin: "8px 0" }}>
            Every Picture Tells a <em>Beautiful Story</em>
          </h2>
          <p className="ew-sec-sub" style={{ color: "var(--mute)", fontSize: "1.05rem", margin: "6px 0 0" }}>
            Real Moments. Beautiful Stories. Timeless Memories.
          </p>
        </div>

        <div className="ew-photo-grid">
          {portfolioPhotos.map((item, idx) => (
            <div key={idx} className={`ew-photo-tile ${item.cls}`}>
              <img src={item.src} alt={item.alt} loading="lazy"
                width={item.w} height={item.h} className="ew-tile-img" />
            </div>
          ))}
        </div>

        <div className="ew-portfolio-action">
          <Link to="/portfolio" className="ew-btn-outline-dark">
            Ask for the full portfolio →
          </Link>
        </div>
      </div>
    </section>
  );
}
