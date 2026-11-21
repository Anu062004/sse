import Link from "next/link";
import type { MouseEvent } from "react";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { getCategory } from "@/data/categories";
import { formatFitment } from "@/lib/format";
import type { Product } from "@/lib/products";

/**
 * Catalogue card. Always a real link to the product page; inside the catalogue
 * an `onOpen` handler turns a plain click into the quick-view panel instead.
 */
export function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen?: (product: Product) => void;
}) {
  const category = getCategory(product.category);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onOpen) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    onOpen(product);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      onClick={onOpen ? handleClick : undefined}
      className="lift group flex flex-col overflow-hidden rounded-[22px] bg-white text-left text-navy shadow-[0_1px_0_rgba(11,23,54,0.04),0_0_0_1px_rgba(11,23,54,0.06)] hover:shadow-[0_28px_50px_-28px_rgba(11,23,54,0.42),0_0_0_1px_rgba(11,23,54,0.08)]"
    >
      <span className="relative block">
        <MediaFrame
          images={product.images}
          alt={product.name}
          label={product.name}
          category={product.category}
          ratio="h-[240px]"
          sizes="(min-width: 1181px) 25vw, (min-width: 821px) 33vw, (min-width: 521px) 50vw, 100vw"
        />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-white/[0.92] px-[11px] py-1.5 text-[11.5px] font-bold uppercase tracking-[0.06em] text-navy shadow-[0_4px_12px_-6px_rgba(0,0,0,0.3)]">
          {category?.shortName ?? product.category}
        </span>
      </span>
      <span className="flex flex-1 flex-col gap-2 px-5 pb-[18px] pt-5">
        <span className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-muted">
          {product.spool_position}
        </span>
        <span className="display text-[22px] font-extrabold leading-[1.05]">{product.name}</span>
        <span className="flex-1 text-[13.5px] leading-normal text-[#4A5672]">{formatFitment(product)}</span>
        <span className="mt-2.5 flex items-center justify-between gap-2.5 border-t border-navy/[0.08] pt-3.5">
          <span className="text-[13px] font-semibold text-slate">{product.pack_size}</span>
          <span className="inline-flex items-center gap-2.5 text-[13.5px] font-bold">
            Details
            <span className="more-ic">
              <ArrowRightIcon />
            </span>
          </span>
        </span>
      </span>
    </Link>
  );
}
