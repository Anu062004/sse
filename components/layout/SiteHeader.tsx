import Link from "next/link";
import { categories } from "@/data/categories";
import { site } from "@/lib/site";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";

const linkClasses =
  "text-[10px] font-semibold uppercase tracking-[0.18em] text-navy/65 transition-colors hover:text-navy";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="flex shrink-0 flex-col leading-none"
        >
          <span className="text-2xl font-bold tracking-[-0.06em]">
            {site.shortName}
          </span>
          <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.22em] text-navy/60">
            Aftermarket Solution
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {site.nav.map((item) =>
            item.label === "Products" ? (
              <div key={item.href} className="group relative flex h-20 items-center">
                <Link href={item.href} className={linkClasses}>
                  Products
                </Link>
                <div className="invisible pointer-events-none absolute left-1/2 top-full w-64 -translate-x-1/2 border border-line bg-white opacity-0 transition-opacity duration-150 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/products?category=${category.slug}`}
                      className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-navy/70 last:border-b-0 hover:bg-paper hover:text-navy"
                    >
                      {category.name}
                      <span className="font-mono text-[9px] font-normal text-navy/40">
                        {category.index}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className={linkClasses}>
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/quote"
            className={buttonStyles({
              className: "hidden h-11 min-h-11 px-5 sm:inline-flex",
            })}
          >
            Get a Quote
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
