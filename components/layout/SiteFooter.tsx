import Link from "next/link";
import type { ReactNode } from "react";
import { FooterAnimation } from "@/components/layout/FooterAnimation";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  ArrowUpIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { categories } from "@/data/categories";
import { mailHref, telHref, whatsappHref } from "@/lib/links";
import { site } from "@/lib/site";

function ColumnHeading({ children }: { children: string }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white">
      {children}
    </h2>
  );
}

function ContactRow({
  icon,
  href,
  children,
}: {
  icon: ReactNode;
  href?: string;
  children: ReactNode;
}) {
  const content = (
    <>
      <span className="mt-0.5 flex-none text-accent">{icon}</span>
      <span>{children}</span>
    </>
  );
  const classes = "flex items-start gap-3 text-sm leading-snug text-white/70";

  if (!href) return <li className={classes}>{content}</li>;

  const external = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        className={`${classes} transition-colors hover:text-white`}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {content}
      </a>
    </li>
  );
}

/** Animated enquiry banner, followed by link columns and the legal bar. */
export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink text-white">
      <div className="h-[3px] bg-accent" aria-hidden="true" />

      <div className="relative isolate overflow-hidden">
        <FooterAnimation />
        <Container className="relative z-10 flex min-h-[360px] items-center pb-24 pt-16 md:min-h-[400px] md:pt-20">
          <div className="max-w-[600px]">
            <p className="display text-[clamp(30px,3.2vw,46px)] font-extrabold leading-tight">
              Need a part matched to your machine?
            </p>
            <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-white/80">
              Share the machine, year and valve block — or a photo of the old
              part. Dealer and bulk rates available.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/quote" variant="light" size="sm">
                Request a quote
              </ButtonLink>
              <ButtonLink
                href={whatsappHref("Hello SSE, I would like a quote for hydraulic spares.")}
                variant="whatsapp"
                size="sm"
              >
                WhatsApp
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-[1.5fr_1fr_1.2fr_1.4fr] lg:gap-x-10">
          <div className="col-span-2 lg:col-span-1">
            <Logo className="h-14" />
            <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-white/65">
              Precision hydraulic components and aftermarket spares for
              backhoe loaders and excavators. 7+ years of experience,
              supplying across India from {site.address.locality}.
            </p>
          </div>

          <nav aria-label="Explore">
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="mt-4 space-y-2.5">
              {site.footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Products">
            <ColumnHeading>Products</ColumnHeading>
            <ul className="mt-4 space-y-2.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/products?category=${category.slug}`} className="flink">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-1">
            <ColumnHeading>Contact</ColumnHeading>
            <address className="mt-4 not-italic">
              <ul className="space-y-3">
                <ContactRow icon={<PhoneIcon size={16} />} href={telHref}>
                  {site.phone}
                </ContactRow>
                <ContactRow icon={<WhatsAppIcon size={16} />} href={whatsappHref()}>
                  WhatsApp a part photo
                </ContactRow>
                <ContactRow icon={<MailIcon size={16} />} href={mailHref()}>
                  {site.email}
                </ContactRow>
                <ContactRow icon={<PinIcon size={16} />} href={site.mapsUrl}>
                  {site.address.full}
                </ContactRow>
                <ContactRow icon={<ClockIcon size={16} />}>{site.hours}</ContactRow>
              </ul>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <p>Prices on request</p>
            <a
              href="#main"
              className="inline-flex items-center gap-1.5 font-semibold text-white/70 transition-colors hover:text-accent"
            >
              Back to top
              <ArrowUpIcon size={14} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
