import { useState } from "react";
import { WA } from "../api";
import ResponsiveImage from "./ResponsiveImage";

const CELEBRATIONS = [
  "Wedding / Muhurtham",
  "Engagement",
  "Pre-wedding",
  "Haldi & Mehendi",
  "Sangeet & Reception",
  "Concept shoot",
];

const NEEDS = ["Both", "Photography", "Film"];

export default function WhatsAppBooking() {
  const [name, setName] = useState("");
  const [celebration, setCelebration] = useState(CELEBRATIONS[0]);
  const [date, setDate] = useState("");
  const [dateNotFixed, setDateNotFixed] = useState(false);
  const [venue, setVenue] = useState("");
  const [need, setNeed] = useState("Both");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Minimum date is today (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split("T")[0];

  const formatDateDisplay = (dateVal) => {
    if (dateNotFixed) return "Date not fixed yet";
    if (!dateVal) return "Not specified";
    try {
      const [y, m, d] = dateVal.split("-");
      const dObj = new Date(Number(y), Number(m) - 1, Number(d));
      return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(dObj);
    } catch {
      return dateVal;
    }
  };

  const generateMessage = () => {
    const formattedDate = formatDateDisplay(date);
    return `Hi Ethnic Weddings, I'd like to check your availability:
• Name: ${name.trim()}
• Celebration: ${celebration}
• Date: ${formattedDate}
• Venue/City: ${venue.trim()}
• Services needed: ${need}

Looking forward to hearing from you!`;
  };

  const handleValidate = () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return false;
    }
    if (!dateNotFixed && !date) {
      setError("Please pick your celebration date or check 'Date not fixed yet'.");
      return false;
    }
    if (!venue.trim()) {
      setError("Please enter your celebration venue or city.");
      return false;
    }
    setError("");
    return true;
  };

  const handleWhatsAppClick = (e) => {
    if (!handleValidate()) {
      e.preventDefault();
      return;
    }
    const msg = generateMessage();
    const url = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopyMessage = async () => {
    if (!handleValidate()) return;
    const msg = generateMessage();
    try {
      await navigator.clipboard.writeText(msg);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setError("Could not copy automatically. Please click the WhatsApp button directly.");
    }
  };

  return (
    <section id="book" className="wb-sec" aria-label="Book your date on WhatsApp">
      {/* Background with Darkened Wedding Photo */}
      <div className="wb-bg">
        <ResponsiveImage
          src="/assets/portfolio/weddings/103a3750.jpg"
          alt=""
          aria-hidden="true"
          sizes="100vw"
          className="wb-bg-img"
        />
        <div className="wb-scrim" />
      </div>

      <div className="wrap wb-wrap">
        <div className="wb-card">
          <div className="wb-head">
            <span className="ta" style={{ color: "var(--gold)" }}>
              உங்கள் தேதியை முன்பதிவு செய்யுங்கள்
            </span>
            <h2>Check Availability & Book on WhatsApp</h2>
            <p>
              Tell us a little about your wedding or celebration. We'll check our calendar and reply with details on WhatsApp within 24–48 hours.
            </p>
          </div>

          <form className="wb-form" onSubmit={(e) => { e.preventDefault(); handleWhatsAppClick(e); }}>
            {/* Inline validation error announcement */}
            {error && (
              <div className="wb-error" role="alert" aria-live="polite">
                ⚠️ {error}
              </div>
            )}

            <div className="wb-grid">
              {/* Name */}
              <div className="wb-field">
                <label htmlFor="wb-name">
                  Your Name <span className="req">*</span>
                </label>
                <input
                  id="wb-name"
                  type="text"
                  required
                  minLength={2}
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(""); }}
                  placeholder="e.g. Priya & Arun"
                  className="wb-input"
                />
              </div>

              {/* Celebration Type */}
              <div className="wb-field">
                <label htmlFor="wb-celebration">
                  Celebration Type <span className="req">*</span>
                </label>
                <select
                  id="wb-celebration"
                  value={celebration}
                  onChange={(e) => setCelebration(e.target.value)}
                  className="wb-select"
                >
                  {CELEBRATIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="wb-field">
                <div className="wb-label-row">
                  <label htmlFor="wb-date">
                    Celebration Date {!dateNotFixed && <span className="req">*</span>}
                  </label>
                  <label className="wb-checkbox-label">
                    <input
                      type="checkbox"
                      checked={dateNotFixed}
                      onChange={(e) => {
                        setDateNotFixed(e.target.checked);
                        if (e.target.checked) setDate("");
                        setError("");
                      }}
                    />
                    <span>Date not fixed yet</span>
                  </label>
                </div>
                <input
                  id="wb-date"
                  type="date"
                  min={todayStr}
                  disabled={dateNotFixed}
                  value={date}
                  onChange={(e) => { setDate(e.target.value); setError(""); }}
                  className="wb-input"
                  style={dateNotFixed ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                />
              </div>

              {/* Venue / City */}
              <div className="wb-field">
                <label htmlFor="wb-venue">
                  Venue / City <span className="req">*</span>
                </label>
                <input
                  id="wb-venue"
                  type="text"
                  required
                  value={venue}
                  onChange={(e) => { setVenue(e.target.value); setError(""); }}
                  placeholder="e.g. Thoothukudi, Tirunelveli, Madurai"
                  className="wb-input"
                />
              </div>
            </div>

            {/* Service Need Chips */}
            <div className="wb-need-row">
              <span className="wb-need-title">Services Needed:</span>
              <div className="wb-chips" role="radiogroup" aria-label="Services needed">
                {NEEDS.map((n) => (
                  <button
                    type="button"
                    key={n}
                    role="radio"
                    aria-checked={need === n}
                    className={`wb-chip ${need === n ? "active" : ""}`}
                    onClick={() => setNeed(n)}
                  >
                    {n === "Both" ? "Photography & Films (Both)" : n}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="wb-actions">
              <button type="submit" className="btn gold wb-submit-btn">
                <span>💬 Check My Date on WhatsApp</span>
              </button>
              <button
                type="button"
                className="btn line wb-copy-btn"
                onClick={handleCopyMessage}
                title="Copy drafted message to clipboard"
              >
                {copied ? "✓ Message Copied!" : "📋 Copy Message"}
              </button>
            </div>

            <p className="wb-footer-note">
              🔒 We reply on WhatsApp within 24–48 hours. Direct communication, zero spam.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
