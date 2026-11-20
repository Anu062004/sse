import type { Product } from "@/lib/products";

export function formatYearRange(
  yearFrom: number | null,
  yearTo: number | null,
): string {
  if (yearFrom === null) return "";
  if (yearTo === null) return `${yearFrom} onwards`;
  if (yearFrom === yearTo) return String(yearFrom);
  return `${yearFrom}–${yearTo}`;
}

export function formatFitment(product: Product): string {
  return [
    `${product.machine} ${product.model}`.trim(),
    product.valve_block !== "—" ? product.valve_block.toUpperCase() : "",
    formatYearRange(product.year_from, product.year_to),
  ]
    .filter(Boolean)
    .join(" · ");
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
