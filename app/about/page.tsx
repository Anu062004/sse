import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StatCounters } from "@/components/home/StatCounters";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { quoteHref, whatsappHref } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "S S Engineering (SSE) manufactures and supplies high-precision hydraulic spools, seal kits and aftermarket spares for backhoe loaders and excavators, with over 7 years of industry experience.",
  path: "/about",
});

const reasons = [
  {
    title: "Over 7 years of industry experience",
    body: "Years of supplying dealers, workshops and fleet owners have shaped how we make and match every part.",
  },
  {
    title: "Precision-engineered components",
    body: "Lands, grooves and sealing faces are machined and finished to match the original part.",
  },
  {
    title: "Wide range of aftermarket parts",
    body: "Spools, seal kits, gear lever sets, stub axles and specialised parts from one supplier.",
  },
  {
    title: "Consistent product quality",
    body: "The same part, the same finish and the same pack, order after order.",
  },
  {
    title: "Pan-India supply network",
    body: "Regular supply to Rajasthan, Maharashtra, Bihar, Bengaluru, South India and beyond.",
  },
  {
    title: "Commitment to global markets",
    body: "Building reliable, competitively manufactured aftermarket supply for buyers outside India too.",
  },
];

const range = [
  "Hydraulic spools — backhoe loader, excavator and loader applications",
  "Unloader spools",
  "Hydraulic seal kits, brake seals and ram cylinder seal kits",
  "Gear lever sets",
  "Slew plunger bolts and turret washers",
  "Stub axle shafts and pump gear shafts",
  "Front hub sleeves and hydra clamp seals",
  "Other specialised hydraulic components",
];

/** Real SSE parts shown in the intro, one per brand family. */
const showcase = [
  {
    slug: "jcb-3dx-loader-spool-husco-2008-2010",
    image: "/images/products/jcb-3dx-loader-spool-husco-2008-2010-end.jpg",
    brand: "JCB",
    part: "3DX loader spool set · Husco",
    fit: "object-contain bg-white p-4 sm:p-6",
  },
  {
    slug: "lnt-escorts-terex-excavator-spool",
    image: "/images/products/lnt-escorts-terex-excavator-spool.jpg",
    brand: "L&T · Escorts · Terex",
    part: "Excavator spool",
    fit: "object-cover",
  },
  {
    slug: "cat-424b-excavator-spool",
    image: "/images/products/cat-424b-excavator-spool.jpg",
    brand: "Caterpillar",
    part: "424B excavator spools",
    fit: "object-cover",
  },
  {
    slug: "mahindra-excavator-spool-husco",
    image: "/images/products/mahindra-excavator-spool-husco.jpg",
    brand: "Mahindra",
    part: "Excavator spool · Husco",
    fit: "object-cover",
  },
];

const work = [
  {
    title: "We manufacture",
    body: "Hydraulic spools and components are machined, ground and finished in Faridabad to match the original part's lands, grooves and end detail.",
  },
  {
    title: "We match",
    body: "Every part is identified by machine, model year and valve block — Husco, Hydra Control or Walvoil — so it fits the first time.",
  },
  {
    title: "We supply",
    body: "Dealers, workshops and fleet owners order single parts or bulk sets, packed and labelled, dispatched across India.",
  },
];

