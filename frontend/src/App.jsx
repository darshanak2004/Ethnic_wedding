import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getContent, cachedContent, API } from "./api";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Packages from "./pages/Packages";
import Portfolio from "./pages/Portfolio";
import Experience from "./pages/Experience";
import ContactPage from "./pages/ContactPage";
import Admin from "./pages/Admin";

export default function App() {
  // Show the site immediately (last saved content or the built-in starter photos),
  // then swap in the live content. A sleeping free server never leaves visitors on a blank page.
  const [content, setContent] = useState(cachedContent);
  const [live, setLive] = useState(!API);
  useEffect(() => { getContent().then((c) => { if (c) { setContent(c); setLive(true); } }); }, []);
  return (
    <Routes>
      <Route path="/" element={<Home content={content} />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/portfolio" element={<Portfolio content={content} />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/admin" element={<Admin content={content} setContent={setContent} live={live} />} />
      <Route path="*" element={<Home content={content} />} />
    </Routes>
  );
}
