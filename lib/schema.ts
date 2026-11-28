import { getCategoryName } from "@/data/categories";
import { supplyStates } from "@/data/coverage";
import type { Post } from "@/data/posts";
import type { Product } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    areaServed: supplyStates.map((state) => ({
      "@type": "State",
      name: state.name,
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "en-IN",
    publisher: { "@type": "Organization", name: site.name },
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    ...(product.part_number ? { sku: product.part_number, mpn: product.part_number } : {}),
    category: getCategoryName(product.category),
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@type": "Organization", name: site.name },
    itemCondition: "https://schema.org/NewCondition",
    url: absoluteUrl(`/products/${product.slug}`),
    ...(product.images.length > 0
      ? { image: product.images.map((image) => absoluteUrl(image)) }
      : {}),
    additionalProperty: [
      { name: "Machine", value: product.machine },
      { name: "Model", value: product.model },
      {
        name: "Year",
        value:
          product.year_from === null
            ? "On request"
            : product.year_to === null
              ? `${product.year_from} onwards`
              : `${product.year_from}–${product.year_to}`,
      },
      { name: "Valve block", value: product.valve_block },
      { name: "Spool position", value: product.spool_position },
      { name: "Pack size", value: product.pack_size },
      { name: "Material", value: product.material },
    ].map((entry) => ({
      "@type": "PropertyValue",
      name: entry.name,
      value: entry.value,
    })),
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl("/og-v2.jpg"),
  };
}
