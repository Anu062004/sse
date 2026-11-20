import { cn } from "@/lib/cn";
import { formatFitment } from "@/lib/format";
import type { Product } from "@/lib/products";

export function FitmentLine({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] opacity-60",
        className,
      )}
    >
      {formatFitment(product)}
    </p>
  );
}
