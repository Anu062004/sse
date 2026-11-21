"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";
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

/** Caption, progress bars, counter and arrows along the bottom of the hero. */
export function HeroControls({
  slides,
  active,
  onSelect,
}: {
  slides: HeroSlide[];
  active: number;
  onSelect: (index: number) => void;
}) {
  const count = slides.length;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <div className="flex w-[220px] flex-col items-center gap-2.5">
        <p aria-live="polite" className="max-w-full truncate text-xs text-white/75">
          {slides[active]?.caption}
        </p>
        <div className="flex w-full gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.desktop.src}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => onSelect(index)}
              className="relative h-[3px] flex-1 cursor-pointer overflow-hidden rounded-[3px] bg-white/[0.28] before:absolute before:-inset-y-3 before:inset-x-0"
            >
              <i
                className="block h-full bg-accent transition-[width] duration-700 ease-[var(--ease-swift)]"
                style={{ width: index <= active ? "100%" : "0%" }}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end gap-3.5 max-[640px]:hidden">
        <span className="display text-[22px] font-extrabold leading-none">
          {pad(active + 1)}
          <span className="font-semibold text-white/50"> / {pad(count)}</span>
        </span>
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => onSelect((active - 1 + count) % count)}
          className="icbtn icbtn-light"
        >
          <ArrowLeftIcon size={18} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => onSelect((active + 1) % count)}
          className="icbtn icbtn-light"
        >
          <ArrowRightIcon size={18} />
        </button>
      </div>
    </>
  );
}

/** Owns the autoplay timer; restarts it whenever the viewer picks a slide. */
export function useSlideshow(count: number) {
  const [active, setActive] = useState(0);
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setActive((value) => (value + 1) % count);
      }
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [count, epoch]);

  const select = useCallback((index: number) => {
    setActive(index);
    setEpoch((value) => value + 1);
  }, []);

  return { active, select };
}

/**
 * Full-height hero shell: crossfading photos, scrims, the server-rendered copy
 * as children, and a bottom bar with `facts` on the left and slide controls.
 */
export function HeroStage({
  slides,
  facts,
  children,
}: {
  slides: HeroSlide[];
  facts: ReactNode;
  children: ReactNode;
}) {
  const { active, select } = useSlideshow(slides.length);

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
        <div className="grid grid-cols-1 items-center justify-items-center gap-8 border-t border-white/20 pt-[22px] min-[641px]:grid-cols-[minmax(0,1fr)_auto] min-[641px]:justify-items-stretch min-[1101px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <div className="hidden min-[1101px]:block">{facts}</div>
          <HeroControls slides={slides} active={active} onSelect={select} />
        </div>
      </div>
    </section>
  );
}
