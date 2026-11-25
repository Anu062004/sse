import type { Metadata } from "next";
import catalogueHero from "@/assets/images/site/catalogue-hero.jpg";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { mailHref, telHref, whatsappHref } from "@/lib/links";
import { getProductBySlug } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Request a Quote",
  description:
    "Request a price for spool valves, seal kits and hydraulic spares. Share the machine, part number and quantity for a fitment check.",
  path: "/quote",
});

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string | string[] }>;
}) {
  const params = await searchParams;
  const slug = Array.isArray(params.product)
    ? params.product[0]
    : params.product;
  const product = slug ? getProductBySlug(slug) : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Request a quote"
        title="Tell us what you need."
        intro="Share the machine, part number and quantity. We will confirm price, fitment and availability."
        background={catalogueHero}
      />

      <Container className="py-10 md:py-14">
        <div className="grid grid-cols-4 gap-x-4 gap-y-12 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <QuoteForm product={product} />
          </div>

          <aside className="col-span-4 lg:col-span-4 lg:col-start-9 lg:self-start">
            <div className="border-t border-navy/20 pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                Prefer to talk?
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <p>
                  <a
                    href={telHref}
                    className="inline-flex min-h-8 items-center hover:text-navy/60"
                  >
                    {site.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-8 items-center hover:text-navy/60"
                  >
                    WhatsApp
                  </a>
                </p>
                <p>
                  <a
                    href={mailHref("Quote request")}
                    className="inline-flex min-h-8 items-center break-all hover:text-navy/60"
                  >
                    {site.email}
                  </a>
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                  {site.hours}
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-navy/20 pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                What to include
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-4 text-sm leading-relaxed text-navy/65 marker:text-accent">
                <li>Machine model and year.</li>
                <li>Valve block make: Husco, Hydra Control or Walvoil.</li>
                <li>The old part number, or a photo of the old part.</li>
                <li>Quantity and pack size, if known.</li>
              </ul>
            </div>

            <p className="mt-8 text-xs font-bold uppercase leading-relaxed tracking-[0.14em] text-muted">
              Dispatch from Faridabad
              <br />
              Dealer and bulk rates available
            </p>
          </aside>
        </div>
      </Container>
    </>
  );
}
