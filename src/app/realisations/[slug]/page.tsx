import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/config/projects";
import { photos } from "@/config/images";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/Icons";
import { MockBrowser, MockPhone } from "@/components/sections/Cards";
import { DemoNotice, FinalCta, PageHero } from "@/components/sections/Shared";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.title} (démonstration)`,
    description: `Projet de démonstration fictif : ${p.short}`,
    path: `/realisations/${p.slug}`,
    image: photos[p.cover].src,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <PageHero


        label={p.category}
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Réalisations", path: "/realisations" },
          { name: p.category, path: `/realisations/${p.slug}` },
        ]}
        title={p.title}
        intro={p.short}
        image={p.cover}
        imageTag="Démo fictive"
      >
        <DemoNotice />
      </PageHero>

      <section className="section theme-light" data-chapter="Concept">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 28 }}>
            <h2 className="h2" data-split>
              Le <em>point de départ.</em>
            </h2>
            <p className="lead" data-reveal>
              {p.concept}
            </p>
            <div data-reveal>
              <p className="label" style={{ marginBottom: 12 }}>
                Services illustrés
              </p>
              <div className="tags">
                {p.services.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="stack" style={{ gap: 28 }}>
            <div data-reveal>
              <p className="label" style={{ marginBottom: 16 }}>
                Choix créatifs
              </p>
              <ul className="checklist">
                {p.creative.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <p className="label" style={{ marginBottom: 16 }}>
                Objectifs théoriques du projet
              </p>
              <ul className="checklist checklist--muted">
                {p.goals.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
              <p className="muted mt-s" style={{ fontSize: 14 }}>
                Projet fictif : aucun chiffre de performance ni aucun résultat n&apos;est présenté.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section theme-night" data-chapter="Maquettes">
        <div className="container">
          <p className="label" style={{ marginBottom: 28 }}>
            Maquettes de démonstration
          </p>
          <div style={{ display: "grid", gap: 24, alignItems: "end" }} className="mock-grid">
            <div data-reveal data-tilt="2">
              <MockBrowser project={p} image={p.gallery[0]} />
            </div>
            <div data-reveal data-delay="0.15" style={{ justifySelf: "center" }}>
              <MockPhone project={p} image={p.gallery[1]} />
            </div>
          </div>
          <DemoNotice className="mt-m" />
        </div>
      </section>

      <section className="section theme-dark" data-chapter="Galerie">
        <div className="container">
          <p className="label" style={{ marginBottom: 28 }}>
            Univers visuel
          </p>
          <div className="collage">
            <Photo name={p.cover} reveal parallax={6} sizes="60vw" />
            <Photo name={p.gallery[0]} reveal="right" delay={0.1} sizes="40vw" />
            <Photo name={p.gallery[1]} reveal delay={0.2} sizes="35vw" />
            <Photo name={p.gallery[2]} reveal="left" delay={0.3} sizes="50vw" />
          </div>
          <p className="muted mt-s" style={{ fontSize: 14 }}>
            Photographies d&apos;illustration (Unsplash), utilisées pour composer ce projet fictif.
          </p>
          <div className="mt-l" style={{ borderTop: "1px solid var(--line)", paddingTop: 32 }}>
            <p className="label label--muted">Projet suivant</p>
            <Link href={`/realisations/${next.slug}`} className="project-row__title" style={{ display: "inline-flex", gap: 16, alignItems: "center", marginTop: 12 }} data-cursor="Suivant">
              {next.title} <ArrowUpRight className="btn__icon" />
            </Link>
          </div>
          <div className="btn-row mt-m">
            <Button href="/realisations" variant="ghost">
              Toutes les réalisations
            </Button>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
