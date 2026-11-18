import { Link } from "react-router-dom";
import ResponsiveImage from "./ResponsiveImage";
import { HOMEPAGE_PHOTOS } from "../data/homepagePhotos";

export default function PhotoMosaic() {
  const photos = HOMEPAGE_PHOTOS.mosaic;

  return (
    <section className="mosaic-sec" aria-label="Wedding Photo Mosaic">
      <div className="wrap">
        <div className="mosaic-grid">
          {/* Top Left Photos */}
          <div className="mosaic-cell item-1">
            <ResponsiveImage
              src={photos[0].src}
              alt={photos[0].alt}
              width={photos[0].w}
              height={photos[0].h}
              sizes="(max-width: 768px) 50vw, 25vw"
              aspectRatio="4/5"
              className="mosaic-img"
            />
          </div>
          <div className="mosaic-cell item-2">
            <ResponsiveImage
              src={photos[1].src}
              alt={photos[1].alt}
              width={photos[1].w}
              height={photos[1].h}
              sizes="(max-width: 768px) 50vw, 25vw"
              aspectRatio="4/5"
              className="mosaic-img"
            />
          </div>
          <div className="mosaic-cell item-3">
            <ResponsiveImage
              src={photos[2].src}
              alt={photos[2].alt}
              width={photos[2].w}
              height={photos[2].h}
              sizes="(max-width: 768px) 50vw, 25vw"
              aspectRatio="4/5"
              className="mosaic-img"
            />
          </div>

          {/* Centered Story Text Card ("Every Picture Tells a Beautiful Story") */}
          <div className="mosaic-center-card">
            <span className="ta" style={{ color: "var(--gold)", fontSize: "0.85rem", display: "block", marginBottom: 6 }}>
              எங்கள் கதை
            </span>
            <span className="kick" style={{ color: "var(--wine)", fontSize: "0.8rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>
              Our Story
            </span>
            <h2>
              Every Picture Tells a <em>Beautiful Story</em>
            </h2>
            <p>
              At Ethnic Weddings, our journey began with a passion for capturing genuine wedding emotions and family traditions.
              Based in Thoothukudi, we specialize in candid photography, traditional portraits, and cinematic films
              for Hindu, Christian, and Muslim weddings across Tamil Nadu.
            </p>
            <div className="mosaic-card-foot">
              <Link className="btn wine sm" to="/about">
                Read our story →
              </Link>
            </div>
          </div>

          {/* Surrounding Remaining Photos */}
          <div className="mosaic-cell item-4">
            <ResponsiveImage
              src={photos[3].src}
              alt={photos[3].alt}
              width={photos[3].w}
              height={photos[3].h}
              sizes="(max-width: 768px) 50vw, 25vw"
              aspectRatio="4/5"
              className="mosaic-img"
            />
          </div>
          <div className="mosaic-cell item-5">
            <ResponsiveImage
              src={photos[4].src}
              alt={photos[4].alt}
              width={photos[4].w}
              height={photos[4].h}
              sizes="(max-width: 768px) 50vw, 25vw"
              aspectRatio="4/5"
              className="mosaic-img"
            />
          </div>
          <div className="mosaic-cell item-6">
            <ResponsiveImage
              src={photos[5].src}
              alt={photos[5].alt}
              width={photos[5].w}
              height={photos[5].h}
              sizes="(max-width: 768px) 50vw, 25vw"
              aspectRatio="4/5"
              className="mosaic-img"
            />
          </div>
          <div className="mosaic-cell item-7">
            <ResponsiveImage
              src={photos[6].src}
              alt={photos[6].alt}
              width={photos[6].w}
              height={photos[6].h}
              sizes="(max-width: 768px) 50vw, 25vw"
              aspectRatio="4/5"
              className="mosaic-img"
            />
          </div>
          <div className="mosaic-cell item-8">
            <ResponsiveImage
              src={photos[7].src}
              alt={photos[7].alt}
              width={photos[7].w}
              height={photos[7].h}
              sizes="(max-width: 768px) 50vw, 25vw"
              aspectRatio="4/5"
              className="mosaic-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
