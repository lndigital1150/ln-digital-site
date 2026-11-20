import type { Metadata } from "next";
import { projects } from "@/config/projects";
import { photos } from "@/config/images";
import { MockBrowser, ProjectCard } from "@/components/sections/Cards";
import { BigMarquee, DemoNotice, FinalCta, PageHero, SectionHead } from "@/components/sections/Shared";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Réalisations — projets de démonstration",
  description:
    "Projets de démonstration fictifs de LN Digital : site vitrine pour une entreprise de jardinage, identité visuelle de restaurant, campagne digitale pour un commerce local, contenus visuels.",
  path: "/realisations",
  image: photos.gardenPath.src,
});

export default function RealisationsPage() {
  const featured = projects[0];
  return (
    <>
      <PageHero
        label="Réalisations"
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Réalisations", path: "/realisations" },
        ]}
        title={
          <>
            Des projets pour <em>imaginer</em> le vôtre.
          </>
        }
        intro="Ces projets de démonstration illustrent la manière dont LN Digital peut aborder un site, une identité ou une campagne. Ils sont fictifs et ne représentent aucun client réel."
        hand="démonstrations"
      >
        <DemoNotice />
      </PageHero>

      <section className="section theme-night" data-chapter="Maquette">
        <div className="container">
          <SectionHead
            title={
              <>
                Un site, <em>sur tous les écrans.</em>
              </>
            }
            intro={featured.short}
          />
          <div data-reveal data-tilt="2">
            <MockBrowser project={featured} />
          </div>
          <DemoNotice className="mt-s" />
        </div>
      </section>

      <section className="section theme-dark" data-chapter="Galerie">
        <div className="container">
          <SectionHead
            title={
              <>
                Quatre secteurs, <em>quatre</em> approches.
              </>
            }
          />
          <div className="project-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <BigMarquee
        theme="theme-lavande"
        words={[
          <>
            Projets <em>de démonstration</em>
          </>,
          <>Fictifs · illustratifs</>,
          <>
            Le vôtre, <em>bientôt&nbsp;?</em>
          </>,
        ]}
      />

      <FinalCta
        image="aboutStickies"
        title={
          <>
            Et si le prochain projet était <em>le vôtre&nbsp;?</em>
          </>
        }
      />
    </>
  );
}
