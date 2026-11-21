import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CheckIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { productWhatsappHref, quoteHref } from "@/lib/links";
import { getDescriptionSections, getSpecRows } from "@/lib/product-content";
import { getProductFeatures, type Product } from "@/lib/products";

/**
 * Long-form, marketplace-style listing for a part: written description on the
 * left, a sticky summary with the enquiry buttons on the right.
 */
export function ProductDescription({ product }: { product: Product }) {
  const sections = getDescriptionSections(product);
  const summary = getSpecRows(product).filter((row) =>
    ["Part no.", "Usage / application", "Supplied as", "Model year"].includes(row.label),
  );

  return (
    <section aria-labelledby="description-title" className="bg-cream pt-[clamp(56px,7vw,96px)]">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          <div className="max-w-[760px]">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Product description</p>
            <h2 id="description-title" className="display mt-3 text-[clamp(28px,3vw,40px)] font-extrabold leading-[1.05] text-navy">
              {product.name}
            </h2>

            <div className="mt-8 space-y-8">
              {sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-base font-bold text-navy">{section.heading}</h3>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-2 text-[15px] leading-[1.75] text-[#34405C]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}

              <div>
                <h3 className="text-base font-bold text-navy">Key features</h3>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {getProductFeatures(product).map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[15px] text-[#34405C]">
                      <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-accent text-navy">
                        <CheckIcon size={12} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-card border border-navy/10 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Enquire about this part</p>
              <dl className="mt-4 divide-y divide-navy/[0.08]">
                {summary.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-4 py-2.5 text-sm">
                    <dt className="text-muted">{spec.label}</dt>
                    <dd className="text-right font-semibold text-navy">{spec.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 grid gap-2.5">
                <ButtonLink
                  href={productWhatsappHref(product.part_number, product.name)}
                  variant="whatsapp"
                  size="sm"
                  icon={<WhatsAppIcon size={18} />}
                  className="w-full justify-between"
                >
                  Enquire on WhatsApp
                </ButtonLink>
                <ButtonLink href={quoteHref(product.slug)} variant="dark" size="sm" className="w-full justify-between">
                  Get a quote
                </ButtonLink>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-muted">
                Prices on request. Dealer and bulk rates available.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
