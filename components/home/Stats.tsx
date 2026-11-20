import { StatCounters } from "@/components/home/StatCounters";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Stats() {
  return (
    <Section id="numbers" tone="paper">
      <Container>
        <SectionHeader
          index="01"
          label="Intro & numbers"
          title="A Faridabad workshop, supplying the field."
          intro="We manufacture and deal in aftermarket spares for earthmoving machines — matched to the valve block, not just the model."
          action={<ArrowLink href="/about">About SSE</ArrowLink>}
        />

        <div className="mt-12 grid grid-cols-4 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
          <div className="col-span-4 lg:col-span-5">
            <p className="text-lg leading-relaxed text-navy/80 md:text-xl">
              SSE Aftermarket Solution manufactures and supplies spool valves,
              seal kits and hydraulic spares for loaders, excavators and
              backhoes.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-navy/60">
              Parts are matched to the machine, year and valve block. From
              Faridabad, we dispatch to dealers, workshops and fleet owners in
              15+ states.
            </p>
            <p className="mt-8 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-navy/50">
              Valve blocks: Husco · Hydra Control · Walvoil
            </p>
          </div>

          <div className="col-span-4 lg:col-span-6 lg:col-start-7">
            <StatCounters />
          </div>
        </div>
      </Container>
    </Section>
  );
}
