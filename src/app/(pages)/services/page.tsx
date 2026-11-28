import type { Metadata } from "next";
import Link from "next/link";
import { services, servicePath } from "@/config/services";
import { offers, formatPrice } from "@/config/pricing";
import { photos } from "@/config/images";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/Icons";
import HoverPreview from "@/components/motion/HoverPreview";
import { FinalCta, PageHero } from "@/components/sections/Shared";
import { pageMeta } from "@/lib/seo";
import { quoteUrl } from "@/lib/links";

export const metadata: Metadata = pageMeta({
  title: "Nos services web à Bruxelles et en Wallonie",
  description:
    "Trois services pour indépendants et PME à Bruxelles et en Wallonie : création de sites web, identité visuelle (logo) et fiche Google Business Profile.",
  path: "/services",
  image: photos.web.src,
});

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
            Trois services pour <em>grandir</em> en ligne.
          </>
        }
        intro="Un site web, une identité visuelle et une fiche Google soignée : chaque service peut être réalisé seul ou combiné aux autres selon vos objectifs."
        hand="à la carte ou combinés"
      />

      <section className="theme-dark" style={{ paddingBottom: "var(--section)" }} aria-label="Sommaire des services">
        <div className="container">
          <HoverPreview images={services.map((s) => s.image)} className="svc-index">
            {services.map((s, i) => (
              <Link key={s.slug} href={servicePath(s)} data-preview-index={i} data-cursor="Voir">
                <strong>{s.title}</strong>
                <ArrowUpRight />
              </Link>
            ))}
          </HoverPreview>
        </div>
      </section>

      {services.map((s, i) => {
        const offer = offers.find((o) => o.id === s.offerId);
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
                  {/* Résumé : le détail (présentation complète, prestations incluses, questions fréquentes)
                      est sur la page dédiée du service, pour ne pas dupliquer le contenu. */}
                  <p className="lead" data-reveal>
                    {s.short}
                  </p>
                  <div data-reveal>
                    <h3>Bénéfices pour vous</h3>
                    <ul className="checklist">
                      {s.benefits.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  {s.note && (
                    <p className="note" data-reveal>
                      {s.note}
                    </p>
                  )}
                  <div className="btn-row" data-reveal>
                    <Button href={servicePath(s)} variant={i === 0 ? "accent" : "primary"}>
                      Découvrir le service
                    </Button>
                    <Button href={quoteUrl(s.slug)} variant="ghost">
                      Demander un devis
                    </Button>
                    <Button href={`/tarifs#${s.offerId}`} variant="ghost">
                      Voir le tarif
                    </Button>
                  </div>
                </div>
              </div>

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
