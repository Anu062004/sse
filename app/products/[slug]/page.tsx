import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FitmentLine } from "@/components/ui/FitmentLine";
import { JsonLd } from "@/components/ui/JsonLd";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCategoryName } from "@/data/categories";
import { productWhatsappHref, quoteHref, telHref } from "@/lib/links";
import {
  getProductBySlug,
  getProductSpecs,
  getRelatedProducts,
  products,
} from "@/lib/products";
import {
  breadcrumbSchema,
  productSchema,
} from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return {};

  return pageMetadata({
    title: product.name,
    description: product.description,
    path: `/products/${product.slug}`,
    ...(product.images[0] ? { image: product.images[0] } : {}),
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const categoryName = getCategoryName(product.category);
  const related = getRelatedProducts(product);
  const specs = getProductSpecs(product);

  return (
    <>
      <div className="border-b border-line bg-white">
        <Container className="py-8 md:py-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              {
                label: categoryName,
                href: `/products?category=${product.category}`,
              },
              { label: product.name },
            ]}
          />

          <div className="mt-8 grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
            <div className="col-span-4 lg:col-span-7">
              <MediaFrame
                images={product.images}
                alt={`${product.name} — ${product.part_number}`}
                label={product.name}
                ratio="aspect-[4/3]"
                sizes="(min-width: 1024px) 58vw, 100vw"
                priority
              />
              {product.images.length === 0 ? (
                <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-navy/45">
                  Photo coming soon · Ask for current photos on WhatsApp
                </p>
              ) : null}
            </div>

            <div className="col-span-4 lg:col-span-4 lg:col-start-9">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-navy/50">
                {categoryName} · Part {product.part_number}
              </p>
              <h1 className="mt-3 text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[0.98] tracking-[-0.04em]">
                {product.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-navy/70">
                {product.description}
              </p>

              <FitmentLine
                product={product}
                className="mt-4 text-[10px] text-navy/55"
              />

              <div className="mt-7 border border-line bg-paper p-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-navy/50">
                  Price
                </p>
                <p className="mt-2 text-2xl font-medium tracking-[-0.03em]">
                  On request
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">
                  Dealer and bulk rates available. We confirm fitment before
                  dispatch.
                </p>

                <div className="mt-5 flex flex-col gap-3">
                  <ButtonLink href={quoteHref(product.slug)}>
                    Request price
                  </ButtonLink>
                  <ButtonLink
                    href={productWhatsappHref(
                      product.part_number,
                      product.name,
                    )}
                    variant="outline"
                  >
                    WhatsApp
                  </ButtonLink>
                </div>

                <a
                  href={telHref}
                  className="mt-4 inline-block text-[10px] font-semibold uppercase tracking-[0.16em] text-navy/60 underline-offset-4 hover:text-navy hover:underline"
                >
                  Call {site.phone}
                </a>
              </div>

              <dl className="mt-8 border-t border-line">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between gap-6 border-b border-line py-3"
                  >
                    <dt className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-navy/45">
                      {spec.label}
                    </dt>
                    <dd className="text-right text-sm text-navy/80">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-navy/45">
                Dispatch from Faridabad · Pan-India supply
              </p>
            </div>
          </div>
        </Container>
      </div>

      {related.length > 0 ? (
        <Section tone="paper">
          <Container>
            <SectionHeader
              index="01"
              label="Related parts"
              title="Other fitments to check."
              intro="Parts in the same category or for the same machine family."
              action={<ArrowLink href="/products">All products</ArrowLink>}
            />
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:gap-x-8">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            {
              name: categoryName,
              path: `/products?category=${product.category}`,
            },
            {
              name: product.name,
              path: `/products/${product.slug}`,
            },
          ]),
        ]}
      />
    </>
  );
}
