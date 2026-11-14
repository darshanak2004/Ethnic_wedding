import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import useAnimations from "../hooks/useAnimations";
import { WA } from "../api";

export default function Layout({ children, door, overHero }) {
  useAnimations();
  const { pathname, hash } = useLocation();
  useEffect(() => { // open pages at the top, or at a #section such as /services#packages
    if (!hash) { scrollTo(0, 0); return; }
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 120);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return (
    <>
      {door && (
        <div id="door" aria-hidden="true"><div className="d l" /><div className="d r" />
          <div className="em"><img src="/assets/mono-cream.png" alt="" /><span className="ta" style={{ letterSpacing: ".1em", fontSize: "1rem" }}>வணக்கம்</span></div>
        </div>
      )}
      <Nav overHero={overHero} /><main className={overHero ? "flush" : undefined}>{children}</main><Footer />
      {WA && (
        <a className="wa" href={`https://wa.me/${WA}?text=${encodeURIComponent("Hello Ethnic Weddings, I found you on your website and would like to know more.")}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-8.1 14.4L2.5 21.5l4.7-1.2A9.5 9.5 0 1 0 12 2.5z" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" /><path transform="translate(6.4 6.2) scale(.45)" fill="#fff" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
        </a>
      )}
    </>
  );
}
