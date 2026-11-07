import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 up to `value` once the element scrolls into view.
 * Respects prefers-reduced-motion (renders the final number immediately).
 */
const CountUp = ({ value, suffix = "", duration = 1500, className }) => {
  const [display, setDisplay] = useState(0);
  const valueRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = valueRef.current;
    if (!node) return undefined;

    const reduceMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      setDisplay(value);
      return undefined;
    }

    let frameId;
    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(value * eased));
        if (progress < 1) frameId = requestAnimationFrame(tick);
      };
      frameId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            run();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.45 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [value, duration]);

  return (
    <span ref={valueRef} className={className} aria-label={`${value}${suffix}`}>
      {display}
      {suffix}
    </span>
  );
};

export default CountUp;
