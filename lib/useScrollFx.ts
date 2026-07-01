import { useEffect } from "react";

// Riproduce reveal-on-scroll ([data-reveal]) e count-up ([data-count])
// come nel sito statico. Si ri-esegue ad ogni cambio pagina.
export function useScrollFx(dep: unknown) {
  useEffect(() => {
    const t = setTimeout(() => {
      const reveal = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
          });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        reveal.forEach((el) => { el.classList.remove("in"); io.observe(el); });
      } else {
        reveal.forEach((el) => el.classList.add("in"));
      }

      const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
      if ("IntersectionObserver" in window) {
        const co = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target as HTMLElement;
            const target = parseFloat(el.getAttribute("data-count") || "0");
            const suffix = el.getAttribute("data-suffix") || "";
            let start: number | null = null;
            const step = (ts: number) => {
              if (start === null) start = ts;
              const p = Math.min((ts - start) / 1600, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              const val = target * eased;
              el.textContent = (target % 1 !== 0 ? val.toFixed(1) : Math.floor(val).toString()) + suffix;
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            co.unobserve(el);
          });
        }, { threshold: 0.5 });
        counters.forEach((c) => co.observe(c));
      }
    }, 80);
    return () => clearTimeout(t);
  }, [dep]);
}
