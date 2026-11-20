import type { Metadata } from "next";
import { offers, vatNote, PRICES_VALIDATED } from "@/config/pricing";
import { photos } from "@/config/images";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import { PriceCard } from "@/components/sections/Cards";
import { FinalCta, PageHero, SectionHead } from "@/components/sections/Shared";
import { pageMeta } from "@/lib/seo";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = pageMeta({
  title: "Tarifs — sites web, Google Business Profile, identité de marque",
  description:
    "Tarifs indicatifs de LN Digital : Google Business Profile 149 €, site vitrine dès 590 €, identité de marque dès 250 €, contenu visuel dès 199 €/mois. Publicité, SEO et e-mail marketing sur devis.",
  path: "/tarifs",
  image: photos.pricingHero.src,
});

export default function TarifsPage() {
  const fixed = offers.filter((o) => o.amount !== null);
  const quote = offers.filter((o) => o.amount === null);

  return (
    <>
      <PageHero
        label="Tarifs"
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Tarifs", path: "/tarifs" },
        ]}
        title={
          <>
            Des tarifs <span className="nowrap"><em>transparents</em>,</span> sans surprise.
          </>
        }
        intro="Certaines prestations ont un prix fixe ou un prix de départ. Les projets plus spécifiques font l'objet d'un devis adapté à vos besoins."
        hand="prix indicatifs"
        image="pricingHero"
      />

      <section className="section theme-light" data-chapter="Offres de départ">
        <div className="container">
          <SectionHead
            title={
              <>
                Pour <em>démarrer</em> rapidement.
              </>
            }
            intro={
              <>
                <p>{vatNote}</p>
                {!PRICES_VALIDATED && (
                  <p className="mt-s">
                    <span className="todo">Tarifs à valider avant publication</span>
                  </p>
                )}
              </>
            }
          />
          <div className="price-grid">
            {fixed.map((o) => (
              <div key={o.id} data-reveal>
                <PriceCard offer={o} detailed />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section theme-lavande" data-chapter="Sur devis">
        <div className="container">
          <SectionHead
            title={
              <>
                Pour les projets <em>sur mesure.</em>
              </>
            }
            intro="La publicité digitale, le SEO et l'e-mail marketing dépendent fortement de vos objectifs, de votre marché et de votre point de départ : nous établissons un devis après un premier échange."
          />
          <div className="price-grid price-grid--3">
            {quote.map((o) => (
              <div key={o.id} data-reveal>
                <PriceCard offer={o} detailed />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section theme-dark" data-chapter="Comment commander">
        <div className="container grid-2">
          <div className="stack" style={{ gap: 28 }}>
            <h2 className="h2" data-split>
              Achat direct <em>ou</em> devis personnalisé.
            </h2>
            <div className="prose" data-reveal>
              <p>
                <strong style={{ color: "var(--blanc-lavande)" }}>Achat direct —</strong> pour les offres standard
                (prix fixe ou formule de départ) : vous choisissez la prestation, renseignez vos informations,
                vérifiez le récapitulatif et les conditions, puis êtes redirigé vers un paiement sécurisé chez un
                prestataire reconnu. La commande n&apos;est confirmée qu&apos;après confirmation effective du
                paiement.
              </p>
              <p>
                <strong style={{ color: "var(--blanc-lavande)" }}>Demande de devis —</strong> pour les projets
                personnalisés : décrivez votre besoin via le formulaire, nous revenons vers vous avec une proposition
                adaptée.
              </p>
            </div>
            <div className="btn-row" data-reveal>
              <Button href="/contact#devis" variant="accent">
                Demander un devis
              </Button>
              <Button href={whatsappUrl()} variant="ghost" icon="whatsapp">
                Poser une question
              </Button>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <Photo name="pricingTerminal" className="ratio-4-5" reveal parallax={8} />
          </div>
        </div>
      </section>

      <FinalCta image="contactHandshake" />
    </>
  );
}
