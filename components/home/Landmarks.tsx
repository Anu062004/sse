import type { ReactNode } from "react";

/**
 * Silhouette illustrations of a landmark for each state we supply.
 *
 * Drawn on a 64×64 grid as solid shapes in `currentColor` with openings
 * (arches, windows, bands) punched out using the even-odd fill rule, so the
 * soft sun disc behind shows through. Background scenery uses a lighter tint
 * of the same colour, and everything stands on a shared ground at y = 54.
 */
type Landmark = { name: string; art: ReactNode };

const ground = <rect x="6" y="54" width="52" height="2" rx="1" />;
const water = (
  <path
    d="M8 52.5h14M28 52.5h10M44 52.5h12M14 56h10M30 56h16"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
  />
);
/** Lighter background layer (hills, distant scenery). */
const Far = ({ d }: { d: string }) => (
  <path d={d} opacity={0.22} clipPath="url(#landmark-disc)" />
);

/** Grid of small window holes: rows of [y, x positions], each w×h. */
function windows(rows: [number, number[]][], w = 2, h = 3) {
  return rows
    .flatMap(([y, xs]) => xs.map((x) => `M${x} ${y}h${w}v${h}h-${w}z`))
    .join("");
}

const konark = (() => {
  const c = 32;
  const pt = (r: number, a: number) =>
    `${(c + r * Math.cos(a)).toFixed(2)} ${(c + r * Math.sin(a)).toFixed(2)}`;
  // Eight broad spokes and eight slim ones, alternating.
  const spoke = (a: number, half: number, r1: number, r2: number) =>
    `M${pt(r1, a - half)}L${pt(r2, a - half * 0.6)}L${pt(r2, a + half * 0.6)}L${pt(r1, a + half)}z`;
  const spokes = Array.from({ length: 16 }, (_, i) => {
    const a = (i * Math.PI) / 8 - Math.PI / 2;
    return i % 2 === 0 ? spoke(a, 0.2, 6, 17) : spoke(a, 0.07, 6, 17);
  }).join("");
  const beads = Array.from({ length: 16 }, (_, i) => {
    const a = (i * Math.PI) / 8 - Math.PI / 2 + Math.PI / 16;
    const [x, y] = pt(19.6, a).split(" ");
    return <circle key={i} cx={x} cy={y} r={0.9} fill="var(--landmark-cut, #fff)" />;
  });
  return (
    <>
      <path
        fillRule="evenodd"
        d={`M${c} ${c - 22}a22 22 0 1 1 0 44a22 22 0 1 1 0-44zM${c} ${c - 17}a17 17 0 1 0 0 34a17 17 0 1 0 0-34z`}
      />
      <path d={spokes} />
      <circle cx={c} cy={c} r={6.5} />
      <circle cx={c} cy={c} r={2.4} fill="var(--landmark-cut, #fff)" />
      {beads}
    </>
  );
})();

