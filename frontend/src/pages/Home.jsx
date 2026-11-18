import useAnimations from "../hooks/useAnimations";
import Header from "../components/home/Header";
import Hero from "../components/home/Hero";
import StatsCard from "../components/home/StatsCard";
import AboutSection from "../components/home/AboutSection";
import PhotoGrid from "../components/home/PhotoGrid";
import ServicesSection from "../components/home/ServicesSection";
import FilmFeature from "../components/home/FilmFeature";
import Steps from "../components/home/Steps";
import Testimonials from "../components/home/Testimonials";
import Faq from "../components/home/Faq";
import PhotoWall from "../components/home/PhotoWall";
import InquiryForm from "../components/home/InquiryForm";
import HomeFooter from "../components/home/HomeFooter";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import "../home-redesign.css";

export default function Home() {
  useAnimations();

  return (
    <div className="ew-home-page">
      {/* Intro opening curtain with company logo and Tamil 'வணக்கம்' */}
      <div id="door" aria-hidden="true">
        <div className="d l" />
        <div className="d r" />
        <div className="em">
          <img src="/assets/mono-cream.png" alt="Ethnic Weddings Logo" />
          <span className="ta" style={{ letterSpacing: "0.15em", fontSize: "1.7rem", color: "var(--gold)", fontWeight: 600 }}>
            வணக்கம்
          </span>
        </div>
      </div>

      {/* 1. Sticky header */}
      <Header />

      <main className="flush" style={{ paddingTop: 0, marginTop: 0 }}>
        {/* 2. HERO */}
        <Hero />

        {/* 3. STATS CARD overlapping hero bottom */}
        <StatsCard />

        {/* 4. About */}
        <AboutSection />

        {/* 5. Portfolio */}
        <PhotoGrid />

        {/* 6. Services */}
        <ServicesSection />

        {/* 7. Cinematic films */}
        <FilmFeature />

        {/* 8. Process */}
        <Steps />

        {/* 9. Testimonials */}
        <Testimonials />

        {/* 10. FAQ */}
        <Faq />

        {/* 11. Photo Wall Marquee */}
        <PhotoWall />

        {/* 12. Inquiry Form */}
        <InquiryForm />
      </main>

      {/* 13. Footer */}
      <HomeFooter />

      {/* Floating WhatsApp button (hidden during intro curtain) */}
      <FloatingWhatsApp />
    </div>
  );
}
