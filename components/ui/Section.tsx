import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "white" | "paper" | "navy";

const tones: Record<Tone, string> = {
  white: "border-line bg-white text-navy",
  paper: "border-line bg-paper text-navy",
  navy: "on-dark border-white/15 bg-navy text-white",
};

export function Section({
  id,
  tone = "white",
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
      className={cn(
        "scroll-mt-20 border-t py-16 md:py-24 lg:py-28",
        tones[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}
