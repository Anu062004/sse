import { CoverageMap } from "@/components/home/CoverageMap";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Coverage() {
  return (
    <Section id="coverage">
      <Container>
        <SectionHeader
          index="06"
          label="Coverage"
          title="Supplying 15+ states from Faridabad."
          intro="Current supply states across North, Central, West and East India. For other states, ask us."
          action={<ArrowLink href="/contact">Contact us</ArrowLink>}
        />
        <CoverageMap />
      </Container>
    </Section>
  );
}
