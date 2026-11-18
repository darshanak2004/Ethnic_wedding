import { Link } from "react-router-dom";
import { WA } from "../../api";

export default function HomeFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ew-footer">
      <div className="ew-container">
        <div className="ew-footer-grid">
          {/* Col 1: Brand */}
          <div className="ew-footer-col ew-footer-brand">
            <Link to="/" className="ew-footer-logo-link">
              <img
                src="/assets/word-cream.png"
                alt="Ethnic Weddings"
                width="200"
                height="45"
                className="ew-footer-logo-img"
              />
            </Link>
            <p className="ew-footer-tagline-ta">திருமண நினைவுகள், என்றென்றும்</p>
            <p className="ew-footer-desc">
              Professional wedding photography and cinematic films from Thoothukudi, capturing
              cherished family moments across all of Tamil Nadu.
            </p>
          </div>

          {/* Col 2: Explore */}
          <div className="ew-footer-col">
            <h4 className="ew-footer-heading">Explore</h4>
            <ul className="ew-footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/packages">Packages</Link></li>
              <li><Link to="/experience">Experience</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="ew-footer-col">
            <h4 className="ew-footer-heading">Services</h4>
            <ul className="ew-footer-links">
              <li><Link to="/services">Wedding Photography</Link></li>
              <li><Link to="/services">Engagement & Ring Exchange</Link></li>
              <li><Link to="/services">Concept & Pre-Wedding</Link></li>
              <li><Link to="/services">Cinematic Couple Films</Link></li>
              <li><Link to="/services">Baby Showers & Maternity</Link></li>
              <li><Link to="/packages">Wedding Albums & Prints</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="ew-footer-col">
            <h4 className="ew-footer-heading">Contact</h4>
            <ul className="ew-footer-links">
              <li>Thoothukudi, Tamil Nadu</li>
              {WA && (
                <li>
                  <a
                    href={`https://wa.me/${WA}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💬 WhatsApp Us
                  </a>
                </li>
              )}
              <li>
                <a
                  href="https://www.instagram.com/ethnicweddings"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📷 @ethnicweddings
                </a>
              </li>
              <li>Available across all TN districts</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="ew-footer-bottom">
          <p>© {currentYear} Ethnic Weddings. All rights reserved.</p>
          <a href="/admin" className="ew-footer-admin-link">Admin</a>
        </div>
      </div>
    </footer>
  );
}
