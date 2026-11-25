import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import catalogueHero from "@/assets/images/site/catalogue-hero.jpg";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

/**
 * Photo backdrop shared by every dark page header: the hydraulic valve photo
 * fading in from the right on desktop, and full-bleed under a dark wash on
 * mobile. Place it inside a `relative` dark container.
 */
export function HeaderBackdrop({ image = catalogueHero }: { image?: StaticImageData }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_center] md:hidden"
      />
      <div className="absolute inset-0 bg-ink/70 md:hidden" />
      <div className="absolute bottom-0 right-0 hidden aspect-[16/9] h-[118%] [mask-image:linear-gradient(90deg,transparent_0%,#000_38%)] md:block">
        <Image src={image} alt="" fill priority sizes="60vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(9,19,45,0.6)_0%,rgba(9,19,45,0.25)_50%,transparent_75%)] md:block" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent" />
    </div>
  );
}

/**
 * Dark page hero shared by inner pages: valve photo backdrop, breadcrumb,
 * condensed display title. The transparent site header sits on top.
 * Pass `background` to swap in a different photo.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  aside,
  background,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  aside?: ReactNode;
  background?: StaticImageData;
  children?: ReactNode;
}) {
  const trail = breadcrumbs ?? [
    { label: "Home", href: "/" },
    { label: eyebrow ?? title },
  ];

  return (
    <header className="on-dark relative bg-ink pb-16 pt-[150px] text-white md:pb-20">
      <HeaderBackdrop image={background} />
      <Container className="relative">
        <Breadcrumbs items={trail} />
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <h1 className="display mt-[18px] max-w-[18ch] text-[clamp(40px,4.8vw,76px)] font-extrabold leading-[0.92] tracking-[-0.03em]">
              {title}
            </h1>
            {intro ? (
              <p className="mt-[18px] max-w-[54ch] text-[clamp(15px,1.15vw,17px)] leading-relaxed text-white/80">
                {intro}
              </p>
            ) : null}
          </div>
          {aside}
        </div>
        {children}
      </Container>
    </header>
  );
}
