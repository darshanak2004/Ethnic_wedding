import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { id: "home", label: "Home", to: "/" },
  { id: "about", label: "About", to: "/about" },
  { id: "portfolio", label: "Portfolio", to: "/portfolio" },
  { id: "services", label: "Services", to: "/services" },
  { id: "packages", label: "Packages", to: "/packages" },
  { id: "contact", label: "Contact", to: "/contact" },
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

        {/* Desktop Nav (Home, About, Portfolio, Services, Packages, Contact) */}
        <nav className="ew-desktop-nav" aria-label="Primary Navigation">
          <ul className="ew-nav-list">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.to;
              return (
                <li key={link.id} className="ew-nav-item">
                  <Link
                    to={link.to}
                    className={`ew-nav-link ${isActive ? "ew-nav-link-active" : ""}`}
                    style={isActive ? { color: "var(--gold)", borderBottomColor: "var(--gold)" } : {}}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Book Your Date Button */}
        <div className="ew-header-action">
          <Link
            to="/contact"
            className="ew-btn-gold"
          >
            Book your date
          </Link>
        </div>
      </div>

      {/* Mobile Category Nav Bar (Home, About, Portfolio, Services, Packages, Contact) */}
      <nav className="ew-mobile-nav-bar" aria-label="Categories">
        <div className="ew-mobile-nav-inner">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.to;
            return (
              <Link
                key={link.id}
                to={link.to}
                className={`ew-mobile-nav-pill ${isActive ? "ew-pill-active" : ""}`}
                style={isActive ? { background: "var(--gold)", color: "var(--wine)", borderColor: "var(--gold)" } : {}}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
