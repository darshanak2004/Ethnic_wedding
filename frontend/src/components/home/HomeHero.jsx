import { useState } from "react";
import { Link } from "react-router-dom";

const MARQUEE_PHOTOS = [
  { src: "/assets/marquee-01.jpg", alt: "Couple in tea garden" },
  { src: "/assets/marquee-02.jpg", alt: "Couple mirror reflection" },
  { src: "/assets/marquee-03.jpg", alt: "Romantic outdoor portrait" },
  { src: "/assets/marquee-04.jpg", alt: "Garland exchange ceremony" },
  { src: "/assets/marquee-05.jpg", alt: "Golden hour couple embrace" },
  { src: "/assets/marquee-06.jpg", alt: "Evening lights celebration" },
  { src: "/assets/marquee-07.jpg", alt: "Joyful traditional wedding" },
  { src: "/assets/marquee-08.jpg", alt: "Hill station wedding moment" },
  { src: "/assets/marquee-09.jpg", alt: "Grand indoor wedding reception" },
  { src: "/assets/marquee-10.jpg", alt: "Couple smiling at sunset" },
];

export default function HomeHero() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="h-hero" id="hero" aria-label="Wedding Photography & Films">
      {/* Background Wedding Photo with Wine Gradient Overlay */}
      <div className="h-hero-bg">
        <img
          src="/assets/hero-bg.jpg"
          alt="Ethnic Weddings Bride and Groom"
          className="h-hero-bg-img"
          loading="eager"
          decoding="sync"
          width="1920"
          height="1080"
        />
        <div className="h-hero-overlay" />
      </div>

      {/* Main Left-Aligned Vertically Centered Content */}
      <div className="h-hero-content-wrap">
        <div className="h-hero-copy">
          <span className="h-hero-eyebrow">
            WEDDING PHOTOGRAPHY & FILMS · திருமண புகைப்படம் & திரைப்படம்
          </span>
          <h1 className="h-hero-title">
            Every moment tells a <em>beautiful story</em>
          </h1>
          <p className="h-hero-subtext">
            Your wedding is a once-in-a-lifetime celebration. We capture every smile, emotion, ritual,
            and special moment through beautiful photography and cinematic wedding films.
          </p>
          <div className="h-hero-cta-group">
            <a
              href="#inquiry"
              className="h-btn-gold"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Check availability
            </a>
            <Link to="/portfolio" className="h-btn-outline">
              View portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal Auto-Scrolling Photo Strip (Marquee) along the bottom */}
      <div
        className="h-hero-marquee-wrap"
        role="region"
        aria-label="Recent wedding highlights"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={`h-hero-marquee-track ${paused ? "h-marquee-paused" : ""}`}>
          {/* Set 1 */}
          {MARQUEE_PHOTOS.map((item, idx) => (
            <div className="h-hero-marquee-card" key={`mq-1-${idx}`}>
              <img
                src={item.src}
                alt={idx < 4 ? item.alt : ""}
                loading={idx < 4 ? "eager" : "lazy"}
                width="150"
                height="220"
                className="h-hero-marquee-img"
              />
            </div>
          ))}
          {/* Set 2 for infinite seamless loop */}
          {MARQUEE_PHOTOS.map((item, idx) => (
            <div className="h-hero-marquee-card" key={`mq-2-${idx}`} aria-hidden="true">
              <img
                src={item.src}
                alt=""
                loading="lazy"
                width="150"
                height="220"
                className="h-hero-marquee-img"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
