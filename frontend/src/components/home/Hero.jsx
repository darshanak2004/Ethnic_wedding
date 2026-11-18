import { Link } from "react-router-dom";
import HeroWallStrip from "./HeroWallStrip";

export default function Hero() {
  const handleCheckClick = (e) => {
    e.preventDefault();
    const el = document.getElementById("inquiry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="ew-hero-section" id="hero" aria-label="Hero Section">
      {/* Background landscape wedding photo with vertical wine gradient overlay */}
      <div className="ew-hero-bg-wrap">
        <img
          src="/assets/hero-bg.jpg"
          alt="Ethnic Weddings couple portrait in traditional attire"
          className="ew-hero-bg-img"
          loading="eager"
          decoding="sync"
          width="1920"
          height="1080"
        />
        <div className="ew-hero-gradient-overlay" />
      </div>

      {/* Hero Inner Centred Content */}
      <div className="ew-hero-inner">
        {/* Top: Centred Heading */}
        <div className="ew-hero-top" style={{ marginBottom: "20px" }}>
          <span className="ew-hero-eyebrow">
            WEDDING PHOTOGRAPHY &amp; FILMS · <span className="ew-ta-eyebrow" style={{ fontSize: "1.02rem", fontWeight: 600, letterSpacing: "0.06em" }}>திருமண புகைப்படம் &amp; திரைப்படம்</span>
          </span>
          <h1 className="ew-hero-title" style={{ margin: "10px auto 0" }}>
            Every Moment Tells a
            <span className="ew-hero-gold-line">Beautiful Story</span>
          </h1>
        </div>

        {/* Middle: Tilted photo wall strip */}
        <HeroWallStrip />

        {/* Bottom: Two centred CTA buttons */}
        <div className="ew-hero-cta-group">
          <a href="#inquiry" onClick={handleCheckClick} className="ew-btn-gold">
            Book Your Date
          </a>
          <Link to="/contact" className="ew-btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
