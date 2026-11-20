import { ArrowLink } from "@/components/ui/ArrowLink";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { telHref, whatsappHref } from "@/lib/links";
import { site } from "@/lib/site";

export function DealerCta() {
  return (
    <section className="on-dark border-t border-yellow bg-navy py-16 text-white md:py-24">
      <Container>
        <div className="grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
          <p className="col-span-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white/55 lg:col-span-2">
            08 — Dealers
          </p>

          <div className="col-span-4 lg:col-span-6 lg:col-start-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-yellow">
              Dealer enquiries · Bulk orders · Fitment support
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-4xl lg:text-[clamp(2.5rem,4vw,4.5rem)]">
              Become a dealer in your state.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
              Dealer and bulk rates for workshops, parts counters and fleet
              owners. Tell us the machines you service and we will share the
              current list.
            </p>
          </div>

          <div className="col-span-4 flex flex-col gap-3 lg:col-span-3 lg:col-start-10 lg:justify-end">
            <ButtonLink
              href={whatsappHref(
                "Hello SSE, I would like to discuss dealer supply.",
              )}
            >
              WhatsApp us
            </ButtonLink>
            <ButtonLink href={telHref} variant="outline-light">
              Call {site.phone}
            </ButtonLink>
            <ArrowLink href="/quote" className="mt-1 text-white">
              Request a quote
            </ArrowLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
