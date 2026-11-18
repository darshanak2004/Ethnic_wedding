import { Link } from "react-router-dom";

const PORTFOLIO_TILES = [
  {
    src: "/assets/portfolio/weddings/103a3750.jpg",
    alt: "South Indian Hindu wedding rituals",
    className: "h-grid-tall",
    w: 600,
    h: 800,
  },
  {
    src: "/assets/portfolio/pre-wedding/103a0149.jpg",
    alt: "Outdoor tea estate pre-wedding couple",
    className: "h-grid-standard",
    w: 600,
    h: 400,
  },
  {
    src: "/assets/portfolio/engagement/103a9782.jpg",
    alt: "Joyful engagement ring exchange",
    className: "h-grid-standard",
    w: 600,
    h: 400,
  },
  {
    src: "/assets/portfolio/concept-shoots/103a8904.jpg",
    alt: "Creative bride portrait with silk saree",
    className: "h-grid-tall",
    w: 600,
    h: 800,
  },
  {
    src: "/assets/portfolio/pre-wedding/ses_6102.jpg",
    alt: "Scenic mountain hills couple shoot",
    className: "h-grid-wide",
    w: 800,
    h: 400,
  },
  {
    src: "/assets/portfolio/weddings/103a3721.jpg",
    alt: "Grand wedding garland ceremony",
    className: "h-grid-standard",
    w: 600,
    h: 400,
  },
  {
    src: "/assets/portfolio/engagement/2j3a7639.jpg",
    alt: "Candlelight evening wedding celebration",
    className: "h-grid-tall",
    w: 600,
    h: 800,
  },
  {
    src: "/assets/portfolio/concept-shoots/103a8917.jpg",
    alt: "Maternity and baby shower celebration",
    className: "h-grid-standard",
    w: 600,
    h: 400,
  },
];

export default function PortfolioSection() {
  return (
    <section className="h-portfolio-sec" id="portfolio" aria-label="Selected Wedding Portfolio">
      <div className="h-container">
        <div className="h-section-header-compact">
          <span className="h-eyebrow">PORTFOLIO · எங்கள் படைப்புகள்</span>
          <h2 className="h-section-title">Selected Moments & Stories</h2>
        </div>

        {/* Full-width 4-column photo grid with mixed tall/wide tiles */}
        <div className="h-portfolio-grid">
          {PORTFOLIO_TILES.map((tile, idx) => (
            <div key={idx} className={`h-portfolio-item ${tile.className}`}>
              <img
                src={tile.src}
                alt={tile.alt}
                loading="lazy"
                width={tile.w}
                height={tile.h}
                className="h-portfolio-img"
              />
            </div>
          ))}
        </div>

        <div className="h-portfolio-cta-wrap">
          <Link to="/portfolio" className="h-btn-wine">
            Ask for the full portfolio →
          </Link>
        </div>
      </div>
    </section>
  );
}
