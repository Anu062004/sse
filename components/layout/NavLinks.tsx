"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

function isActive(pathname: string, href: string): boolean {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1.5 min-[1081px]:flex">
      {site.nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="navlink"
          aria-current={isActive(pathname, item.href) ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
