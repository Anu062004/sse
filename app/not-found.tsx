import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-20">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/45">
        404 — Page not found
      </p>
      <h1 className="mt-4 max-w-2xl text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.95] tracking-[-0.045em]">
        This page is not in the catalogue.
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-navy/65">
        The link may be old, or the part may have moved. Browse the catalogue or
        send us the machine details and we will find it.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/products">Browse products</ButtonLink>
        <ButtonLink href="/" variant="outline">
          Back to home
        </ButtonLink>
      </div>
    </Container>
  );
}
