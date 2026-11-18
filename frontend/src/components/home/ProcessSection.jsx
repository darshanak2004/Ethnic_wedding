const STEPS = [
  {
    num: "01",
    title: "Call and Plan",
    desc: "We connect over call or coffee to understand your wedding dates, rituals, style preferences, and special family moments you want captured.",
  },
  {
    num: "02",
    title: "Confirm Your Booking",
    desc: "Lock in your dates with simple paperwork and payment terms. We assign dedicated lead photographers and cinematographers for your event.",
  },
  {
    num: "03",
    title: "We Shoot Your Wedding",
    desc: "On your big day, we arrive early, work unobtrusively with your family, and capture real smiles and sacred rituals without stiff posing.",
  },
  {
    num: "04",
    title: "Receive Your Gallery & Film",
    desc: "Receive your online highlight preview within weeks, followed by fully color-graded high-resolution photos, 4K film cuts, and heirloom albums.",
  },
];

export default function ProcessSection() {
  return (
    <section className="h-section h-process-sec" id="process" aria-label="Our Wedding Process">
      <div className="h-container h-split-grid">
        {/* Left: Photo */}
        <div className="h-split-media">
          <div className="h-process-photo-wrap">
            <img
              src="/assets/photo-2.jpg"
              alt="Bride and groom holding hands during evening celebration"
              className="h-process-img"
              loading="lazy"
              width="500"
              height="650"
            />
          </div>
        </div>

        {/* Right: 4 Numbered Steps */}
        <div className="h-split-content">
          <span className="h-eyebrow">OUR PROCESS · எங்கள் செயல்முறை</span>
          <h2 className="h-section-title">
            From Your First Call to <em>Memories Forever</em>
          </h2>
          <p className="h-process-intro">
            We make your wedding photography effortless, transparent, and enjoyable from the moment
            you contact us until the final album reaches your hands.
          </p>

          <div className="h-steps-list">
            {STEPS.map((step, idx) => (
              <div key={idx} className="h-step-item">
                <span className="h-step-num">{step.num}</span>
                <div className="h-step-body">
                  <h3 className="h-step-title">{step.title}</h3>
                  <p className="h-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
