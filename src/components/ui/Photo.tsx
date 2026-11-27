import Picture from "./Picture";
import { photos, type PhotoKey } from "@/config/images";

type Props = {
  name: PhotoKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Révélation par rideau à l'entrée dans l'écran. */
  reveal?: boolean | "left" | "right" | "up";
  /** Amplitude de parallaxe en % (ex. 8). */
  parallax?: number;
  zoom?: boolean;
  tag?: string;
  demo?: boolean;
  cursor?: string;
  delay?: number;
  style?: React.CSSProperties;
  alt?: string;
};

/** Photo optimisée (WebP/AVIF, tailles adaptées) avec effets d'animation optionnels. */
export default function Photo({
  name,
  className = "",
  sizes = "(max-width: 900px) 100vw, 50vw",
  priority,
  reveal,
  parallax,
  zoom,
  tag,
  demo,
  cursor,
  delay,
  style,
  alt,
}: Props) {
  const p = photos[name];
  const cls = ["photo", zoom && "photo--zoom", className].filter(Boolean).join(" ");
  return (
    <figure
      className={cls}
      style={style}
      data-img-reveal={reveal ? (reveal === true ? "up" : reveal) : undefined}
      data-parallax={parallax ? String(parallax) : undefined}
      data-cursor={cursor}
      data-delay={delay}
    >
      <div className="photo__inner" style={parallax ? { inset: `-${parallax + 2}% 0` } : undefined}>
        {/* Photo locale AVIF/WebP ; prioritaire (préchargée, priorité haute) pour l'en-tête de page (LCP) */}
        <Picture name={name} alt={alt ?? p.alt} sizes={sizes} priority={priority} />
      </div>
      {tag && <figcaption className={`photo__tag${demo ? " photo__tag--demo" : ""}`}>{tag}</figcaption>}
    </figure>
  );
}
