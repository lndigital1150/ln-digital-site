import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { LegalPage, V } from "@/components/sections/Legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Conditions générales de vente et de prestation",
  description: "Conditions générales de vente et de prestation de services de LN Digital (modèle provisoire à compléter).",
  path: "/conditions-generales",
});

export default function CGV() {
  const l = site.legal;
  return (
    <LegalPage
      label="Conditions générales"
      path="/conditions-generales"
      image="legalSign"
      title={
        <>
          Conditions <em>générales.</em>
        </>
      }
      intro="Conditions générales de vente et de prestation applicables aux services proposés par LN Digital."
      sections={[
        {
          id: "objet",
          title: "1. Objet",
          body: (
            <p>
              Les présentes conditions régissent les relations entre {site.name} (le « prestataire ») et toute
              personne qui commande une prestation (le « client »), via le site, sur devis ou par tout autre moyen.
            </p>
          ),
        },
        {
          id: "prestataire",
          title: "2. Identification du prestataire",
          body: (
            <ul>
              <li>
                Dénomination : <V value={l.denomination} /> — forme juridique : <V value={l.forme} />
              </li>
              <li>
                Adresse : <V value={l.adresse} />
              </li>
              <li>
                Numéro d&apos;entreprise : <V value={l.numeroEntreprise} /> — TVA : <V value={l.tva} />
              </li>
              <li>
                Contact : <V value={l.email ?? site.email} /> — WhatsApp {site.whatsapp.display}
              </li>
            </ul>
          ),
        },
        {
          id: "prestations",
          title: "3. Prestations et commande",
          body: (
            <>
              <p>
                Les prestations sont décrites sur les pages <Link href="/services">Services</Link> et{" "}
                <Link href="/tarifs">Tarifs</Link>. Les prestations standard peuvent être commandées en ligne lorsque
                le paiement en ligne est activé ; les autres font l&apos;objet d&apos;un devis.
              </p>
              <p>
                Une commande en ligne n&apos;est considérée comme passée qu&apos;après confirmation effective du
                paiement par le prestataire de paiement. Un devis devient une commande après acceptation écrite par
                le client selon les modalités indiquées dans le devis.
              </p>
            </>
          ),
        },
        {
          id: "prix",
          title: "4. Prix",
          body: (
            <p>
              Les prix affichés sont indicatifs et exprimés en euros. Le régime de TVA applicable (prix HTVA ou TVAC)
              est : <V value={null} />.
            </p>
          ),
        },
        {
          id: "paiement",
          title: "5. Conditions de paiement",
          body: (
            <p>
              <V value={l.conditionsPaiement} />
            </p>
          ),
        },
        {
          id: "realisation",
          title: "6. Réalisation des prestations",
          body: (
            <>
              <p>
                Conditions et délais de réalisation : <V value={l.conditionsRealisation} />
              </p>
              <p>
                Le client fournit en temps utile les informations et contenus nécessaires (textes, photos,
                coordonnées, accès). Les délais peuvent dépendre de leur disponibilité.
              </p>
            </>
          ),
        },
        {
          id: "obligations",
          title: "7. Obligation de moyens",
          body: (
            <p>
              Le prestataire est tenu à une obligation de moyens. Aucun positionnement dans les moteurs de recherche,
              aucun volume de visites et aucun résultat commercial précis ne peuvent être garantis.
            </p>
          ),
        },
        {
          id: "retractation",
          title: "8. Droit de rétractation (consommateurs)",
          body: (
            <p>
              Lorsque le client agit en qualité de consommateur, il peut bénéficier d&apos;un droit de rétractation
              selon les règles du Code de droit économique belge. Modalités et exceptions applicables :{" "}
              <V value={null} />
            </p>
          ),
        },
        {
          id: "annulation",
          title: "9. Annulation et remboursement",
          body: (
            <ul>
              <li>
                Politique d&apos;annulation : <V value={l.politiqueAnnulation} />
              </li>
              <li>
                Modalités de remboursement : <V value={l.remboursement} />
              </li>
            </ul>
          ),
        },
        {
          id: "propriete",
          title: "10. Propriété intellectuelle",
          body: (
            <p>
              Conditions de cession ou de licence des créations (logos, visuels, sites) : <V value={null} />
            </p>
          ),
        },
        {
          id: "donnees",
          title: "11. Données personnelles",
          body: (
            <p>
              Voir la <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
            </p>
          ),
        },
        {
          id: "litiges",
          title: "12. Droit applicable et litiges",
          body: (
            <p>
              Les présentes conditions sont soumises au droit belge. Juridiction compétente et éventuelle procédure de
              médiation : <V value={null} />
            </p>
          ),
        },
      ]}
    />
  );
}
