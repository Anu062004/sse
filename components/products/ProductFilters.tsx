import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { categories } from "@/data/categories";
import type { ProductFilters as Filters } from "@/lib/filters";
import { hasActiveFilters } from "@/lib/filters";
import { getYears, valveBlocks } from "@/lib/products";
import { site } from "@/lib/site";

const fieldClass =
  "h-11 w-full border-b border-navy/25 bg-transparent text-sm text-navy focus:border-navy focus:outline-none";
const labelClass =
  "block font-mono text-[9px] uppercase tracking-[0.18em] text-navy/50";

export function ProductFilters({ filters }: { filters: Filters }) {
  const years = getYears();

  return (
    <form
      action="/products"
      method="get"
      aria-label="Filter products"
      className="border-b border-line pb-6"
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label htmlFor="filter-q" className={labelClass}>
            Search
          </label>
          <input
            id="filter-q"
            type="search"
            name="q"
            defaultValue={filters.q ?? ""}
            placeholder="Part number or model"
            className={`${fieldClass} placeholder:text-navy/30`}
          />
        </div>

        <div>
          <label htmlFor="filter-category" className={labelClass}>
            Category
          </label>
          <select
            id="filter-category"
            name="category"
            defaultValue={filters.category ?? ""}
            className={fieldClass}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-machine" className={labelClass}>
            Machine
          </label>
          <select
            id="filter-machine"
            name="machine"
            defaultValue={filters.machine ?? ""}
            className={fieldClass}
          >
            <option value="">All machines</option>
            {site.machines.map((machine) => (
              <option key={machine} value={machine}>
                {machine}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-valve" className={labelClass}>
            Valve block
          </label>
          <select
            id="filter-valve"
            name="valve"
            defaultValue={filters.valve ?? ""}
            className={fieldClass}
          >
            <option value="">All valve blocks</option>
            {valveBlocks.map((valve) => (
              <option key={valve} value={valve}>
                {valve}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-year" className={labelClass}>
            Year
          </label>
          <select
            id="filter-year"
            name="year"
            defaultValue={filters.year ? String(filters.year) : ""}
            className={fieldClass}
          >
            <option value="">Any year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" className="min-h-11 px-5">
          Apply filters
        </Button>
        {hasActiveFilters(filters) ? (
          <Link
            href="/products"
            className="text-[10px] font-semibold uppercase tracking-[0.16em] text-navy/55 underline-offset-4 hover:text-navy hover:underline"
          >
            Clear all
          </Link>
        ) : null}
      </div>
    </form>
  );
}
