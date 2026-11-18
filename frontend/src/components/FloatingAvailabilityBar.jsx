import { useState, useEffect } from "react";
import { WA } from "../api";

export default function FloatingAvailabilityBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const bookEl = document.getElementById("book");
    if (!bookEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide bar when the booking section is visible on screen
        setHidden(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(bookEl);
    return () => observer.disconnect();
  }, []);

  const scrollToBook = (e) => {
    e.preventDefault();
    const el = document.getElementById("book");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(`https://wa.me/${WA}`, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <aside
      className={`floating-bar ${hidden ? "bar-hidden" : ""}`}
      aria-label="Floating Booking Availability Bar"
    >
      <div className="wrap floating-bar-in">
        <div className="floating-bar-text">
          <span className="floating-dot" />
          <span className="floating-lead">
            Booking 2026 & 2027 Celebrations Across Tamil Nadu
          </span>
        </div>
        <div className="floating-bar-actions">
          <button type="button" className="btn gold sm floating-btn" onClick={scrollToBook}>
            Check Availability →
          </button>
        </div>
      </div>
    </aside>
  );
}
