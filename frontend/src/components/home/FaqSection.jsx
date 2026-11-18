import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "How early should we book our wedding date?",
    a: "We recommend booking 3 to 6 months in advance, especially during the auspicious Muhurtham season. Because we commit our core lead team exclusively to one wedding per day, dates fill up quickly.",
  },
  {
    q: "Do you travel across Tamil Nadu and other locations?",
    a: "Yes! While our studio is based in Thoothukudi, we regularly shoot weddings across Tirunelveli, Madurai, Chennai, Coimbatore, Kanyakumari, and destination celebrations across India.",
  },
  {
    q: "Do you provide both photography and cinematic films together?",
    a: "Yes. In fact, having one unified team for both photography and cinematic video ensures smooth coordination, consistent color science, and no interference with your rituals.",
  },
  {
    q: "When will we receive our photographs and wedding films?",
    a: "You will receive a curated sneak peek gallery within 7 to 10 days after your event. Fully retouched high-res photos, teasers, and the cinematic film are delivered within 4 to 6 weeks.",
  },
  {
    q: "How do we confirm our booking?",
    a: "You can confirm your booking with a signed contract and a 25% advance deposit. The balance is split across the wedding week and final deliverables.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section className="h-section h-faq-sec" id="faq" aria-label="Frequently Asked Questions">
      <div className="h-container h-split-grid">
        {/* Left: Accordion */}
        <div className="h-split-content">
          <span className="h-eyebrow">COMMON QUESTIONS · அடிக்கடி கேட்கப்படும் கேள்விகள்</span>
          <h2 className="h-section-title">
            Everything You Need to <em>Know</em>
          </h2>
          <p className="h-faq-intro">
            Here are answers to common questions about our wedding photography packages, travel, and
            timelines.
          </p>

          <div className="h-faq-accordion" role="region" aria-label="FAQ Accordion">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className={`h-faq-item ${isOpen ? "h-faq-open" : ""}`}>
                  <button
                    type="button"
                    className="h-faq-question-btn"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    id={`faq-btn-${idx}`}
                    aria-controls={`faq-ans-${idx}`}
                  >
                    <span className="h-faq-q-text">{item.q}</span>
                    <span className="h-faq-icon" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      className="h-faq-answer"
                      id={`faq-ans-${idx}`}
                      role="region"
                      aria-labelledby={`faq-btn-${idx}`}
                    >
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Photo */}
        <div className="h-split-media">
          <div className="h-faq-photo-wrap">
            <img
              src="/assets/photo-3.jpg"
              alt="Joyful bride wearing traditional wedding ornaments"
              className="h-faq-img"
              loading="lazy"
              width="500"
              height="650"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
