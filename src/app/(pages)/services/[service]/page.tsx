import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getServiceByPath, servicePath } from "@/config/services";
import { serviceContent, type ServiceBlock } from "@/config/service-content";
import { getOffer, formatPrice } from "@/config/pricing";
import { getProject } from "@/config/projects";
import { photos } from "@/config/images";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import FaqList from "@/components/ui/FaqList";
import { rich } from "@/components/ui/RichText";
import { ArrowUpRight } from "@/components/ui/Icons";
import HoverPreview from "@/components/motion/HoverPreview";
import MethodSteps from "@/components/motion/MethodSteps";
import { ProjectCard } from "@/components/sections/Cards";
import { DemoNotice, FinalCta, PageHero, SectionHead } from "@/components/sections/Shared";
import { ServiceJsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/seo";
import { orderUrl, quoteUrl, whatsappUrl } from "@/lib/links";

/**
 * Page dédiée à un service : /services/creation-site-web, /services/identite-visuelle,
 * /services/google-business-profile.
 * Contenus : src/config/services.ts (titre, H1, FAQ…) et src/config/service-content.ts (sections éditoriales).
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

/** Une section éditoriale (voir ServiceBlock dans service-content.ts). */
function Block({ block }: { block: ServiceBlock }) {
  const title = rich(block.title);
  const intro = block.intro ? rich(block.intro) : undefined;

  if (block.kind === "steps" && block.items) {
    return (
      <section className={`section ${block.theme}`} data-chapter={block.chapter}>
        <div className="container">
          <SectionHead title={title} intro={intro} />
          <MethodSteps
            steps={block.items.map((it) => ({ title: it.title, text: it.text, image: it.image ?? "stepUnderstand" }))}
          />
        </div>
      </section>
    );
  }

  if (block.kind === "cards" && block.items) {
    return (
      <section className={`section ${block.theme}`} data-chapter={block.chapter}>
        <div className="container">
          <SectionHead title={title} intro={intro} />
          <div className="values" data-stagger>
            {block.items.map((it) => (
              <article key={it.title} className="value">
                <div className="stack" style={{ gap: 10 }}>
                  <h3>{it.title}</h3>
                  <p className="muted">{rich(it.text)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // « points » et « checklist » : titre et introduction à gauche, liste à droite
  return (
    <section className={`section ${block.theme}`} data-chapter={block.chapter}>
      <div className="container grid-2" style={{ alignItems: "start" }}>
        <div className="stack" style={{ gap: 28 }}>
          <h2 className="h2" data-split>
            {title}
          </h2>
          {intro && (
            <p className="lead" data-reveal>
              {intro}
            </p>
          )}
        </div>
        {block.kind === "checklist" && block.list ? (
          <ul className="checklist" data-reveal>
            {block.list.map((li) => (
              <li key={li}>{rich(li)}</li>
            ))}
          </ul>
        ) : (
          <ol className="points" data-stagger>
            {block.items?.map((it) => (
              <li key={it.title} className="point">
                <div>
                  <h3>{it.title}</h3>
                  <p className="muted" style={{ marginTop: 6, fontSize: 15 }}>
                    {rich(it.text)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default async function ServicePage({ params }: Props) {
  const s = getServiceByPath((await params).service);
  if (!s) notFound();
  const c = serviceContent[s.slug];
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
        intro={c.lead}
        image={s.image}
      >
        <ul className="checklist service-points">
          {c.valuePoints.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
        <div className="btn-row">
          <Button href={quoteUrl(s.slug)} variant="accent">
            Demander un devis
          </Button>
          {offer && (
            <Button href={`/tarifs#${offer.id}`} variant="ghost">
              Voir le tarif
            </Button>
          )}
        </div>
      </PageHero>

      {/* Présentation du service et prestations incluses */}
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
              <div data-reveal>
                <h3>{c.includesTitle}</h3>
                <ul className="checklist checklist--muted mt-s">
                  {s.includes.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {c.blocks.map((b) => (
        <Block key={b.title} block={b} />
      ))}

      {c.audienceItems && c.audienceTitle && (
        <section className="section theme-light" data-chapter="Pour qui">
          <div className="container">
            <SectionHead title={rich(c.audienceTitle)} intro={s.audience} />
            <div className="values" data-stagger>
              {c.audienceItems.map((a) => (
                <article key={a.title} className="value">
                  <div className="stack" style={{ gap: 10 }}>
                    <h3>{a.title}</h3>
                    <p className="muted">{a.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {offer && (
        <section className="section theme-night" data-chapter="Tarif" aria-labelledby="svc-tarif">
          <div className="container grid-2" style={{ alignItems: "start" }}>
            <div className="stack" style={{ gap: 28 }}>
              <h2 id="svc-tarif" className="h2" data-split>
                Un tarif <em>clair</em> dès le départ.
              </h2>
              <p className="lead" data-reveal>
                {c.pricingText}
              </p>
            </div>
            <div className="stack" style={{ gap: 20 }} data-reveal>
              <p className="label">Tarif indicatif · {offer.name}</p>
              <p className="h3" style={{ color: "var(--orange-vibrant)" }}>
                {formatPrice(offer)}
              </p>
              <p className="muted">{offer.unit}</p>
              <div className="btn-row">
                <Button href={quoteUrl(s.slug)} variant="accent">
                  Demander un devis
                </Button>
                {offer.mode === "direct" && (
                  <Button href={orderUrl(offer.id)} variant="ghost">
                    Commander
                  </Button>
                )}
                <Button href={whatsappUrl(c.whatsapp)} variant="ghost" icon="whatsapp">
                  Une question ? WhatsApp
                </Button>
              </div>
              <Link href={`/tarifs#${offer.id}`} className="link-arrow">
                Détail du tarif et des conditions <ArrowUpRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {project && (
        <section className="section theme-dark" data-chapter="Exemple">
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
              Une autre question&nbsp;? <Link href={quoteUrl(s.slug)} className="text-link">Écrivez-nous</Link> ou
              consultez les <Link href="/contact" className="text-link">questions générales sur nos services</Link>.
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

      <FinalCta
        image="aboutWorkshop"
        title={rich(c.cta.title)}
        text={c.cta.text}
        quoteHref={quoteUrl(s.slug)}
        whatsappMessage={c.whatsapp}
      />
    </>
  );
}
