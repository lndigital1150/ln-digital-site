"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Chargeur d'images :
 * - photos Unsplash → CDN Unsplash (format WebP/AVIF automatique, largeur adaptée à l'écran) ;
 * - photos d'en-tête locales (public/photos/hero/<clé>.avif) → variante pré-générée la plus proche
 *   (scripts/local-hero-photos.mjs), servie depuis le même domaine que le site ;
 * - autres fichiers locaux (dossier public) → servis tels quels.
 */
const HERO_WIDTHS = [640, 828, 1080, 1440, 1920];

export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (src.startsWith("/photos/hero/") && src.endsWith(".avif")) {
    const w = HERO_WIDTHS.find((x) => x >= width) ?? HERO_WIDTHS[HERO_WIDTHS.length - 1];
    return src.replace(/\.avif$/, `-${w}.avif`);
  }
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 72));
    return url.toString();
  }
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
