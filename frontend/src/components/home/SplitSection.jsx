export default function SplitSection({
  id,
  className = "",
  reverse = false, // When true, media is on the right, content on the left
  media,
  children,
  ariaLabel,
}) {
  return (
    <section
      id={id}
      className={`ew-split-sec ${className} ${reverse ? "ew-split-reversed" : ""}`}
      aria-label={ariaLabel}
    >
      <div className="ew-container">
        <div className="ew-split-grid">
          <div className="ew-split-media-col">{media}</div>
          <div className="ew-split-content-col">{children}</div>
        </div>
      </div>
    </section>
  );
}
