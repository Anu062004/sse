import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { posts } from "@/data/posts";
import { formatDate } from "@/lib/format";
import { whatsappHref } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Journal",
  description:
    "Fitment notes for earthmoving spool valves and seal kits — machine years, valve block makes and wiper seal failures.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="Fitment notes from the field."
        intro="Short, practical notes on identifying spool valves, valve blocks and seal kits for earthmoving machines."
      />

      <Container className="py-10 md:py-14">
        <div className="border-b border-line">
          {posts.map((post) => (
            <article key={post.slug} className="border-t border-line">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-4 gap-x-4 gap-y-4 py-8 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8"
              >
                <div className="col-span-4 md:col-span-2">
                  <time
                    dateTime={post.date}
                    className="text-xs font-bold uppercase tracking-[0.16em] text-muted"
                  >
                    {formatDate(post.date)}
                  </time>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                    {post.category}
                  </p>
                </div>

                <div className="col-span-4 md:col-span-6 lg:col-span-7">
                  <h2 className="text-xl font-medium leading-snug tracking-[-0.025em] group-hover:underline group-hover:decoration-accent group-hover:underline-offset-4 sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy/60">
                    {post.excerpt}
                  </p>
                </div>

                <div className="col-span-4 flex items-start justify-between gap-4 md:col-span-8 lg:col-span-3 lg:justify-end">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                    {post.readingTime}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-lg transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-sm leading-relaxed text-navy/60">
            Have a fitment question that is not covered here? Send us the
            machine details and a photo of the old part.
          </p>
          <ButtonLink
            href={whatsappHref(
              "Hello SSE, I have a fitment question about a machine.",
            )}
            variant="outline"
            className="shrink-0"
          >
            Ask on WhatsApp
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
