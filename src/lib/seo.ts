import type { Metadata } from "next";
import { site } from "@/config/site";
import { shareImage } from "@/config/images";

type PageMeta = { title: string; description: string; path: string; image?: string };

/** Image d'aperçu de partage : JPG local 1200 × 630 (public/photos/<clé>-og.jpg), lu par tous les réseaux sociaux. */
const shareImageUrl = (image: string) => shareImage(image);

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
