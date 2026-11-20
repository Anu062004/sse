import Link from "next/link";

export function Breadcrumbs({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="font-mono text-[10px] uppercase tracking-[0.14em] text-navy/50"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-navy">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-navy">
                {item.label}
              </span>
            )}
            {index < items.length - 1 ? (
              <span aria-hidden="true" className="text-navy/30">
                /
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
