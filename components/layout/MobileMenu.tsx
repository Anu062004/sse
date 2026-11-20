"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/categories";
import { telHref, whatsappHref } from "@/lib/links";
import { site } from "@/lib/site";
import { buttonStyles } from "@/components/ui/Button";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
      closeRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }

    if (!open) {
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex h-11 w-11 items-center justify-center border border-line text-navy lg:hidden"
      >
        <span aria-hidden="true" className="flex flex-col gap-1.5">
          <span className="h-px w-5 bg-navy" />
          <span className="h-px w-5 bg-navy" />
          <span className="h-px w-5 bg-navy" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-labelledby="mobile-menu-title"
        onClose={close}
        className="m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-white p-0 text-navy backdrop:bg-navy/50 lg:hidden"
      >
        <div className="flex h-dvh flex-col">
          <div className="flex h-20 shrink-0 items-center justify-between border-b border-line px-5">
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-bold tracking-[-0.06em]">
                {site.shortName}
              </span>
              <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.22em] text-navy/60">
                Aftermarket Solution
              </span>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="min-h-11 border border-line px-4 text-[10px] font-semibold uppercase tracking-[0.16em]"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6">
            <h2 id="mobile-menu-title" className="sr-only">
              Site menu
            </h2>
            <nav aria-label="Mobile">
              {site.nav.map((item) =>
                item.label === "Products" ? (
                  <details key={item.href} className="group border-b border-line">
                    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between py-4 text-3xl font-medium tracking-[-0.03em]">
                      Products
                      <span
                        aria-hidden="true"
                        className="text-xl transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className="pb-4">
                      <Link
                        href="/products"
                        onClick={close}
                        className="flex min-h-11 items-center font-mono text-[10px] uppercase tracking-[0.16em] text-navy/60"
                      >
                        All products
                      </Link>
                      {categories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/products?category=${category.slug}`}
                          onClick={close}
                          className="flex min-h-11 items-center justify-between gap-4 border-t border-line/70 py-2 text-base"
                        >
                          <span>{category.name}</span>
                          <span className="font-mono text-[9px] text-navy/40">
                            {category.index}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="flex min-h-16 items-center border-b border-line py-4 text-3xl font-medium tracking-[-0.03em]"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </div>

          <div className="shrink-0 border-t border-line p-5">
            <Link
              href="/quote"
              onClick={close}
              className={buttonStyles({ className: "w-full" })}
            >
              Get a quote
            </Link>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <a
                href={telHref}
                className="flex min-h-12 items-center justify-center border border-navy/25 text-[10px] font-semibold uppercase tracking-[0.16em]"
              >
                Call
              </a>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-12 items-center justify-center border border-navy/25 text-[10px] font-semibold uppercase tracking-[0.16em]"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
