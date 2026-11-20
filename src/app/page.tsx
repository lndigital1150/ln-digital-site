import type { Metadata } from "next";
import { services } from "@/config/services";
import { projects } from "@/config/projects";
import { photos } from "@/config/images";
import HomeHero from "@/components/home/HomeHero";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Agence de marketing digital en Belgique — Bruxelles et Wallonie",
    description:
      "LN Digital accompagne commerces, artisans, indépendants et PME à Bruxelles et en Wallonie : création de sites web, Google Business Profile, publicité digitale, identité de marque et SEO.",
    path: "/",
    image: photos.heroMain.src,
  }),
  title: { absolute: "LN Digital — Agence de marketing digital en Belgique (Bruxelles · Wallonie)" },
};

/* Bandeau du héros : les 7 services puis les projets de démonstration (signalés comme fictifs). */
const serviceTaglines: Record<string, string> = {
  "creation-sites-web": "Sur tous les écrans",
  "google-business-profile": "Visibilité locale",
  "publicite-digitale": "Campagnes ciblées",
  "identite-de-marque": "Logo & univers",
  "e-mail-marketing": "Newsletters",
  "creation-contenu-visuel": "Réseaux sociaux",
  "referencement-naturel-seo": "Moteurs de recherche",
};
const reelItems = [
  ...services.map((s) => ({
    href: `/services#${s.slug}`,
    title: s.title,
    sub: serviceTaglines[s.slug] ?? s.shortTitle,
    image: s.image,
  })),
  ...projects.slice(0, 3).map((p) => ({
    href: `/realisations/${p.slug}`,
    title: p.sector,
    sub: "Projet démo — fictif",
    image: p.cover,
  })),
];

/**
 * Accueil = écran d'entrée unique, sans défilement.
 * On entre dans le site par les boutons, le menu ou le bandeau des services.
 * Le contenu détaillé vit sur les pages Services, Tarifs, Réalisations, À propos et Contact.
 */
export default function HomePage() {
  return <HomeHero items={reelItems} />;
}
