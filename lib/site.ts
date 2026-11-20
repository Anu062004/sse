const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sse-rosy.vercel.app";

export const site = {
  name: "SSE Aftermarket Solution",
  shortName: "SSE",
  tagline: "The ultimate solutions for earthmoving spares",
  description:
    "Manufacturer and dealer of aftermarket spool valves, seal kits and hydraulic spares for JCB, L&T, Terex, Escorts, Case, Mahindra and CAT machines. Based in Faridabad, supplying 15+ states.",
  url: url.replace(/\/$/, ""),
  locale: "en_IN",
  email: "mavi_65@yahoo.in",
  phone: "+91 00000 00000",
  phoneHref: "+910000000000",
  whatsappNumber: "910000000000",
  address: {
    locality: "Faridabad",
    region: "Haryana",
    postalCode: "121001",
    country: "IN",
    full: "Faridabad, Haryana 121001, India",
  },
  hours: "Mon–Sat · 9:30–18:30 IST",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=SSE+Aftermarket+Solution+Faridabad",
  machines: ["JCB", "L&T", "Terex", "Escorts", "Case", "Mahindra", "CAT"],
  stats: [
    { value: 15, suffix: "+", label: "States served" },
    { value: 70, suffix: "+", label: "Product variants" },
    { value: 7, suffix: "", label: "Machine brands" },
    { value: 3, suffix: "", label: "Valve block makes" },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Site = typeof site;
