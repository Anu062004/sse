"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Source = { src: string; srcSet?: string; width: number; height: number };

export type HeroSlide = {
  desktop: Source;
  mobile?: Source;
  alt: string;
  caption: string;
};

const INTERVAL_MS = 6000;

/** Background photo layers for the hero. Rendered behind the hero copy. */
export function HeroSlides({ slides, active }: { slides: HeroSlide[]; active: number }) {
  return (
    <div className="hero-parallax absolute inset-x-0 -top-[2%] bottom-0">
      {slides.map((slide, index) => {
        const on = index === active;
        return (
          <div
            key={slide.desktop.src}
            aria-hidden={on ? undefined : "true"}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none",
              on ? "opacity-100" : "opacity-0",
            )}
          >
            <picture className="block h-full w-full">
              {slide.mobile ? (
                <source
                  media="(max-width: 767px)"
                  srcSet={slide.mobile.srcSet ?? slide.mobile.src}
                  sizes="100vw"
                />
              ) : null}
              <img
                src={slide.desktop.src}
                srcSet={slide.desktop.srcSet}
                sizes="100vw"
                alt={on ? slide.alt : ""}
                width={slide.desktop.width}
                height={slide.desktop.height}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
                decoding="async"
                className={cn(
                  "h-full w-full object-cover transition-transform duration-[7000ms] ease-out motion-reduce:transition-none",
                  on ? "scale-[1.08]" : "scale-100",
                )}
              />
            </picture>
          </div>
        );
      })}
    </div>
  );
}

/** Advances the background photos every few seconds. */
export function useSlideshow(count: number) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setActive((value) => (value + 1) % count);
      }
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [count]);

  return active;
}

/**
 * Full-height hero shell: crossfading photos, scrims and the server-rendered
 * copy as children.
 */
export function HeroStage({
  slides,
  children,
}: {
  slides: HeroSlide[];
  children: ReactNode;
}) {
  const active = useSlideshow(slides.length);

  return (
    <section
      aria-label="Featured"
      className="on-dark relative h-[100svh] max-h-[1000px] min-h-[720px] overflow-hidden bg-ink text-white"
    >
      <HeroSlides slides={slides} active={active} />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_62%_at_50%_48%,rgba(8,17,40,0.72)_0%,rgba(8,17,40,0.5)_55%,rgba(8,17,40,0.35)_100%),linear-gradient(0deg,rgba(8,17,40,0.9)_0%,rgba(8,17,40,0)_34%),linear-gradient(180deg,rgba(8,17,40,0.6)_0%,rgba(8,17,40,0)_24%)]"
      />
      <div className="relative mx-auto flex h-full w-full max-w-site flex-col px-gutter pb-[clamp(24px,4vh,40px)] pt-28">
        <div className="flex flex-1 flex-col items-center justify-center text-center">{children}</div>
      </div>
    </section>
  );
}
