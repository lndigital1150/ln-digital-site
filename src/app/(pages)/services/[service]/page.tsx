import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getServiceByPath, servicePath } from "@/config/services";
import { getOffer, formatPrice } from "@/config/pricing";
import { getProject } from "@/config/projects";
import { photos } from "@/config/images";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import FaqList from "@/components/ui/FaqList";
import { ArrowUpRight } from "@/components/ui/Icons";
import HoverPreview from "@/components/motion/HoverPreview";
import { ProjectCard } from "@/components/sections/Cards";
import { DemoNotice, FinalCta, PageHero } from "@/components/sections/Shared";
import { ServiceJsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/seo";
import { orderUrl, quoteUrl } from "@/lib/links";

/**
 * Page dédiée à un service : /services/creation-site-web, /services/identite-visuelle,
 * /services/google-business-profile. Tout le contenu vient de src/config/services.ts (et pricing.ts).
 */

type Props = { params: Promise<{ service: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ service: s.path }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getServiceByPath((await params).service);
  if (!s) return {};
  return pageMeta({ ...s.seo, path: servicePath(s), image: photos[s.image].src });
}

export default async function ServicePage({ params }: Props) {
  const s = getServiceByPath((await params).service);
  if (!s) notFound();
  const offer = getOffer(s.offerId);
  const project = getProject(s.projectSlug);
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <ServiceJsonLd service={s} />
      <PageHero
        label={s.title}
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: s.title, path: servicePath(s) },
        ]}
        title={
          <>
            {s.hero.before}
            <em>{s.hero.em}</em>
            {s.hero.after}
          </>
        }
        intro={s.short}
        image={s.image}
      >
        <div className="btn-row">
          <Button href={quoteUrl(s.slug)} variant="accent">
            Demander un devis
          </Button>
          {offer && (
            <Button href={`/tarifs#${offer.id}`} variant="ghost">
              {formatPrice(offer)}
            </Button>
          )}
        </div>
      </PageHero>

      <section className="section theme-night" data-chapter="Le service" aria-labelledby="svc-headline">
        <div className="container">
          <div className="svc">
            <div className="svc__media">
              <Photo name={s.imageAlt} reveal parallax={8} sizes="(max-width: 1000px) 100vw, 50vw" />
            </div>
            <div className="svc__body">
              <h2 id="svc-headline" className="h2" data-split>
                {s.headline}
              </h2>
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
            </div>
          </div>
        </div>
      </section>

      <section className="section theme-dark" data-chapter="Pour qui">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 28 }}>
            <h2 className="h2" data-split>
              Pour <em>qui&nbsp;?</em>
            </h2>
            <p className="lead" data-reveal>
              {s.audience}
            </p>
          </div>
          {offer && (
            <div className="stack" style={{ gap: 20 }} data-reveal>
              <p className="label">Tarif indicatif</p>
              <p className="h3" style={{ color: "var(--orange-vibrant)" }}>
                {formatPrice(offer)}
              </p>
              <p className="muted">
                {offer.name} · {offer.unit}. {offer.mode === "direct" ? "Commande en ligne ou sur devis." : "Sur devis."}
              </p>
              <div className="btn-row">
                {offer.mode === "direct" && (
                  <Button href={orderUrl(offer.id)} variant="primary">
                    Commander
                  </Button>
                )}
                <Button href={`/tarifs#${offer.id}`} variant="ghost">
                  Détail du tarif
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {project && (
        <section className="section theme-night" data-chapter="Exemple">
          <div className="container grid-2" style={{ alignItems: "start" }}>
            <div className="stack" style={{ gap: 28 }}>
              <h2 className="h2" data-split>
                Un exemple <em>concret.</em>
              </h2>
              <p className="lead" data-reveal>
                Pour imaginer le résultat, découvrez un projet de démonstration conçu autour de ce service.
              </p>
              <DemoNotice />
            </div>
            <ProjectCard project={project} index={0} />
          </div>
        </section>
      )}

      <section className="section theme-light" data-chapter="Questions">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 28 }}>
            <h2 className="h2" data-split>
              Questions <em>fréquentes.</em>
            </h2>
            <p className="lead" data-reveal>
              D&apos;autres questions&nbsp;? Consultez la <Link href="/contact">page Contact</Link> ou écrivez-nous
              directement.
            </p>
          </div>
          <FaqList items={s.faq} />
        </div>
      </section>

      <section className="section theme-dark" data-chapter="Autres services" aria-labelledby="autres-services">
        <div className="container">
          <h2 id="autres-services" className="label" style={{ marginBottom: 28 }}>
            Nos autres services
          </h2>
          <HoverPreview images={others.map((o) => o.image)} className="svc-index">
            {others.map((o, i) => (
              <Link key={o.slug} href={servicePath(o)} data-preview-index={i} data-cursor="Voir">
                <strong>{o.title}</strong>
                <ArrowUpRight />
              </Link>
            ))}
          </HoverPreview>
        </div>
      </section>

      <FinalCta image="aboutWorkshop" />
    </>
  );
}
