import type { Metadata } from "next";
import { photos, type PhotoKey } from "@/config/images";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import MethodSteps from "@/components/motion/MethodSteps";
import { BigMarquee, FinalCta, PageHero, SectionHead } from "@/components/sections/Shared";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "À propos — agence web Bruxelles et Wallonie",
  description:
    "LN Digital aide commerces, artisans, indépendants et PME de Bruxelles et de Wallonie à grandir en ligne : notre approche, notre méthode et nos valeurs.",
  path: "/a-propos",
  image: photos.aboutTeam.src,
});

const audiences: { label: string; image: PhotoKey }[] = [
  { label: "Commerces", image: "clientShop" },
  { label: "Artisans", image: "clientCraft" },
  { label: "Indépendants", image: "clientFreelance" },
  { label: "Horeca", image: "clientHoreca" },
  { label: "PME", image: "clientSme" },
];

const reasons = [
  {
    title: "Des prestations clairement définies",
    text: "Vous savez ce qui est inclus, ce qui ne l'est pas, et comment se déroule chaque étape.",
  },
  {
    title: "Des solutions adaptées à chaque entreprise",
    text: "Un artisan, un restaurant et une PME n'ont pas les mêmes besoins : nous partons des vôtres.",
  },
  {
    title: "Une communication directe et transparente",
    text: "Un interlocuteur joignable, des échanges simples et des explications sans jargon inutile.",
  },
  {
    title: "Une attention portée à vos objectifs commerciaux",
    text: "Chaque action est pensée pour servir votre activité : être trouvé, rassurer, être contacté.",
  },
  {
    title: "La qualité et l'amélioration continue",
    text: "Nous soignons les détails et ajustons ce qui peut l'être lorsque c'est pertinent.",
  },
];

const steps: { title: string; text: string; image: PhotoKey }[] = [
  {
    title: "Comprendre",
    text: "Identifier vos besoins, vos objectifs et vos contraintes : votre activité, vos clients, vos ressources et votre calendrier.",
    image: "stepUnderstand",
  },
  {
    title: "Concevoir",
    text: "Définir une solution adaptée à votre activité, avec un périmètre clair et des priorités partagées.",
    image: "stepDesign",
  },
  {
    title: "Développer",
    text: "Créer et mettre en œuvre les éléments nécessaires : site web, identité visuelle ou fiche Google.",
    image: "stepBuild",
  },
  {
    title: "Optimiser",
    text: "Analyser les possibilités d'amélioration et ajuster les actions lorsque cela est pertinent.",
    image: "stepOptimize",
  },
];

