import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { LegalPage, V } from "@/components/sections/Legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Mentions légales",
  description: "Mentions légales du site de LN Digital, agence web à Bruxelles et en Wallonie.",
  path: "/mentions-legales",
});

export default function MentionsLegales() {
  const l = site.legal;
  return (
    <LegalPage
      label="Mentions légales"
      path="/mentions-legales"
      image="legalBooks"
      title={
        <>
          Mentions <em>légales.</em>
        </>
      }
      intro="Informations relatives à l'éditeur du site, à son hébergement et à l'utilisation de son contenu."
      sections={[
        {
          id: "editeur",
          title: "Éditeur du site",
          body: (
            <ul>
              <li>Nom commercial : {site.name}</li>
              <li>
                Dénomination juridique : <V value={l.denomination} />
              </li>
              <li>
                Forme juridique : <V value={l.forme} />
              </li>
              <li>
                Adresse professionnelle : <V value={l.adresse} />
              </li>
              <li>
                Numéro d&apos;entreprise (BCE) : <V value={l.numeroEntreprise} />
              </li>
              <li>
                Numéro de TVA : <V value={l.tva} /> (si applicable)
              </li>
              <li>
                Adresse e-mail : <V value={l.email ?? site.email} />
              </li>
              <li>Téléphone / WhatsApp : {site.whatsapp.display}</li>
            </ul>
          ),
        },
        {
          id: "publication",
          title: "Responsable de la publication",
          body: (
            <p>
              <V value={l.responsablePublication} />
            </p>
          ),
        },
        {
          id: "hebergement",
          title: "Hébergement",
          body: (
            <p>
              Hébergeur (nom, adresse, contact) : <V value={l.hebergeur} />
            </p>
          ),
        },
        {
          id: "propriete",
          title: "Propriété intellectuelle",
          body: (
            <>
              <p>
                Les textes, la mise en page, le logo et les éléments graphiques propres à {site.name} sont protégés. Toute
                reproduction sans autorisation préalable est interdite.
              </p>
              <p>
                Les photographies d&apos;illustration proviennent de la plateforme Unsplash et sont utilisées selon la
                licence Unsplash. Elles ne représentent ni des clients ni des réalisations de {site.name}.
              </p>
              <p>
                Les projets présentés dans la rubrique Réalisations sont des projets de démonstration fictifs.
              </p>
            </>
          ),
        },
        {
          id: "responsabilite",
          title: "Responsabilité",
          body: (
            <p>
              {site.name} s&apos;efforce de fournir des informations exactes et à jour, sans pouvoir garantir
              l&apos;absence d&apos;erreurs. Les tarifs affichés sont indicatifs. Les liens vers des sites externes
              sont fournis à titre informatif ; {site.name} n&apos;est pas responsable de leur contenu.
            </p>
          ),
        },
        {
          id: "donnees",
          title: "Données personnelles et cookies",
          body: (
            <p>
              Consultez la <Link href="/politique-de-confidentialite">politique de confidentialité</Link> et la page{" "}
              <Link href="/cookies">gestion des cookies</Link>.
            </p>
          ),
        },
        {
          id: "droit",
          title: "Droit applicable",
          body: (
            <p>
              Le présent site est soumis au droit belge. Juridiction compétente : <V value={null} />
            </p>
          ),
        },
      ]}
    />
  );
}
