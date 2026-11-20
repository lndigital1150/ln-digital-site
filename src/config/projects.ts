import type { PhotoKey } from "./images";

/**
 * Projets de DÉMONSTRATION — fictifs.
 * Aucun de ces projets n'a été réalisé pour un client réel.
 */
export const DEMO_NOTICE =
  "Projet de démonstration fictif — créé pour illustrer les possibilités de LN Digital.";

export type Project = {
  slug: string;
  title: string;
  sector: string;
  category: string;
  year: string;
  short: string;
  cover: PhotoKey;
  gallery: PhotoKey[];
  services: string[];
  concept: string;
  creative: string[];
  goals: string[];
  mock: { brand: string; headline: string; cta: string; tone: "dark" | "light" };
};

export const projects: Project[] = [
  {
    slug: "site-vitrine-jardinage-elagage",
    title: "Site vitrine pour une entreprise de jardinage et d'élagage",
    sector: "Artisan · Jardinage",
    category: "Site web",
    year: "Démo",
    short: "Un site vitrine clair pour présenter les prestations, rassurer sur le savoir-faire et faciliter les demandes de devis.",
    cover: "gardenPath",
    gallery: ["gardenHouse", "gardenLawn", "gardenSoil"],
    services: ["Création de sites web", "Référencement naturel (SEO)", "Google Business Profile"],
    concept:
      "Une entreprise fictive de jardinage et d'élagage souhaite présenter ses prestations (entretien, taille, élagage, aménagement) aux particuliers et aux professionnels de sa région, et recevoir plus facilement des demandes de devis.",
    creative: [
      "De grandes photographies de jardins pour mettre en valeur le résultat du travail.",
      "Une page par prestation, avec ses étapes et un appel à l'action vers le formulaire de devis.",
      "Une palette naturelle et une typographie lisible, pensées pour un public large.",
    ],
    goals: [
      "Présenter clairement l'ensemble des prestations.",
      "Faciliter la demande de devis depuis un smartphone.",
      "Poser les bases d'un référencement local cohérent avec la fiche Google Business Profile.",
    ],
    mock: { brand: "Jardinier — démo", headline: "Votre jardin, entre de bonnes mains.", cta: "Demander un devis", tone: "dark" },
  },
  {
    slug: "identite-visuelle-restaurant",
    title: "Identité visuelle pour un restaurant",
    sector: "Horeca · Restaurant",
    category: "Identité de marque",
    year: "Démo",
    short: "Une identité chaleureuse et reconnaissable, déclinée du menu aux réseaux sociaux.",
    cover: "restoTable",
    gallery: ["restoRoom", "restoFood", "restoCoffee"],
    services: ["Identité de marque", "Création de contenu visuel"],
    concept:
      "Un restaurant fictif de cuisine de saison souhaite une identité qui reflète son ambiance conviviale et qui reste cohérente sur tous ses supports : enseigne, menus, site et réseaux sociaux.",
    creative: [
      "Un logo simple, lisible en petit format comme sur une enseigne.",
      "Une palette inspirée des produits de saison et une typographie à la fois élégante et accessible.",
      "Des gabarits de publications pour présenter les plats du moment.",
    ],
    goals: [
      "Rendre l'établissement reconnaissable au premier coup d'œil.",
      "Harmoniser la communication sur tous les supports.",
      "Simplifier la création des publications hebdomadaires.",
    ],
    mock: { brand: "Restaurant — démo", headline: "Cuisine de saison, table de quartier.", cta: "Réserver", tone: "dark" },
  },
  {
    slug: "campagne-digitale-commerce-local",
    title: "Campagne digitale pour un commerce local",
    sector: "Commerce · Boutique",
    category: "Publicité digitale",
    year: "Démo",
    short: "Une campagne locale cohérente : visuels, annonces ciblées et fiche Google à jour.",
    cover: "shopOwner",
    gallery: ["clientShop", "contentBags", "shopCafe"],
    services: ["Publicité digitale", "Création de contenu visuel", "Google Business Profile"],
    concept:
      "Une boutique fictive de quartier souhaite faire connaître sa nouvelle collection auprès des habitants de sa commune et inciter à la visite en magasin.",
    creative: [
      "Une série de visuels déclinés pour les formats publicitaires courants.",
      "Un message centré sur la proximité et le conseil en boutique.",
      "Une fiche Google Business Profile mise à jour pour accueillir les visiteurs.",
    ],
    goals: [
      "Toucher une audience locale pertinente.",
      "Mettre en avant la nouvelle collection.",
      "Encourager la visite en boutique.",
    ],
    mock: { brand: "Boutique — démo", headline: "La nouvelle collection est arrivée.", cta: "Découvrir", tone: "light" },
  },
  {
    slug: "contenus-visuels-entreprise-services",
    title: "Série de contenus visuels pour une entreprise de services",
    sector: "Services · Rénovation",
    category: "Contenu visuel",
    year: "Démo",
    short: "Une série de visuels pour présenter le savoir-faire et les chantiers d'une entreprise de services.",
    cover: "serviceElectric",
    gallery: ["serviceTools", "servicePlan", "clientCraft"],
    services: ["Création de contenu visuel", "E-mail marketing"],
    concept:
      "Une entreprise fictive de rénovation et d'électricité souhaite montrer son savoir-faire sur les réseaux sociaux et informer régulièrement ses clients par e-mail.",
    creative: [
      "Des visuels « avant / pendant / après » pour raconter chaque chantier.",
      "Des conseils pratiques mis en forme pour être partagés.",
      "Une newsletter trimestrielle reprenant les contenus les plus utiles.",
    ],
    goals: [
      "Valoriser le savoir-faire de l'équipe.",
      "Garder le contact avec les clients existants.",
      "Donner une image professionnelle et cohérente.",
    ],
    mock: { brand: "Rénovation — démo", headline: "Des chantiers propres, des clients sereins.", cta: "Nos réalisations", tone: "dark" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
