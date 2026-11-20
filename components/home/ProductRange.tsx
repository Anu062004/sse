import Link from "next/link";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getCategoryCounts,
  getCategoryImage,
  products,
} from "@/lib/products";

export function ProductRange() {
  const categoryCounts = getCategoryCounts();

  return (
    <Section id="products">
      <Container>
        <SectionHeader
          index="02"
          label="Product range"
          title="Spool valves, seal kits and the parts around them."
          intro="Seven categories for loaders, excavators and backhoes. Filter the catalogue by machine, valve block and year."
          action={<ArrowLink href="/products">All products</ArrowLink>}
        />

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {categoryCounts.map((category) => {
            const image = getCategoryImage(category.slug);

            return (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="group flex flex-col border-t border-navy/20 pt-4"
              >
                <MediaFrame
                  images={image ? [image] : []}
                  alt={`${category.name} from SSE Aftermarket Solution`}
                  label={category.name}
                  ratio="aspect-square"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
                <div className="mt-4 flex items-start justify-between gap-3">
                  <h3 className="text-base font-medium leading-snug tracking-[-0.02em] group-hover:underline group-hover:decoration-yellow group-hover:underline-offset-4 sm:text-lg">
                    {category.name}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-sm transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-navy/45">
                  <span>{category.index}</span>
                  <span>{category.count} parts</span>
                </div>
                <p className="mt-3 hidden text-sm leading-relaxed text-navy/60 sm:line-clamp-2">
                  {category.description}
                </p>
              </Link>
            );
          })}

          <Link
            href="/products"
            className="group flex flex-col border-t border-navy/20 pt-4"
          >
            <div className="relative flex aspect-square flex-col justify-between bg-navy p-5 text-white">
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
                  Catalogue
                </span>
                <span
                  aria-hidden="true"
                  className="text-lg transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
              <p className="text-[clamp(3rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.06em]">
                {products.length}
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
                parts listed
              </p>
            </div>
            <h3 className="mt-4 text-base font-medium leading-snug tracking-[-0.02em] group-hover:underline group-hover:decoration-yellow group-hover:underline-offset-4 sm:text-lg">
              View all products
            </h3>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-navy/45">
              Filter by machine · valve · year
            </p>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
