export type Category = {
  slug: string;
  name: string;
  shortName: string;
  index: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "spool-valves",
    name: "Spool Valves",
    shortName: "Spools",
    index: "01",
    description:
      "Loader, excavator and unloader spools for Husco, Hydra Control and Walvoil valve blocks.",
    image: "/images/categories/spool-valves.jpg",
  },
  {
    slug: "seal-kits",
    name: "Seal Kits",
    shortName: "Seals",
    index: "02",
    description:
      "Seal kits for hydraulic rams, spools, pumps and loader or excavator valve blocks.",
    image: "/images/categories/seal-kits.jpg",
  },
  {
    slug: "gear-lever-sets",
    name: "Gear Lever Sets",
    shortName: "Gear levers",
    index: "03",
    description:
      "Machined gear lever sets for JCB 3DX and other earthmoving applications.",
    image: "/images/categories/gear-lever-sets.jpg",
  },
  {
    slug: "hydro-clamp-seals",
    name: "Hydro Clamp Seals",
    shortName: "Clamp seals",
    index: "04",
    description:
      "Hydro clamp seal sets for hydraulic clamp circuits on loaders and excavators.",
    image: "/images/categories/hydro-clamp-seals.jpg",
  },
  {
    slug: "slew-plunger-bolts",
    name: "Slew Plunger Bolts",
    shortName: "Plunger bolts",
    index: "05",
    description:
      "Replacement slew plunger bolts for excavator slew and brake assemblies.",
    image: "/images/categories/slew-plunger-bolts.jpg",
  },
  {
    slug: "stub-axles",
    name: "Stub Axles",
    shortName: "Stub axles",
    index: "06",
    description:
      "Machined stub axles for JCB 3DX and other loader front axle assemblies.",
    image: "/images/categories/stub-axles.jpg",
  },
  {
    slug: "hub-seals",
    name: "Stub Axle with Front Hub Seal",
    shortName: "Hub seals",
    index: "07",
    description:
      "Stub axle assemblies supplied with the matching front hub seal.",
    image: "/images/categories/hub-seals.jpg",
  },
  {
    slug: "hydraulic-cylinders",
    name: "Hydraulic Cylinders",
    shortName: "Cylinders",
    index: "08",
    description:
      "Slew and other hydraulic cylinders for backhoes and loaders. Confirm mounting and dimensions on enquiry.",
    image: "/images/products/slew-and-hydraulic-cylinders/original-photo.jpg",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryName(slug: string): string {
  return getCategory(slug)?.name ?? slug;
}
