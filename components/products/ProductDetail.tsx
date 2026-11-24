import { ProductGallery } from "@/components/products/ProductGallery";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { getCategoryName } from "@/data/categories";
import { formatFitment } from "@/lib/format";
import { productWhatsappHref, quoteHref } from "@/lib/links";
import { getPartType, getSpecRows } from "@/lib/product-content";
import type { Product } from "@/lib/products";

/**
 * Product page panel: photo gallery on the left; name, fitment, enquiry
 * buttons, short description and specifications on the right.
 */
export function ProductDetail({ product, priority = false }: { product: Product; priority?: boolean }) {
  const specs = getSpecRows(product);

  return (
    <div className="rise-in grid w-full grid-cols-1 gap-8 text-navy lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12">
      <ProductGallery images={product.images} alt={product.name} priority={priority} />

      <div className="min-w-0">
        <p className="text-sm font-semibold text-muted">
          {getCategoryName(product.category)} · {getPartType(product)}
        </p>
        <h1 className="display mt-2 text-[clamp(28px,2.8vw,42px)] font-extrabold leading-[1.02]">{product.name}</h1>
        <p className="mt-3 text-[15px] text-slate">
          Part number: <strong className="font-mono font-bold text-navy">{product.part_number}</strong>
        </p>
        <p className="mt-2 flex items-start gap-2 text-[15px] text-slate">
          <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-accent text-navy">
            <CheckIcon size={12} />
          </span>
          <span>
            Fits <strong className="font-semibold text-navy">{formatFitment(product)}</strong>
          </span>
        </p>

        <div className="mt-6 grid gap-3 border-t border-navy/10 pt-6 sm:grid-cols-2">
          <ButtonLink
            href={productWhatsappHref(product.part_number, product.name)}
            variant="whatsapp"
            icon={<WhatsAppIcon size={18} />}
            className="w-full justify-between"
          >
            Enquire on WhatsApp
          </ButtonLink>
          <ButtonLink href={quoteHref(product.slug)} variant="dark" className="w-full justify-between">
            Request a quote
          </ButtonLink>
        </div>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted">
          <li>✓ Fitment confirmed before dispatch</li>
          <li>✓ Supplied as {product.pack_size}</li>
          <li>✓ Dealer &amp; bulk rates</li>
        </ul>

        <p className="mt-6 text-[15px] leading-[1.7] text-[#34405C]">
          {product.description}{" "}
          <a href="#description" className="font-semibold text-navy underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
            Read more
          </a>
        </p>

        <h2 className="mt-7 border-b border-navy/10 pb-3 text-lg font-bold">Specifications</h2>
        <dl className="mt-1">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="grid grid-cols-[150px_minmax(0,1fr)] gap-4 border-b border-navy/[0.06] py-2.5 text-sm max-[420px]:grid-cols-[120px_minmax(0,1fr)]"
            >
              <dt className="text-muted">{spec.label}</dt>
              <dd className="font-semibold">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
