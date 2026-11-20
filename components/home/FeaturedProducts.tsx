"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { FitmentLine } from "@/components/ui/FitmentLine";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCategoryName } from "@/data/categories";
import type { Product } from "@/lib/products";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = (next: number) => {
    const track = trackRef.current;
    if (!track) return;

    const clamped = Math.max(0, Math.min(next, products.length - 1));
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    track.scrollTo({
      left: track.clientWidth * clamped,
      behavior: reduce ? "auto" : "smooth",
    });
    setIndex(clamped);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;

    const next = Math.round(track.scrollLeft / track.clientWidth);
    setIndex(Math.max(0, Math.min(next, products.length - 1)));
  };

  return (
    <Section id="featured" tone="paper">
      <Container>
        <SectionHeader
          index="04"
          label="Featured products"
          title="Current fitments."
          intro="A short selection from the catalogue. Every listing carries the machine, year and valve block."
          action={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                aria-label="Previous featured product"
                className="flex h-11 w-11 items-center justify-center border border-navy/25 text-lg transition-colors hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                disabled={index === products.length - 1}
                aria-label="Next featured product"
                className="flex h-11 w-11 items-center justify-center border border-navy/25 text-lg transition-colors hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                →
              </button>
              <span
                className="ml-2 font-mono text-[9px] uppercase tracking-[0.16em] text-navy/45"
                aria-live="polite"
              >
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(products.length).padStart(2, "0")}
              </span>
            </div>
          }
        />

        <div
          ref={trackRef}
          onScroll={handleScroll}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="Featured products"
          className="no-scrollbar mt-10 flex snap-x snap-mandatory overflow-x-auto motion-safe:scroll-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy md:mt-14"
        >
          {products.map((product, productIndex) => (
            <article
              key={product.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${productIndex + 1} of ${products.length}`}
              className="w-full shrink-0 snap-start"
            >
              <div className="grid grid-cols-4 gap-x-4 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
                <div className="col-span-4 lg:col-span-7">
                  <MediaFrame
                    images={product.images}
                    alt={product.name}
                    label={product.name}
                    ratio="aspect-[4/3]"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                  />
                </div>

                <div className="col-span-4 mt-6 flex flex-col lg:col-span-4 lg:col-start-9 lg:mt-0 lg:justify-center">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-navy/45">
                    {getCategoryName(product.category)}
                  </p>
                  <h3 className="mt-3 text-2xl font-medium leading-tight tracking-[-0.03em] sm:text-3xl">
                    <Link
                      href={`/products/${product.slug}`}
                      className="hover:underline hover:decoration-yellow hover:underline-offset-4"
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-navy/45">
                    Part {product.part_number}
                  </p>
                  <FitmentLine product={product} className="mt-3" />
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-navy/65">
                    {product.description}
                  </p>
                  <div className="mt-6">
                    <ArrowLink href={`/products/${product.slug}`}>
                      View product
                    </ArrowLink>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
