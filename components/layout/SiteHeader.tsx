import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLinks } from "@/components/layout/NavLinks";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { telHref } from "@/lib/links";
import { site } from "@/lib/site";

/** Transparent header that rides on top of each page's dark hero. */
export function SiteHeader() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50 px-[clamp(10px,2vw,24px)] pt-3.5">
      <div className="pointer-events-auto mx-auto flex h-[68px] max-w-site items-center justify-between gap-6 pl-3.5 pr-2.5">
        <Logo priority className="h-11 sm:h-14" />
        <NavLinks />
        <div className="flex items-center gap-2.5">
          <a
            href={telHref}
            aria-label={`Call ${site.phone}`}
            className="icbtn icbtn-light hidden h-[46px] w-[46px] !border-white/[0.22] min-[1081px]:grid"
          >
            <PhoneIcon size={18} />
          </a>
          <ButtonLink href="/quote" variant="light" size="sm" className="hidden sm:inline-flex">
            Get a quote
          </ButtonLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
