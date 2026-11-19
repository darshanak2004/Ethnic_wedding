import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./home/Header";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import useAnimations from "../hooks/useAnimations";

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
      <Header /><main className={overHero ? "flush" : undefined}>{children}</main><Footer />
      <FloatingWhatsApp />
    </>
  );
}
