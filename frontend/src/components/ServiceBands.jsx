import { Link } from "react-router-dom";
import ResponsiveImage from "./ResponsiveImage";
import { HOMEPAGE_PHOTOS } from "../data/homepagePhotos";

export default function ServiceBands() {
  const bands = HOMEPAGE_PHOTOS.serviceBands;

  return (
    <section className="service-bands-sec alt" aria-label="Our Photography and Film Services">
      <div className="wrap">
        <div className="sh rv center" style={{ marginBottom: 48 }}>
          <span className="ta">எங்கள் சேவைகள்</span>
          <span className="kick">What We Offer</span>
          <h2>Crafted for Your Most Cherished Celebrations</h2>
          <p>
            One dedicated team for high-end wedding photography and cinematic films across Tamil Nadu.
          </p>
        </div>

        <div className="service-bands-list">
          {bands.map((band, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <article
                key={band.id}
                className={`service-band-row ${isReversed ? "band-reversed" : ""}`}
              >
                {/* Large Photo on One Side (~60% width) */}
                <div className="service-band-media">
                  <ResponsiveImage
                    src={band.photo.src}
                    alt={band.photo.alt}
                    width={band.photo.w}
                    height={band.photo.h}
                    sizes="(max-width: 900px) 100vw, 60vw"
                    aspectRatio="16/10"
                    loading="lazy"
                    className="service-band-img"
                  />
                  <div className="service-band-overlay" />
                </div>

                {/* Text and Bullet List on the Other Side (~40% width) */}
                <div className="service-band-text">
                  <span className="ta service-band-ta">{band.ta}</span>
                  <h3 className="service-band-title">{band.title}</h3>
                  <p className="service-band-desc">{band.desc}</p>

                  <ul className="ticks service-band-ticks">
                    {band.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="service-band-actions">
                    <Link className="btn wine sm" to={band.link}>
                      {band.linkText}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
