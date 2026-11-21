import Image from "next/image";
import Link from "next/link";
import footerImage from "@/assets/images/site/backhoe-footer.jpg";
import footerImageMobile from "@/assets/images/hero/case-mobile.jpg";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
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
    <h2 className="mb-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent">
      {children}
    </h2>
  );
}

/** Photo-backed footer: dealer pitch, glass contact card, link columns. */
export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="on-dark relative isolate mt-[clamp(12px,2vw,24px)] overflow-hidden bg-ink text-white"
    >
      <Image
        src={footerImage}
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 768px) 150vw, 100vw"
        className="bg-settle -z-20 hidden object-cover object-[center_35%] md:block"
      />
      <div className="absolute inset-x-0 top-0 -z-20 h-[70vh] overflow-hidden md:hidden">
        <Image
          src={footerImageMobile}
          alt=""
          aria-hidden="true"
          fill
          sizes="200vw"
          className="bg-settle object-cover object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(9,19,45,0.42)_0%,rgba(9,19,45,0.58)_38%,rgba(9,19,45,0.88)_72%,#09132D_100%)]"
      />
      <div aria-hidden="true" className="line-in h-[3px] bg-accent" />

      <Container className="pt-[clamp(64px,7vw,96px)]">
        <div className="grid grid-cols-1 items-end gap-[clamp(32px,5vw,80px)] min-[901px]:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div className="reveal">
            <Eyebrow tone="dark" className="text-xs tracking-[0.16em]">
              Dealer enquiries · Bulk orders · Fitment support
            </Eyebrow>
            <h2 className="display mt-[18px] max-w-[16ch] text-[clamp(34px,3.8vw,56px)] font-extrabold !leading-[0.96]">
              Become a dealer in your state.{" "}
              <span className="text-accent">We will match the part.</span>
            </h2>
            <p className="mt-[18px] max-w-[48ch] text-[15px] leading-relaxed text-white/80">
              Prices on request. Dealer and bulk rates for workshops and
              resellers — share the machine, year and valve block, or just a
              photo of the old part.
            </p>
            <div className="mt-[26px] flex flex-wrap gap-3">
              <ButtonLink href="/quote" variant="light" size="sm">
                Request a quote
              </ButtonLink>
              <ButtonLink
                href={whatsappHref("Hello SSE, I would like to discuss dealer supply.")}
                variant="ghost"
                size="sm"
                icon={<WhatsAppIcon />}
              >
                WhatsApp us
              </ButtonLink>
            </div>
          </div>

          <address className="ft-card reveal flex flex-col rounded-3xl px-[26px] pb-2.5 pt-6 not-italic">
            <div className="border-b border-white/[0.14] pb-[18px]">
              <Logo asLink={false} />
            </div>
            <a href={telHref} className="ft-row">
              <PhoneIcon size={17} />
              <span>{site.phone}</span>
            </a>
            <a href={whatsappHref()} target="_blank" rel="noreferrer" className="ft-row">
              <WhatsAppIcon size={17} />
              <span>WhatsApp · send a part photo</span>
            </a>
            <a href={mailHref()} className="ft-row">
              <MailIcon size={17} />
              <span>{site.email}</span>
            </a>
            <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="ft-row">
              <PinIcon size={17} />
              <span>{site.address.full}</span>
            </a>
            <div className="ft-row border-b-0">
              <ClockIcon size={17} />
              <span>{site.hours}</span>
            </div>
          </address>
        </div>

        <div className="mt-[clamp(56px,6vw,80px)] grid grid-cols-1 gap-[clamp(28px,4vw,56px)] border-t border-white/[0.14] py-10 min-[481px]:grid-cols-2 min-[1101px]:grid-cols-4">
          <div className="flex flex-col gap-3.5">
            <ColumnHeading>{site.shortName}</ColumnHeading>
            <p className="max-w-[30ch] text-sm leading-relaxed text-white/75">
              {site.tagline}, supplied from {site.address.locality} to 15+
              states.
            </p>
            <div className="mt-1 flex gap-2.5">
              <a href={whatsappHref()} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="social">
                <WhatsAppIcon size={17} />
              </a>
              <a href={mailHref()} aria-label="Email" className="social">
                <MailIcon size={17} />
              </a>
              <a href={telHref} aria-label="Call" className="social">
                <PhoneIcon size={17} />
              </a>
            </div>
          </div>

          <nav aria-label="Explore" className="flex flex-col gap-[11px]">
            <ColumnHeading>Explore</ColumnHeading>
            {site.footerNav.map((item) => (
              <Link key={item.href} href={item.href} className="flink">
                {item.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Products" className="flex flex-col gap-[11px]">
            <ColumnHeading>Products</ColumnHeading>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="flink"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          <nav aria-label="Machines" className="flex flex-col gap-[11px]">
            <ColumnHeading>Machines</ColumnHeading>
            {site.machines.map((machine) => (
              <Link
                key={machine}
                href={`/products?machine=${encodeURIComponent(machine)}`}
                className="flink"
              >
                {machine} spares
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3.5 border-t border-white/[0.14] pb-6 pt-5 text-[13px] text-white/65">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Prices on request · Dealer &amp; bulk rates available</p>
          <a
            href="#main"
            aria-label="Back to top"
            className="grid h-[46px] w-[46px] place-items-center rounded-full bg-accent text-navy transition-transform duration-300 hover:-translate-y-1"
          >
            <ArrowUpIcon size={17} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
