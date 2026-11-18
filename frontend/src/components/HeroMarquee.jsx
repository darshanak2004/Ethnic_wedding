import { Link } from "react-router-dom";
import ResponsiveImage from "./ResponsiveImage";
import { HOMEPAGE_PHOTOS } from "../data/homepagePhotos";

export default function HeroMarquee() {
  const photos = HOMEPAGE_PHOTOS.hero;

  return (
    <section className="hero hero-single-strip-sec" id="hero" aria-label="Wedding Photography & Films">
      <div className="hero-single-strip-container">
        {/* Top: Editorial Typography directly on crisp maroon background */}
        <div className="hero-top-copy">
          <span className="hero-eyebrow ta">
            WEDDING PHOTOGRAPHY & FILMS · திருமண புகைப்படம் & திரைப்படம்
          </span>
          <h1 className="hero-main-heading">
            Every Moment Tells a <em>Beautiful Story</em>
          </h1>
          <p className="hero-main-subtext">
            Your wedding is a once-in-a-lifetime celebration. We capture every smile, emotion, ritual,
            and special moment through beautiful photography and cinematic wedding films.
          </p>
        </div>

        {/* Middle: ONE Horizontal Photo Strip Marquee (Full Width) */}
        <div className="hero-photo-strip-wrap" role="region" aria-label="Featured wedding photos carousel">
          <div className="hero-photo-strip-track">
            {/* First Set of 10 Unique Photos */}
            {photos.map((item, index) => (
              <div
                key={`hero-p1-${index}`}
                className={`hero-photo-card ${item.isLandscape ? "card-landscape" : "card-portrait"}`}
              >
                <ResponsiveImage
                  src={item.src}
                  alt={index < 5 ? item.alt : ""}
                  width={item.w}
                  height={item.h}
                  sizes="(max-width: 768px) 190px, 420px"
                  loading={index < 5 ? "eager" : "lazy"}
                  decoding={index < 5 ? "sync" : "async"}
                  className="hero-photo-img"
                  style={{ objectPosition: "50% 30%" }}
                />
              </div>
            ))}

            {/* Second Set (Exact clone for seamless loop) */}
            {photos.map((item, index) => (
              <div
                key={`hero-p2-${index}`}
                className={`hero-photo-card ${item.isLandscape ? "card-landscape" : "card-portrait"}`}
                aria-hidden="true"
              >
                <ResponsiveImage
                  src={item.src}
                  alt=""
                  width={item.w}
                  height={item.h}
                  sizes="(max-width: 768px) 190px, 420px"
                  loading="lazy"
                  decoding="async"
                  className="hero-photo-img"
                  style={{ objectPosition: "50% 30%" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Tagline, CTAs and Trust line directly on maroon background */}
        <div className="hero-bottom-copy">
          <p className="hero-tagline">Making Your Wedding Memories Last Forever.</p>
          <div className="hero-ctas-row">
            <a
              className="btn gold"
              href="#book"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book Your Date
            </a>
            <Link className="hero-link-work" to="/portfolio">
              View Our Work →
            </Link>
          </div>
          <div className="hero-trust-bar">
            <span>100+ Happy Couples</span>
            <span className="trust-sep">·</span>
            <span>Photo & Film</span>
            <span className="trust-sep">·</span>
            <span>All Tamil Nadu</span>
          </div>
        </div>
      </div>

      {/* Decorative Zari Accent at Hero Bottom */}
      <div className="zari" style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4 }} />
    </section>
  );
}
