"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { categories } from "@/data/categories";
import { telHref, whatsappHref } from "@/lib/links";
import { site } from "@/lib/site";

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
        className="icbtn icbtn-light h-[46px] w-[46px] min-[1081px]:hidden"
      >
        <MenuIcon size={20} />
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-labelledby="mobile-menu-title"
        onClose={close}
        className="m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-ink p-0 text-white min-[1081px]:hidden"
      >
        <div className="flex h-dvh flex-col">
          <div className="flex h-[96px] shrink-0 items-center justify-between border-b border-white/[0.12] px-5">
            <Logo className="h-11" />
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="icbtn icbtn-light h-[46px] w-[46px]"
            >
              <CloseIcon size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <h2 id="mobile-menu-title" className="sr-only">
              Site menu
            </h2>
            <nav aria-label="Mobile">
              {site.nav.map((item) =>
                item.label === "Catalogue" ? (
                  <details key={item.href} className="group border-b border-white/[0.12]">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between py-3 text-lg font-medium">
                      Catalogue
                      <span
                        aria-hidden="true"
                        className="text-xl text-accent transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className="pb-3">
                      <Link
                        href="/products"
                        onClick={close}
                        className="flex min-h-11 items-center text-[13px] font-bold uppercase tracking-[0.14em] text-accent"
                      >
                        All parts
                      </Link>
                      {categories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/products?category=${category.slug}`}
                          onClick={close}
                          className="flex min-h-11 items-center justify-between gap-4 border-t border-white/[0.08] py-2 text-[15px] text-white/85"
                        >
                          <span>{category.name}</span>
                          <span className="text-xs text-white/40">{category.index}</span>
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="flex min-h-14 items-center border-b border-white/[0.12] py-3 text-lg font-medium"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </div>

          <div className="shrink-0 border-t border-white/[0.12] p-5">
            <ButtonLink href="/quote" variant="light" className="w-full justify-between" onClick={close}>
              Get a quote
            </ButtonLink>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <ButtonLink href={telHref} variant="ghost" size="sm" icon={<PhoneIcon />}>
                Call
              </ButtonLink>
              <ButtonLink href={whatsappHref()} variant="whatsapp" size="sm">
                WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
