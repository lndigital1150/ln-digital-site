import type { Metadata } from "next";
import { site } from "@/config/site";
import { shareImageSource } from "@/config/images";

type PageMeta = { title: string; description: string; path: string; image?: string };

/** Image d'aperçu de partage en 1200 × 630, au format JPG (le plus largement lu par les réseaux sociaux). */
function shareImageUrl(image: string) {
  const src = shareImageSource(image);
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  return `${src}?fm=jpg&fit=crop&w=1200&h=630&q=70`;
}

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
      images: image ? [{ url: shareImageUrl(image), width: 1200, height: 630 }] : undefined,
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}
