import Image from "next/image";
import Link from "next/link";
import footerImage from "@/assets/images/site/backhoe-footer.jpg";
import { categories } from "@/data/categories";
import { mailHref, telHref, whatsappHref } from "@/lib/links";
import { site } from "@/lib/site";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";

const footerLinkClasses =
  "inline-flex min-h-8 items-center text-sm text-white/70 transition-colors hover:text-yellow";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="relative h-[260px] overflow-hidden bg-navy md:h-[340px]">
        <Image
          src={footerImage}
          alt="JCB backhoe loader working on a construction site"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-navy/65" />
        <Container className="relative flex h-full flex-col justify-end pb-8 md:pb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/65">
            Faridabad, India · Supplying 15+ states
          </p>
          <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <p className="max-w-2xl text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-white md:text-5xl">
              The ultimate solutions for earthmoving spares.
            </p>
            <ArrowLink href="/products" className="shrink-0 text-white">
              Browse the catalogue
            </ArrowLink>
          </div>
        </Container>
      </div>

      <Container className="py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex flex-col leading-none">
              <span className="text-4xl font-bold tracking-[-0.06em]">
                {site.shortName}
              </span>
              <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-white/55">
                Aftermarket Solution
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
              Manufacturer and dealer of aftermarket spool valves, seal kits and
              hydraulic spares for earthmoving machines.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-white/45">
              Prices on request.
              <br />
              Dealer and bulk rates available.
            </p>
          </div>

          <div className="border-t border-white/15 pt-8 lg:col-span-2 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <h2 className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
              Explore
            </h2>
            <ul className="mt-4 space-y-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/quote" className={footerLinkClasses}>
                  Get a quote
                </Link>
              </li>
            </ul>
          </div>

          <div className="border-t border-white/15 pt-8 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <h2 className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
              Products
            </h2>
            <ul className="mt-4 space-y-1">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className={footerLinkClasses}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/15 pt-8 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <h2 className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
              Contact
            </h2>
            <address className="mt-4 space-y-3 text-sm not-italic text-white/70">
              <p>
                SSE Aftermarket Solution
                <br />
                {site.address.full}
              </p>
              <p>
                <a href={telHref} className="hover:text-yellow">
                  {site.phone}
                </a>
                <br />
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-yellow"
                >
                  WhatsApp
                </a>
                <br />
                <a href={mailHref()} className="hover:text-yellow">
                  {site.email}
                </a>
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">
                {site.hours}
              </p>
              <p>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex border-b border-white/30 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white hover:border-yellow hover:text-yellow"
                >
                  Open in maps
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 font-mono text-[9px] uppercase tracking-[0.14em] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="normal-case tracking-normal">
            Map outline:{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:India_outline.svg"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-white/70"
            >
              Wikimedia Commons
            </a>{" "}
            (CC BY-SA 3.0)
          </p>
        </div>
      </Container>
    </footer>
  );
}
