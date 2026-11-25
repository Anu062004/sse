import { site } from "@/lib/site";

export const telHref = `tel:${site.phoneHref}`;

export function whatsappHref(
  message = "Hello SSE, I would like a quote for hydraulic spares.",
): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function productWhatsappHref(partNumber: string, name: string): string {
  return whatsappHref(
    `Hello SSE, I would like a price for ${name} (${partNumber}).`,
  );
}

export function quoteHref(productSlug?: string): string {
  return productSlug ? `/quote?product=${productSlug}` : "/quote";
}

export function mailHref(subject?: string): string {
  return subject
    ? `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${site.email}`;
}
