import type { Metadata } from "next";
import Image from "next/image";
import fieldDetail from "@/assets/images/site/field-detail.jpg";
import { StatCounters } from "@/components/home/StatCounters";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { quoteHref, whatsappHref } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "SSE Aftermarket Solution is a Faridabad manufacturer and dealer of aftermarket spool valves, seal kits and hydraulic spares for earthmoving machines.",
  path: "/about",
});

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
        title="Aftermarket parts, matched to the field."
        intro="A Faridabad manufacturer and dealer of spool valves, seal kits and hydraulic spares for earthmoving machines."
      />

      <Section>
        <Container>
          <div className="grid grid-cols-4 gap-x-4 gap-y-10 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
            <div className="col-span-4 lg:col-span-6">
              <p className="text-xl leading-relaxed tracking-[-0.01em] text-navy/85 md:text-2xl">
                SSE Aftermarket Solution manufactures and deals in replacement
                parts for loaders, excavators and backhoes.
              </p>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-navy/65 md:text-base">
                The catalogue covers spool valves, seal kits, gear lever sets,
                hydro clamp seals, slew plunger bolts, stub axles and hub seals.
                Most parts are supplied for JCB, L&amp;T, Terex, Escorts, Case,
                Mahindra and CAT machines.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-navy/65 md:text-base">
                The work is built around fitment. A model badge is not enough:
                the year and the valve block decide which spool or kit fits. We
                keep those details on every listing so the next order is easier.
              </p>
              <div className="mt-8">
                <ArrowLink href="/products">Browse the catalogue</ArrowLink>
              </div>
            </div>

            <div className="col-span-4 lg:col-span-5 lg:col-start-8">
              <div className="relative aspect-[4/5] overflow-hidden bg-paper">
                <Image
                  src={fieldDetail}
                  alt="Excavator tracks on a working site"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-navy/45">
                Built for abrasive site conditions · Faridabad
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeader
            index="01"
            label="SSE in numbers"
            title="A small catalogue, worked in depth."
            intro="Repeat supply is most of our work: the same spool, the same kit, the same pack size, order after order."
          />

          <div className="mt-12 grid grid-cols-4 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
            <div className="col-span-4 lg:col-span-5">
              <p className="text-lg leading-relaxed text-navy/75 md:text-xl">
                We would rather list a part correctly than list every part
                available. Each entry carries the machine, model, year range,
                valve block and pack size.
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
                <p className="font-mono text-[10px] tracking-[0.14em] text-navy/40">
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

      <section className="on-dark border-t border-yellow bg-navy py-16 text-white md:py-20">
        <Container>
          <div className="grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
            <div className="col-span-4 lg:col-span-7">
              <h2 className="text-3xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                Need a part that is not listed?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                Send the machine, year and a photo of the old part. We will check
                the fitment and confirm the pack size.
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
