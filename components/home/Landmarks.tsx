import type { ReactNode } from "react";

/**
 * Line drawings of a landmark for each state we supply, drawn on a 64×64 grid
 * with a shared ground line so they read as one set.
 */
type Landmark = { name: string; art: ReactNode };

const ground = <path d="M6 56h52" />;

const hawaMahalWindows = [
  ...[18, 24, 30, 36, 42].map((x) => `M${x} 34v4`),
  ...[18, 24, 30, 36, 42, 46].map((x) => `M${x} 44v4`),
  ...[24, 30, 36].map((x) => `M${x} 26v4`),
  "M30 20v2",
].join("");

const konarkSpokes = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4;
  const p = (r: number) => `${(32 + r * Math.cos(a)).toFixed(2)} ${(32 + r * Math.sin(a)).toFixed(2)}`;
  return `M${p(4.5)}L${p(15)}`;
}).join("");

export const landmarks: Record<string, Landmark> = {
  Delhi: {
    name: "India Gate",
    art: (
      <>
        {ground}
        <path d="M18 56V22h28v34M26 56V37a6 6 0 0 1 12 0v19M16 22h32M20 22v-5h24v5M24 17v-4h16v4M28 13q4-6 8 0" />
      </>
    ),
  },
  Haryana: {
    name: "Kos Minar",
    art: (
      <>
        {ground}
        <path d="M22 56v-8h20v8M26 48l3-34h6l3 34M27.3 36h9.4M28.3 24h7.4M29 14q3-5 6 0" />
      </>
    ),
  },
  Punjab: {
    name: "Golden Temple",
    art: (
      <>
        <path d="M18 44V30h28v14M22 30v-8h20v8M26 22q0-10 6-12 6 2 6 12M32 10V6M17 30v-3q2-3 4 0v3M43 30v-3q2-3 4 0v3M8 44h48M12 50h12M30 50h14M48 50h8M10 55h14M32 55h18" />
      </>
    ),
  },
  Rajasthan: {
    name: "Hawa Mahal",
    art: (
      <>
        {ground}
        <path d="M14 56V30h6v-6h6v-8h12v8h6v6h6v26M28 16q2-4 4 0 2-4 4 0M14 40h36M20 30h24" />
        <path d={hawaMahalWindows} />
      </>
    ),
  },
  "Uttar Pradesh": {
    name: "Taj Mahal",
    art: (
      <>
        <path d="M8 56v-4h48v4M20 52V36h24v16M28 52v-8q4-6 8 0v8M23 36q-1-14 9-18 10 4 9 18M32 18v-5M21 36q2-4 4 0M39 36q2-4 4 0M13 52V30M51 52V30M11.5 30q1.5-4 3 0M49.5 30q1.5-4 3 0" />
      </>
    ),
  },
  Uttarakhand: {
    name: "Kedarnath",
    art: (
      <>
        {ground}
        <path d="M4 44l14-24 8 12 10-18 14 20 10 10M14 27l4-7 4 6M32 20l4-6 5 7M22 56V44h20v12M25 44l3-12h8l3 12M30 32l2-5 2 5M30 56v-6h4v6" />
      </>
    ),
  },
  "Himachal Pradesh": {
    name: "Shimla hills",
    art: (
      <>
        {ground}
        <path d="M4 46l16-28 10 14 10-12 20 26M16 56v-4M10 52l6-12 6 12zM12 45l4-9 4 9M46 56v-5M38 51l8-16 8 16zM41 43l5-11 5 11" />
      </>
    ),
  },
  "Madhya Pradesh": {
    name: "Sanchi Stupa",
    art: (
      <>
        <path d="M4 56h56M12 50h42M16 50a16 16 0 0 1 32 0M28 34v-4h8v4M32 30v-8M27 25h10M28.5 22h7M12 54v-4M54 54v-4M6 56V40M14 56V40M4 41h12M4 45h12" />
      </>
    ),
  },
  Gujarat: {
    name: "Statue of Unity",
    art: (
      <>
        {ground}
        <path d="M22 56v-6h20v6M28 19l-2 31h12l-2-31zM28 23l-3 14M36 23l2 12M30 19h4" />
        <circle cx="32" cy="14" r="3.4" />
      </>
    ),
  },
  Maharashtra: {
    name: "Gateway of India",
    art: (
      <>
        <path d="M10 52V30h44v22M26 52V41a6 6 0 0 1 12 0v11M14 52v-6a3 3 0 0 1 6 0v6M44 52v-6a3 3 0 0 1 6 0v6M10 35h44M12 30v-8h6v8M46 30v-8h6v8M26 30q0-8 6-10 6 2 6 10M12 22q3-5 6 0M46 22q3-5 6 0M6 52h52M10 56h14M30 56h14M48 56h8" />
      </>
    ),
  },
  Chhattisgarh: {
    name: "Chitrakote Falls",
    art: (
      <>
        <path d="M6 22q26 8 52 0M6 22v6M58 22v6M14 25v20M20 26.6v22M26 27.6v22M32 28v22M38 27.6v22M44 26.6v22M50 25v20M8 53q4-3 8 0t8 0 8 0 8 0 8 0 8 0" />
      </>
    ),
  },
  Bihar: {
    name: "Mahabodhi Temple",
    art: (
      <>
        {ground}
        <path d="M14 56V46h36v10M24 46l4-34h8l4 34M30 12l2-6 2 6M25.2 36h13.6M26.4 26h11.2M27.6 18h8.8M16 46l2-10h2l2 10M42 46l2-10h2l2 10M30 56v-6q2-3 4 0v6" />
      </>
    ),
  },
  Jharkhand: {
    name: "Baidyanath Dham",
    art: (
      <>
        {ground}
        <path d="M4 48q12-16 20-6M44 40q8-8 16 6M24 56V46h16v10M26 46q-2-16 6-26 8 10 6 26M29 20h6M32 20v-6l5 2-5 2M30 56v-5h4v5" />
      </>
    ),
  },
  "West Bengal": {
    name: "Howrah Bridge",
    art: (
      <>
        <path d="M4 44h56M18 44V16M46 44V16M4 40l14-24 14 10 14-10 14 24M18 16l7 28M32 26l-7 18M32 26l7 18M46 16l-7 28M8 52h14M28 52h14M48 52h8M12 56h16M36 56h14" />
      </>
    ),
  },
  Odisha: {
    name: "Konark Sun Temple",
    art: (
      <>
        <circle cx="32" cy="32" r="20" />
        <circle cx="32" cy="32" r="15" />
        <circle cx="32" cy="32" r="4.5" />
        <path d={konarkSpokes} />
      </>
    ),
  },
};

export function LandmarkArt({ state, className }: { state: string; className?: string }) {
  const landmark = landmarks[state];
  if (!landmark) return null;
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {landmark.art}
    </svg>
  );
}
