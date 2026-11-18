export default function StatsCard() {
  const stats = [
    { num: "100+", label: "Happy Couples & Customers" },
    { num: "3", label: "Wedding Traditions Covered" },
    { num: "9", label: "Photography & Film Services" },
    { num: "38", label: "Services" },
  ];

  return (
    <div className="ew-stats-wrapper">
      {/* 28px Gold and Maroon Zigzag Band (CSS gradients only) behind card */}
      <div className="ew-zigzag-band" aria-hidden="true" />

      {/* Main Overlapping Stats Card */}
      <div className="ew-stats-card">
        {stats.map((item, idx) => (
          <div key={idx} className="ew-stats-cell">
            <span className="ew-stats-num">{item.num}</span>
            <span className="ew-stats-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
