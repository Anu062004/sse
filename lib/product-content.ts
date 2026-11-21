import { formatYearRange } from "@/lib/format";
import type { Product } from "@/lib/products";
import { site } from "@/lib/site";

export type SpecRow = { label: string; value: string };
export type DescriptionSection = { heading: string; paragraphs: string[] };

const hasValue = (value: string) => Boolean(value) && value !== "—";

/** “Loader spool”, “Valve block seal kit”, … — what the part is, in plain words. */
export function getPartType(product: Product): string {
  const position = product.spool_position;
  switch (product.category) {
    case "spool-valves":
      if (position.includes("3 spools")) return "Loader spool set (3 spools)";
      return `${position} spool`;
    case "seal-kits":
      return position === "Pump" ? "Hydraulic pump seal kit" : "Valve block seal kit";
    case "hydro-clamp-seals":
      return "Hydro clamp seal kit";
    case "gear-lever-sets":
      return "Gear lever set";
    case "slew-plunger-bolts":
      return "Slew plunger bolt";
    case "stub-axles":
      return "Stub axle";
    case "hub-seals":
      return "Stub axle with front hub seal";
    default:
      return position;
  }
}

/** Marketplace-style spec table for a part. Only facts held in the catalogue data. */
export function getSpecRows(product: Product): SpecRow[] {
  const years = formatYearRange(product.year_from, product.year_to);
  const rows: SpecRow[] = [
    { label: "Part type", value: getPartType(product) },
    { label: "Material", value: product.material },
    { label: "Usage / application", value: `${product.machine} ${product.model}` },
  ];
  if (hasValue(product.valve_block)) rows.push({ label: "Valve block", value: product.valve_block });
  rows.push(
    { label: "Model year", value: years || "Confirmed on enquiry" },
    { label: "Supplied as", value: product.pack_size },
    { label: "Brand", value: `${site.shortName} (aftermarket)` },
    { label: "Part no.", value: product.part_number },
  );
  return rows;
}

function applicationText(product: Product): string {
  const valve = hasValue(product.valve_block) ? ` ${product.valve_block}` : "";
  const position = product.spool_position;

  switch (product.category) {
    case "spool-valves":
      if (position.startsWith("Loader")) {
        return `The loader spool sits in the loader valve block and meters oil to the lift and bucket rams. This replacement is machined to the original land-and-groove profile so the${valve} valve block controls the loader smoothly, without internal bypass or drift.`;
      }
      if (position === "Unloader") {
        return `The unloader spool manages oil unloading inside the${valve} valve block. A worn unloader spool commonly shows up as weak or slow hydraulics across the machine; a matched replacement restores normal response.`;
      }
      return `The excavator spool controls oil flow to the backhoe end — boom, dipper, bucket and slew services. A worn spool shows up as drift, leakage or slow response; a matched replacement restores precise control.`;
    case "seal-kits":
      if (position === "Pump") {
        return "Use this kit when rebuilding the hydraulic pump. Worn seals and O-rings cause external leaks and loss of pressure; fitting a complete kit at rebuild avoids a repeat strip-down.";
      }
      return `Valve block seals keep oil in and site dust out. Replacing a worn set stops leakage around the spool ends and protects the spools from abrasive dirt${valve ? ` in the${valve} valve block` : ""}.`;
    case "hydro-clamp-seals":
      return "Hydro clamp seals keep the hydraulic clamp circuit sealed on loaders and excavators. Share the machine model and seal size for an exact match.";
    case "gear-lever-sets":
      return "Gear lever set with machined ball joints for the transmission control linkage. Replace it when worn joints make gear selection loose or imprecise.";
    case "slew-plunger-bolts":
      return "Threaded slew plunger bolt for the excavator slew and brake assembly. Share the machine model to confirm the thread and length.";
    case "stub-axles":
      return "Front stub axle for the loader front axle assembly. Share the machine model and axle details to confirm fitment.";
    case "hub-seals":
      return "Stub axle supplied together with its matching front hub seal, so both can be fitted in one job.";
    default:
      return "Share the machine model and a photo of the old part to confirm fitment.";
  }
}

/** Long-form product description, in the order a buyer reads a marketplace listing. */
export function getDescriptionSections(product: Product): DescriptionSection[] {
  const brands = product.machine.split("/").map((value) => value.trim()).join(", ");

  return [
    {
      heading: "Overview",
      paragraphs: [
        product.description,
        `${site.name} part number ${product.part_number}, supplied as ${product.pack_size.toLowerCase()}. Material: ${product.material.toLowerCase()}.`,
      ],
    },
    { heading: "Application", paragraphs: [applicationText(product)] },
    {
      heading: "Important note",
      paragraphs: [
        `Brand names and model numbers (${brands} ${product.model}) are used for reference only, to identify fitment. ${site.name} is not affiliated with or endorsed by these manufacturers. This is an aftermarket replacement part made to match the original fitment.`,
      ],
    },
    {
      heading: "How to order",
      paragraphs: [
        `Send the part number ${product.part_number}, the quantity and, if possible, a photo of the old part and its valve block on WhatsApp or through the quote form. We confirm fitment before dispatch. Prices on request — dealer and bulk rates available.`,
      ],
    },
    {
      heading: `About ${site.name}`,
      paragraphs: [
        `${site.name} is a manufacturer and dealer of earthmoving spares based in ${site.address.locality}, ${site.address.region}. We make and supply spool valves, seal kits and hydraulic spares for ${site.machines.slice(0, -1).join(", ")} and ${site.machines.at(-1)} machines, and dispatch to dealers, workshops and fleet owners in more than 15 states of India.`,
        "Every part is matched to the machine, the model year and the valve block. Spools are sleeved in protective tubes and seal kits are packed in sealed, labelled packs.",
      ],
    },
  ];
}
