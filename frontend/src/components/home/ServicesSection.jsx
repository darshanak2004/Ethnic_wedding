import { Link } from "react-router-dom";
import SplitSection from "./SplitSection";
import { servicesTallPhoto, servicesStack1Photo, servicesStack2Photo } from "../../data/homepagePhotos";

const SERVICES = [
  {
    num: "01",
    title: "Wedding Photography",
    ta: "திருமண புகைப்படம்",
    desc: "Capture every wedding ritual, emotion, and celebration.",
  },
  {
    num: "02",
    title: "Couple Outdoor Shoots",
    ta: "வெளிப்புற ஜோடி படப்பிடிப்பு",
    desc: "Beautiful couple portraits at stunning locations.",
  },
  {
    num: "03",
    title: "Concept & Recreation Shoots",
    ta: "கான்செப்ட் படப்பிடிப்பு",
    desc: "Creative photoshoots inspired by your love story.",
  },
  {
    num: "04",
    title: "Candid Wedding Photography",
    ta: "இயல்பான தருணங்கள்",
    desc: "Natural smiles and genuine emotions captured beautifully.",
  },
  {
    num: "05",
    title: "Traditional Wedding Photography",
    ta: "பாரம்பரிய புகைப்படம்",
    desc: "Cherish family portraits and traditional moments.",
  },
  {
    num: "06",
    title: "Wedding Videography",
    ta: "திருமண வீடியோகிராபி",
    desc: "Professional videos capturing your special day.",
  },
  {
    num: "07",
    title: "Pre-Wedding Photography",
    ta: "திருமணத்திற்கு முந்தைய படப்பிடிப்பு",
    desc: "Romantic photoshoots before your wedding.",
  },
  {
    num: "08",
    title: "Engagement Photography",
    ta: "நிச்சயதார்த்தம்",
    desc: "Capture every joyful engagement moment.",
  },
  {
    num: "09",
    title: "Wedding Films & Highlights",
    ta: "திரைப்படப் பதிவுகள்",
    desc: "Cinematic highlights and full-length wedding films.",
  },
];

export default function ServicesSection() {
  const clusterMedia = (
    <div className="ew-photo-cluster" aria-hidden="true">
      <div className="ew-cluster-tall">
        <img src={servicesTallPhoto} alt="Wedding celebration moments"
          loading="lazy" width="440" height="640" className="ew-cluster-img" />
      </div>
      <div className="ew-cluster-stacked">
        <div className="ew-cluster-box">
          <img src={servicesStack1Photo} alt="Engagement ring exchange"
            loading="lazy" width="380" height="310" className="ew-cluster-img" />
        </div>
        <div className="ew-cluster-box">
          <img src={servicesStack2Photo} alt="Concept shoot outdoor portraits"
            loading="lazy" width="380" height="310" className="ew-cluster-img" />
        </div>
      </div>
    </div>
  );

  return (
    <SplitSection
      id="services"
      className="ew-services-sec"
      reverse={false} // Cluster left, list right
      media={clusterMedia}
      ariaLabel="What We Do - Our Services"
    >
      <span className="ew-kicker">WHAT WE DO · <span className="ew-ta">எங்கள் சேவைகள்</span></span>
      <h2 className="ew-sec-heading">
        Beautiful Moments, <em>Captured Forever</em>
      </h2>
      <p className="ew-sec-intro">
        We capture your special moments through beautiful photography and cinematic wedding films across Tamil Nadu.
      </p>

      <div className="ew-services-stack" style={{ maxHeight: "560px", overflowY: "auto", paddingRight: "10px" }}>
        {SERVICES.map((s, idx) => (
          <div key={idx} className="ew-service-row">
            <span className="ew-service-gold-num">{s.num}</span>
            <div className="ew-service-details">
              <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
                <h3 className="ew-service-heading" style={{ fontSize: "1.08rem", fontWeight: 600, color: "var(--ink)", margin: 0 }}>
                  {s.title}
                </h3>
                <span className="ew-ta" style={{ fontSize: "1.02rem", color: "var(--gold)", fontWeight: 600 }}>
                  {s.ta}
                </span>
              </div>
              <p className="ew-service-text" style={{ fontSize: "0.92rem", margin: "2px 0 0", color: "var(--mute)" }}>
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="ew-btn-group" style={{ marginTop: "24px" }}>
        <Link to="/services" className="ew-btn-wine">
          View all services & packages →
        </Link>
      </div>
    </SplitSection>
  );
}
