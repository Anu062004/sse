"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import caseDesktop from "@/assets/images/hero/case-desktop.jpg";
import jcbDesktop from "@/assets/images/hero/jcb-xcmg-desktop.jpg";
import backhoe from "@/assets/images/site/backhoe-footer.jpg";

type GalleryItem = {
  src: StaticImageData;
  alt: string;
  caption: string;
  meta: string;
  span: string;
  ratio: string;
  sizes: string;
};

const items: GalleryItem[] = [
  {
    src: caseDesktop,
    alt: "CASE CX210B excavator working on a construction site",
    caption: "CASE CX210B",
    meta: "Excavator · field",
    span: "md:col-span-7",
    ratio: "aspect-[4/3]",
    sizes: "(min-width: 768px) 58vw, 100vw",
  },
  {
    src: jcbDesktop,
    alt: "JCB and XCMG excavators on a sandy site",
    caption: "JCB and XCMG",
    meta: "Excavators · site fleet",
    span: "md:col-span-5",
    ratio: "aspect-[4/3]",
    sizes: "(min-width: 768px) 42vw, 100vw",
  },
  {
    src: backhoe,
    alt: "JCB backhoe loader working on a construction site",
    caption: "JCB backhoe",
    meta: "Loader application · field",
    span: "md:col-span-12",
    ratio: "aspect-[4/3] md:aspect-[21/9]",
    sizes: "100vw",
  },
];

export function GalleryGrid() {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const current = index === null ? null : items[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (index !== null && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
      closeRef.current?.focus();
    } else if (index === null && dialog.open) {
      dialog.close();
    }

    if (index === null) {
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [index]);

  const showPrevious = () => {
    setIndex((value) =>
      value === null ? 0 : (value - 1 + items.length) % items.length,
    );
  };

  const showNext = () => {
    setIndex((value) =>
      value === null ? 0 : (value + 1) % items.length,
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-12">
        {items.map((item, itemIndex) => (
          <button
            key={item.caption}
            type="button"
            onClick={() => setIndex(itemIndex)}
            aria-label={`Open image ${itemIndex + 1}: ${item.caption}`}
            className={`group block text-left ${item.span}`}
          >
            <div className={`relative overflow-hidden bg-paper ${item.ratio}`}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={item.sizes}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <span
                aria-hidden="true"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-white/90 font-mono text-sm text-navy"
              >
                +
              </span>
            </div>
            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{item.caption}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                  {item.meta}
                </p>
              </div>
              <span className="text-xs font-bold tracking-[0.14em] text-muted">
                {String(itemIndex + 1).padStart(2, "0")}
              </span>
            </div>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            showNext();
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            showPrevious();
          }
        }}
        aria-labelledby="gallery-viewer-title"
        className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-navy p-0 text-white backdrop:bg-navy/80"
      >
        <h2 id="gallery-viewer-title" className="sr-only">
          Image viewer
        </h2>
        {current && index !== null ? (
          <div className="flex h-dvh flex-col">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/15 px-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setIndex(null)}
                className="min-h-11 border border-white/30 px-4 text-[10px] font-semibold uppercase tracking-[0.16em]"
              >
                Close
              </button>
            </div>

            <div className="relative min-h-0 flex-1">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <div className="flex shrink-0 items-center justify-between gap-4 border-t border-white/15 px-5 py-4">
              <div>
                <p className="text-sm font-medium">{current.caption}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/50">
                  {current.meta}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous image"
                  className="flex h-11 w-11 items-center justify-center border border-white/30 text-lg transition-colors hover:bg-white hover:text-navy"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next image"
                  className="flex h-11 w-11 items-center justify-center border border-white/30 text-lg transition-colors hover:bg-white hover:text-navy"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
