import { BurstIcon } from "@/components/ui/Icons";
import { site } from "@/lib/site";

/** Orange band of machine brand names scrolling endlessly; pauses on hover. */
export function BrandMarquee() {
  const loop = [...site.machines, ...site.machines];

  return (
    <section
      aria-label="Machine brands we supply"
      className="mq overflow-hidden border-y-2 border-navy bg-accent py-[26px] text-navy"
    >
      <p className="sr-only">{site.machines.join(", ")}</p>
      <div className="mq-track" aria-hidden="true">
        {loop.map((brand, index) => (
          <span key={`${brand}-${index}`} className="inline-flex items-center gap-10 pr-10">
            <span className="display whitespace-nowrap text-[clamp(30px,3.4vw,50px)] font-black uppercase leading-none tracking-[-0.01em]">
              {brand}
            </span>
            <BurstIcon size={28} />
          </span>
        ))}
      </div>
    </section>
  );
}
