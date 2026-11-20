import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/Legal";
import CookieSettingsButton from "@/components/ui/CookieSettingsButton";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Gestion des cookies",
  description: "Les cookies et stockages utilisés sur le site de LN Digital et la manière de gérer vos préférences.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage
      label="Gestion des cookies"
      path="/cookies"
      image="legalPlan"
      title={
        <>
          Gestion des <em>cookies.</em>
        </>
      }
      intro="Ce site n'utilise actuellement aucun cookie publicitaire ni aucun outil de mesure d'audience."
      sections={[
        {
          id: "utilises",
          title: "Ce que le site utilise",
          body: (
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Type</th>
                  <th>Finalité</th>
                  <th>Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ln-consent</td>
                  <td>Stockage local (nécessaire)</td>
                  <td>Mémoriser votre choix concernant les cookies</td>
                  <td>Jusqu&apos;à suppression par vous</td>
                </tr>
                <tr>
                  <td>ln-pause-animations</td>
                  <td>Stockage local (fonctionnel)</td>
                  <td>Mémoriser votre choix de mettre en pause les animations qui défilent</td>
                  <td>Jusqu&apos;à ce que vous relanciez les animations</td>
                </tr>
                <tr>
                  <td>ln-devis-brouillon</td>
                  <td>Stockage de session (fonctionnel)</td>
                  <td>
                    Conserver dans votre navigateur le brouillon du formulaire de devis si vous changez de page ; rien
                    n&apos;est envoyé tant que vous ne validez pas
                  </td>
                  <td>Fermeture de l&apos;onglet ou envoi de la demande</td>
                </tr>
                <tr>
                  <td>ln-intro</td>
                  <td>Stockage de session (fonctionnel)</td>
                  <td>Ne pas rejouer l&apos;animation d&apos;introduction pendant votre visite</td>
                  <td>Fermeture de l&apos;onglet</td>
                </tr>
              </tbody>
            </table>
          ),
        },
        {
          id: "tiers",
          title: "Services tiers",
          body: (
            <>
              <p>
                Les photographies sont chargées depuis le réseau de diffusion d&apos;Unsplash. Si le paiement en ligne
                est activé, la page de paiement est hébergée par le prestataire de paiement (Stripe), qui peut déposer
                ses propres cookies nécessaires à la sécurité des transactions sur son domaine.
              </p>
              <p>Les liens WhatsApp ouvrent le service de WhatsApp, soumis à ses propres règles.</p>
            </>
          ),
        },
        {
          id: "consentement",
          title: "Votre consentement",
          body: (
            <>
              <p>
                Si des outils de mesure d&apos;audience ou des traceurs non essentiels sont ajoutés à l&apos;avenir,
                ils ne seront activés qu&apos;après votre accord explicite, que vous pourrez retirer à tout moment.
              </p>
              <CookieSettingsButton />
            </>
          ),
        },
        {
          id: "navigateur",
          title: "Paramétrer votre navigateur",
          body: (
            <p>
              Vous pouvez à tout moment supprimer les données stockées par ce site ou bloquer les cookies depuis les
              paramètres de votre navigateur.
            </p>
          ),
        },
      ]}
    />
  );
}
