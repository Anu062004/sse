"use client";

import Link from "next/link";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatFitment } from "@/lib/format";
import type { Product } from "@/lib/products";

/** Dark band with a horizontally scrolling rail of product cards. */
export function FeaturedProducts({ products }: { products: Product[] }) {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    railRef.current?.scrollBy({ left: direction * 320, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="featured" className="on-dark scroll-mt-24 bg-navy py-[clamp(80px,9vw,128px)] text-white">
      <Container>
        <SectionHeader
          tone="dark"
          label="From the catalogue"
          title={
            <>
              Current <span className="text-accent">fitments.</span>
            </>
          }
          action={
            <div className="flex gap-2.5">
              <button
                type="button"
                aria-label="Scroll products left"
                onClick={() => scroll(-1)}
                className="icbtn icbtn-light"
              >
                <ArrowLeftIcon size={18} />
              </button>
              <button
                type="button"
                aria-label="Scroll products right"
                onClick={() => scroll(1)}
                className="icbtn icbtn-light"
              >
                <ArrowRightIcon size={18} />
              </button>
            </div>
          }
        />
      </Container>

      <Container className="mt-12">
        <div
          ref={railRef}
          role="region"
          aria-label="Featured products"
          tabIndex={0}
          className="no-scrollbar flex snap-x snap-mandatory scroll-pl-1 gap-5 overflow-x-auto pb-2"
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group flex shrink-0 basis-[300px] snap-start flex-col overflow-hidden rounded-card bg-white text-navy"
            >
              <MediaFrame
                images={product.images}
                alt={product.name}
                label={product.name}
                category={product.category}
                ratio="h-[360px]"
                sizes="300px"
              />
              <div className="flex flex-col gap-2 px-[22px] pb-6 pt-5">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                  {product.machine} · {product.spool_position}
                </span>
                <span className="display text-[22px] font-bold leading-[1.05]">{product.name}</span>
                <span className="text-sm leading-[1.45] text-[#4A5672]">{formatFitment(product)}</span>
                <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold">
                  Enquire <ArrowRightIcon size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
