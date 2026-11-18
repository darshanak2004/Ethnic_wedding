import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const images = [
  "/assets/marquee-09.jpg", // Chandelier indoor wedding reception
  "/assets/marquee-01.jpg", // Outdoor tea estate meadow couple
  "/assets/marquee-06.jpg", // Evening fairy lights celebration
  "/assets/marquee-04.jpg", // Traditional garland exchange ceremony
  "/assets/marquee-08.jpg", // Scenic hill station wooden bridge
  "/assets/marquee-10.jpg", // Grand wedding couple portrait
  "/assets/marquee-02.jpg", // Romantic mirror reflection in tea garden
  "/assets/marquee-05.jpg", // Golden hour couple embrace
  "/assets/marquee-11.jpg", // Scenic mountain landscape celebration
  "/assets/marquee-03.jpg", // Outdoor meadow picnic with basket
  "/assets/marquee-07.jpg", // Joyful night lights celebration
];

function HeroMarquee() {
  const trackRef = useRef(null);
  const state = useRef({ offset: 0, velocity: 0, dragging: false, startX: 0, startOffset: 0, lastX: 0, lastTime: 0 });

  useEffect(() => {
    let frame;
    const animate = () => {
      const track = trackRef.current;
      const motion = state.current;
      if (track && !motion.dragging) {
        const halfWidth = track.scrollWidth / 2;
        if (Math.abs(motion.velocity) > 0.1) {
          motion.offset += motion.velocity;
          motion.velocity *= 0.95;
        } else {
          motion.velocity = 0;
          motion.offset -= 0.8;
        }
        if (halfWidth > 0 && motion.offset <= -halfWidth) motion.offset += halfWidth;
        if (motion.offset > 0 && halfWidth > 0) motion.offset -= halfWidth;
        track.style.transform = `translate3d(${motion.offset}px, 0, 0)`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const onPointerDown = (event) => {
    const motion = state.current;
    motion.dragging = true;
    motion.velocity = 0;
    motion.startX = event.clientX;
    motion.startOffset = motion.offset;
    motion.lastX = event.clientX;
    motion.lastTime = performance.now();
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    const motion = state.current;
    if (!motion.dragging) return;
    const now = performance.now();
    const dt = Math.max(1, now - motion.lastTime);
    motion.velocity = ((event.clientX - motion.lastX) / dt) * 16;
    motion.offset = motion.startOffset + event.clientX - motion.startX;
    motion.lastX = event.clientX;
    motion.lastTime = now;
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${motion.offset}px, 0, 0)`;
  };
  const onPointerEnd = () => { state.current.dragging = false; };

  return (
    <div className="hero-marquee" role="region" aria-label="Wedding photography">
      <div
        ref={trackRef}
        className="hero-marquee-track"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onLostPointerCapture={onPointerEnd}
      >
        {[...images, ...images].map((src, index) => (
          <div className="hero-marquee-slide" key={`${src}-${index}`}>
            <img src={src} alt="Ethnic Weddings wedding moment" loading="eager" draggable="false" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero hero-marquee-layout" id="hero">
      <div className="hero-main">
        {/* Above the photos: Grand editorial heading and lead text */}
        <div className="hero-copy hgut">
          <div className="hin">
            <div className="ht">
              <span className="kick ta">Wedding Photography & Films · திருமண புகைப்படம் & திரைப்படம்</span>
              <h1>Every Moment Tells a <em>Beautiful Story</em></h1>
              <p className="hero-lead">
                Your wedding is a once-in-a-lifetime celebration. We capture every smile, emotion, ritual,<br className="hero-lead-br" />
                and special moment through beautiful photography and cinematic wedding films.
              </p>
            </div>
          </div>
        </div>

        {/* Center: Moving photo ribbon */}
        <HeroMarquee />

        {/* Below the photos: Tagline, CTAs, and Trust bar */}
        <div className="hero-bottom-content">
          <p className="hero-tagline">Making Your Wedding Memories Last Forever.</p>
          <div className="hero-footer">
            <div className="cta">
              <a
                className="btn gold"
                href="#book"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Book your date
              </a>
              <Link className="link" to="/portfolio">View our work →</Link>
            </div>
            <div className="trust">
              <span>100+ Happy Couples</span>
              <span>Photo & Film</span>
              <span>All Tamil Nadu</span>
            </div>
          </div>
        </div>
      </div>
      <div className="meta"><div className="credit">Ethnic Weddings · Thoothukudi</div></div>
      <div className="zari" />
    </section>
  );
}
