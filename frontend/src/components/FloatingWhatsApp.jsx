import { useState, useEffect } from "react";
import { WA } from "../api";

export default function FloatingWhatsApp() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Hide when any contact/inquiry section or form is in view
    const targets = document.querySelectorAll(
      "#inquiry, .ew-inquiry-sec, .cform, .cgrid, #contact-form, .ew-contact-form"
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((e) => e.isIntersecting);
        setHidden(isIntersecting);
      },
      { threshold: 0.08 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (!WA) return null;

  const waUrl = `https://wa.me/${WA}?text=${encodeURIComponent(
    "Hi! I came across Ethnic Weddings and I'm interested in your wedding photography & videography services. Could you please share details about your packages, availability, and pricing? 📸🎬"
  )}`;

  return (
    <a
      className={`wa ${hidden ? "wa-hidden" : ""}`}
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      style={
        hidden
          ? {
              opacity: 0,
              visibility: "hidden",
              pointerEvents: "none",
              transform: "scale(0.6)",
              transition: "opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease",
            }
          : {
              transition: "opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease",
            }
      }
    >
      <svg
        viewBox="0 0 32 32"
        width="30"
        height="30"
        aria-hidden="true"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 2C8.268 2 2 8.268 2 16c0 2.49.676 4.82 1.854 6.82L2 30l7.38-1.828A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"
          fill="#fff"
          fillOpacity=".15"
          stroke="#fff"
          strokeWidth="1.5"
        />
        <path
          d="M22.003 19.274c-.32-.16-1.892-.933-2.185-1.04-.292-.106-.505-.16-.717.16-.214.32-.826 1.04-.012 1.093.293.027.586-.16.746-.16.16 0 .586.267.906.427.32.16 1.359.666 1.359.666s.16.586-.32 1.173c-.48.586-1.093.906-1.573.72-.48-.187-2.665-1.04-3.838-2.212-1.173-1.173-1.946-2.772-2.132-3.252-.186-.48 0-1.04.586-1.52.586-.48 1.04-.48 1.253-.48.213 0 .64.054.906.64.267.586.8 1.946.906 2.078.107.133.16.32.054.533-.107.213-.16.346-.32.533-.16.186-.346.413-.48.546-.16.16-.32.32-.133.64.187.32.826 1.36 1.76 2.2z"
          fill="#fff"
        />
      </svg>
    </a>
  );
}
