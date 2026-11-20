import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "navy" | "outline" | "outline-light";

const base =
  "inline-flex min-h-12 items-center justify-center px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-yellow text-navy hover:bg-navy hover:text-white focus-visible:outline-navy",
  navy: "bg-navy text-white hover:bg-yellow hover:text-navy focus-visible:outline-navy",
  outline:
    "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white focus-visible:outline-navy",
  "outline-light":
    "border border-white/50 text-white hover:border-white hover:bg-white hover:text-navy focus-visible:outline-white",
};

export function buttonStyles({
  variant = "primary",
  className,
}: {
  variant?: Variant;
  className?: string;
} = {}): string {
  return cn(base, variants[variant], className);
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const classes = buttonStyles({ variant, className });

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={buttonStyles({ variant, className })} {...props}>
      {children}
    </button>
  );
}
