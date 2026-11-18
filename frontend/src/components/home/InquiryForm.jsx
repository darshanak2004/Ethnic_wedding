import { useState } from "react";
import { WA } from "../../api";

// WhatsApp target number constant
const WA_PHONE_NUMBER = WA || "919876543210";

const CELEBRATION_TYPES = [
  "Wedding",
  "Engagement",
  "Concept shoot",
  "Baby shower",
  "Couple film",
];

const SERVICE_OPTIONS = [
  "Photography",
  "Photography and film",
  "Film only",
];

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    celebration: "Wedding",
    phone: "",
    date: "",
    venue: "",
    services: "Photography and film",
    message: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }
    if (!formData.date) {
      setError("Please select your celebration date.");
      return;
    }

    const formattedDate = new Date(formData.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const lines = [
      `Hello Ethnic Weddings! I would like to check availability for my celebration:`,
      `• Name: ${formData.name}`,
      `• Celebration: ${formData.celebration}`,
      `• Date: ${formattedDate}`,
      `• Phone: ${formData.phone}`,
      `• Venue / City: ${formData.venue || "To be decided"}`,
      `• Services Needed: ${formData.services}`,
    ];

    if (formData.message.trim()) {
      lines.push(`• Message: ${formData.message.trim()}`);
    }

    const encodedText = encodeURIComponent(lines.join("\n"));
    const waUrl = `https://wa.me/${WA_PHONE_NUMBER}?text=${encodedText}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // Min date is today
  const minDate = new Date().toISOString().split("T")[0];

  return (
    <section className="ew-inquiry-sec" id="inquiry" aria-label="Check availability on WhatsApp">
      {/* Anchor for #book compatibility */}
      <div id="book" style={{ position: "relative", top: -80, visibility: "hidden" }} />

      <div className="ew-container">
        <div className="ew-inquiry-card">
          <div className="ew-inquiry-head">
            <span className="ew-kicker ew-kicker-wine">RESERVE YOUR DATE · <span className="ew-ta">முன்பதிவு</span></span>
            <h2 className="ew-inquiry-title">Let's Capture Your Special Day</h2>
            <p className="ew-inquiry-sub">
              Share your wedding details with us. We'll confirm availability via WhatsApp within 24–48 hours.
              Let's capture your beautiful story together!
            </p>
          </div>

          {/* Show inline error message only when there is an error, hidden when empty */}
          {error && (
            <div className="ew-inquiry-error" role="alert">
              ⚠️ {error}
            </div>
          )}

          <form className="ew-inquiry-form" onSubmit={handleSubmit}>
            <div className="ew-inquiry-grid">
              {/* Your name */}
              <div className="ew-field-group">
                <label htmlFor="ew-name">
                  Your name <span className="ew-req">*</span>
                </label>
                <input
                  id="ew-name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Priya & Arun"
                  value={formData.name}
                  onChange={handleChange}
                  className="ew-input"
                />
              </div>

              {/* Celebration type */}
              <div className="ew-field-group">
                <label htmlFor="ew-celebration">
                  Celebration type <span className="ew-req">*</span>
                </label>
                <select
                  id="ew-celebration"
                  name="celebration"
                  value={formData.celebration}
                  onChange={handleChange}
                  className="ew-select"
                >
                  {CELEBRATION_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone number */}
              <div className="ew-field-group">
                <label htmlFor="ew-phone">
                  Phone number <span className="ew-req">*</span>
                </label>
                <input
                  id="ew-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="e.g. 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="ew-input"
                />
              </div>

              {/* Event date */}
              <div className="ew-field-group">
                <label htmlFor="ew-date">
                  Event date <span className="ew-req">*</span>
                </label>
                <input
                  id="ew-date"
                  name="date"
                  type="date"
                  min={minDate}
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="ew-input"
                />
              </div>

              {/* Venue or city */}
              <div className="ew-field-group">
                <label htmlFor="ew-venue">Venue or city</label>
                <input
                  id="ew-venue"
                  name="venue"
                  type="text"
                  placeholder="e.g. Thoothukudi, Tirunelveli, Madurai"
                  value={formData.venue}
                  onChange={handleChange}
                  className="ew-input"
                />
              </div>

              {/* Services needed */}
              <div className="ew-field-group">
                <label htmlFor="ew-services">Services needed</label>
                <select
                  id="ew-services"
                  name="services"
                  value={formData.services}
                  onChange={handleChange}
                  className="ew-select"
                >
                  {SERVICE_OPTIONS.map((srv) => (
                    <option key={srv} value={srv}>
                      {srv}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message (optional, full width textarea) */}
              <div className="ew-field-group ew-field-full">
                <label htmlFor="ew-message">Message (optional)</label>
                <textarea
                  id="ew-message"
                  name="message"
                  rows="3"
                  placeholder="Tell us about your celebration, ceremonies, preferred timings or questions..."
                  value={formData.message}
                  onChange={handleChange}
                  className="ew-textarea"
                />
              </div>
            </div>

            {/* Dual CTA: Book Your Date (WhatsApp) + Contact Us */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center", justifyContent: "center", marginTop: "12px" }}>
              <button type="submit" className="ew-btn-whatsapp">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84-1.56 1.56-3.64 2.42-5.84 2.42-1.45 0-2.88-.39-4.14-1.13l-.3-.18-3.08.81.82-3-.2-.31c-.81-1.3-1.24-2.8-1.24-4.35 0-4.54 3.7-8.24 8.24-8.24zm4.5 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.76-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.02 2.6c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
                </svg>
                <span>Book Your Date</span>
              </button>
              <a href="/contact" className="ew-btn-outline-dark" style={{ padding: "14px 28px", borderRadius: "999px", textDecoration: "none" }}>
                Contact Us
              </a>
            </div>
            <p className="ew-inquiry-note">
              Opens WhatsApp with your details filled in.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
