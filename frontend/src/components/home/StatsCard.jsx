import { useState, useEffect, useRef } from "react";

function CounterCell({ target, suffix = "", label, shortLabel, className = "" }) {
  const [count, setCount] = useState(0);
  const cellRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = cellRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const steps = 40;
          const stepTime = duration / steps;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(current));
            }
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={cellRef} className={`ew-stats-cell ${className}`}>
      <span className="ew-stats-num">
        {count}
        {suffix}
      </span>
      <span className="ew-stats-label">
        <span className="ew-stats-label-desk">{label}</span>
        {shortLabel && <span className="ew-stats-label-mob">{shortLabel}</span>}
      </span>
    </div>
  );
}

export default function StatsCard() {
  const stats = [
    { target: 100, suffix: "+", label: "Happy Couples & Customers", shortLabel: "Happy Couples" },
    { target: 3, suffix: "", label: "Wedding Traditions Covered", shortLabel: "Wedding Traditions" },
    { target: 9, suffix: "", label: "Photography & Film Services", isDuplicate: true },
    { target: 38, suffix: "", label: "Services", shortLabel: "Services" },
  ];

  return (
    <div className="ew-container ew-stats-wrapper">
      <div className="ew-stats-card">
        {stats.map((item, idx) => (
          <CounterCell
            key={idx}
            className={item.isDuplicate ? "ew-stats-duplicate" : ""}
            target={item.target}
            suffix={item.suffix}
            label={item.label}
            shortLabel={item.shortLabel}
          />
        ))}
      </div>
    </div>
  );
}
