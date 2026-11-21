import productsData from "@/data/products.json";
import { categories, getCategoryName } from "@/data/categories";
import { site } from "@/lib/site";

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  part_number: string;
  machine: string;
  model: string;
  year_from: number | null;
  year_to: number | null;
  valve_block: string;
  spool_position: string;
  pack_size: string;
  material: string;
  images: string[];
  description: string;
  price: string;
  in_stock: string;
};

export const products = productsData as Product[];

export const valveBlocks = ["Husco", "Hydra Control", "Walvoil"] as const;

const featuredSlugs = [
  "jcb-3dx-xtra-loader-spool-hydra-control",
  "jcb-3dx-loader-spool-husco-2013-onwards",
  "mahindra-excavator-spool-husco",
  "lnt-terex-escorts-case-loader-spool-walvoil",
  "lnt-escorts-terex-excavator-spool",
  "cat-424b-excavator-spool",
  "jcb-3dx-xtra-unloader-spool-hydra-control",
  "gear-lever-set-jcb-3dx",
  "jcb-loader-valve-block-wiper-seal-kit",
  "stub-axle-jcb-3dx",
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return featuredSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => Boolean(product));
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.slug !== product.slug,
  );
  const sameMachine = products.filter(
    (item) =>
      item.slug !== product.slug &&
      !sameCategory.includes(item) &&
      machineMatches(item, product.machine.split(" / ")[0]),
  );
  return [...sameCategory, ...sameMachine].slice(0, limit);
}

export function getCategoryCounts() {
  return categories.map((category) => ({
    ...category,
    count: products.filter((product) => product.category === category.slug)
      .length,
  }));
}

export function getCategoryImage(slug: string): string | undefined {
  return products.find(
    (product) => product.category === slug && product.images.length > 0,
  )?.images[0];
}

export function machineMatches(product: Product, brand: string): boolean {
  return product.machine
    .split("/")
    .map((value) => value.trim().toLowerCase())
    .includes(brand.trim().toLowerCase());
}

export function getMachineCounts() {
  return site.machines.map((brand) => ({
    brand,
    count: products.filter((product) => machineMatches(product, brand)).length,
  }));
}

export function getYears(): number[] {
  const years = products
    .map((product) => product.year_from)
    .filter((year): year is number => year !== null);
  const min = Math.min(...years, 2005);
  const max = new Date().getFullYear();
  return Array.from({ length: max - min + 1 }, (_, index) => max - index);
}

export function getProductSpecs(product: Product) {
  return [
    { label: "Part number", value: product.part_number },
    { label: "Category", value: getCategoryName(product.category) },
    { label: "Machine", value: product.machine },
    { label: "Model", value: product.model },
    {
      label: "Year",
      value:
        product.year_from === null
          ? "On request"
          : product.year_to === null
            ? `${product.year_from} onwards`
            : product.year_from === product.year_to
              ? String(product.year_from)
              : `${product.year_from}–${product.year_to}`,
    },
    { label: "Valve block", value: product.valve_block },
    { label: "Spool position", value: product.spool_position },
    { label: "Pack size", value: product.pack_size },
    { label: "Material", value: product.material },
    {
      label: "Availability",
      value: product.in_stock ? "In stock" : "On request",
    },
  ];
}

export function getProductFeatures(product: Product): string[] {
  if (product.category === "spool-valves") {
    return [
      "Matched to machine, model year and valve block",
      "Sleeved in a protective tube for transit",
      "Matching seal kit available from SSE",
    ];
  }
  if (product.category === "seal-kits" || product.category === "hydro-clamp-seals") {
    return [
      "Packed and labelled by valve block",
      "Sealed SSE-branded pack",
      "Dealer and bulk packs on request",
    ];
  }
  return [
    "Fitment confirmed against your machine model",
    "Dealer and bulk rates available",
  ];
}
