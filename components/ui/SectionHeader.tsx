import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

/**
 * Eyebrow + condensed display heading on the left, intro/action on the right.
 * `index` is accepted for older call sites but no longer shown.
 */
export function SectionHeader({
  label,
  title,
  intro,
  action,
  tone = "light",
  className,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  intro?: string;
  action?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "reveal flex flex-wrap items-end justify-between gap-8",
        className,
      )}
    >
      <div>
        <Eyebrow tone={tone}>{label}</Eyebrow>
        <h2 className="display mt-[18px] max-w-[16ch] text-[clamp(32px,3.8vw,58px)] font-extrabold">
          {title}
        </h2>
      </div>
      {intro || action ? (
        <div className="flex max-w-[420px] flex-col items-start gap-5">
          {intro ? (
            <p
              className={cn(
                "text-base leading-relaxed",
                tone === "dark" ? "text-white/75" : "text-slate",
              )}
            >
              {intro}
            </p>
          ) : null}
          {action}
        </div>
      ) : null}
    </div>
  );
}
