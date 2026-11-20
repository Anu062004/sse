import Link from "next/link";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getMachineCounts } from "@/lib/products";

export function MachineWall() {
  const machines = getMachineCounts();

  return (
    <Section id="machines">
      <Container>
        <SectionHeader
          index="05"
          label="Machines"
          title="Seven machine brands. One fitment standard."
          intro="Compatible aftermarket parts for the machines our customers run."
          action={<ArrowLink href="/products">Browse catalogue</ArrowLink>}
        />

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-0 md:mt-16 md:grid-cols-4 md:gap-x-6 lg:gap-x-8">
          {machines.map((machine) => (
            <Link
              key={machine.brand}
              href={`/products?machine=${encodeURIComponent(machine.brand)}`}
              className="group flex flex-col justify-between border-t border-navy/20 py-5"
            >
              <span className="text-[clamp(1.75rem,3.6vw,3rem)] font-medium leading-none tracking-[-0.04em] group-hover:underline group-hover:decoration-yellow group-hover:underline-offset-4">
                {machine.brand}
              </span>
              <span className="mt-6 font-mono text-[9px] uppercase tracking-[0.16em] text-navy/45">
                {machine.count > 0 ? `${machine.count} parts` : "On request"} →
              </span>
            </Link>
          ))}

          <Link
            href="/quote"
            className="group flex flex-col justify-between border-t border-navy/20 bg-paper p-5"
          >
            <span className="text-lg font-medium leading-tight tracking-[-0.02em]">
              Your machine not listed?
            </span>
            <span className="mt-6 font-mono text-[9px] uppercase tracking-[0.16em] text-navy/50 transition-colors group-hover:text-navy">
              Ask for fitment →
            </span>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
