import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { supplyStates } from "@/data/coverage";
import { site } from "@/lib/site";

export function Coverage() {
  return (
    <section id="coverage" className="scroll-mt-24 pb-section">
      <Container>
        <div className="reveal flex flex-wrap justify-between gap-12 border-t-2 border-navy pt-12">
          <div className="max-w-[440px]">
            <Eyebrow>Coverage</Eyebrow>
            <h2 className="display mt-[18px] text-[clamp(30px,3.4vw,50px)] font-extrabold">
              Supplying {supplyStates.length}+ states from {site.address.locality}.
            </h2>
            <ButtonLink href="/contact" variant="line" className="mt-7">
              Contact us
            </ButtonLink>
          </div>
          <ul className="flex flex-[1_1_520px] flex-wrap content-start gap-2.5">
            {supplyStates.map((state) => (
              <li key={state.name} className="chip">
                {state.name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
