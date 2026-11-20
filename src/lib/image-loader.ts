"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Chargeur d'images :
 * - photos Unsplash → CDN Unsplash (format WebP/AVIF automatique, largeur adaptée à l'écran) ;
 * - fichiers locaux (dossier public) → servis tels quels.
 */
export default function imageLoader({ src, width, quality }: LoaderArgs) {
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
