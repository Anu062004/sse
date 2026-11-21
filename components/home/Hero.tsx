import { getImageProps, type StaticImageData } from "next/image";
import caseDesktop from "@/assets/images/hero/case-desktop.jpg";
import caseMobile from "@/assets/images/hero/case-mobile.jpg";
import jcbDesktop from "@/assets/images/hero/jcb-xcmg-desktop.jpg";
import jcbMobile from "@/assets/images/hero/jcb-xcmg-mobile.jpg";
import backhoeDesktop from "@/assets/images/hero/backhoe-desktop.jpg";
import backhoeMobile from "@/assets/images/hero/backhoe-mobile.jpg";
import { HeroStage, type HeroSlide } from "@/components/home/HeroSlideshow";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

function source(image: StaticImageData, alt: string, maxWidth: number) {
  const width = Math.min(maxWidth, image.width);
  const height = Math.round((image.height / image.width) * width);
  const { props } = getImageProps({ src: image, alt, sizes: "100vw", quality: 76, width, height });
  return { src: props.src, srcSet: props.srcSet, width, height };
}

function slide(
  desktop: StaticImageData,
  mobile: StaticImageData | null,
  alt: string,
  caption: string,
): HeroSlide {
  return {
    desktop: source(desktop, alt, 2400),
    mobile: mobile ? source(mobile, alt, 1200) : undefined,
    alt,
    caption,
  };
}

export function Hero() {
  const slides = [
    slide(caseDesktop, caseMobile, "CASE CX210B excavator on a construction site", "Excavators · CASE, CAT, Mahindra"),
    slide(backhoeDesktop, backhoeMobile, "JCB backhoe loader working on a building site", "Backhoe loaders · JCB 2D, 3DX, 3DX Xtra"),
    slide(jcbDesktop, jcbMobile, "JCB and XCMG crawler excavators side by side", "Crawler excavators · on-site spares"),
  ];
  const first = slides[0];
  const facts = [
    { value: "15+", label: "States supplied" },
    { value: "70+", label: "Product variants" },
    { value: String(site.machines.length), label: "Machine brands" },
  ];

  return (
    <>
      {first.mobile ? (
        <link
          rel="preload"
          as="image"
          href={first.mobile.src}
          imageSrcSet={first.mobile.srcSet}
          imageSizes="100vw"
          fetchPriority="high"
          media="(max-width: 767px)"
        />
      ) : null}
      <link
        rel="preload"
        as="image"
        href={first.desktop.src}
        imageSrcSet={first.desktop.srcSet}
        imageSizes="100vw"
        fetchPriority="high"
        media="(min-width: 768px)"
      />
      <HeroStage
        slides={slides}
        facts={
          <ul className="flex gap-8 text-[13px] text-white/[0.78]">
            {facts.map((fact) => (
              <li key={fact.label} className="flex items-baseline gap-2">
                <span className="display text-2xl font-extrabold leading-none text-white">
                  {fact.value}
                </span>
                {fact.label}
              </li>
            ))}
          </ul>
        }
      >
        <h1 className="display text-shadow-hero mt-6 text-[clamp(42px,5.4vw,92px)] font-extrabold leading-[0.9] tracking-[-0.034em]">
          Precision spares,
          <br />
          <span className="text-accent">built for the field.</span>
        </h1>
        <p className="mt-4 flex items-center gap-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-white/[0.88] before:h-0.5 before:w-8 before:bg-accent after:h-0.5 after:w-8 after:bg-accent">
          Manufacturer &amp; dealer · {site.address.locality}
        </p>
        <p className="mx-auto mt-[26px] max-w-[56ch] text-[clamp(15px,1.15vw,18px)] leading-[1.55] text-white/[0.86]">
          Spool valves, seal kits and hydraulic spares for{" "}
          <strong className="font-semibold text-white">
            JCB, L&amp;T, Terex, Escorts, Case, Mahindra and CAT
          </strong>{" "}
          — matched to the machine, the year and the valve block.
        </p>
        <div className="mt-[34px] flex flex-wrap justify-center gap-3">
          <ButtonLink href="#finder" variant="light">
            Find your spool
          </ButtonLink>
          <ButtonLink href="/quote" variant="ghost">
            Get a quote
          </ButtonLink>
        </div>
      </HeroStage>
    </>
  );
}
