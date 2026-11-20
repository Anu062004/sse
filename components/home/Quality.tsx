import Image from "next/image";
import fieldDetail from "@/assets/images/site/field-detail.jpg";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    title: "Fit before finish",
    body: "Spools are matched to the valve block position, not just the machine model.",
  },
  {
    title: "Material and machining",
    body: "Parts are machined from steel and checked against the sample or drawing.",
  },
  {
    title: "Inspection",
    body: "Dimensional checks and a trial fit are carried out before a batch is packed.",
  },
  {
    title: "Packing",
    body: "Kits are packed by set, with the part number and fitment on the label.",
  },
];

export function Quality() {
  return (
    <Section id="quality" tone="paper">
      <Container>
        <SectionHeader
          index="07"
          label="Quality"
          title="Measured, matched, packed."
          intro="Fit and finish are checked before dispatch. Parts are packed by set with the part number on the label."
          action={<ArrowLink href="/about">How we work</ArrowLink>}
        />

        <div className="mt-12 grid grid-cols-4 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
          <div className="col-span-4 lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden bg-navy lg:aspect-[4/5]">
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

          <div className="col-span-4 lg:col-span-6 lg:col-start-7">
            <ol className="border-b border-navy/20">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[2rem_1fr] gap-x-4 border-t border-navy/20 py-5"
                >
                  <span className="font-mono text-[10px] tracking-[0.12em] text-navy/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-medium tracking-[-0.01em]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/60">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8">
              <ArrowLink href="/quote">Ask for a fitment check</ArrowLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
