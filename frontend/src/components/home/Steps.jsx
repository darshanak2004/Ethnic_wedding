import SplitSection from "./SplitSection";
import { processPhoto } from "../../data/homepagePhotos";

const STEPS = [
  {
    num: "01",
    title: "Let's Connect",
    desc: "Share your wedding date, venue, and details.",
  },
  {
    num: "02",
    title: "Plan Your Moments",
    desc: "We discuss your traditions, rituals, and preferences.",
  },
  {
    num: "03",
    title: "Capture Every Moment",
    desc: "Our team captures every smile, emotion, and celebration.",
  },
  {
    num: "04",
    title: "Relive Your Memories",
    desc: "Receive beautifully edited photos and cinematic wedding films to cherish forever.",
  },
];

export default function Steps() {
  const photoMedia = (
    <div className="ew-process-photo-frame">
      <img
        src={processPhoto}
        alt="Couple celebrating timeless wedding memories"
        loading="lazy"
        width="480"
        height="640"
        className="ew-process-img"
      />
    </div>
  );

  return (
    <SplitSection
      id="process"
      className="ew-process-sec"
      reverse={false} // Photo left, steps right
      media={photoMedia}
      ariaLabel="How It Works"
    >
      <span className="ew-kicker">HOW IT WORKS · <span className="ew-ta">எங்கள் செயல்முறை</span></span>
      <h2 className="ew-sec-heading">
        From First Call to <em>Forever Memories</em>
      </h2>
      <p className="ew-sec-intro">
        We make your wedding photography journey simple and stress-free, from planning to final delivery.
      </p>

      <div className="ew-steps-container">
        {STEPS.map((step, idx) => (
          <div key={idx} className="ew-step-card">
            <span className="ew-step-badge">{step.num}</span>
            <div className="ew-step-content">
              <h3 className="ew-step-title">{step.title}</h3>
              <p className="ew-step-desc">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </SplitSection>
  );
}
