import Link from "next/link";
import { telHref, whatsappHref } from "@/lib/links";
import { site } from "@/lib/site";

export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <div className="grid grid-cols-3">
        <a
          href={telHref}
          aria-label={`Call ${site.phone}`}
          className="flex min-h-14 items-center justify-center border-r border-line text-[10px] font-semibold uppercase tracking-[0.16em] text-navy"
        >
          Call
        </a>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-14 items-center justify-center border-r border-line text-[10px] font-semibold uppercase tracking-[0.16em] text-navy"
        >
          WhatsApp
        </a>
        <Link
          href="/quote"
          className="flex min-h-14 items-center justify-center bg-yellow text-[10px] font-semibold uppercase tracking-[0.16em] text-navy"
        >
          Get Quote
        </Link>
      </div>
    </nav>
  );
}
