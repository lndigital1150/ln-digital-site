import type { Metadata } from "next";
import { site } from "@/config/site";

type PageMeta = { title: string; description: string; path: string; image?: string };

/** Métadonnées SEO uniques par page (titre, description, URL canonique, Open Graph). */
export function pageMeta({ title, description, path, image }: PageMeta): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      images: image ? [{ url: `${image}?auto=format&fit=crop&w=1200&h=630&q=70`, width: 1200, height: 630 }] : undefined,
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}
