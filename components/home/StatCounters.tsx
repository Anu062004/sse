"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const FINAL_VALUES = site.stats.map((stat) => stat.value);

export function StatCounters() {
  const ref = useRef<HTMLDListElement>(null);
  const [values, setValues] = useState<number[]>(FINAL_VALUES);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValues(FINAL_VALUES);
      return;
    }

    const duration = 1100;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValues(FINAL_VALUES.map((value) => Math.round(value * eased)));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started]);

  return (
    <dl ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-10">
      {site.stats.map((stat, index) => (
        <div key={stat.label}>
          <div aria-hidden="true" className="relative h-px bg-navy/20">
            <span className="absolute left-0 top-0 h-px w-8 bg-accent" />
          </div>
          <dt className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-muted">
            {stat.label}
          </dt>
          <dd
            className="mt-2 text-[clamp(2.75rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.06em]"
            aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
          >
            <span aria-hidden="true">
              {values[index]}
              {stat.suffix}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
