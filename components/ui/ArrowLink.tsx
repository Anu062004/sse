import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em]",
        className,
      )}
    >
      <span className="border-b border-transparent pb-1 transition-colors group-hover:border-yellow">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