const principles = [
  {
    title: "Confirm the fitment",
    body: "Machine, model, year and valve block. We check the combination before quoting.",
  },
  {
    title: "Match the part",
    body: "Spool position, pack size and material are matched to the old part or the drawing.",
  },
  {
    title: "Pack and dispatch",
    body: "Kits are packed by set, labelled with the part number, and dispatched from Faridabad.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About SSE"
        title="Precision hydraulic components. Quality you can trust."
        intro="S S Engineering (SSE) manufactures and supplies high-precision hydraulic components and aftermarket spares for backhoe loaders, with over 7 years of industry experience."
      />

      <Section>
        <Container>
          <div className="grid grid-cols-4 gap-x-4 gap-y-12 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <p className="text-xl leading-relaxed tracking-[-0.01em] text-navy/85 md:text-2xl">
                We make the hydraulic parts that keep backhoe loaders and
                excavators working — the spools that steer oil inside the
                control valve, and the seals, shafts and levers around them.
              </p>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-navy/65 md:text-base">
                We specialise in precision-engineered hydraulic spools, seal kits
                of every type, ram cylinder seal kits, gear lever sets, slew
                plunger bolts, stub axle shafts, pump gear shafts, turret washers,
                front hub sleeves, hydra clamp seals and many other specialised
                parts — for backhoe loader, excavator and loader applications on
                JCB, L&amp;T, Escorts, Terex, Bull, Caterpillar and Mahindra
                machines.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-navy/65 md:text-base">
                With a strong supply network across India — including Rajasthan,
                Maharashtra, Bihar, Bengaluru and the South — we are committed to
                consistent quality, precision and dependable service, and we aim
                to serve both domestic and international markets.
              </p>

              <div className="mt-8">
                <ArrowLink href="/products">Browse the catalogue</ArrowLink>
              </div>
            </div>

            <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">What we do</h2>
              <ol className="mt-4 grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
                {work.map((step, index) => (
                  <li key={step.title} className="border-t-2 border-accent pt-3">
                    <h3 className="text-[15px] font-bold text-navy">
                      <span className="mr-2 text-accent">{String(index + 1).padStart(2, "0")}</span>
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy/65">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      <section className="bg-cream pb-section text-navy">
        <Container>
          <div className="grid grid-cols-4 gap-x-4 gap-y-10 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
            <div className="col-span-4 md:col-span-8 lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-muted before:h-0.5 before:w-8 before:bg-accent">
                Real SSE parts
              </p>
              <h2 className="display mt-4 text-[clamp(30px,3.4vw,50px)] font-extrabold leading-[1.02] text-navy">
                Made for every brand we serve.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-navy/65 md:text-base">
                Spools we manufacture for JCB, L&amp;T, Escorts, Terex,
                Caterpillar and Mahindra machines — photographed in our
                Faridabad workshop.
              </p>
              <div className="mt-6">
                <ArrowLink href="/products">See all parts</ArrowLink>
              </div>
            </div>

            <ul className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
              {showcase.map((item, index) => (
                <li
                  key={item.slug}
                  className="stack-card mb-6 last:mb-0 lg:sticky lg:mb-[18vh] lg:last:mb-0"
                  style={{ top: `calc(8rem + ${index * 22}px)` }}
                >
                  <Link
                    href={`/products/${item.slug}`}
                    className="group grid overflow-hidden rounded-panel border border-navy/10 bg-white shadow-[0_24px_60px_-30px_rgba(11,21,48,0.45)] sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-white sm:aspect-auto sm:min-h-[360px]">
                      <Image
                        src={item.image}
                        alt={`${item.brand} ${item.part} made by SSE`}
                        fill
                        sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 100vw"
                        className={`${item.fit} transition-transform duration-700 group-hover:scale-[1.04]`}
                      />
                    </div>
                    <div className="flex flex-col justify-between gap-8 p-6 md:p-8">
                      <span className="display text-sm font-extrabold text-muted">
                        {String(index + 1).padStart(2, "0")} / {String(showcase.length).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="display text-[clamp(26px,2.4vw,36px)] font-extrabold leading-[1.05] text-navy">
                          {item.brand}
                        </p>
                        <p className="mt-2 text-sm text-navy/65 md:text-base">{item.part}</p>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy group-hover:text-accent">
                          View part
                          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Section tone="white">
        <Container>
          <SectionHeader
            index="01"
            label="SSE in numbers"
            title="Seven years. One standard."
            intro="Consistent quality for a single spool and a dealer order alike."
          />

          <div className="mt-12 grid grid-cols-4 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
            <div className="col-span-4 lg:col-span-5">
              <p className="text-lg leading-relaxed text-navy/75 md:text-xl">
                Every listing carries the machine, model, year range, valve block
                and pack size, so the part you order is the part that fits.
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-navy/60">
                If a part is missing from the catalogue, send a photo of the old
                part with the machine details. We will identify it and confirm
                availability.
              </p>
              <div className="mt-6">
                <ArrowLink href="/quote">Ask for a fitment check</ArrowLink>
              </div>
            </div>

            <div className="col-span-4 lg:col-span-6 lg:col-start-7">
              <StatCounters />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            index="02"
            label="Why choose SSE"
            title="Precision in every component."
            intro="Reliability in every partnership."
          />

          <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {reasons.map((reason, index) => (
              <li key={reason.title} className="border-t border-navy/20 pt-4">
                <p className="text-xs font-bold tracking-[0.14em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em]">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">{reason.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeader
            index="03"
            label="Our product range"
            title="One supplier for the hydraulic side."
            intro="Parts for backhoe loader, excavator and loader applications."
          />

          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:mt-16 lg:grid-cols-12">
            <ul className="lg:col-span-7">
              {range.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-navy/10 py-3.5 text-[15px] text-navy/80"
                >
                  <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Brands we serve</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {site.machines.map((brand) => (
                  <li
                    key={brand}
                    className="rounded-full border border-navy/15 bg-cream px-4 py-2 text-sm font-semibold text-navy"
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            index="04"
            label="How we work"
            title="Three steps, no guesswork."
            intro="The same checks apply to a single spool and a dealer order."
          />

          <div className="mt-12 grid grid-cols-4 gap-x-4 gap-y-8 md:mt-16 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
            {principles.map((principle, index) => (
              <div
                key={principle.title}
                className="col-span-4 border-t border-navy/20 pt-4 md:col-span-4 lg:col-span-4"
              >
                <p className="text-xs font-bold tracking-[0.14em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg font-medium tracking-[-0.02em]">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <section className="on-dark border-t border-accent bg-navy py-16 text-white md:py-20">
        <Container>
          <div className="grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
            <div className="col-span-4 lg:col-span-7">
              <h2 className="text-3xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                SSE — your trusted partner in hydraulic components.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                Need a part that is not listed? Send the machine, year and a
                photo of the old part. We will check the fitment and confirm the
                pack size.
              </p>
            </div>
            <div className="col-span-4 flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:col-start-9 lg:justify-end">
              <ButtonLink
                href={whatsappHref(
                  "Hello SSE, I need help finding a part that is not listed.",
                )}
              >
                WhatsApp
              </ButtonLink>
              <ButtonLink href={quoteHref()} variant="outline-light">
                Get a quote
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
