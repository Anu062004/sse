"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ChevronDownIcon, CloseIcon, SearchIcon } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { categories, getCategoryName } from "@/data/categories";
import { buildProductsHref, filterProducts, type ProductFilters } from "@/lib/filters";
import { valveBlocks, type Product } from "@/lib/products";
import { site } from "@/lib/site";

function PillSelect({
  id,
  label,
  value,
  allLabel,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string | undefined;
  allLabel: string;
  options: readonly string[];
  onChange: (value: string | undefined) => void;
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value || undefined)}
        className="select h-11 min-w-[170px] rounded-full border-navy/[0.14] pl-4 pr-[42px] text-sm font-semibold"
      >
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 -mt-2" />
    </div>
  );
}

/**
 * Client-side catalogue: search, category tabs, machine/valve selects and a
 * quick-view panel. Filters mirror into the URL so results stay shareable.
 */
export function Catalogue({
  products,
  initialFilters,
}: {
  products: Product[];
  initialFilters: ProductFilters;
}) {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  const results = useMemo(() => filterProducts(filters, products), [filters, products]);

  useEffect(() => {
    const href = buildProductsHref(filters);
    if (`${window.location.pathname}${window.location.search}` !== href) {
      window.history.replaceState(window.history.state, "", href);
    }
  }, [filters]);

  const update = (patch: Partial<ProductFilters>) =>
    setFilters((value) => ({ ...value, ...patch }));

  const tabs = [
    { slug: undefined, label: "All parts", count: products.length },
    ...categories.map((category) => ({
      slug: category.slug,
      label: category.name,
      count: products.filter((item) => item.category === category.slug).length,
    })),
  ];

  return (
    <>
      <PageHeader
        title="Product catalogue"
        intro="Every spool, seal kit and spare in the SSE range — filter by component, machine and valve block, then open a part for full fitment details."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Product catalogue" }]}
        aside={
          <ul className="flex gap-[clamp(20px,3vw,44px)]">
            {[
              { value: products.length, label: "Parts listed" },
              { value: site.machines.length, label: "Machine brands" },
              { value: valveBlocks.length, label: "Valve block makes" },
            ].map((stat) => (
              <li key={stat.label} className="flex flex-col gap-1 text-[13px] text-white/[0.72]">
                <span className="display text-[clamp(30px,3vw,44px)] font-extrabold leading-none text-white">
                  {stat.value}
                </span>
                {stat.label}
              </li>
            ))}
          </ul>
        }
      >
        <div className="relative z-[2] -mb-[98px] mt-10 flex h-[68px] items-center gap-3.5 rounded-card bg-white pl-6 pr-2.5 text-navy shadow-[0_30px_60px_-28px_rgba(3,8,22,0.55),0_0_0_1px_rgba(11,23,54,0.06)] focus-within:shadow-[0_30px_60px_-28px_rgba(3,8,22,0.55),0_0_0_3px_var(--acc)] md:-mb-[114px]">
          <SearchIcon size={20} className="flex-none text-accent" />
          <label htmlFor="catalogue-search" className="sr-only">
            Search parts
          </label>
          <input
            id="catalogue-search"
            type="search"
            value={filters.q ?? ""}
            onChange={(event) => update({ q: event.target.value || undefined })}
            placeholder="Search by part, machine or model — e.g. 3DX loader spool"
            className="h-full min-w-0 flex-1 bg-transparent text-base font-medium text-navy outline-none placeholder:text-muted"
          />
          <span aria-live="polite" className="flex-none whitespace-nowrap rounded-xl bg-sand px-3.5 py-2.5 text-[13px] font-semibold text-slate">
            {results.length} results
          </span>
        </div>
      </PageHeader>

      <div className="sticky top-0 z-30 mt-[52px] border-b border-navy/[0.08] bg-cream/[0.86] backdrop-blur-[14px]">
        <Container className="flex flex-wrap items-center justify-between gap-3.5 py-3.5">
          <div role="tablist" aria-label="Component" className="no-scrollbar flex max-w-full gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={filters.category === tab.slug}
                onClick={() => update({ category: tab.slug })}
                className="ftab"
              >
                {tab.label}
                <span className="ftab-count">{tab.count}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <PillSelect
              id="catalogue-machine"
              label="Machine"
              value={filters.machine}
              allLabel="All machines"
              options={site.machines}
              onChange={(machine) => update({ machine })}
            />
            <PillSelect
              id="catalogue-valve"
              label="Valve block"
              value={filters.valve}
              allLabel="All valve blocks"
              options={valveBlocks}
              onChange={(valve) => update({ valve })}
            />
          </div>
        </Container>
      </div>

      <section id="grid" className="scroll-mt-24 pb-[clamp(80px,9vw,120px)] pt-10">
        <Container>
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="display text-[clamp(26px,2.4vw,36px)] font-extrabold">
              {filters.category ? getCategoryName(filters.category) : "All parts"}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              {filters.year ? (
                <button
                  type="button"
                  onClick={() => update({ year: undefined })}
                  aria-label={`Remove year ${filters.year} filter`}
                  className="inline-flex min-h-9 items-center gap-2 rounded-full border border-navy/[0.18] bg-white px-3.5 font-semibold text-navy hover:border-navy"
                >
                  Year {filters.year}
                  <CloseIcon size={14} />
                </button>
              ) : null}
              <span>
                Showing <strong className="text-navy">{results.length}</strong> of {products.length} parts
              </span>
            </div>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 min-[521px]:grid-cols-2 min-[821px]:grid-cols-3 min-[821px]:gap-6 min-[1181px]:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3.5 rounded-3xl border-[1.5px] border-dashed border-navy/20 bg-white px-6 py-[72px] text-center">
              <p className="display text-[28px] font-extrabold">No parts match those filters.</p>
              <p className="max-w-[44ch] text-[15px] text-[#4A5672]">
                Try another machine or valve block — or send us a photo of the
                part and we will find it.
              </p>
              <Button type="button" variant="dark" size="sm" onClick={() => setFilters({})}>
                Clear filters
              </Button>
            </div>
          )}
        </Container>
      </section>

    </>
  );
}
