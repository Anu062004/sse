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
    { value: 15, suffix: "+", label: "States supplied across India" },
    { value: 70, suffix: "+", label: "Product variants" },
    { value: 7, suffix: "", label: "Machine brands covered" },
    { value: 3, suffix: "", label: "Valve block makes — Husco, Hydra Control, Walvoil" },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Catalogue", href: "/products" },
    { label: "Spool finder", href: "/#finder" },
    { label: "Quality", href: "/#quality" },
    { label: "Contact", href: "/contact" },
  ],
  footerNav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Catalogue", href: "/products" },
    { label: "Gallery", href: "/gallery" },
    { label: "Journal", href: "/blog" },
    { label: "Get a quote", href: "/quote" },
  ],
} as const;

export type Site = typeof site;
