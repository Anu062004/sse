import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SpoolMark } from "@/components/ui/SpoolMark";

/**
 * Dark page hero shared by inner pages: dotted ground, faint spool outline,
 * breadcrumb, condensed display title. The transparent site header sits on top.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  aside,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  const trail = breadcrumbs ?? [
    { label: "Home", href: "/" },
    { label: eyebrow ?? title },
  ];

  return (
    <header className="on-dark relative bg-ink pb-16 pt-[150px] text-white md:pb-20">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="dots absolute inset-0" />
        <SpoolMark className="absolute -right-[6%] top-[90px] w-[52%] text-white/[0.09]" />
      </div>
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
