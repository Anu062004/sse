"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import { CameraIcon, ChevronDownIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

/** Angles every part gets a slot for; empty slots show a placeholder until photos arrive. */
const VIEWS = ["Front view", "Side view", "Top view", "Close-up"];

function EmptySlot({ label, small = false }: { label: string; small?: boolean }) {
  return (
    <span className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#F4F3F0] text-[#9AA1B2]">
      <CameraIcon size={small ? 18 : 34} />
      {small ? null : (
        <>
          <span className="text-sm font-semibold text-slate">{label}</span>
          <span className="text-xs">Photo coming soon</span>
        </>
      )}
    </span>
  );
}

/**
 * Product photo gallery: vertical thumbnail strip with up/down controls on the
 * left (a horizontal strip on small screens) and the selected view on the right.
 */
export function ProductGallery({
  images = [],
  labels = [],
  alt,
  priority = false,
}: {
  images?: string[];
  labels?: string[];
  alt: string;
  priority?: boolean;
}) {
  const slots = Array.from({ length: Math.max(VIEWS.length, images.length) }, (_, i) => ({
    label: labels[i] ?? VIEWS[i] ?? `View ${i + 1}`,
    src: images[i] ?? null,
  }));
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);

  const go = (index: number) => setActive((index + slots.length) % slots.length);
  const current = slots[active];

  const onPointerDown = (event: PointerEvent) => {
    startX.current = event.clientX;
  };
  const onPointerUp = (event: PointerEvent) => {
    if (startX.current === null) return;
    const delta = event.clientX - startX.current;
    startX.current = null;
    if (Math.abs(delta) > 40) go(active + (delta < 0 ? 1 : -1));
  };

  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row md:gap-4">
      <div className="flex items-center gap-2 md:w-[92px] md:flex-none md:flex-col">
        <button
          type="button"
          aria-label="Previous view"
          onClick={() => go(active - 1)}
          className="hidden h-9 w-full place-items-center rounded-md bg-[#F4F3F0] text-navy transition-colors hover:bg-stone md:grid"
        >
          <ChevronDownIcon size={18} className="rotate-180" />
        </button>
        <ul className="flex flex-1 gap-2 overflow-x-auto md:flex-col md:overflow-visible">
          {slots.map((slot, index) => (
            <li key={slot.label} className="flex-none">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${slot.label.toLowerCase()}`}
                aria-current={index === active}
                className={cn(
                  "relative block h-[72px] w-[72px] overflow-hidden rounded-lg border-2 transition-colors md:h-[88px] md:w-[88px]",
                  index === active ? "border-navy" : "border-transparent hover:border-navy/30",
                )}
              >
                {slot.src ? (
                  <Image src={slot.src} alt="" fill sizes="88px" className="bg-white object-contain" />
                ) : (
                  <EmptySlot label={slot.label} small />
                )}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-label="Next view"
          onClick={() => go(active + 1)}
          className="hidden h-9 w-full place-items-center rounded-md bg-[#F4F3F0] text-navy transition-colors hover:bg-stone md:grid"
        >
          <ChevronDownIcon size={18} />
        </button>
      </div>

      <div
        className="relative aspect-square min-w-0 flex-1 touch-pan-y select-none overflow-hidden rounded-xl"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        aria-roledescription="carousel"
        aria-label={`${alt} photos`}
      >
        {current.src ? (
          <Image
            key={current.src}
            src={current.src}
            alt={`${alt} — ${current.label.toLowerCase()}`}
            fill
            sizes="(min-width: 1024px) 520px, 100vw"
            priority={priority && active === 0}
            className="fade-in bg-white object-contain"
            draggable={false}
          />
        ) : (
          <EmptySlot label={current.label} />
        )}
        {current.src && labels[active] ? (
          <span className="absolute bottom-3 left-3 max-w-[75%] rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold text-navy shadow-sm">
            {current.label}
          </span>
        ) : null}
        <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-navy shadow-sm">
          {active + 1} / {slots.length}
        </span>
      </div>
    </div>
  );
}
