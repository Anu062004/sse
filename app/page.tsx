import type { Metadata } from "next";
import { Coverage } from "@/components/home/Coverage";
import { DealerCta } from "@/components/home/DealerCta";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { MachineWall } from "@/components/home/MachineWall";
import { ProductRange } from "@/components/home/ProductRange";
import { Quality } from "@/components/home/Quality";
import { SpoolFinder } from "@/components/home/SpoolFinder";
import { Stats } from "@/components/home/Stats";
import { pageMetadata } from "@/lib/seo";
import { getFeaturedProducts } from "@/lib/products";
import { site } from "@/lib/site";

const title =
  "SSE Aftermarket Solution — Spool Valves & Seal Kits, Faridabad";

export const metadata: Metadata = {
  ...pageMetadata({
    title,
    description: site.description,
    path: "/",
  }),
  title: { absolute: title },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ProductRange />
      <SpoolFinder />
      <FeaturedProducts products={getFeaturedProducts()} />
      <MachineWall />
      <Coverage />
      <Quality />
      <DealerCta />
    </>
  );
}
