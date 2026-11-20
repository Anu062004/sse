import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
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
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "SSE Aftermarket Solution — precision spares for earthmoving machines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-navy focus:px-4 focus:py-3 focus:text-[10px] focus:font-semibold focus:uppercase focus:tracking-[0.16em] focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <div
          aria-hidden="true"
          className="h-[calc(3.75rem+env(safe-area-inset-bottom))] lg:hidden"
        />
        <MobileActionBar />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
