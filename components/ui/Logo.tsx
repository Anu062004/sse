import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

function LogoContent() {
  return (
    <>
      <span className="logo-mark" aria-hidden="true">
        <span className="display text-[25px] font-black leading-[0.86] tracking-[0.035em] [font-stretch:66%]">
          {site.shortName}
        </span>
        <svg width="34" height="6" viewBox="0 0 34 6" fill="none" className="block opacity-90">
          <path
            d="M1 4.5h7v-3h4v3h6v-3h4v3h6v-3h4v3h1"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-[1.1]">
        <span className="text-[15.5px] font-bold tracking-[-0.01em]">
          SSE Aftermarket <span className="font-normal opacity-[0.78]">Solution</span>
        </span>
        <span className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.17em] text-white/[0.58]">
          Earthmoving spares · {site.address.locality}
        </span>
      </span>
    </>
  );
}

const classes = "flex items-center gap-3 text-white";

/** SSE wordmark: orange spool badge + name. Renders as a home link unless `asLink` is false. */
export function Logo({
  asLink = true,
  className,
}: {
  asLink?: boolean;
  className?: string;
}) {
  if (!asLink) {
    return (
      <span className={cn(classes, className)}>
        <LogoContent />
      </span>
    );
  }

  return (
    <Link href="/" aria-label={`${site.name} home`} className={cn(classes, className)}>
      <LogoContent />
    </Link>
  );
}
