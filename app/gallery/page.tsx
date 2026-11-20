import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { whatsappHref } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "Machines and field conditions SSE Aftermarket Solution supplies for — CASE, JCB, XCMG and other earthmoving equipment.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Machines, parts and the field."
        intro="A look at the machines we supply and the conditions the parts are built for."
      />

      <Container className="py-10 md:py-14">
        <GalleryGrid />

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-sm leading-relaxed text-navy/60">
            Product photography is being updated. Ask for current photos of a
            specific part before you order.
          </p>
          <ButtonLink
            href={whatsappHref(
              "Hello SSE, please share current photos of a part.",
            )}
            variant="outline"
            className="shrink-0"
          >
            Request photos
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
