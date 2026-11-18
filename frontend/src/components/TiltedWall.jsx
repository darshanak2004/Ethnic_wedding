import { useState, useEffect, useRef } from "react";
import ResponsiveImage from "./ResponsiveImage";
import { HOMEPAGE_PHOTOS } from "../data/homepagePhotos";

export default function TiltedWall() {
  const sectionRef = useRef(null);
  const [colCount, setColCount] = useState(5);
  const wallPhotos = HOMEPAGE_PHOTOS.wall;

  // 5 columns desktop, 3 columns mobile via matchMedia
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setColCount(mq.matches ? 3 : 5);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Split photos into columns
  const columns = Array.from({ length: colCount }, () => []);
  wallPhotos.forEach((photo, idx) => {
    const colIdx = idx % colCount;
    columns[colIdx].push(photo);
  });

  // RAF-throttled scroll listener updating --drift on the section
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let inView = false;
    let rafId = null;

    const updateDrift = () => {
      if (!inView || document.hidden || !sec) return;
      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress from -0.5 to 0.5 as section traverses viewport
      const progress = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.max(-0.2, Math.min(1.2, progress));
      sec.style.setProperty("--drift", (clamped - 0.5).toFixed(4));
    };

    const onScroll = () => {
      if (!rafId && inView) {
        rafId = requestAnimationFrame(() => {
          updateDrift();
          rafId = null;
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) updateDrift();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    observer.observe(sec);

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="tilted-dense-wall-sec" aria-label="Photo Gallery Wall">
      <div className="tilted-dense-wall-grid">
        {columns.map((col, colIdx) => {
          // Alternate direction: even columns drift down, odd columns drift up
          const driftDir = colIdx % 2 === 0 ? 1 : -1;
          const driftSpeed = 90 + (colIdx % 2) * 25;

          return (
            <div
              key={colIdx}
              className="tilted-dense-col"
              style={{
                "--drift-dir": driftDir,
                "--drift-speed": `${driftSpeed}px`,
              }}
            >
              {col.map((item, itemIdx) => (
                <div key={item.src} className="tilted-dense-item">
                  <ResponsiveImage
                    src={item.src}
                    alt={item.alt}
                    width={item.w}
                    height={item.h}
                    sizes="(max-width: 768px) 33vw, 20vw"
                    aspectRatio={itemIdx % 2 === 0 ? "3/4" : "4/5"}
                    loading="lazy"
                    className="tilted-dense-img"
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
