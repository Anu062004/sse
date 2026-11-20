import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { mailHref, telHref, whatsappHref } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact SSE Aftermarket Solution in Faridabad, Haryana for spool valves, seal kits and hydraulic spares. Call, WhatsApp or request a quote.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Faridabad, Haryana."
        intro="Call, WhatsApp or send a quote request. We reply during business hours."
      />

      <Container className="py-10 md:py-14">
        <div className="grid grid-cols-4 gap-x-4 gap-y-12 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
          <div className="col-span-4 lg:col-span-6">
            <dl>
              <div className="grid grid-cols-[6rem_1fr] gap-4 border-t border-navy/20 py-5">
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-navy/45">
                  Phone
                </dt>
                <dd className="text-base">
                  <a
                    href={telHref}
                    className="underline-offset-4 hover:underline"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>

              <div className="grid grid-cols-[6rem_1fr] gap-4 border-t border-navy/20 py-5">
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-navy/45">
                  WhatsApp
                </dt>
                <dd className="text-base">
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    Message on WhatsApp
                  </a>
                </dd>
              </div>

              <div className="grid grid-cols-[6rem_1fr] gap-4 border-t border-navy/20 py-5">
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-navy/45">
                  Email
                </dt>
                <dd className="break-all text-base">
                  <a
                    href={mailHref()}
                    className="underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>

              <div className="grid grid-cols-[6rem_1fr] gap-4 border-t border-navy/20 py-5">
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-navy/45">
                  Address
                </dt>
                <dd className="text-base leading-relaxed text-navy/80">
                  <address className="not-italic">
                    {site.name}
                    <br />
                    {site.address.full}
                  </address>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex min-h-8 items-center border-b border-navy/30 text-[10px] font-semibold uppercase tracking-[0.16em] underline-offset-4 hover:border-navy"
                  >
                    Open in maps
                  </a>
                </dd>
              </div>

              <div className="grid grid-cols-[6rem_1fr] gap-4 border-y border-navy/20 py-5">
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-navy/45">
                  Hours
                </dt>
                <dd className="text-base text-navy/80">{site.hours}</dd>
              </div>
            </dl>
          </div>

          <div className="col-span-4 lg:col-span-5 lg:col-start-8">
            <div className="border border-line bg-paper p-6 md:p-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-navy/45">
                Quote requests
              </p>
              <h2 className="mt-3 text-2xl font-medium leading-tight tracking-[-0.03em]">
                Send the machine details.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-navy/65">
                Include the machine model, year, valve block and the quantity you
                need. A photo of the old part helps us confirm the fitment.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink href="/quote">Request a quote</ButtonLink>
                <ButtonLink
                  href={whatsappHref(
                    "Hello SSE, I would like to enquire about a part.",
                  )}
                  variant="outline"
                >
                  WhatsApp us
                </ButtonLink>
              </div>
              <p className="mt-6 border-t border-line pt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-navy/45">
                Dealer and bulk enquiries welcome
                <br />
                Dispatch across India
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
