import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "light" | "dark" | "accent";

const tones: Record<Tone, string> = {
  light: "text-muted",
  dark: "text-white/70",
  accent: "text-navy [--eyebrow-rule:theme(colors.navy)]",
};

/** Short orange rule + uppercase label, used above section headings. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return <p className={cn("eyebrow", tones[tone], className)}>{children}</p>;
}
