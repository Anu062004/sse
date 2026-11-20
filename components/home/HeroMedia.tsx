"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export type HeroImage = {
  desktop: { src: string; srcSet?: string; width: number; height: number };
  mobile: { src: string; srcSet?: string; width: number; height: number };
  alt: string;
};

function Layer({
  image,
  active,
  priority = false,
  decorative = false,
}: {
  image: HeroImage;
  active: boolean;
  priority?: boolean;
  decorative?: boolean;
}) {
  return (
    <div
      aria-hidden={decorative ? "true" : undefined}
      className={cn(
        "absolute inset-0 transition-opacity duration-[1400ms] ease-linear",
        active ? "opacity-100" : "opacity-0",
      )}
    >
      <picture>
        <source
          media="(max-width: 767px)"
          srcSet={image.mobile.srcSet ?? image.mobile.src}
          sizes="100vw"
        />
        <img
          src={image.desktop.src}
          srcSet={image.desktop.srcSet}
          sizes="100vw"
          alt={decorative ? "" : image.alt}
          width={image.desktop.width}
          height={image.desktop.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "low"}
          decoding="async"
          className="h-full w-full object-cover motion-safe:animate-hero-zoom"
        />
      </picture>
    </div>
  );
}

export function HeroMedia({
  first,
  second,
}: {
  first: HeroImage;
  second: HeroImage;
}) {
  const [active, setActive] = useState<0 | 1>(0);
  const [secondReady, setSecondReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const loadTimer = window.setTimeout(() => setSecondReady(true), 2500);
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setActive((value) => (value === 0 ? 1 : 0));
      }
    }, 7000);

    return () => {
      window.clearTimeout(loadTimer);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-navy">
      <Layer image={first} active={active === 0} priority />
      {secondReady ? (
        <Layer image={second} active={active === 1} decorative />
      ) : null}
    </div>
  );
}
