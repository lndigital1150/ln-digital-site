import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { LegalPage, V } from "@/components/sections/Legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Politique de confidentialité",
  description: "Comment LN Digital traite les données personnelles transmises via son site : finalités, bases légales, durées, droits.",
  path: "/politique-de-confidentialite",
});

export default function Confidentialite() {
  const l = site.legal;
  return (
    <LegalPage
      label="Politique de confidentialité"
      path="/politique-de-confidentialite"
      image="legalPrivacy"
      title={
        <>
          Politique de <em>confidentialité.</em>
        </>
      }
      intro="Nous traitons vos données personnelles avec soin, uniquement pour les finalités décrites ci-dessous, conformément au RGPD."
      sections={[
        {
          id: "responsable",
          title: "Responsable du traitement",
          body: (
            <p>
              {site.name} — <V value={l.denomination} />, <V value={l.adresse} />, numéro d&apos;entreprise{" "}
              <V value={l.numeroEntreprise} />. Contact : <V value={l.email ?? site.email} />.
            </p>
          ),
        },
        {
          id: "donnees",
          title: "Données collectées",
          body: (
            <>
              <h3>Formulaire de contact et de devis</h3>
              <p>
                Nom et prénom, nom de l&apos;entreprise, adresse e-mail, numéro de téléphone (facultatif), secteur
                d&apos;activité, service recherché, budget indicatif et description du projet.
              </p>
              <h3>Commande en ligne (lorsqu&apos;elle est activée)</h3>
              <p>
                Nom, entreprise, e-mail, téléphone et numéro de TVA (facultatifs), précisions sur la commande. Les
                données de paiement sont saisies exclusivement chez le prestataire de paiement : elles ne transitent
                pas par ce site et n&apos;y sont pas conservées.
              </p>
              <h3>WhatsApp</h3>
              <p>
                Si vous nous contactez via WhatsApp, les échanges sont également soumis aux conditions et à la
                politique de confidentialité de WhatsApp.
              </p>
              <h3>Données techniques</h3>
              <p>
                L&apos;affichage des photographies implique leur chargement depuis le réseau de diffusion
                d&apos;Unsplash, qui reçoit à cette occasion des données techniques (adresse IP, navigateur).
              </p>
            </>
          ),
        },
        {
          id: "finalites",
          title: "Finalités et bases légales",
          body: (
            <table>
              <thead>
                <tr>
                  <th>Finalité</th>
                  <th>Base légale (RGPD)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Répondre à vos demandes et établir un devis</td>
                  <td>Mesures précontractuelles prises à votre demande (art. 6.1.b) et consentement (art. 6.1.a)</td>
                </tr>
                <tr>
                  <td>Exécuter une commande ou une prestation</td>
                  <td>Exécution du contrat (art. 6.1.b)</td>
                </tr>
                <tr>
                  <td>Respecter nos obligations comptables et fiscales</td>
                  <td>Obligation légale (art. 6.1.c)</td>
                </tr>
                <tr>
                  <td>Assurer la sécurité du site et prévenir les abus</td>
                  <td>Intérêt légitime (art. 6.1.f)</td>
                </tr>
              </tbody>
            </table>
          ),
        },
        {
          id: "destinataires",
          title: "Destinataires et sous-traitants",
          body: (
            <>
              <p>Vos données ne sont ni vendues ni louées. Elles peuvent être traitées par :</p>
              <ul>
                <li>
                  l&apos;hébergeur du site : <V value={l.hebergeur} /> ;
                </li>
                <li>le service d&apos;envoi d&apos;e-mails utilisé pour transmettre les demandes (Resend, si activé) ;</li>
                <li>le prestataire de paiement (Stripe, si le paiement en ligne est activé) ;</li>
                <li>le comptable de l&apos;entreprise, pour les obligations légales.</li>
              </ul>
              <p>
                Certains prestataires peuvent être situés hors de l&apos;Union européenne. Garanties applicables (par
                exemple clauses contractuelles types) : <V value={null} />
              </p>
            </>
          ),
        },
        {
          id: "conservation",
          title: "Durée de conservation",
          body: (
            <ul>
              <li>
                Demandes de contact et de devis sans suite : <V value={null} />
              </li>
              <li>
                Données clients et commandes : <V value={null} /> (dans le respect des obligations comptables
                applicables)
              </li>
            </ul>
          ),
        },
        {
          id: "droits",
          title: "Vos droits",
          body: (
            <>
              <p>
                Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation,
                d&apos;opposition et de portabilité de vos données, ainsi que du droit de retirer votre consentement à
                tout moment. Pour exercer ces droits : <V value={l.email ?? site.email} />.
              </p>
              <p>
                Vous pouvez introduire une réclamation auprès de l&apos;Autorité de protection des données (Belgique) :{" "}
                <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer">
                  www.autoriteprotectiondonnees.be
                </a>
                .
              </p>
            </>
          ),
        },
        {
          id: "cookies",
          title: "Cookies",
          body: (
            <p>
              Voir la page <Link href="/cookies">gestion des cookies</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
