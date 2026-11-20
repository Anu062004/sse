import Link from "next/link";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { FitmentLine } from "@/components/ui/FitmentLine";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { getCategoryName } from "@/data/categories";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.slug}`;

  return (
    <article className="flex flex-col border-t border-navy/20 pt-4">
      <Link href={href} className="group block">
        <MediaFrame
          images={product.images}
          alt={product.name}
          label={product.name}
          ratio="aspect-[4/5]"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        />
      </Link>

      <div className="mt-4 flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-navy/45">
        <span className="truncate">{getCategoryName(product.category)}</span>
        <span className="shrink-0">{product.part_number}</span>
      </div>

      <h3 className="mt-2 text-base font-medium leading-snug tracking-[-0.02em]">
        <Link
          href={href}
          className="line-clamp-2 hover:underline hover:decoration-yellow hover:underline-offset-4"
        >
          {product.name}
        </Link>
      </h3>

      <FitmentLine product={product} className="mt-2 line-clamp-2" />

      <div className="mt-auto pt-4">
        <ArrowLink href={href}>View product</ArrowLink>
      </div>
    </article>
  );
}
