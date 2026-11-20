import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getYears, valveBlocks } from "@/lib/products";
import { whatsappHref } from "@/lib/links";
import { site } from "@/lib/site";

const selectClass =
  "mt-3 h-12 w-full border-b border-white/30 bg-transparent pr-6 text-base text-white [color-scheme:dark] focus:border-yellow focus:outline-none";

export function SpoolFinder() {
  const years = getYears();

  return (
    <Section id="finder" tone="navy">
      <Container>
        <SectionHeader
          index="03"
          label="Find your spool"
          title="Three checks. The right spool."
          intro="Tell us the machine, year and valve block. We will narrow the catalogue to the fitment."
        />

        <form
          action="/products"
          method="get"
          className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 md:mt-16 sm:grid-cols-2 lg:grid-cols-[1fr_0.7fr_1fr_auto] lg:items-end"
        >
          <div>
            <label
              htmlFor="finder-machine"
              className="block font-mono text-[9px] uppercase tracking-[0.18em] text-white/55"
            >
              Machine
            </label>
            <select
              id="finder-machine"
              name="machine"
              defaultValue=""
              className={selectClass}
            >
              <option value="">Any machine</option>
              {site.machines.map((machine) => (
                <option key={machine} value={machine}>
                  {machine}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="finder-year"
              className="block font-mono text-[9px] uppercase tracking-[0.18em] text-white/55"
            >
              Year
            </label>
            <select
              id="finder-year"
              name="year"
              defaultValue=""
              className={selectClass}
            >
              <option value="">Any year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="finder-valve"
              className="block font-mono text-[9px] uppercase tracking-[0.18em] text-white/55"
            >
              Valve block
            </label>
            <select
              id="finder-valve"
              name="valve"
              defaultValue=""
              className={selectClass}
            >
              <option value="">Any valve block</option>
              {valveBlocks.map((valve) => (
                <option key={valve} value={valve}>
                  {valve}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" className="w-full lg:w-auto">
            Search fitment
          </Button>
        </form>

        <p className="mt-8 text-sm leading-relaxed text-white/60">
          Not sure of the valve block?{" "}
          <a
            href={whatsappHref(
              "Hello SSE, I need help identifying a spool valve.",
            )}
            target="_blank"
            rel="noreferrer"
            className="border-b border-white/30 pb-0.5 text-white transition-colors hover:border-yellow"
          >
            Send a photo on WhatsApp
          </a>{" "}
          and we will identify it.
        </p>
      </Container>
    </Section>
  );
}
