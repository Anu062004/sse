import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { products } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { path: "/", priority: 1, changeFrequency: "weekly" },
      { path: "/products", priority: 0.9, changeFrequency: "weekly" },
      { path: "/about", priority: 0.7, changeFrequency: "monthly" },
      { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
      { path: "/blog", priority: 0.7, changeFrequency: "monthly" },
      { path: "/quote", priority: 0.8, changeFrequency: "monthly" },
      { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    ] as const
  ).map(({ path, ...rest }) => ({
    url: absoluteUrl(path),
    lastModified: now,
    ...rest,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/products/${product.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...postRoutes];
}
