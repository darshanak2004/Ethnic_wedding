import { useState } from "react";
import { WA } from "../api";
import ResponsiveImage from "./ResponsiveImage";
import { HOMEPAGE_PHOTOS } from "../data/homepagePhotos";

const EVENT_TYPES = [
  "Wedding",
  "Pre-Wedding",
  "Engagement",
  "Concept & Baby Shoot"
];

const SERVICES = [
  "Photography & Film",
  "Photography",
  "Film"
];

export default function BookingCard() {
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState("Wedding");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [service, setService] = useState("Photography & Film");
  const [error, setError] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];
  const bgPhoto = HOMEPAGE_PHOTOS.bookingBackground;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!date) {
      setError("Please select your celebration date.");
      return;
    }
    if (!venue.trim()) {
      setError("Please enter your venue and city.");
      return;
    }

    setError("");

    // Format date with toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    let formattedDate = date;
    try {
      const [y, m, d] = date.split("-");
      const dObj = new Date(Number(y), Number(m) - 1, Number(d));
      formattedDate = dObj.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    } catch {
      formattedDate = date;
    }

    // Message specification:
    // Hi Ethnic Weddings, I'd like to check availability for a ${type} on ${formattedDate} at ${venue}. Service: ${service}. My name is ${name}.
    const message = `Hi Ethnic Weddings, I'd like to check availability for a ${eventType} on ${formattedDate} at ${venue.trim()}. Service: ${service}. My name is ${name.trim()}.`;

    const url = `https://wa.me/${WA}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="book" className="wb-sec" aria-label="Book your date on WhatsApp">
      {/* Background with Darkened Wedding Photo */}
      <div className="wb-bg">
        <ResponsiveImage
          src={bgPhoto.src}
          alt={bgPhoto.alt}
          width={bgPhoto.w}
          height={bgPhoto.h}
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
              Tell us about your celebration. We'll check our calendar and confirm your date on WhatsApp.
            </p>
          </div>

          <form className="wb-form" onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="wb-error" role="alert" aria-live="polite">
                ⚠️ {error}
              </div>
            )}

            <div className="wb-grid">
              {/* Name */}
              <div className="wb-field">
                <label htmlFor="booking-name">
                  Your Name <span className="req">*</span>
                </label>
                <input
                  id="booking-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="e.g. Priya & Arun"
                  className="wb-input"
                />
              </div>

              {/* Event Type */}
              <div className="wb-field">
                <label htmlFor="booking-event-type">
                  Event Type <span className="req">*</span>
                </label>
                <select
                  id="booking-event-type"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="wb-select"
                >
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="wb-field">
                <label htmlFor="booking-date">
                  Wedding / Celebration Date <span className="req">*</span>
                </label>
                <input
                  id="booking-date"
                  type="date"
                  min={todayStr}
                  required
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    if (error) setError("");
                  }}
                  className="wb-input"
                />
              </div>

              {/* Venue & City */}
              <div className="wb-field">
                <label htmlFor="booking-venue">
                  Venue and City <span className="req">*</span>
                </label>
                <input
                  id="booking-venue"
                  type="text"
                  required
                  value={venue}
                  onChange={(e) => {
                    setVenue(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="e.g. SPIC Nagar, Thoothukudi"
                  className="wb-input"
                />
              </div>
            </div>

            {/* Service Chips */}
            <div className="wb-need-row">
              <span className="wb-need-title">Service Required:</span>
              <div className="wb-chips" role="radiogroup" aria-label="Service required">
                {SERVICES.map((s) => (
                  <button
                    type="button"
                    key={s}
                    role="radio"
                    aria-checked={service === s}
                    className={`wb-chip ${service === s ? "active" : ""}`}
                    onClick={() => setService(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="wb-actions">
              <button type="submit" className="btn gold wb-submit-btn">
                <span>💬 Check Availability on WhatsApp</span>
              </button>
            </div>

            <p className="wb-footer-note">
              🔒 We'll confirm your date on WhatsApp. We reply within 24–48 hours.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
