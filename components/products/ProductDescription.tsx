import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CheckIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { productWhatsappHref, quoteHref } from "@/lib/links";
import { getDescriptionSections } from "@/lib/product-content";
import type { Product } from "@/lib/products";

/** Full, plain-language description of a part, below the product panel. */
export function ProductDescription({ product }: { product: Product }) {
  const sections = getDescriptionSections(product);

  return (
    <section
      id="description"
      aria-labelledby="description-title"
      className="scroll-mt-6 bg-cream pt-[clamp(48px,6vw,80px)]"
    >
      <Container>
        <div className="rounded-panel bg-white p-[clamp(20px,3.4vw,48px)] text-navy">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Product description</p>
          <h2 id="description-title" className="display mt-2 text-[clamp(26px,2.6vw,36px)] font-extrabold leading-[1.05]">
            About the {product.name}
          </h2>

          <div className="mt-8 grid gap-x-14 gap-y-8 md:grid-cols-2">
            {sections.map((section) => (
              <div key={section.heading}>
                <h3 className="text-base font-bold">{section.heading}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-2 text-[15px] leading-[1.7] text-[#34405C]">
                    {paragraph}
                  </p>
                ))}
                {section.list ? (
                  <ul className="mt-3 space-y-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[15px] leading-snug text-[#34405C]">
                        <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-accent text-navy">
                          <CheckIcon size={12} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 rounded-card bg-sand p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[15px] font-semibold">
              Have a question about this part? Ask us before you order.
            </p>
            <div className="flex flex-wrap gap-2.5">
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
          </div>
        </div>
      </Container>
    </section>
  );
}
