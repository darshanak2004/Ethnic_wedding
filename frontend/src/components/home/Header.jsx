import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const ALL_NAV_LINKS = [
  { id: "home", label: "Home", to: "/" },
  { id: "about", label: "About", to: "/about" },
  { id: "portfolio", label: "Portfolio", to: "/portfolio" },
  { id: "services", label: "Services", to: "/services" },
  { id: "packages", label: "Packages", to: "/packages" },
  { id: "experience", label: "Experience", to: "/experience" },
  { id: "contact", label: "Contact", to: "/contact" },
];

const DESKTOP_NAV_LINKS = [
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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

        {/* Desktop Nav (Untouched for desktop >= 900px) */}
        <nav className="ew-desktop-nav" aria-label="Primary Navigation">
          <ul className="ew-nav-list">
            {DESKTOP_NAV_LINKS.map((link) => {
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

        {/* Right Action: Book Your Date Button + Mobile Hamburger */}
        <div className="ew-header-action">
          <Link
            to="/contact"
            className="ew-btn-gold ew-header-book-btn"
          >
            Book your date
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className={`ew-hamburger-btn ${mobileMenuOpen ? "ew-burger-open" : ""}`}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="ew-burger-line" />
            <span className="ew-burger-line" />
            <span className="ew-burger-line" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay containing every single link */}
      {mobileMenuOpen && (
        <div className="ew-mobile-drawer" role="dialog" aria-modal="true">
          <div className="ew-mobile-drawer-inner">
            <ul className="ew-mobile-menu-list">
              {ALL_NAV_LINKS.map((link) => {
                const isActive = pathname === link.to;
                return (
                  <li key={link.id} className="ew-mobile-menu-item">
                    <Link
                      to={link.to}
                      className={`ew-mobile-menu-link ${isActive ? "ew-mobile-link-active" : ""}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="ew-mobile-active-dot">●</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="ew-mobile-drawer-action">
              <Link
                to="/contact"
                className="ew-btn-gold"
                style={{ width: "100%", textAlign: "center" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Your Date
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
