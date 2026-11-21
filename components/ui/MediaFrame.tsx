import Image from "next/image";
import { CameraIcon } from "@/components/ui/Icons";
import { ProductArt } from "@/components/ui/ProductArt";
import { cn } from "@/lib/cn";

/**
 * Product photo, or a dark dotted placeholder with the part's outline drawing
 * and a “Photo coming soon” chip when no photo exists yet.
 */
export function MediaFrame({
  images = [],
  alt,
  label,
  category = "spool-valves",
  ratio = "aspect-square",
  sizes = "(min-width: 1024px) 33vw, 50vw",
  priority = false,
  large = false,
  fill = false,
  className,
  imageClassName,
}: {
  images?: string[];
  alt: string;
  label: string;
  category?: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  large?: boolean;
  /** Absolutely fill the positioned parent instead of sizing by `ratio`. */
  fill?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  const src = images[0];

  return (
    <div
      className={cn(
        "overflow-hidden bg-stone",
        fill ? "absolute inset-0" : cn("relative", ratio),
        className,
      )}
      role={src ? undefined : "img"}
      aria-label={src ? undefined : `${label}, photo coming soon`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("zoom-img object-cover", imageClassName)}
        />
      ) : (
        <span className="ph-empty">
          <ProductArt
            category={category}
            className={cn("ph-art", large ? "w-[78%] text-white/50" : "w-[72%]")}
          />
          <span className="inline-flex items-center gap-[7px] rounded-full border border-white/[0.12] bg-white/[0.08] px-[11px] py-1.5 text-[11.5px] font-semibold tracking-[0.04em] text-white/75">
            <CameraIcon size={14} />
            Photo coming soon
          </span>
        </span>
      )}
    </div>
  );
}
