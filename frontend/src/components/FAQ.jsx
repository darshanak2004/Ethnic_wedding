import { useState } from "react";
import { SecHead } from "./Bits";

const FAQS = [
  [
    "Do you shoot photos and film?",
    "Yes! We provide both professional wedding photography and cinematic videography with one dedicated team to capture every special moment."
  ],
  [
    "Do you travel for weddings?",
    "Absolutely! We travel across Tamil Nadu and other locations to capture weddings and special celebrations."
  ],
  [
    "Will you cover every ritual?",
    "Yes! We plan our coverage around your wedding schedule to capture all important rituals, family moments, and celebrations."
  ],
  [
    "What happens after I inquire?",
    "Once you contact us, our team will connect with you to understand your wedding plans, discuss packages, check availability, and guide you through the booking process."
  ]
];

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="sec faq-sec" aria-label="Frequently Asked Questions">
      <div className="wrap two">
        <div>
          <SecHead
            ta="கேள்விகள்"
            kick="Got Questions?"
            title="Everything You Need to Know About Our Wedding Photography"
            text="Have questions about booking, traditions, or delivery? Here are quick answers to what couples ask us most."
          />
          <div style={{ marginTop: 24 }}>
            <a className="btn wine" href="#book">
              Check Date Availability
            </a>
          </div>
        </div>
        <div className="acc rv">
          {FAQS.map((f, i) => (
            <div className={`row${openFaq === i ? " open" : ""}`} key={f[0]}>
              <button
                aria-expanded={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                <h3>{f[0]}</h3>
                <span className="pm" aria-hidden="true" />
              </button>
              <div className="panel">
                <div>
                  <p>{f[1]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
