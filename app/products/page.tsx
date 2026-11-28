import type { Metadata } from "next";
import { Catalogue } from "@/components/products/Catalogue";
import { parseProductFilters, type SearchParams } from "@/lib/filters";
import { products } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Spool Valves, Seal Kits & Hydraulic Spares",
  description:
    "Browse spool valves, slew and hydraulic cylinders, ram cylinder seals, seal kits and machinery spares. Confirm machine compatibility, dimensions and availability with SSE.",
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
