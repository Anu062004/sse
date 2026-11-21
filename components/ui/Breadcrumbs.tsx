import Link from "next/link";
import { ChevronRightIcon } from "@/components/ui/Icons";

/** Breadcrumb trail styled for the dark page headers. */
export function Breadcrumbs({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-white/70">
      <ol className="flex flex-wrap items-center gap-2.5">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2.5">
            {item.href ? (
              <Link href={item.href} className="text-white/85 hover:text-accent">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-accent">
                {item.label}
              </span>
            )}
            {index < items.length - 1 ? <ChevronRightIcon size={12} /> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
