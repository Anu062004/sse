import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCategoryName } from "@/data/categories";
import {
  buildProductsHref,
  filterProducts,
  hasActiveFilters,
  parseProductFilters,
  type SearchParams,
} from "@/lib/filters";
import { whatsappHref } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Spool Valves, Seal Kits & Hydraulic Spares",
  description:
    "Browse spool valves, seal kits, gear lever sets, hydro clamp seals, slew plunger bolts, stub axles and hub seals for JCB, L&T, Terex, Escorts, Case, Mahindra and CAT machines.",
  path: "/products",
});

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const filters = parseProductFilters(params);
  const results = filterProducts(filters);
  const active = hasActiveFilters(filters);

  const chips = [
    filters.category && {
      label: getCategoryName(filters.category),
      href: buildProductsHref(filters, { category: undefined }),
    },
    filters.machine && {
      label: filters.machine,
      href: buildProductsHref(filters, { machine: undefined }),
    },
    filters.valve && {
      label: filters.valve,
      href: buildProductsHref(filters, { valve: undefined }),
    },
    filters.year && {
      label: String(filters.year),
      href: buildProductsHref(filters, { year: undefined }),
    },
    filters.q && {
      label: `“${filters.q}”`,
      href: buildProductsHref(filters, { q: undefined }),
    },
  ].filter((chip): chip is { label: string; href: string } => Boolean(chip));

  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        title="Spool valves and seal kits, matched to the machine."
        intro="Filter by category, machine, valve block and year. Prices are quoted on request."
      />

      <Container className="py-10 md:py-12">
        <ProductFilters filters={filters} />

        <div className="mt-8 flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-start sm:justify-between">
          <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-navy/50">
            {results.length} {results.length === 1 ? "part" : "parts"}
            {active ? " · filtered" : ""}
          </p>

          {chips.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <Link
                  key={`${chip.label}-${chip.href}`}
                  href={chip.href}
                  aria-label={`Remove ${chip.label} filter`}
                  className="inline-flex items-center gap-2 border border-line px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-navy/65 transition-colors hover:border-navy hover:text-navy"
                >
                  {chip.label}
                  <span aria-hidden="true">×</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {results.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 border-t border-line pt-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-navy/50">
              No parts match
            </p>
            <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
              Try a broader filter.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-navy/65">
              Clear the filters, or send us the machine, year and valve block on
              WhatsApp. We will check the fitment for you.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/products" variant="outline">
                Clear filters
              </ButtonLink>
              <ButtonLink
                href={whatsappHref(
                  "Hello SSE, I could not find a part on the website. Can you help?",
                )}
              >
                Ask on WhatsApp
              </ButtonLink>
            </div>
          </div>
        )}

        <p className="mt-12 border-t border-line pt-6 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-navy/45">
          Prices on request · Dealer and bulk rates available · Dispatch from
          Faridabad
        </p>
      </Container>
    </>
  );
}
