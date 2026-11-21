import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/brand/sse-logo.png";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/**
 * SSE brand lockup (spool + wordmark in the yellow frame). Light artwork with a
 * transparent background, so it is meant for dark surfaces only.
 * Renders as a home link unless `asLink` is false.
 */
export function Logo({
  asLink = true,
  priority = false,
  className,
}: {
  asLink?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const image = (
    <Image
      src={logo}
      alt={asLink ? "" : site.name}
      priority={priority}
      sizes="180px"
      className={cn("w-auto", className ?? "h-12")}
    />
  );

  if (!asLink) return image;

  return (
    <Link href="/" aria-label={`${site.name} home`} className="flex shrink-0 items-center">
      {image}
    </Link>
  );
}
