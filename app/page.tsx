import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { Coverage } from "@/components/home/Coverage";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { ProductRange } from "@/components/home/ProductRange";
import { Quality } from "@/components/home/Quality";
import { SpoolFinder } from "@/components/home/SpoolFinder";
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
      <About />
      <ProductRange />
      <FeaturedProducts products={getFeaturedProducts()} />
      <SpoolFinder />
      <BrandMarquee />
      <Quality />
      <Coverage />
    </>
  );
}
