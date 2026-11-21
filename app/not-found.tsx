import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <PageHeader
      title="This page is not in the catalogue."
      intro="The link may be old, or the part may have moved. Browse the catalogue or send us the machine details and we will find it."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "404 — Page not found" }]}
    >
      <div className="flex flex-wrap gap-3 pb-[10vh] pt-8">
        <ButtonLink href="/products" variant="light">
          Browse the catalogue
        </ButtonLink>
        <ButtonLink href="/" variant="ghost">
          Back to home
        </ButtonLink>
      </div>
    </PageHeader>
  );
}
