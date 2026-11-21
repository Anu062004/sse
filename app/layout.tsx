import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";

// Variable width axis powers the condensed `.display` headings (font-stretch: 72%).
const sans = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "spool valves",
    "seal kits",
    "JCB 3DX spool valve",
    "Husco spool",
    "Hydra Control spool",
    "Walvoil spool",
    "earthmoving spares",
    "Faridabad",
    "SSE Aftermarket Solution",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/og-v2.jpg",
        width: 1200,
        height: 630,
        alt: "SSE Aftermarket Solution — precision spares. Built for the field.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/og-v2.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/brand/icon-192.png?v=2", type: "image/png", sizes: "192x192" },
      { url: "/brand/icon-512.png?v=2", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: [
      {
        url: "/brand/apple-icon-180.png?v=2",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={sans.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <div
          aria-hidden="true"
          className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-accent"
        />
        <div className="relative">
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
        </div>
        <SiteFooter />
        <WhatsAppFloat />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
