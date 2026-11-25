import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/lib/site";

/** Orange panel that opens like a curtain as it scrolls in, with headline numbers. */
export function About() {
  return (
    <section id="about" className="curtain-sec relative scroll-mt-24 bg-ink">
      <div className="curtain bg-accent pb-[clamp(64px,8vw,112px)] pt-[clamp(80px,11vw,160px)] text-navy">
        <Container className="curtain-in">
          <Eyebrow tone="accent">About SSE</Eyebrow>
          <p className="fill-wrap display mt-7 max-w-[22ch] text-[clamp(26px,3.4vw,52px)] font-bold leading-[0.98]">
            <span className="fill-text">
              For over 7 years we have manufactured precision hydraulic
              components for backhoe loaders — delivering consistent quality,
              precision and dependable service across India.
            </span>
          </p>

          <dl className="mt-[clamp(56px,7vw,96px)] grid grid-cols-2 border-t-2 border-navy min-[761px]:grid-cols-4">
            {site.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse pr-6 pt-7">
                <dt className="mt-2.5 text-[15px] font-semibold">{stat.label}</dt>
                <dd className="display text-[clamp(40px,4.2vw,68px)] font-extrabold leading-[0.9]">
                  {stat.suffix ? (
                    <>
                      {stat.value}
                      <span className="text-[0.6em]">{stat.suffix}</span>
                    </>
                  ) : (
                    String(stat.value).padStart(2, "0")
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 flex flex-wrap items-center gap-6">
            <ButtonLink href="/about" variant="on-accent">
              How we work
            </ButtonLink>
            <p className="max-w-[40ch] text-[15px] font-semibold">
              Precision in every component. Reliability in every
              partnership.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
