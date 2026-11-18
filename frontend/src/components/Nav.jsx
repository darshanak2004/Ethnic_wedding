import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { id: "about", label: "About", pageFallback: "/about" },
  { id: "portfolio", label: "Portfolio", pageFallback: "/portfolio" },
  { id: "services", label: "Services", pageFallback: "/services" },
  { id: "films", label: "Films", pageFallback: "/#films" },
  { id: "process", label: "Process", pageFallback: "/experience" },
  { id: "faq", label: "FAQ", pageFallback: "/#faq" },
];

/* Sticky header: logo, nav (About, Portfolio, Services, Films, Process, FAQ), gold "Book your date" button */
export default function Nav({ overHero = false }) {
  const [sc, setSc] = useState(false);
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setSc(window.scrollY > 10);
      setSolid(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, item) => {
    setMenu(false);
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(item.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleBookClick = (e) => {
    setMenu(false);
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("inquiry") || document.getElementById("book");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const cls = [
    "nav",
    sc ? "sc" : "",
    overHero ? "home" : "",
    overHero && (solid || menu) ? "solid" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={cls}>
      <div className="in">
        <Link className="logo" to="/" aria-label="Ethnic Weddings Home">
          <img
            src={overHero ? "/assets/mono-cream.png" : "/assets/mono-wine.png"}
            alt="Ethnic Weddings logo"
          />
          <span>
            <b>Ethnic Weddings</b>
            <small>Thoothukudi</small>
          </span>
        </Link>

        <ul className={menu ? "open" : ""}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              {pathname === "/" ? (
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.label}
                </a>
              ) : (
                <Link to={item.pageFallback}>{item.label}</Link>
              )}
            </li>
          ))}
        </ul>

        <a
          className="btn gold"
          href={pathname === "/" ? "#inquiry" : "/#inquiry"}
          onClick={handleBookClick}
        >
          Book your date
        </a>

        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          <i />
          <i />
        </button>
      </div>
    </nav>
  );
}