export const landmarks: Record<string, Landmark> = {
  Delhi: {
    name: "India Gate",
    art: (
      <>
        {ground}
        <path
          fillRule="evenodd"
          d="M20 54V25h24v29h-6V39a6 6 0 0 0-12 0v15zM22.5 31h5v1.6h-5zM36.5 31h5v1.6h-5zM18 21h28v4H18zM22 16h20v5H22zM26 12.5h12V16H26zM28 12.5q4-5.5 8 0z"
        />
      </>
    ),
  },
  Haryana: {
    name: "Kos Minar",
    art: (
      <>
        {ground}
        <path
          fillRule="evenodd"
          d="M21 54v-7h22v7zM26 47l3-31h6l3 31zM27.1 37h9.8v1.6h-9.8zM28 27h8v1.4h-8zM30 54v-4q2-2.5 4 0v4zM28.5 16q3.5-7 7 0zM31.4 9h1.2v3h-1.2z"
        />
      </>
    ),
  },
  Punjab: {
    name: "Golden Temple",
    art: (
      <>
        {water}
        <path
          fillRule="evenodd"
          d="M16 48V31h32v17zM20.5 48v-6q2-3 4 0v6zM30 48v-7q2-3.5 4 0v7zM39.5 48v-6q2-3 4 0v6zM22 31v-6h20v6zM24 25c0-8 4-11 8-14 4 3 8 6 8 14zM31.4 6h1.2v6h-1.2zM15 31v-3q2.5-4 5 0v3zM44 31v-3q2.5-4 5 0v3z"
        />
        <path d="M10 48h44v2H10z" />
      </>
    ),
  },
  Rajasthan: {
    name: "Hawa Mahal",
    art: (
      <>
        {ground}
        <path
          fillRule="evenodd"
          d={
            "M12 54V33q2.5-3 5 0v-6q2.5-3 5 0v-6q2.5-3 5 0v-6q5-5 10 0v6q2.5-3 5 0v6q2.5-3 5 0v6q2.5-3 5 0v21z" +
            windows([
              [37, [14.5, 19.5, 24.5, 29.5, 34.5, 39.5, 44.5, 49.5]],
              [44, [14.5, 19.5, 24.5, 29.5, 34.5, 39.5, 44.5, 49.5]],
              [31, [19.5, 24.5, 29.5, 34.5, 39.5, 44.5]],
              [25, [24.5, 29.5, 34.5, 39.5]],
              [19, [29.5, 34.5]],
            ]) +
            "M29.5 54v-4.5q2.5-3 5 0V54z"
          }
        />
      </>
    ),
  },
  "Uttar Pradesh": {
    name: "Taj Mahal",
    art: (
      <>
        <path
          fillRule="evenodd"
          d="M6 56v-5h52v5zM20 51V34h24v17zM28.5 51v-8q3.5-5 7 0v8zM22 39h3v5h-3zM39 39h3v5h-3zM24 34c-5-6 0-13 8-17 8 4 13 11 8 17zM31.3 10h1.4v7.5h-1.4zM19.5 34q2.5-5 5 0zM39.5 34q2.5-5 5 0zM11 51V30h3v21zM50 51V30h3v21zM10.5 30q2-5 4 0zM49.5 30q2-5 4 0z"
        />
      </>
    ),
  },
  Uttarakhand: {
    name: "Kedarnath",
    art: (
      <>
        <Far d="M2 54 18 24l7 10 11-20 26 40z" />
        <path d="M14.5 30.5 18 24l3.5 5-2 -1-2 2zM32.5 20.5 36 14l4 7.5-2.5-1.5-2 2z" fill="var(--landmark-cut, #fff)" opacity={0.9} />
        {ground}
        <path
          fillRule="evenodd"
          d="M21 54V44h22v10zM24 44l3-13q5-6 10 0l3 13zM30.6 25h2.8v6h-2.8zM29 54v-6q3-3.5 6 0v6zM26 39h12v1.4H26z"
        />
      </>
    ),
  },
  "Himachal Pradesh": {
    name: "Christ Church, Shimla",
    art: (
      <>
        <Far d="M2 54V40q10-12 20-4t20-6 20 8v16z" />
        {ground}
        <path
          fillRule="evenodd"
          d="M14 54V38l11-9 11 9v16zM18 54v-8q2-3 4 0v8zM24 54v-8q2-3 4 0v8zM23.5 40q1.5-3 3 0v2h-3zM38 54V24h10v30zM37 24l6-16 6 16zM43 28a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 1 0 0-5.2zM41.5 54v-7q1.5-3 3 0v7zM36 38l2-1.5V54h-2z"
        />
      </>
    ),
  },
  "Madhya Pradesh": {
    name: "Sanchi Stupa",
    art: (
      <>
        {ground}
        <path
          fillRule="evenodd"
          d="M10 54v-6h44v6zM13 48a19 19 0 0 1 38 0zM27 29h10v4H27zM31.3 19h1.4v10h-1.4zM27 22h10v1.6H27zM28.5 19h7v1.4h-7z"
        />
        {/* Torana gateway in front, separated by a cut-colour outline. */}
        <path
          d="M20 54V36h3v18zM41 54V36h3v18zM17 34h30v3H17zM18 39.5h28v2.5H18zM16 30q16 4 32 0v3q-16 4-32 0z"
          stroke="var(--landmark-cut, #fff)"
          strokeWidth={1.4}
          paintOrder="stroke"
        />
      </>
    ),
  },
  Gujarat: {
    name: "Statue of Unity",
    art: (
      <>
        {ground}
        <path
          fillRule="evenodd"
          d="M20 54v-4h24v4zM23 50v-5h18v5zM27.5 45 25 22q0-4 4-5h6q4 1 4 5l-2.5 23zM32 8.5a4 4 0 1 0 0 8 4 4 0 1 0 0-8zM30.6 36h2.8v9h-2.8z"
        />
      </>
    ),
  },
  Maharashtra: {
    name: "Gateway of India",
    art: (
      <>
        {water}
        <path
          fillRule="evenodd"
          d="M10 50V30h44v20zM26 50V40a6 6 0 0 1 12 0v10zM14 50v-6a2.5 2.5 0 0 1 5 0v6zM45 50v-6a2.5 2.5 0 0 1 5 0v6zM14.5 35h4v4h-4zM45.5 35h4v4h-4zM11 30v-8h6v8zM47 30v-8h6v8zM11 22q3-6 6 0zM47 22q3-6 6 0zM23 30v-3h18v3zM26 27q6-10 12 0zM31.4 15h1.2v4h-1.2z"
        />
      </>
    ),
  },
  Chhattisgarh: {
    name: "Chitrakote Falls",
    art: (
      <g clipPath="url(#landmark-disc)">
        <Far d="M0 64V22q32 10 64 0v42z" />
        <path
          fillRule="evenodd"
          d="M2 17q30 10 60 0v6q-30 10-60 0zM10 25.6h3v17q-1.5 2-3 0zM16.5 27.4h3.5v20q-1.75 2.2-3.5 0zM23.5 28.6h3v19q-1.5 2-3 0zM30 29.2h4v22q-2 2.4-4 0zM37.5 28.6h3v20q-1.5 2-3 0zM44 27.4h3.5v19q-1.75 2.2-3.5 0zM51 25.6h3v15q-1.5 2-3 0z"
        />
        <path
          d="M6 54q3-2.5 6 0t6 0 6 0 6 0 6 0 6 0 6 0 6 0 6 0"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
        />
      </g>
    ),
  },
  Bihar: {
    name: "Mahabodhi Temple",
    art: (
      <>
        {ground}
        <path
          fillRule="evenodd"
          d="M13 54v-8h38v8zM24.5 46 28 13h8l3.5 33zM29 13l3-7 3 7zM26.4 36h11.2v1.6H26.4zM27.3 27.5h9.4v1.4h-9.4zM28.2 19.5h7.6v1.3h-7.6zM30 46v-5q2-3 4 0v5zM15 46l2-12h3l2 12zM42 46l2-12h3l2 12zM29 54v-5h6v5z"
        />
      </>
    ),
  },
  Jharkhand: {
    name: "Baidyanath Dham",
    art: (
      <>
        <Far d="M2 54V44q8-10 18-6t12 4 14-8 16 6v14z" />
        {ground}
        <path
          fillRule="evenodd"
          d="M21 54V44h22v10zM24 44c0-12 3-20 8-27 5 7 8 15 8 27zM29 54v-6q3-3.5 6 0v6zM26.2 36h11.6v1.6H26.2zM27.2 28.5h9.6v1.4h-9.6zM32 12.4a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 1 0 0-4.8zM31.4 5h1.2v8h-1.2z"
        />
        <path d="M32.6 5.2 39 7.4l-6.4 2.4z" className="text-accent" fill="currentColor" />
      </>
    ),
  },
  "West Bengal": {
    name: "Howrah Bridge",
    art: (
      <>
        <path
          d="M2 42h60v3H2zM16 45V14h4v31zM44 45V14h4v31z"
        />
        <path
          d="M4 42 18 15l14 9 14-9 14 27M18 15l8 27M32 24l-6 18M32 24l6 18M46 15l-8 27M4 42h56M10 31l2 11M54 31l-2 11"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M6 50h14M26 50h12M44 50h14M12 55h14M34 55h16"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          opacity={0.45}
        />
      </>
    ),
  },
  Odisha: {
    name: "Konark Sun Temple",
    art: konark,
  },
};

export function LandmarkArt({ state, className }: { state: string; className?: string }) {
  const landmark = landmarks[state];
  if (!landmark) return null;
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <clipPath id="landmark-disc">
          <circle cx="32" cy="30" r="25" />
          <rect x="7" y="30" width="50" height="24" />
        </clipPath>
      </defs>
      <circle cx="32" cy="30" r="25" className="text-accent" fill="currentColor" opacity={0.12} />
      {landmark.art}
    </svg>
  );
}
