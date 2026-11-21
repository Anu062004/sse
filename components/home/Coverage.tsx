import { LandmarkArt, landmarks } from "@/components/home/Landmarks";
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
          <ul className="grid flex-[1_1_560px] grid-cols-2 gap-3 min-[560px]:grid-cols-3 min-[1100px]:grid-cols-5">
            {supplyStates.map((state) => (
              <li
                key={state.name}
                className="lift group flex flex-col items-center rounded-card border border-line bg-white px-3 pb-4 pt-5 text-center"
              >
                <LandmarkArt
                  state={state.name}
                  className="h-16 w-16 text-navy transition-colors duration-300 group-hover:text-accent"
                />
                <span className="mt-3 text-[15px] font-bold leading-tight text-navy">{state.name}</span>
                <span className="mt-1 text-xs text-muted">{landmarks[state.name]?.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
