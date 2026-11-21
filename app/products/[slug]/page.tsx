import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDescription } from "@/components/products/ProductDescription";
import { ProductDetail } from "@/components/products/ProductDetail";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCategoryName } from "@/data/categories";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/lib/products";
import {
  breadcrumbSchema,
  productSchema,
} from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

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

  return (
    <>
      <div className="on-dark relative bg-ink pb-16 pt-[140px] md:pb-20">
        <div aria-hidden="true" className="dots absolute inset-0" />
        <Container className="relative">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Catalogue", href: "/products" },
              {
                label: categoryName,
                href: `/products?category=${product.category}`,
              },
              { label: product.name },
            ]}
          />
          <div className="mt-8">
            <ProductDetail product={product} priority />
          </div>
        </Container>
      </div>

      <ProductDescription product={product} />

      {related.length > 0 ? (
        <Section>
          <Container>
            <SectionHeader
              label="Related parts"
              title="Other fitments to check."
              intro="Parts in the same category or for the same machine family."
              action={<ArrowLink href="/products">All products</ArrowLink>}
            />
            <div className="mt-10 grid grid-cols-1 gap-6 min-[521px]:grid-cols-2 min-[821px]:grid-cols-3">
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
            { name: "Catalogue", path: "/products" },
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
