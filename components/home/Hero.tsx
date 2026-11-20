import { getImageProps } from "next/image";
import caseDesktop from "@/assets/images/hero/case-desktop.jpg";
import caseMobile from "@/assets/images/hero/case-mobile.jpg";
import jcbDesktop from "@/assets/images/hero/jcb-xcmg-desktop.jpg";
import jcbMobile from "@/assets/images/hero/jcb-xcmg-mobile.jpg";
import { HeroMedia, type HeroImage } from "@/components/home/HeroMedia";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

function heroImage(
  desktop: typeof caseDesktop,
  mobile: typeof caseMobile,
  alt: string,
): HeroImage {
  const common = { sizes: "100vw", quality: 76, alt };
  const desktopProps = getImageProps({
    ...common,
    src: desktop,
    width: 2400,
    height: 1600,
  }).props;
  const mobileProps = getImageProps({
    ...common,
    src: mobile,
    width: 1200,
    height: 1600,
  }).props;

  return {
    desktop: {
      src: desktopProps.src,
      srcSet: desktopProps.srcSet,
      width: 2400,
      height: 1600,
    },
    mobile: {
      src: mobileProps.src,
      srcSet: mobileProps.srcSet,
      width: 1200,
      height: 1600,
    },
    alt,
  };
}

export function Hero() {
  const first = heroImage(
    caseDesktop,
    caseMobile,
    "CASE CX210B excavator working on a construction site",
  );
  const second = heroImage(
    jcbDesktop,
    jcbMobile,
    "JCB and XCMG excavators on a sandy site",
  );

  return (
    <section className="on-dark relative isolate flex min-h-[calc(100svh-5rem)] flex-col overflow-hidden bg-navy text-white">
      <link
        rel="preload"
        as="image"
        href={first.mobile.src}
        imageSrcSet={first.mobile.srcSet}
        imageSizes="100vw"
        fetchPriority="high"
        media="(max-width: 767px)"
      />
      <link
        rel="preload"
        as="image"
        href={first.desktop.src}
        imageSrcSet={first.desktop.srcSet}
        imageSizes="100vw"
        fetchPriority="high"
        media="(min-width: 768px)"
      />
      <HeroMedia first={first} second={second} />
      <div aria-hidden="true" className="absolute inset-0 bg-navy/50" />

      <Container className="relative z-10 flex flex-1 flex-col justify-end pb-12 pt-24 md:justify-center md:pb-16 md:pt-20">
        <div className="grid grid-cols-4 gap-x-4 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
          <div className="col-span-4 md:col-span-8 lg:col-span-9">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/65">
              SSE Aftermarket Solution · Faridabad
            </p>
            <h1 className="mt-5 text-[clamp(2.75rem,7.4vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.05em]">
              <span className="block">Precision spares.</span>
              <span className="block">Built for the field.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
              Spool valves, seal kits and hydraulic spares for JCB, L&amp;T,
              Terex, Escorts, Case, Mahindra and CAT machines.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#finder">Find your spool</ButtonLink>
              <ButtonLink href="/quote" variant="outline-light">
                Get a quote
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative z-10 border-t border-white/25">
        <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4 font-mono text-[9px] uppercase tracking-[0.16em] text-white/65 md:text-[10px]">
          <p>Faridabad, India · Manufacturer &amp; Dealer</p>
          <p>Supplying 15+ states</p>
        </Container>
      </div>
    </section>
  );
}
