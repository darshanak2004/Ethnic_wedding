import Marquee from "./Marquee";

export default function PhotoWall() {
  const handleCheckClick = (e) => {
    e.preventDefault();
    const el = document.getElementById("inquiry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="ew-photowall-sec" aria-label="Wedding photo gallery — your story could be next">
      {/* Full-width horizontal marquee of wedding photos */}
      <Marquee />

      {/* Centred overlay with soft dark radial gradient behind text only */}
      <div className="ew-photowall-overlay">
        <div className="ew-photowall-card-text">
          <span className="ew-kicker ew-kicker-gold">YOUR CELEBRATION · <span className="ew-ta">உங்கள் கொண்டாட்டம்</span></span>
          <h2 className="ew-photowall-h2">Your story could be next</h2>
          <p className="ew-photowall-p">
            Let us photograph the moments you will want to relive.
          </p>
          <a href="#inquiry" onClick={handleCheckClick} className="ew-btn-gold">
            Check availability
          </a>
        </div>
      </div>
    </section>
  );
}
