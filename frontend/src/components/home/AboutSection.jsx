import { Link } from "react-router-dom";
import SplitSection from "./SplitSection";
import { aboutPhoto } from "../../data/homepagePhotos";

export default function AboutSection() {
  const ticks = [
    "Beautifully captured wedding traditions and emotions.",
    "Photography and cinematic films by one team.",
    "Available across Tamil Nadu.",
  ];

  const archedMedia = (
    <div className="ew-arched-photo-frame">
      <img
        src={aboutPhoto}
        alt="Wedding Photography in Thoothukudi, Tamil Nadu"
        loading="lazy"
        width="480"
        height="640"
        className="ew-arched-img"
      />
    </div>
  );

  return (
    <SplitSection
      id="about"
      className="ew-about-sec"
      reverse={false} // Photo left, text right
      media={archedMedia}
      ariaLabel="About Us"
    >
      <span className="ew-kicker">ABOUT US · <span className="ew-ta">எங்களைப் பற்றி</span></span>
      <h2 className="ew-sec-heading">
        Every Wedding Has a Story. <em>We Capture It Beautifully.</em>
      </h2>
      <div className="ew-sec-body">
        <p>
          At Ethnic Weddings, we capture your special moments through candid photography, traditional portraits, and cinematic wedding films.
        </p>
        <p>
          We specialize in Hindu, Christian, and Muslim weddings across Thoothukudi and Tamil Nadu.
        </p>
      </div>

      <ul className="ew-ticks-list">
        {ticks.map((tick, idx) => (
          <li key={idx} className="ew-tick-item">
            <span className="ew-tick-bullet" aria-hidden="true">✦</span>
            <span>{tick}</span>
          </li>
        ))}
      </ul>

      <p className="ew-about-sublocation" style={{ fontStyle: "italic", color: "var(--mute)", marginTop: "12px", fontSize: "0.95rem" }}>
        Wedding Photography in Thoothukudi, Tamil Nadu · <span className="ew-ta" style={{ fontSize: "1.08rem", fontWeight: 600 }}>தூத்துக்குடி மற்றும் தமிழகம் முழுவதும்</span>
      </p>

      <div className="ew-btn-group" style={{ marginTop: "24px" }}>
        <Link to="/about" className="ew-btn-wine">
          Learn More About Us →
        </Link>
        <a
          href="#inquiry"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="ew-btn-outline-dark"
        >
          Book Your Date
        </a>
      </div>
    </SplitSection>
  );
}
