import { ButtonLink } from "@/components/ui/Button";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, CloseIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { getCategoryName } from "@/data/categories";
import { productWhatsappHref, quoteHref } from "@/lib/links";
import { getProductFeatures, getProductSpecs, type Product } from "@/lib/products";

type Nav = {
  position: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
};

/**
 * Two-column product panel: photo on the left, tags, specs, features and
 * enquiry buttons on the right. Used by the catalogue quick view and the
 * product page; quick-view controls appear only when handlers are passed.
 */
export function ProductDetail({
  product,
  titleId = "product-title",
  headingLevel = "h2",
  nav,
  onClose,
  priority = false,
}: {
  product: Product;
  titleId?: string;
  headingLevel?: "h1" | "h2";
  nav?: Nav;
  onClose?: () => void;
  priority?: boolean;
}) {
  const Heading = headingLevel;
  const specs = getProductSpecs(product).filter(
    (spec) => spec.label !== "Part number" && spec.value && spec.value !== "—",
  );

  return (
    <div className="rise-in relative grid w-full max-w-[1120px] grid-cols-1 overflow-hidden rounded-panel bg-white text-navy shadow-[0_50px_100px_-40px_rgba(0,0,0,0.6)] min-[861px]:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <div className="relative min-h-[440px] bg-stone">
        <MediaFrame
          images={product.images}
          alt={product.name}
          label={product.name}
          category={product.category}
          fill
          sizes="(min-width: 861px) 560px, 100vw"
          priority={priority}
          large
        />
        {nav ? (
          <div className="absolute inset-x-[18px] bottom-[18px] flex items-center justify-between gap-3">
            <span className="rounded-full bg-ink/60 px-3 py-2 text-[12.5px] font-semibold text-white backdrop-blur-md">
              Part {nav.position} of {nav.total}
            </span>
            <span className="flex gap-2">
              <button type="button" aria-label="Previous part" onClick={nav.onPrev} className="icbtn icbtn-light !bg-ink/55">
                <ArrowLeftIcon size={18} />
              </button>
              <button type="button" aria-label="Next part" onClick={nav.onNext} className="icbtn icbtn-light !bg-ink/55">
                <ArrowRightIcon size={18} />
              </button>
            </span>
          </div>
        ) : null}
      </div>

      <div className="p-[clamp(24px,3vw,40px)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex min-h-[30px] items-center rounded-full bg-accent px-3 text-xs font-bold uppercase tracking-[0.06em] text-navy">
              {getCategoryName(product.category)}
            </span>
            <span className="inline-flex min-h-[30px] items-center rounded-full bg-sand px-3 text-xs font-bold uppercase tracking-[0.06em] text-slate">
              {product.spool_position}
            </span>
          </div>
          {onClose ? (
            <button
              type="button"
              aria-label="Close details"
              onClick={onClose}
              className="icbtn icbtn-navy h-11 w-11"
            >
              <CloseIcon size={18} />
            </button>
          ) : null}
        </div>

        <Heading
          id={titleId}
          className="display mt-4 text-[clamp(28px,2.6vw,40px)] font-extrabold leading-none"
        >
          {product.name}
        </Heading>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-muted">
          <span>
            SSE code{" "}
            <strong className="font-mono text-[12.5px] font-bold text-navy">{product.part_number}</strong>
          </span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#C9C4B9]" />
          <span>{product.pack_size}</span>
        </div>

        <p className="mt-[18px] text-[15px] leading-[1.65] text-[#34405C]">{product.description}</p>

        <dl className="mt-[22px] overflow-hidden rounded-2xl border border-navy/10">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="grid grid-cols-[150px_minmax(0,1fr)] gap-4 px-4 py-[11px] text-sm odd:bg-[#F7F5F1] max-[420px]:grid-cols-[110px_minmax(0,1fr)]"
            >
              <dt className="font-medium text-muted">{spec.label}</dt>
              <dd className="font-semibold text-navy">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-5 flex flex-col gap-2.5">
          {getProductFeatures(product).map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-[#34405C]">
              <span className="mt-px grid h-5 w-5 flex-none place-items-center rounded-full bg-accent text-navy">
                <CheckIcon size={12} />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-[26px] flex flex-wrap gap-2.5">
          <ButtonLink
            href={productWhatsappHref(product.part_number, product.name)}
            variant="whatsapp"
            size="sm"
            icon={<WhatsAppIcon size={18} />}
          >
            Enquire on WhatsApp
          </ButtonLink>
          <ButtonLink href={quoteHref(product.slug)} variant="dark" size="sm">
            Request a quote
          </ButtonLink>
        </div>
        <p className="mt-3.5 text-[13px] text-muted">
          Not sure it fits? Send a photo of the old part and its valve block —
          we will confirm before dispatch.
        </p>
      </div>
    </div>
  );
}
