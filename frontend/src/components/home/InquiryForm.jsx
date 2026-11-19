import ContactForm from "../Contact";
import { WA } from "../../api";

export default function InquiryForm() {
  return (
    <section className="ew-inquiry-sec" id="inquiry" aria-label="Check availability">
      <div id="book" style={{ position: "relative", top: -80, visibility: "hidden" }} />
      <div className="ew-container">
        <div className="cgrid" style={{ maxWidth: 1120, margin: "0 auto" }}>
          <aside
            className="cinfo kolam"
            style={{
              background: "#2c0612",
              border: "1px solid rgba(201, 160, 74, 0.3)",
              borderRadius: "14px",
              padding: "36px 30px",
              boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
            }}
          >
            <div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.4rem", margin: 0, color: "var(--cream)", fontWeight: 500 }}>
                Get in touch
              </h2>
              <p style={{ marginTop: 10, color: "rgba(250, 245, 236, 0.85)", fontSize: "1rem", lineHeight: 1.5 }}>
                We would love to hear about your celebration.
              </p>
            </div>
            <div>
              <small style={{ color: "var(--gold)", letterSpacing: "0.22em", textTransform: "uppercase", fontSize: "0.7rem", display: "block", marginBottom: 4 }}>
                WHATSAPP
              </small>
              {WA ? (
                <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--cream)", textDecoration: "none", fontSize: "1.05rem" }}>
                  +{WA}
                </a>
              ) : (
                <span className="v" style={{ color: "var(--cream)", fontSize: "1.05rem" }}>+91 97893 25528</span>
              )}
            </div>
            <div>
              <small style={{ color: "var(--gold)", letterSpacing: "0.22em", textTransform: "uppercase", fontSize: "0.7rem", display: "block", marginBottom: 4 }}>
                STUDIO
              </small>
              <span className="v" style={{ color: "var(--cream)", fontSize: "1.05rem" }}>Thoothukudi, Tamil Nadu</span>
            </div>
            <div>
              <small style={{ color: "var(--gold)", letterSpacing: "0.22em", textTransform: "uppercase", fontSize: "0.7rem", display: "block", marginBottom: 4 }}>
                INSTAGRAM
              </small>
              <a href="https://www.instagram.com/ethnicweddings" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cream)", textDecoration: "none", fontSize: "1.05rem" }}>
                @ethnicweddings
              </a>
            </div>
            <div>
              <small style={{ color: "var(--gold)", letterSpacing: "0.22em", textTransform: "uppercase", fontSize: "0.7rem", display: "block", marginBottom: 4 }}>
                REPLY TIME
              </small>
              <span className="v" style={{ color: "var(--cream)", fontSize: "1.05rem" }}>Within 24 to 48 hours</span>
            </div>
          </aside>
          <div
            className="cform"
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              border: "1px solid #e3d9d6",
              padding: "36px 30px",
              boxShadow: "0 20px 48px rgba(0, 0, 0, 0.25)",
            }}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
