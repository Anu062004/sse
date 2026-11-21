import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/ui/Icons";
import { getYears, valveBlocks } from "@/lib/products";
import { whatsappHref } from "@/lib/links";
import { site } from "@/lib/site";

function Field({
  id,
  name,
  label,
  options,
}: {
  id: string;
  name: string;
  label: string;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-bold uppercase tracking-[0.08em] text-slate">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          defaultValue=""
          className="select h-[54px] rounded-[14px] pl-4 pr-11 text-base font-medium"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-4 top-[19px]" />
      </div>
    </div>
  );
}

export function SpoolFinder() {
  const years = getYears();

  return (
    <section id="finder" className="scroll-mt-24 py-section">
      <Container className="grid grid-cols-1 items-center gap-[clamp(32px,5vw,80px)] min-[901px]:grid-cols-2">
        <div className="reveal">
          <Eyebrow>Spool finder</Eyebrow>
          <h2 className="display mt-[18px] text-[clamp(32px,3.8vw,58px)] font-extrabold">
            Three checks.
            <br />
            The right spool.
          </h2>
          <p className="mt-[22px] max-w-[460px] text-base leading-relaxed text-slate">
            Spools are matched to the machine, the model year and the valve
            block. Pick all three and we will confirm the fitment before
            dispatch.
          </p>
          <a
            href={whatsappHref("Hello SSE, I need help identifying a spool valve.")}
            target="_blank"
            rel="noreferrer"
            className="tlink mt-[26px]"
          >
            Not sure of your valve block? Send a photo on WhatsApp
            <ArrowRightIcon />
          </a>
        </div>

        <form
          action="/products"
          method="get"
          aria-label="Find a spool"
          className="reveal rounded-panel bg-white p-[clamp(24px,3.5vw,44px)] shadow-[0_30px_60px_-36px_rgba(11,23,54,0.35)]"
        >
          <div className="grid grid-cols-1 gap-3.5 min-[901px]:grid-cols-3">
            <Field
              id="finder-machine"
              name="machine"
              label="01 · Machine"
              options={[
                { value: "", label: "Any machine" },
                ...site.machines.map((machine) => ({ value: machine, label: machine })),
              ]}
            />
            <Field
              id="finder-year"
              name="year"
              label="02 · Year"
              options={[
                { value: "", label: "Any year" },
                ...years.map((year) => ({ value: String(year), label: String(year) })),
              ]}
            />
            <Field
              id="finder-valve"
              name="valve"
              label="03 · Valve block"
              options={[
                { value: "", label: "Any valve block" },
                ...valveBlocks.map((valve) => ({ value: valve, label: valve })),
              ]}
            />
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-[18px] border-t border-navy/[0.12] pt-[26px]">
            <p className="max-w-[30ch] text-sm text-[#4A5672]">
              Husco, Hydra Control and Walvoil blocks supported.
            </p>
            <Button type="submit" variant="dark">
              Search fitment
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
}
