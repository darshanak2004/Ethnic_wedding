import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { id: "about", label: "About", fallback: "/about" },
  { id: "portfolio", label: "Portfolio", to: "/portfolio" },
  { id: "services", label: "Services", fallback: "/services" },
  { id: "films", label: "Films", fallback: "/#films" },
  { id: "process", label: "Process", fallback: "/experience" },
  { id: "faq", label: "FAQ", fallback: "/#faq" },
];

export default function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, link) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(link.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleBookClick = (e) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("inquiry");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={`ew-header ${scrolled ? "ew-header-scrolled" : ""}`}>
      <div className="ew-header-inner">
        {/* Brand Logo */}
        <Link to="/" className="ew-brand-logo" aria-label="Ethnic Weddings Home">
          <img
            src="/assets/mono-cream.png"
            alt="Ethnic Weddings emblem"
            width="42"
            height="42"
            className="ew-logo-img"
          />
          <div className="ew-logo-text">
            <span className="ew-logo-title">Ethnic Weddings</span>
            <span className="ew-logo-sub">THOOTHUKUDI</span>
          </div>
        </Link>

        {/* Desktop Nav (Hidden on mobile) */}
        <nav className="ew-desktop-nav" aria-label="Primary Navigation">
          <ul className="ew-nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.id} className="ew-nav-item">
                {link.to ? (
                  <Link to={link.to} className="ew-nav-link">
                    {link.label}
                  </Link>
                ) : pathname === "/" ? (
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link)}
                    className="ew-nav-link"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link to={link.fallback} className="ew-nav-link">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Book Your Date Button */}
        <div className="ew-header-action">
          <a
            href={pathname === "/" ? "#inquiry" : "/#inquiry"}
            onClick={handleBookClick}
            className="ew-btn-gold"
          >
            Book your date
          </a>
        </div>
      </div>

      {/* Mobile Category Nav Bar (Smooth horizontal scroll on mobile) */}
      <nav className="ew-mobile-nav-bar" aria-label="Categories">
        <div className="ew-mobile-nav-inner">
          {NAV_LINKS.map((link) =>
            link.to ? (
              <Link key={link.id} to={link.to} className="ew-mobile-nav-pill">
                {link.label}
              </Link>
            ) : pathname === "/" ? (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link)}
                className="ew-mobile-nav-pill"
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.id} to={link.fallback} className="ew-mobile-nav-pill">
                {link.label}
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  );
}
