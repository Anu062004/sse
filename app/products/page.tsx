import type { Metadata } from "next";
import { Catalogue } from "@/components/products/Catalogue";
import { parseProductFilters, type SearchParams } from "@/lib/filters";
import { products } from "@/lib/products";
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
  const filters = parseProductFilters(await searchParams);

  return <Catalogue products={products} initialFilters={filters} />;
}
