import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/config/services";
import { offers, formatPrice } from "@/config/pricing";
import { photos, type PhotoKey } from "@/config/images";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/Icons";
import HoverPreview from "@/components/motion/HoverPreview";
import { FinalCta, PageHero } from "@/components/sections/Shared";
import { pageMeta } from "@/lib/seo";
import { quoteUrl } from "@/lib/links";

export const metadata: Metadata = pageMeta({
  title: "Services de marketing digital à Bruxelles et en Wallonie",
  description:
    "Création de sites web pour PME et indépendants, Google Business Profile, publicité digitale, identité de marque, e-mail marketing, contenu visuel et référencement naturel SEO.",
  path: "/services",
  image: photos.web.src,
});

const contentGallery: PhotoKey[] = ["contentProduct", "contentHeadphones", "contentShoot", "contentBags"];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
        ]}
        title={
          <>
            Sept services pour <em>grandir</em> en ligne.
          </>
        }
        intro="Site web, visibilité locale, publicité, identité, e-mail, visuels et SEO : chaque service peut être réalisé seul ou combiné aux autres selon vos objectifs."
        hand="à la carte ou combinés"
      />

      <section className="theme-dark" style={{ paddingBottom: "var(--section)" }} aria-label="Sommaire des services">
        <div className="container">
          <HoverPreview images={services.map((s) => s.image)} className="svc-index">
            {services.map((s, i) => (
              <Link key={s.slug} href={`#${s.slug}`} data-preview-index={i} data-cursor="Voir">
                <strong>{s.title}</strong>
                <ArrowUpRight />
              </Link>
            ))}
          </HoverPreview>
        </div>
      </section>

      {services.map((s, i) => {
        const offer = offers.find((o) => o.id === s.offerId);
        const isContent = s.slug === "creation-contenu-visuel";
        return (
          <section
            key={s.slug}
            id={s.slug}
            className={`section ${i % 2 === 0 ? "theme-night" : "theme-dark"}`}
            data-chapter={s.shortTitle}
            aria-labelledby={`${s.slug}-title`}
          >
            <div className="container">
              <div className="section-head__meta" style={{ marginBottom: "clamp(32px, 5vw, 72px)" }}>
                <span className="label">
                  (0{i + 1}) {s.title}
                </span>
                {offer && (
                  <span className="label" style={{ color: "var(--orange-vibrant)" }}>
                    {formatPrice(offer)}
                  </span>
                )}
              </div>
              <div className={`svc${i % 2 ? " svc--reverse" : ""}`}>
                <div className="svc__media">
                  <Photo name={s.image} reveal parallax={8} sizes="(max-width: 1000px) 100vw, 50vw" />
                  <Photo name={s.imageAlt} reveal="right" delay={0.3} sizes="(max-width: 1000px) 45vw, 22vw" />
                </div>
                <div className="svc__body">
                  <h2 id={`${s.slug}-title`} className="h2" data-split>
                    {s.title}
                  </h2>
                  <p className="h3 serif-italic" style={{ color: "var(--lavande-lumineuse)" }} data-reveal>
                    {s.headline}
                  </p>
                  <div className="prose" data-reveal>
                    {s.intro.map((p) => (
                      <p key={p.slice(0, 20)}>{p}</p>
                    ))}
                  </div>
                  <div className="svc__cols" data-reveal>
                    <div>
                      <h3>Bénéfices pour vous</h3>
                      <ul className="checklist">
                        {s.benefits.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3>Prestations incluses</h3>
                      <ul className="checklist checklist--muted">
                        {s.includes.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {s.note && (
                    <p className="note" data-reveal>
                      {s.note}
                    </p>
                  )}
                  <div className="btn-row" data-reveal>
                    <Button href={quoteUrl(s.slug)} variant={i === 0 ? "accent" : "primary"}>
                      Demander un devis
                    </Button>
                    <Button href={`/tarifs#${s.offerId}`} variant="ghost">
                      Voir le tarif
                    </Button>
                  </div>
                </div>
              </div>

              {isContent && (
                <div className="mt-l">
                  <p className="label" style={{ marginBottom: 20 }}>
                    Exemples de mises en scène visuelles — démonstration
                  </p>
                  <div className="gallery">
                    {contentGallery.map((k, j) => (
                      <Photo
                        key={k}
                        name={k}
                        reveal
                        delay={j * 0.1}
                        zoom
                        tag="Démonstration"
                        demo
                        sizes="(max-width: 900px) 50vw, 25vw"
                      />
                    ))}
                  </div>
                  <p className="muted mt-s" style={{ fontSize: 14 }}>
                    Photographies d&apos;illustration (Unsplash) — elles ne représentent pas des créations réalisées
                    pour des clients.
                  </p>
                </div>
              )}
            </div>
          </section>
        );
      })}

      <FinalCta
        image="aboutWorkshop"
        title={
          <>
            Quel service pour <em>votre projet&nbsp;?</em>
          </>
        }
        text="Décrivez-nous votre activité et vos objectifs : nous vous orientons vers les solutions les plus pertinentes."
      />
    </>
  );
}
