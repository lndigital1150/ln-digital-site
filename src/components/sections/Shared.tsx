import Link from "next/link";
import type { ReactNode } from "react";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import Marquee from "@/components/ui/Marquee";
import { InfoIcon, StarIcon } from "@/components/ui/Icons";
import type { PhotoKey } from "@/config/images";
import { DEMO_NOTICE } from "@/config/projects";
import { whatsappUrl } from "@/lib/links";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

/* ---------- En-tête de section ---------- */
export function SectionHead({ title, intro, aside }: { title: ReactNode; intro?: ReactNode; aside?: ReactNode }) {
  return (
    <div className="section-head">
      {/* Un simple filet structure la section : le titre porte seul la hiérarchie, sans étiquette au-dessus */}
      <div className="section-head__meta">
        <hr className="hairline" data-line style={{ flex: 1 }} />
        {aside}
      </div>
      <div className="section-head__row">
        <h2 className="h2" data-split>
          {title}
        </h2>
        {intro && (
          <div className="lead" data-reveal>
            {intro}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Héros des pages intérieures ---------- */
export function PageHero({
  label,
  title,
  intro,
  hand,
  image,
  imageTag,
  crumbs,
  children,
}: {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  hand?: string;
  image?: PhotoKey;
  imageTag?: string;
  crumbs: { name: string; path: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="page-hero theme-dark" data-chapter={label}>
      {/* Police du titre préchargée sur les pages intérieures : elle arrive avant le premier affichage, le titre
          ne change pas de largeur ensuite (pas de décalage). Balises <link> écrites dans la page (et non
          ReactDOM.preload) : elles ne s'appliquent qu'à la page affichée, pas aux pages préchargées en
          arrière-plan par Next.js. L'accueil, lui, ne charge pas cette police. */}
      <link rel="preload" href="/fonts/newsreader-latin-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/newsreader-latin-italic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <BreadcrumbJsonLd items={crumbs} />
      <div className="container">
        <div className="page-hero__meta">
          <nav className="breadcrumbs label" aria-label="Fil d'Ariane">
            <ol>
              {crumbs.map((c, i) =>
                i < crumbs.length - 1 ? (
                  <li key={c.path}>
                    <Link href={c.path}>{c.name}</Link>
                  </li>
                ) : (
                  <li key={c.path} aria-current="page">
                    {c.name}
                  </li>
                ),
              )}
            </ol>
          </nav>
        </div>
        <div className="page-hero__grid">
          {/* En-tête de page animé en CSS (« hero-in ») dès le premier affichage, sans attendre le JavaScript :
              c'est le premier contenu visible de la page (meilleur LCP). */}
          <h1 className="h1 hero-in">
            {title}
          </h1>
          <div className="stack">
            {intro && (
              <div className="lead hero-in hero-in--2">
                {intro}
              </div>
            )}
            {hand && (
              <p className="hand hero-in hero-in--3">
                {hand}
              </p>
            )}
            {children && (
              <div className="hero-in hero-in--4">
                {children}
              </div>
            )}
          </div>
        </div>
        {image && (
          <div className="page-hero__visual hero-in hero-in--photo">
            <Photo
              name={image}
              className="ratio-21-9"
              sizes="100vw"
              priority
              parallax={10}
              tag={imageTag}
              delay={0.2}
            />
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Mention projet fictif ---------- */
export function DemoNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`demo-notice ${className}`}>
      <InfoIcon />
      <span>{DEMO_NOTICE}</span>
    </p>
  );
}

/* ---------- Grand bandeau défilant ---------- */
export function BigMarquee({ words, theme = "theme-violet" }: { words: ReactNode[]; theme?: string }) {
  return (
    <div className={theme} aria-hidden="true">
      <Marquee speed={70}>
        {words.map((w, i) => (
          <span key={i} className="marquee__item">
            {w}
            <StarIcon className="marquee__star" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ---------- Appel à l'action final ---------- */
export function FinalCta({
  image = "cta",
  title = (
    <>
      Prêt à développer votre <em>présence digitale&nbsp;?</em>
    </>
  ),
  text = "Discutons de votre projet et identifions les solutions les plus adaptées à votre entreprise.",
  quoteHref = "/contact#devis",
  whatsappMessage,
}: {
  image?: PhotoKey;
  title?: ReactNode;
  text?: string;
  /** Lien du bouton devis (par ex. avec le service présélectionné). */
  quoteHref?: string;
  /** Message WhatsApp prérempli propre à la page. */
  whatsappMessage?: string;
}) {
  return (
    <section className="cta theme-dark" data-chapter="Contact">
      <div className="cta__bg" data-speed="-0.15">
        <Photo name={image} sizes="100vw" />
      </div>
      <div className="container cta__content">
        <h2 className="display" data-split style={{ maxWidth: "14ch" }}>
          {title}
        </h2>
        <p className="lead" data-reveal>
          {text}
        </p>
        <div className="btn-row" data-reveal data-delay="0.15">
          <Button href={quoteHref} variant="accent">
            Demander un devis
          </Button>
          <Button href={whatsappUrl(whatsappMessage)} variant="ghost" icon="whatsapp">
            Nous contacter sur WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
