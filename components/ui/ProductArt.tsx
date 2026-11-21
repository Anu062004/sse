import { cn } from "@/lib/cn";

type ArtKind = "spool" | "seal" | "lever" | "bolt" | "axle" | "hub";

const kindByCategory: Record<string, ArtKind> = {
  "spool-valves": "spool",
  "seal-kits": "seal",
  "hydro-clamp-seals": "seal",
  "gear-lever-sets": "lever",
  "slew-plunger-bolts": "bolt",
  "stub-axles": "axle",
  "hub-seals": "hub",
};

function Shapes({ kind }: { kind: ArtKind }) {
  switch (kind) {
    case "seal":
      return (
        <>
          <circle cx="62" cy="45" r="30" />
          <circle cx="62" cy="45" r="21" />
          <circle cx="62" cy="45" r="16" strokeWidth="1" />
          <circle cx="140" cy="45" r="24" />
          <circle cx="140" cy="45" r="16" />
          <circle cx="140" cy="45" r="12" strokeWidth="1" />
        </>
      );
    case "lever":
      return (
        <>
          <rect x="12" y="38" width="98" height="14" rx="3" />
          <circle cx="30" cy="45" r="3" />
          <path d="M110 41h10" />
          <circle cx="140" cy="45" r="20" />
          <circle cx="140" cy="38" r="5" />
          <path d="M160 45h10" />
          <circle cx="180" cy="45" r="9" />
        </>
      );
    case "bolt":
      return (
        <>
          <rect x="14" y="37" width="104" height="16" rx="7" />
          <path d="M118 37h30v16h-30z" />
          <path d="M122 37v16M127 37v16M132 37v16M137 37v16M142 37v16" strokeWidth="1" />
          <path d="M148 33h14v24h-14z" />
          <path d="M162 30h22l4 15-4 15h-22z" />
        </>
      );
    case "axle":
      return (
        <>
          <rect x="12" y="24" width="38" height="42" rx="6" />
          <circle cx="31" cy="45" r="8" />
          <rect x="50" y="34" width="52" height="22" rx="3" />
          <path d="M56 34v22M62 34v22M68 34v22M74 34v22M80 34v22M86 34v22" strokeWidth="1" />
          <rect x="102" y="36" width="80" height="18" rx="4" />
          <path d="M168 36v18M174 36v18" />
        </>
      );
    case "hub":
      return (
        <>
          <rect x="10" y="30" width="30" height="30" rx="5" />
          <rect x="40" y="38" width="70" height="14" rx="3" />
          <path d="M48 38v14M54 38v14M60 38v14" strokeWidth="1" />
          <circle cx="152" cy="45" r="32" />
          <circle cx="152" cy="45" r="24" />
          <circle cx="152" cy="45" r="18" strokeWidth="1" />
        </>
      );
    default:
      return (
        <>
          <rect x="10" y="39" width="172" height="12" rx="3" />
          <rect x="30" y="29" width="16" height="32" rx="2.5" />
          <rect x="62" y="29" width="16" height="32" rx="2.5" />
          <rect x="98" y="29" width="16" height="32" rx="2.5" />
          <rect x="134" y="29" width="16" height="32" rx="2.5" />
          <path d="M182 39h6a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-6" />
          <circle cx="187" cy="45" r="1.8" />
          <path d="M52 39v12M56 39v12M86 39v12M90 39v12M122 39v12M126 39v12" strokeWidth="1" />
        </>
      );
  }
}

/** Outline drawing of a part, chosen by catalogue category. */
export function ProductArt({
  category,
  className,
}: {
  category: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("h-auto", className)}
    >
      <Shapes kind={kindByCategory[category] ?? "spool"} />
    </svg>
  );
}
