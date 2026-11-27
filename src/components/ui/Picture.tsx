import { photoFile, photoSrcSet, photos, type PhotoKey } from "@/config/images";

type Props = {
  name: PhotoKey;
  /** Taille affichée, comme l'attribut HTML sizes (ex. « (max-width: 900px) 100vw, 50vw »). */
  sizes: string;
  /** Texte alternatif ; par défaut celui du registre. Passer "" pour une image décorative. */
  alt?: string;
  /** Image principale de la page (LCP) : préchargée, téléchargée en priorité, sans chargement différé. */
  priority?: boolean;
};

/** Style « remplissage » identique à celui de next/image (fill) : l'image couvre son conteneur positionné. */
const FILL: React.CSSProperties = {
  position: "absolute",
  height: "100%",
  width: "100%",
  inset: 0,
  color: "transparent",
};

/**
 * Photo locale (public/photos) en <picture> : AVIF en priorité, WebP sinon (Safari sur macOS 12, etc.).
 * Rendu côté serveur, sans JavaScript ni hydratation ; chargement différé natif (loading="lazy").
 */
export default function Picture({ name, sizes, alt, priority }: Props) {
  const avif = photoSrcSet(name, "avif");
  return (
    <>
      {/* Préchargement de la variante AVIF (ignoré par les navigateurs qui ne lisent pas l'AVIF, grâce à type).
          Balise <link> écrite dans la page, et non ReactDOM.preload() : ce dernier s'exécutait aussi lors du
          préchargement en arrière-plan des AUTRES pages par Next.js (téléchargements inutiles, avertissements). */}
      {priority && (
        <link rel="preload" as="image" type="image/avif" imageSrcSet={avif} imageSizes={sizes} fetchPriority="high" />
      )}
      <picture>
        <source type="image/avif" srcSet={avif} sizes={sizes} />
        <source type="image/webp" srcSet={photoSrcSet(name, "webp")} sizes={sizes} />
        <img
          src={photoFile(name, 828, "webp")}
          alt={alt ?? photos[name].alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
          style={FILL}
        />
      </picture>
    </>
  );
}
