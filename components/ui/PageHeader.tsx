import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-line bg-white">
      <Container className="py-14 md:py-20 lg:py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/55">
          {eyebrow}
        </p>
        <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
          <h1 className="col-span-4 text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.045em] md:col-span-8 lg:col-span-8">
            {title}
          </h1>
          {intro ? (
            <p className="col-span-4 max-w-md text-base leading-relaxed text-navy/65 md:col-span-6 lg:col-span-3 lg:col-start-10">
              {intro}
            </p>
          ) : null}
        </div>
        {children}
      </Container>
    </header>
  );
}
