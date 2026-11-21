import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "white" | "paper" | "navy";

const tones: Record<Tone, string> = {
  white: "bg-white text-navy",
  paper: "bg-cream text-navy",
  navy: "on-dark bg-navy text-white",
};

export function Section({
  id,
  tone = "paper",
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-section", tones[tone], className)}
    >
      {children}
    </section>
  );
}
