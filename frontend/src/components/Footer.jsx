import { Link } from "react-router-dom";
import { WA } from "../api";
import { PRIMARY, SERVICES } from "../data/services";
export default function Footer() {
  return (
    <footer className="ft">
      <div className="zari" />
      <div className="wrap ftg">
        <div><img src="/assets/word-cream.png" alt="Ethnic Weddings" /><p className="ta" style={{ color: "#E2C275", marginBottom: 8 }}>திருமண நினைவுகள், என்றென்றும்</p><p>Wedding photography and films from Thoothukudi, made to be treasured by the whole family.</p></div>
        <div><h4>Explore</h4><ul>{[["/", "Home"], ["/about", "About"], ["/services", "Services"], ["/packages", "Packages"], ["/portfolio", "Portfolio"], ["/experience", "Experience"], ["/contact", "Contact"]].map(([to, t]) => <li key={to}><Link to={to}>{t}</Link></li>)}</ul></div>
        <div><h4>Services</h4><ul>{[PRIMARY.name, ...SERVICES.slice(2).map((x) => x.name)].slice(0, 6).map((n) => <li key={n}><Link to="/services">{n}</Link></li>)}<li><Link to="/packages">Packages</Link></li></ul></div>
        <div><h4>Get in touch</h4><ul><li>Thoothukudi, Tamil Nadu</li>{WA && <li><a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">WhatsApp us</a></li>}<li><a href="https://www.instagram.com/ethnicweddings" target="_blank" rel="noopener noreferrer">@ethnicweddings</a></li></ul></div>
      </div>
      <div className="wrap fte"><span>© {new Date().getFullYear()} Ethnic Weddings. All rights reserved.</span><a href="/admin">Admin</a></div>
    </footer>
  );
}
