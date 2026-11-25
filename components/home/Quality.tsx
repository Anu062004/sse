import Image from "next/image";
import jcbDesktop from "@/assets/images/hero/jcb-xcmg-desktop.jpg";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

const steps = [
  {
    title: "Fit before finish",
    body: "Each spool is checked against its valve block before final finishing.",
  },
  {
    title: "Material & machining",
    body: "Precision-turned lands and grooves, matched to the original profile.",
  },
  {
    title: "Inspection",
    body: "Dimensions and surface finish inspected before a part is released.",
  },
  {
    title: "Packing",
    body: "Spools sleeved in protective tubes; seal kits sealed in SSE-branded packs.",
  },
];

export function Quality() {
  return (
    <section id="quality" className="scroll-mt-24 py-section">
      <Container className="grid grid-cols-1 items-center gap-[clamp(32px,5vw,80px)] min-[901px]:grid-cols-2">
        <figure className="swipe-in relative m-0 aspect-[3/2] overflow-hidden rounded-panel bg-navy">
          <Image
            src={jcbDesktop}
            alt="JCB and XCMG crawler excavators parked on a sandy site"
            fill
            sizes="(min-width: 901px) 50vw, 100vw"
            className="object-cover object-[50%_60%]"
          />
          <figcaption className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 rounded-2xl bg-ink/[0.78] px-[18px] py-3.5 text-sm text-white backdrop-blur-md">
            <span>Built for abrasive site conditions</span>
            <span className="font-semibold text-accent">{site.address.locality}</span>
          </figcaption>
        </figure>

        <div className="reveal flex flex-col justify-center">
          <Eyebrow>Quality</Eyebrow>
          <h2 className="display mt-[18px] text-[clamp(32px,3.8vw,58px)] font-extrabold">
            Measured, matched, packed.
          </h2>
          <ol className="mt-10 grid grid-cols-1 gap-5 min-[761px]:grid-cols-2">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className={cn(
                  "rounded-card p-6",
                  index === steps.length - 1 ? "bg-accent" : "bg-white",
                )}
              >
                <span className="display block text-[30px] font-extrabold leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[17px] font-bold">{step.title}</h3>
                <p
                  className={cn(
                    "mt-2 text-sm leading-[1.55]",
                    index === steps.length - 1 ? "text-navy" : "text-[#4A5672]",
                  )}
                >
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
