import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
const LINKS = [["/", "Home"], ["/about", "About"], ["/services", "Services"], ["/packages", "Packages"], ["/portfolio", "Portfolio"], ["/experience", "Experience"], ["/contact", "Contact"]];
/* overHero: floats transparent over the home hero photo (cream logo, gold-outline button), turns solid wine on scroll. */
export default function Nav({ overHero = false }) {
  const [sc, setSc] = useState(false), [solid, setSolid] = useState(false), [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    const f = () => { setSc(scrollY > 10); setSolid(scrollY > 40); };
    f(); addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  const cls = ["nav", sc ? "sc" : "", overHero ? "home" : "", overHero && (solid || menu) ? "solid" : ""].filter(Boolean).join(" ");
  return (
    <nav className={cls}><div className="in">
      <Link className="logo" to="/"><img src={overHero ? "/assets/mono-cream.png" : "/assets/mono-wine.png"} alt="" /><span><b>Ethnic Weddings</b><small>Thoothukudi</small></span></Link>
      <ul className={menu ? "open" : ""}>{LINKS.map(([to, t]) => <li key={to}><NavLink to={to} end>{t}</NavLink></li>)}</ul>
      <Link className={`btn ${overHero ? "ghost" : "gold"}`} to="/contact">Book your date</Link>
      <button className="burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}><i /><i /></button>
    </div></nav>
  );
}
