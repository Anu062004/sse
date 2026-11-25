import { getImageProps, type StaticImageData } from "next/image";
import caseDesktop from "@/assets/images/hero/case-desktop.jpg";
import caseMobile from "@/assets/images/hero/case-mobile.jpg";
import jcbDesktop from "@/assets/images/hero/jcb-xcmg-desktop.jpg";
import jcbMobile from "@/assets/images/hero/jcb-xcmg-mobile.jpg";
import weldingDesktop from "@/assets/images/hero/welding-desktop.jpg";
import weldingMobile from "@/assets/images/hero/welding-mobile.jpg";
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
    slide(caseDesktop, caseMobile, "CASE CX210B excavator on a construction site", "Excavators · Caterpillar, L&T, Mahindra"),
    slide(weldingDesktop, weldingMobile, "Welder in a protective mask working in an engineering workshop", "Workshop · precision engineering"),
    slide(jcbDesktop, jcbMobile, "JCB and XCMG crawler excavators side by side", "Crawler excavators · on-site spares"),
  ];
  const first = slides[0];

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
      >
        <h1 className="display text-shadow-hero text-[clamp(38px,4.4vw,72px)] font-extrabold leading-[0.98] tracking-[-0.03em]">
          Precision engineering.
          <br />
          <span className="text-accent">Reliable performance.</span>
        </h1>
        <p className="text-shadow-hero mt-6 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/80 before:h-px before:w-6 before:bg-accent after:h-px after:w-6 after:bg-accent">
          Manufacturer &amp; supplier · {site.address.locality}
        </p>
        <p className="text-shadow-hero mx-auto mt-5 max-w-[44ch] text-[clamp(15px,1.05vw,17px)] leading-[1.65] text-white/[0.82]">
          Hydraulic spools, seal kits and aftermarket spares for backhoe
          loaders and excavators.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
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
