import { categories, getCategoryName } from "@/data/categories";
import {
  machineMatches,
  products,
  valveBlocks,
  type Product,
} from "@/lib/products";
import { site } from "@/lib/site";

export type ProductFilters = {
  category?: string;
  machine?: string;
  valve?: string;
  year?: number;
  q?: string;
};

export type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseProductFilters(params: SearchParams): ProductFilters {
  const category = first(params.category);
  const machine = first(params.machine);
  const valve = first(params.valve);
  const yearValue = Number.parseInt(first(params.year) ?? "", 10);
  const query = first(params.q)?.trim().slice(0, 80);
  const currentYear = new Date().getFullYear();

  return {
    category: categories.some((item) => item.slug === category)
      ? category
      : undefined,
    machine: site.machines.some((item) => item === machine)
      ? machine
      : undefined,
    valve: valveBlocks.some((item) => item === valve) ? valve : undefined,
    year:
      Number.isFinite(yearValue) &&
      yearValue >= 1990 &&
      yearValue <= currentYear + 1
        ? yearValue
        : undefined,
    q: query || undefined,
  };
}

function matchesYear(product: Product, year: number): boolean {
  if (product.year_from === null) return false;
  if (year < product.year_from) return false;
  if (product.year_to === null) return true;
  return year <= product.year_to;
}

/** Everything a visitor might type to find a part, lower-cased. */
function searchText(product: Product): string {
  return [
    product.name,
    product.part_number,
    product.machine,
    product.model,
    product.valve_block,
    product.spool_position,
    getCategoryName(product.category),
    product.description,
  ]
    .join(" ")
    .toLowerCase()
    .replace(/[—–-]/g, " ");
}

/**
 * True when every word of the query appears somewhere in the product, in any
 * order — so "husco 3dx loader" and "loader spool jcb" both match.
 */
export function matchesQuery(product: Product, query: string): boolean {
  const words = query.toLowerCase().replace(/[—–-]/g, " ").split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const text = searchText(product);
  return words.every((word) => text.includes(word));
}

export function filterProducts(
  filters: ProductFilters,
  list: Product[] = products,
): Product[] {
  const query = filters.q?.trim();

  return list.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.machine && !machineMatches(product, filters.machine)) {
      return false;
    }
    if (filters.valve && !product.valve_block.includes(filters.valve)) return false;
    if (filters.year && !matchesYear(product, filters.year)) return false;
    if (query && !matchesQuery(product, query)) return false;
    return true;
  });
}

export function hasActiveFilters(filters: ProductFilters): boolean {
  return Boolean(
    filters.category ||
      filters.machine ||
      filters.valve ||
      filters.year ||
      filters.q,
  );
}

export function buildProductsHref(
  filters: ProductFilters,
  overrides: Partial<ProductFilters> = {},
): string {
  const next = { ...filters, ...overrides };
  const params = new URLSearchParams();

  if (next.category) params.set("category", next.category);
  if (next.machine) params.set("machine", next.machine);
  if (next.valve) params.set("valve", next.valve);
  if (next.year) params.set("year", String(next.year));
  if (next.q) params.set("q", next.q);

  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}
