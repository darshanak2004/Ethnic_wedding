import SplitSection from "./SplitSection";
import { faqPhoto } from "../../data/homepagePhotos";

const FAQS = [
  {
    q: "Where do you provide services?",
    a: "We are based in Thoothukudi and cover weddings across Tamil Nadu.",
  },
  {
    q: "What photography services do you offer?",
    a: "We offer candid, traditional, pre-wedding, engagement, and couple photography.",
  },
  {
    q: "Do you cover all wedding traditions?",
    a: "Yes! We cover Hindu, Christian, and Muslim weddings.",
  },
  {
    q: "Do you provide photography and videography?",
    a: "Yes, we offer both wedding photography and cinematic films.",
  },
  {
    q: "How can I book your services?",
    a: "Contact us with your wedding date, venue, and event details.",
  },
  {
    q: "How will I receive my photos and videos?",
    a: "We provide professionally edited photos and cinematic wedding films.",
  },
];

export default function Faq() {
  const photoMedia = (
    <div className="ew-faq-photo-frame">
      <img
        src={faqPhoto}
        alt="Wedding Photography in Thoothukudi and across Tamil Nadu"
        loading="lazy"
        width="480"
        height="640"
        className="ew-faq-img"
      />
    </div>
  );

  return (
    <SplitSection
      id="faq"
      className="ew-faq-sec"
      reverse={true} // Accordion left, photo right
      media={photoMedia}
      ariaLabel="Frequently Asked Questions"
    >
      <span className="ew-kicker">FREQUENTLY ASKED QUESTIONS · <span className="ew-ta">அடிக்கடி கேட்கப்படும் கேள்விகள்</span></span>
      <h2 className="ew-sec-heading">
        Let's Clear Your <em>Wedding Photography Doubts</em>
      </h2>
      <p className="ew-sec-intro" style={{ fontWeight: 500, color: "var(--ink)", marginBottom: "20px" }}>
        Wedding Photography – FAQs
      </p>

      {/* Native details/summary accordion */}
      <div className="ew-faq-details-list">
        {FAQS.map((item, idx) => (
          <details key={idx} className="ew-faq-details" open={idx === 0}>
            <summary className="ew-faq-summary">
              <span className="ew-faq-q">{item.q}</span>
              <span className="ew-faq-arrow" aria-hidden="true" />
            </summary>
            <div className="ew-faq-answer">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </SplitSection>
  );
}
