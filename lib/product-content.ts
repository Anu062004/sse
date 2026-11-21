import { formatYearRange } from "@/lib/format";
import type { Product } from "@/lib/products";
import { site } from "@/lib/site";

export type SpecRow = { label: string; value: string };
export type DescriptionSection = { heading: string; paragraphs: string[]; list?: string[] };

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

type Explainer = { what: string; where: string; signs: string[] };

/** Plain-language explanation of the part, for buyers who do not know hydraulics. */
function explainer(product: Product): Explainer {
  const position = product.spool_position;
  const machine = `${product.machine} ${product.model}`.trim();

  switch (product.category) {
    case "spool-valves":
      if (position === "Unloader") {
        return {
          what: "A spool is a precision-ground steel rod that slides inside the machine's control valve block. As it moves, its grooves open and close oil paths. The unloader spool decides when pump oil is sent to work and when it is returned to the tank.",
          where: `Inside the main control valve block of the ${machine}, under the operator's levers. It affects every hydraulic service on the machine, not just one arm.`,
          signs: ["All hydraulics feel weak or slow, even at full engine speed", "The engine labours or the oil overheats while idling", "Pressure that will not build up after a seal change"],
        };
      }
      if (position.startsWith("Loader")) {
        return {
          what: "A spool is a precision-ground steel rod that slides inside the machine's control valve block. When the operator moves a lever, the spool shifts and its grooves send oil to the right ram. The loader spool controls the front loader: lifting the arms and tilting the bucket.",
          where: `In the loader section of the control valve block on the ${machine}, linked to the loader joystick or levers in the cab.`,
          signs: ["The loader arms drop slowly on their own (drift) when the machine is parked", "Lifting or tilting is jerky, slow or weak", "Oil leaking around the spool ends at the valve block", "The lever feels stiff or does not return to centre"],
        };
      }
      return {
        what: "A spool is a precision-ground steel rod that slides inside the machine's control valve block. When the operator moves a lever, the spool shifts and its grooves send oil to the right ram. The excavator spool controls the digging end at the back of the machine: boom, dipper, bucket and slew.",
        where: `In the excavator (backhoe) section of the control valve block on the ${machine}, linked to the rear control levers.`,
        signs: ["The boom or dipper creeps down on its own", "Digging movements are slow, weak or jerky", "Oil leaking around the spool ends", "A lever that sticks or does not spring back to neutral"],
      };
    case "seal-kits":
      if (position === "Pump") {
        return {
          what: "A seal kit is the full set of rubber and polyurethane seals and O-rings needed to rebuild one component. This kit is for the hydraulic pump, which turns engine power into oil pressure for the whole machine.",
          where: `On the hydraulic pump of the ${machine}, mounted on the gearbox or engine. It is fitted whenever the pump is opened up for repair.`,
          signs: ["Oil leaking from the pump body or shaft", "Loss of pressure across all hydraulic services", "The pump has been opened for repair (always fit new seals)"],
        };
      }
      return {
        what: "A seal kit is a set of wiper seals and O-rings for the control valve block. Wiper seals sit at the ends of each spool: they stop oil leaking out and stop dust getting in, which would scratch the spools.",
        where: `On the control valve block of the ${machine}, at both ends of every spool. It is fitted when spools are serviced or when the valve block starts to leak.`,
        signs: ["Oil seeping or dripping around the spool ends", "Dust and grime building up around the valve block", "Spools have been removed or replaced"],
      };
    case "hydro-clamp-seals":
      return {
        what: "Hydro clamp seals keep the oil sealed inside the hydraulic clamp, which locks the excavator's sideshift or quick-hitch in place.",
        where: `On the hydraulic clamp of the ${machine}.`,
        signs: ["The backhoe end slides sideways while digging", "Oil leaking from the clamp", "The clamp will not hold pressure"],
      };
    case "gear-lever-sets":
      return {
        what: "The gear lever set is the linkage between the gear stick in the cab and the gearbox. Its ball joints let the operator change gear smoothly and precisely.",
        where: `Between the cab and the transmission on the ${machine}.`,
        signs: ["The gear stick feels loose or sloppy", "Gears are hard to find or jump out", "Knocking or play in the linkage"],
      };
    case "slew-plunger-bolts":
      return {
        what: "The slew plunger bolt is a threaded bolt in the slew system, which swings the excavator end left and right.",
        where: `In the slew assembly of the ${machine}, at the rear of the machine.`,
        signs: ["Play or knocking when the boom swings", "The swing does not stop cleanly", "A damaged or stripped bolt thread"],
      };
    case "stub-axles":
    case "hub-seals":
      return {
        what: product.category === "hub-seals"
          ? "The stub axle is the short shaft that the front wheel hub turns on. It is supplied here together with its hub seal, which keeps grease in and dirt and water out of the wheel bearings."
          : "The stub axle is the short shaft that the front wheel hub turns on. It carries the weight of the front of the machine and lets the wheels steer.",
        where: `At each end of the front axle of the ${machine}, behind the front wheels.`,
        signs: ["Wobble or play in a front wheel", "Uneven tyre wear or pulling to one side", "Grease leaking from the wheel hub", "Visible wear or cracks on the axle"],
      };
    default:
      return {
        what: product.description,
        where: `On the ${machine}.`,
        signs: ["Wear, leaks or loss of performance"],
      };
  }
}

/** Long-form description, ordered for a buyer who is new to these parts. */
export function getDescriptionSections(product: Product): DescriptionSection[] {
  const info = explainer(product);
  const brands = product.machine.split("/").map((value) => value.trim()).join(", ");
  const years = formatYearRange(product.year_from, product.year_to);
  const fitChecks = [
    `Machine and model: ${product.machine} ${product.model}`.trim(),
    years ? `Model year: ${years}` : "Model year: tell us the year of your machine",
    hasValue(product.valve_block)
      ? `Valve block make: ${product.valve_block} (the name is cast or stamped on the valve block)`
      : "",
    "If unsure, send a photo of the old part and its valve block. We will confirm before dispatch.",
  ].filter(Boolean);

  return [
    { heading: "What is this part?", paragraphs: [info.what] },
    { heading: "Where is it used?", paragraphs: [info.where] },
    { heading: "When should it be replaced?", paragraphs: [], list: info.signs },
    { heading: "How to check it fits your machine", paragraphs: [], list: fitChecks },
    {
      heading: "What you get",
      paragraphs: [
        `${product.pack_size}, SSE part number ${product.part_number}. Material: ${product.material.toLowerCase()}. Spools are sleeved in protective tubes; seal kits come in sealed, labelled packs.`,
      ],
    },
    {
      heading: "Important note",
      paragraphs: [
        `Brand names and model numbers (${brands} ${product.model}) are used only to identify fitment. ${site.name} is not affiliated with these manufacturers. This is an aftermarket replacement part made to match the original fitment.`,
      ],
    },
    {
      heading: `About ${site.name}`,
      paragraphs: [
        `Manufacturer and dealer of earthmoving spares based in ${site.address.locality}, ${site.address.region}, supplying dealers, workshops and fleet owners in more than 15 states of India. Prices on request; dealer and bulk rates available.`,
      ],
    },
  ];
}
