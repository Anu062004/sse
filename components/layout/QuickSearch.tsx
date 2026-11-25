"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRightIcon, CloseIcon, SearchIcon } from "@/components/ui/Icons";
import { getCategoryName } from "@/data/categories";
import { buildProductsHref, matchesQuery } from "@/lib/filters";
import { formatFitment } from "@/lib/format";
import { products } from "@/lib/products";
import { cn } from "@/lib/cn";

const SUGGESTIONS = ["JCB 3DX loader", "Hydra Control", "Walvoil", "Seal kit", "CAT 424", "Mahindra"];
const MAX_RESULTS = 6;

/**
 * Header search button that opens a quick-search panel: live results as you
 * type, Enter for the full filtered catalogue. Also opens on "/" or ⌘K.
 */
export function QuickSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const trimmed = query.trim();
  const matches = useMemo(
    () => (trimmed ? products.filter((product) => matchesQuery(product, trimmed)) : []),
    [trimmed],
  );
  const results = matches.slice(0, MAX_RESULTS);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => setActive(0), [trimmed]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
    if (!open) document.documentElement.style.overflow = "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // "/" or Cmd/Ctrl+K opens search from anywhere, unless the visitor is typing.
  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "");
      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || (event.key === "/" && !typing)) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const showAll = () => {
    setOpen(false);
    router.push(buildProductsHref({ q: trimmed || undefined }));
  };

  const onInputKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && results.length) {
      event.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp" && results.length) {
      event.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const pick = results[active];
      if (pick) {
        setOpen(false);
        router.push(`/products/${pick.slug}`);
      } else {
        showAll();
      }
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search parts"
        aria-haspopup="dialog"
        className={cn(
          "flex h-[46px] items-center gap-2.5 rounded-full border-[1.5px] border-white/[0.22] px-3.5 text-sm text-white/80 transition-colors hover:border-accent hover:bg-accent hover:text-navy",
          className,
        )}
      >
        <SearchIcon size={18} />
        <span className="hidden xl:inline">Search parts</span>
        <kbd className="hidden rounded border border-current/30 px-1.5 font-sans text-[11px] leading-5 opacity-70 xl:inline">
          /
        </kbd>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Search parts"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
        className="m-0 mx-auto mt-[min(12vh,96px)] max-h-[calc(100dvh-2rem)] w-[min(680px,calc(100vw-2rem))] max-w-none overflow-hidden rounded-panel bg-white p-0 text-navy shadow-[0_40px_90px_-30px_rgba(3,8,22,0.7)] backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 border-b border-navy/10 px-5">
          <SearchIcon size={20} className="flex-none text-accent" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKey}
            placeholder="Search by part, machine, valve block or part number"
            aria-label="Search parts"
            aria-controls="quick-search-results"
            aria-activedescendant={results[active] ? `qs-${results[active].slug}` : undefined}
            autoComplete="off"
            enterKeyHint="search"
            className="h-16 min-w-0 flex-1 bg-transparent text-[17px] outline-none placeholder:text-[#9AA1B2] [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close search"
            className="grid h-9 w-9 flex-none place-items-center rounded-full text-muted hover:bg-[#F4F3F0] hover:text-navy"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="max-h-[min(60vh,520px)] overflow-y-auto">
          {!trimmed ? (
            <div className="px-5 py-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Popular searches</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      inputRef.current?.focus();
                    }}
                    className="rounded-full border border-navy/15 px-3.5 py-1.5 text-sm font-medium hover:border-accent hover:bg-accent/10"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length ? (
            <ul id="quick-search-results" role="listbox" aria-label="Matching parts" className="py-2">
              {results.map((product, index) => (
                <li key={product.slug} id={`qs-${product.slug}`} role="option" aria-selected={index === active}>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={() => setOpen(false)}
                    onMouseEnter={() => setActive(index)}
                    className={cn(
                      "flex items-center gap-4 px-5 py-2.5",
                      index === active && "bg-[#F4F3F0]",
                    )}
                  >
                    <span className="relative h-14 w-14 flex-none overflow-hidden rounded-lg bg-[#F4F3F0]">
                      {product.images[0] ? (
                        <Image src={product.images[0]} alt="" fill sizes="56px" className="object-cover" />
                      ) : (
                        <span className="grid h-full w-full place-items-center text-[#9AA1B2]">
                          <SearchIcon size={18} />
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-semibold">{product.name}</span>
                      <span className="mt-0.5 block truncate text-[13px] text-muted">
                        {getCategoryName(product.category)} · {formatFitment(product)}
                      </span>
                    </span>
                    <span className="hidden flex-none font-mono text-xs text-muted sm:block">{product.part_number}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-5 py-8 text-center">
              <p className="font-semibold">No parts match “{trimmed}”.</p>
              <p className="mt-1 text-sm text-muted">
                Try the machine model or valve block, or send us a photo of the old part.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-navy/10 bg-[#FAF9F6] px-5 py-3 text-sm">
          <span className="hidden text-muted sm:inline">
            <kbd className="font-sans">↑</kbd> <kbd className="font-sans">↓</kbd> to move · Enter to open · Esc to close
          </span>
          <button
            type="button"
            onClick={showAll}
            className="ml-auto inline-flex items-center gap-1.5 font-semibold text-navy hover:text-accent"
          >
            {trimmed ? `See all ${matches.length} result${matches.length === 1 ? "" : "s"}` : "Browse the full catalogue"}
            <ArrowRightIcon size={15} />
          </button>
        </div>
      </dialog>
    </>
  );
}
