import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

/** Underlined text link with a sliding arrow. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  const classes = cn("tlink", className);
  const content = (
    <>
      {children}
      <ArrowRightIcon />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
