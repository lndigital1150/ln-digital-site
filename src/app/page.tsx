import type { Metadata } from "next";
import { services, servicePath } from "@/config/services";
import { projects } from "@/config/projects";
import { photos } from "@/config/images";
import HomeHero from "@/components/home/HomeHero";
import { pageMeta } from "@/lib/seo";
import { WebSiteJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Agence web à Bruxelles et en Wallonie",
    description:
      "Agence digitale à Bruxelles et en Wallonie : création de sites web, identité visuelle et Google Business Profile pour indépendants, commerces et PME.",
    path: "/",
    image: photos.heroMain.src,
  }),
  title: { absolute: "LN Digital — Agence web à Bruxelles et en Wallonie" },
};

/* Bandeau du héros : les 3 services puis les projets de démonstration (signalés comme fictifs). */
const serviceTaglines: Record<string, string> = {
  "creation-sites-web": "Sur tous les écrans",
  "identite-de-marque": "Logo & univers",
  "google-business-profile": "Visibilité locale",
};
const reelItems = [
  ...services.map((s) => ({
    href: servicePath(s),
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
  return (
    <>
      <WebSiteJsonLd />
      <HomeHero items={reelItems} />
    </>
  );
}
