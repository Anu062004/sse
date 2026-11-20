import Image from "next/image";
import { SpoolMark } from "@/components/ui/SpoolMark";
import { cn } from "@/lib/cn";

export function MediaFrame({
  images = [],
  alt,
  label,
  ratio = "aspect-square",
  sizes = "(min-width: 1024px) 33vw, 50vw",
  priority = false,
  className,
  imageClassName,
}: {
  images?: string[];
  alt: string;
  label: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  const src = images[0];

  return (
    <div
      className={cn("relative overflow-hidden bg-paper", ratio, className)}
      role={src ? undefined : "img"}
      aria-label={src ? undefined : `${label} — image to be added`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-4 border border-line/70"
          />
          <div className="absolute inset-0 flex items-center justify-center px-8">
            <SpoolMark className="w-28 text-navy/15" />
          </div>
          <p
            aria-hidden="true"
            className="absolute bottom-4 left-4 right-4 font-mono text-[9px] uppercase tracking-[0.18em] text-navy/45"
          >
            Image slot · {label}
          </p>
        </>
      )}
    </div>
  );
}
