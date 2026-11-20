import type { ReactNode } from "react";

export function SectionHeader({
  index,
  label,
  title,
  intro,
  action,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-6 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
      <p className="col-span-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] opacity-55 lg:col-span-2">
        {index} — {label}
      </p>
      <h2 className="col-span-4 text-3xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-4xl lg:col-span-6 lg:col-start-3 lg:text-[clamp(2.5rem,3.6vw,4rem)]">
        {title}
      </h2>
      <div className="col-span-4 flex flex-col items-start gap-5 lg:col-span-3 lg:col-start-10">
        {intro ? (
          <p className="text-sm leading-relaxed opacity-65 md:text-[15px]">
            {intro}
          </p>
        ) : null}
        {action}
      </div>
    </div>
  );
}
