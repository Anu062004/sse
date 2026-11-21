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
    <p className={cn("text-[13.5px] leading-normal text-[#4A5672]", className)}>
      {formatFitment(product)}
    </p>
  );
}
