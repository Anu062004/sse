import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { formatDate } from "@/lib/format";
import { quoteHref, whatsappHref } from "@/lib/links";
import { getPost, posts } from "@/data/posts";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const morePosts = posts.filter((item) => item.slug !== post.slug);

  return (
    <>
      <Container className="py-8 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Journal", href: "/blog" },
            { label: post.title },
          ]}
        />

        <div className="mt-8 grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
          <article className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-5 lg:row-start-1">
            <header>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-navy/45">
                {post.category} · {post.readingTime} read
              </p>
              <h1 className="mt-4 text-[clamp(2.25rem,4.8vw,4rem)] font-medium leading-[0.98] tracking-[-0.04em]">
                {post.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy/70">
                {post.excerpt}
              </p>
            </header>

            <div className="mt-10 max-w-[68ch] border-t border-navy/20 pt-8">
              {post.body.map((block, index) => {
                if (block.type === "h2") {
                  return (
                    <h2
                      key={index}
                      className="mt-10 text-2xl font-medium tracking-[-0.03em] first:mt-0"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "ul") {
                  return (
                    <ul
                      key={index}
                      className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed text-navy/75 marker:text-yellow"
                    >
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p
                    key={index}
                    className="mt-5 text-base leading-relaxed text-navy/75 first:mt-0"
                  >
                    {block.text}
                  </p>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col gap-4 border-t border-navy/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-sm leading-relaxed text-navy/60">
                Still unsure? Send a photo of the old part on WhatsApp and we
                will identify it.
              </p>
              <ButtonLink
                href={whatsappHref(
                  `Hello SSE, I read "${post.title}" and need help with a part.`,
                )}
                variant="outline"
                className="shrink-0"
              >
                Ask on WhatsApp
              </ButtonLink>
            </div>
          </article>

          <aside className="col-span-4 lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:self-start">
            <div className="border-t border-navy/20 pt-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-navy/45">
                {post.category}
              </p>
              <p className="mt-3 text-sm text-navy/70">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </p>
              <p className="mt-1 text-sm text-navy/70">{post.readingTime} read</p>
              <p className="mt-1 text-sm text-navy/70">{post.author}</p>
            </div>

            <div className="mt-6 border border-line bg-paper p-5">
              <p className="text-sm font-medium">Need this part?</p>
              <p className="mt-2 text-sm leading-relaxed text-navy/60">
                Send the machine, year and valve block. We will confirm the
                fitment and the pack size.
              </p>
              <ButtonLink
                href={quoteHref()}
                variant="outline"
                className="mt-4 min-h-10 w-full px-4 text-[9px]"
              >
                Request a price
              </ButtonLink>
            </div>
          </aside>
        </div>
      </Container>

      {morePosts.length > 0 ? (
        <div className="border-t border-line bg-paper">
          <Container className="py-12 md:py-16">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
                More notes
              </h2>
              <ArrowLink href="/blog">All notes</ArrowLink>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {morePosts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group border-t border-navy/20 pt-4"
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-navy/45">
                    {item.category} · {formatDate(item.date)}
                  </p>
                  <h3 className="mt-3 text-lg font-medium leading-snug tracking-[-0.02em] group-hover:underline group-hover:decoration-yellow group-hover:underline-offset-4">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </Container>
        </div>
      ) : null}

      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
    </>
  );
}