const values = [
  { title: "Proximité", text: "Un interlocuteur accessible, qui prend le temps de comprendre votre activité et votre réalité locale." },
  { title: "Clarté", text: "Des propositions lisibles, des étapes expliquées et des échanges sans jargon inutile." },
  { title: "Créativité", text: "Des idées et des visuels qui donnent du caractère à votre communication." },
  { title: "Adaptabilité", text: "Des solutions ajustées à votre secteur, à vos ressources et à votre calendrier." },
  { title: "Orientation vers les objectifs", text: "Chaque action est pensée pour servir des objectifs définis ensemble." },
  { title: "Amélioration continue", text: "Observer, apprendre et ajuster lorsque c'est pertinent, plutôt que de tout figer." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="À propos"
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "À propos", path: "/a-propos" },
        ]}
        title={
          <>
            Le digital doit être un <em>levier de développement.</em>
          </>
        }
        hand="notre conviction"
        image="aboutTeam"
      />

      <section className="section theme-dark" data-chapter="Ambition">
        <div className="container">
          <p className="manifesto" data-scrub style={{ maxWidth: "26ch" }}>
            Notre ambition est d&apos;aider les entreprises à exploiter pleinement les opportunités du digital.
          </p>
          <div className="grid-2 mt-l">
            <div className="prose" data-reveal>
              <p>
                Nous souhaitons accompagner les commerces, les artisans, les indépendants et les PME de Bruxelles et de
                Wallonie en leur proposant des solutions adaptées à leurs besoins et à leurs objectifs.
              </p>
              <p>
                Nous privilégions la clarté, la pertinence des actions et l&apos;amélioration continue afin de
                construire des solutions digitales cohérentes avec chaque projet.
              </p>
              <div className="btn-row mt-m">
                <Button href="/services">Découvrir nos services</Button>
                <Button href="/contact#devis" variant="ghost">
                  Demander un devis
                </Button>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Photo name="aboutOffice" className="ratio-3-4" reveal parallax={6} sizes="25vw" />
              <Photo name="aboutPencils" className="ratio-3-4" reveal delay={0.2} sizes="25vw" style={{ marginTop: 64 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section className="section theme-night" data-chapter="Pour qui">
        <div className="container">
          <SectionHead
            title={
              <>
                Pour les entreprises <em>de chez nous.</em>
              </>
            }
            intro="Commerces, artisans, indépendants, restaurants, professions libérales et PME de Bruxelles et de Wallonie : nous construisons avec vous une présence digitale claire, cohérente et utile à votre activité."
          />
          <div
            style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}
            data-stagger
          >
            {audiences.map((a) => (
              <figure key={a.label} style={{ display: "grid", gap: 12 }}>
                <Photo name={a.image} className="ratio-3-4" zoom sizes="(max-width: 700px) 50vw, 20vw" />
                <figcaption className="label">{a.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nous */}
      <section className="section theme-lavande" data-chapter="Pourquoi nous">
        <div className="container why">
          <div className="why__photos">
            <Photo name="why" parallax={8} reveal sizes="(max-width: 1000px) 80vw, 40vw" />
            <Photo name="whyShop" reveal="right" delay={0.3} sizes="(max-width: 1000px) 45vw, 20vw" />
          </div>
          <div className="stack" style={{ gap: 32 }}>
            <h2 className="h2" data-split>
              Le digital, <em>simplement</em> au service de votre activité.
            </h2>
            <div className="prose" data-reveal>
              <p>
                Développer sa présence en ligne demande du temps, des compétences variées et une vision d&apos;ensemble.
                LN Digital vous accompagne à chaque étape : comprendre votre activité, définir les actions utiles, les
                mettre en œuvre avec soin et les faire évoluer lorsque c&apos;est pertinent.
              </p>
              <p>
                Notre objectif : vous permettre de vous concentrer sur votre métier, avec une présence digitale cohérente
                qui présente clairement ce que vous faites.
              </p>
            </div>
            <ol className="points" data-stagger>
              {reasons.map((r) => (
                <li key={r.title} className="point">
                  <div>
                    <h3>{r.title}</h3>
                    <p className="muted" style={{ marginTop: 6, fontSize: 15 }}>
                      {r.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="section theme-dark" data-chapter="Méthode">
        <div className="container">
          <SectionHead
            title={
              <>
                Quatre étapes, <em>zéro</em> zone d&apos;ombre.
              </>
            }
            intro="Une démarche simple et structurée, pour avancer avec clarté du premier échange jusqu'aux ajustements."
          />
          <MethodSteps steps={steps} />
        </div>
      </section>

      <section className="section theme-light" data-chapter="Valeurs">
        <div className="container">
          <SectionHead
            title={
              <>
                Six valeurs, <em>une</em> façon de travailler.
              </>
            }
            intro="Elles guident nos choix, nos propositions et notre manière de collaborer avec vous."
          />
          <div className="values" data-stagger>
            {values.map((v) => (
              <article key={v.title} className="value">
                <div className="stack" style={{ gap: 10 }}>
                  <h3>{v.title}</h3>
                  <p className="muted">{v.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BigMarquee
        words={[
          <>Proximité</>,
          <>
            <em>Clarté</em>
          </>,
          <>Créativité</>,
          <>
            <em>Adaptabilité</em>
          </>,
        ]}
      />

      <FinalCta image="aboutMeeting" />
    </>
  );
}
