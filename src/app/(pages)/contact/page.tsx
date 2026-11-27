import type { Metadata } from "next";
import { site } from "@/config/site";
import { services } from "@/config/services";
import { photos } from "@/config/images";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/forms/ContactForm";
import FaqList from "@/components/ui/FaqList";
import { faq } from "@/config/faq";
import { PageHero } from "@/components/sections/Shared";
import { pageMeta } from "@/lib/seo";
import { whatsappUrl } from "@/lib/links";
import { mailConfigured } from "@/lib/server/integrations";

export const metadata: Metadata = pageMeta({
  title: "Contact et demande de devis",
  description:
    "Demandez un devis à LN Digital, agence de marketing digital à Bruxelles et en Wallonie : site web, identité visuelle, Google Business Profile. Réponse par e-mail ou WhatsApp.",
  path: "/contact",
  image: photos.contactHandshake.src,
});

export default function ContactPage() {
  const configured = mailConfigured();
  return (
    <>
      <PageHero
        label="Contact"
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        title={
          <>
            Parlons de <em>votre projet.</em>
          </>
        }
        intro="Présentez-nous votre entreprise et votre besoin : nous identifions ensemble les solutions les plus adaptées et vous adressons une proposition claire."
        hand="réponse rapide"
        image="contactHandshake"
      />

      <section id="devis" className="section theme-light" data-chapter="Demande de devis">
        <div className="container contact-grid">
          <aside className="contact-aside">
            <h2 className="h2" data-split>
              Un formulaire, <em>une réponse</em> claire.
            </h2>
            <p className="lead" data-reveal>
              Plus votre description est précise (activité, objectifs, échéances), plus notre proposition sera
              pertinente.
            </p>
            <Photo name="contactCollab" reveal parallax={6} sizes="(max-width: 1000px) 100vw, 40vw" />
            <div className="stack" style={{ gap: 10 }}>
              <p className="label">Contact direct</p>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="link-arrow">
                WhatsApp · {site.whatsapp.display}
              </a>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link-arrow">
                Instagram · {site.instagram.handle}
              </a>
              {site.email ? (
                <a href={`mailto:${site.email}`} className="link-arrow">
                  {site.email}
                </a>
              ) : (
                <p className="muted" style={{ fontSize: 14 }}>
                  E-mail professionnel : bientôt disponible.
                </p>
              )}
              <p className="muted" style={{ fontSize: 14 }}>
                Zone d&apos;activité : {site.zoneLong}.
              </p>
            </div>
          </aside>
          <div data-reveal>
            <ContactForm services={services.map((s) => ({ slug: s.slug, title: s.title }))} configured={configured} />
          </div>
        </div>
      </section>

      <section className="section theme-dark" data-chapter="WhatsApp">
        <div className="container grid-2">
          <Photo name="contactDesk" className="ratio-4-3" reveal parallax={8} />
          <div className="stack" style={{ gap: 24 }}>
            <h2 className="h2" data-split>
              Écrivez-nous sur <em>WhatsApp.</em>
            </h2>
            <p className="lead" data-reveal>
              Un message suffit pour poser une question sur nos services, nos tarifs ou le déroulement d&apos;une
              collaboration.
            </p>
            <div data-reveal>
              <Button href={whatsappUrl()} variant="accent" icon="whatsapp">
                Ouvrir WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Questions fréquentes (déplacées depuis l'accueil) */}
      <section className="section theme-light" data-chapter="Questions">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 28 }}>
            <h2 className="h2" data-split>
              Vos questions, <em>nos réponses.</em>
            </h2>
            <p className="lead" data-reveal>
              Vous ne trouvez pas votre réponse&nbsp;? Écrivez-nous via le formulaire ou sur WhatsApp, nous vous
              répondrons avec plaisir.
            </p>
            <Photo name="aboutStickies" className="ratio-4-3" reveal parallax={6} />
          </div>
          <FaqList items={faq} />
        </div>
      </section>
    </>
  );
}
