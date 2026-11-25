const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sse-rosy.vercel.app";

export const site = {
  name: "S S Engineering",
  shortName: "SSE",
  tagline: "Precision Engineering. Reliable Performance.",
  description:
    "Manufacturer and supplier of high-precision hydraulic spools, seal kits and aftermarket spares for backhoe loaders and excavators — JCB, L&T, Escorts, Terex, Bull, Caterpillar and Mahindra. 7+ years of experience, based in Faridabad.",
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
    "https://www.google.com/maps/search/?api=1&query=S+S+Engineering+Faridabad",
  machines: ["JCB", "L&T", "Escorts", "Terex", "Bull", "Caterpillar", "Mahindra"],
  stats: [
    { value: 7, suffix: "+", label: "Years of industry experience" },
    { value: 15, suffix: "+", label: "States supplied across India" },
    { value: 70, suffix: "+", label: "Product variants" },
    { value: 7, suffix: "", label: "Equipment brands served" },
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
