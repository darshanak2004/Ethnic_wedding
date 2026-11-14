import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/* Calm, professional motion: fades, image reveals, drawn lines, counters. Hero + temple-door entrance on Home. */
export default function useAnimations() {
  useLayoutEffect(() => {
    scrollTo(0, 0);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { document.getElementById("door")?.remove(); return; }
    const $$ = (s) => [...document.querySelectorAll(s)];
    const ctx = gsap.context(() => {
      const door = document.getElementById("door");
      let d = 0.1;
      if (door) {
        d = 1.9;
        gsap.timeline({ onComplete: () => door.remove() })
          .from("#door .em", { opacity: 0, scale: 0.85, duration: 0.7, ease: "power2.out" })
          .to("#door .em", { opacity: 0, duration: 0.3 }, 1.05)
          .to("#door .l", { xPercent: -100, duration: 1, ease: "power3.inOut" }, 1.0)
          .to("#door .r", { xPercent: 100, duration: 1, ease: "power3.inOut" }, 1.0);
      }
      if ($$(".hero").length) {
        gsap.timeline({ delay: d, defaults: { ease: "power3.out" } })
          .from(".hero .photo", { opacity: 0, duration: 1.4, ease: "power2.out" }, 0)
          .from(".hero .ht > *", { opacity: 0, y: 26, duration: 0.8, stagger: 0.1 }, 0.1)
          .from(".hero .meta", { opacity: 0, duration: 0.8 }, 0.9);
      }
      $$(".rv").forEach((el) => gsap.from(el, { opacity: 0, y: 26, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }));
      $$(".stg").forEach((g) => gsap.from(g.children, { opacity: 0, y: 34, duration: 0.8, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: g, start: "top 86%", once: true } }));
      $$(".imgrv").forEach((el) => {
        gsap.from(el, { clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        const im = el.querySelector("img"); if (im) gsap.from(im, { scale: 1.2, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      $$(".num").forEach((el) => {
        const n = +el.dataset.n, s = el.dataset.s || "", o = { v: 0 };
        ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () => gsap.to(o, { v: n, duration: 1.8, ease: "power2.out", onUpdate: () => (el.textContent = Math.round(o.v) + s) }) });
      });
    });
    const r = () => ScrollTrigger.refresh();
    addEventListener("load", r);
    const t = setTimeout(r, 500);
    return () => { clearTimeout(t); removeEventListener("load", r); ctx.revert(); };
  }, []);
}
