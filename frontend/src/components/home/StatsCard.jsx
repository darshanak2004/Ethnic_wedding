import { useState, useEffect, useRef } from "react";

function CounterCell({ target, suffix = "", label }) {
  const [count, setCount] = useState(0);
  const cellRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = cellRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000; // 2 seconds smooth count-up
          const startTime = performance.now();

          const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic: 1 - (1 - progress)^3
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(ease * target);
            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(step);
        }
      },
      {
        threshold: 0.2, // trigger when 20% of the cell is in viewport
        rootMargin: "0px 0px -40px 0px", // triggers when scrolling into view
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={cellRef} className="ew-stats-cell">
      <span className="ew-stats-num">
        {count}
        {suffix}
      </span>
      <span className="ew-stats-label">{label}</span>
    </div>
  );
}

export default function StatsCard() {
  const stats = [
    { target: 100, suffix: "+", label: "Happy Couples & Customers" },
    { target: 3, suffix: "", label: "Wedding Traditions Covered" },
    { target: 9, suffix: "", label: "Photography & Film Services" },
    { target: 38, suffix: "", label: "Services" },
  ];

  return (
    <div className="ew-stats-wrapper">
      {/* 28px Gold and Maroon Zigzag Band behind card */}
      <div className="ew-zigzag-band" aria-hidden="true" />

      {/* Main Overlapping Stats Card */}
      <div className="ew-stats-card">
        {stats.map((item, idx) => (
          <CounterCell
            key={idx}
            target={item.target}
            suffix={item.suffix}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
}
