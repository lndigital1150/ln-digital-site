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
  /** Titre court pour la balise title (≤ 47 caractères, « | LN Digital » est ajouté). */
  seoTitle: string;
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
    seoTitle: "Site vitrine jardinage et élagage (démo)",
    sector: "Artisan · Jardinage",
    category: "Site web",
    year: "Démo",
    short: "Un site vitrine clair pour présenter les prestations, rassurer sur le savoir-faire et faciliter les demandes de devis.",
    cover: "gardenPath",
    gallery: ["gardenHouse", "gardenLawn", "gardenSoil"],
    services: ["Création de sites web", "Google Business Profile"],
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
    seoTitle: "Identité visuelle de restaurant (démo)",
    sector: "Horeca · Restaurant",
    category: "Identité visuelle",
    year: "Démo",
    short: "Une identité chaleureuse et reconnaissable, déclinée du menu aux réseaux sociaux.",
    cover: "restoTable",
    gallery: ["restoRoom", "restoFood", "restoCoffee"],
    services: ["Identité visuelle"],
    concept:
      "Un restaurant fictif de cuisine de saison souhaite une identité qui reflète son ambiance conviviale et qui reste cohérente sur tous ses supports : enseigne, menus, site et réseaux sociaux.",
    creative: [
      "Un logo simple, lisible en petit format comme sur une enseigne.",
      "Une palette inspirée des produits de saison et une typographie à la fois élégante et accessible.",
      "Des déclinaisons prêtes à l'emploi : menu, carte de visite, en-tête de publication.",
    ],
    goals: [
      "Rendre l'établissement reconnaissable au premier coup d'œil.",
      "Harmoniser la communication sur tous les supports.",
      "Disposer d'un logo et de règles simples pour rester cohérent dans le temps.",
    ],
    mock: { brand: "Restaurant — démo", headline: "Cuisine de saison, table de quartier.", cta: "Réserver", tone: "dark" },
  },
  {
    slug: "google-business-profile-commerce-local",
    title: "Fiche Google Business Profile pour un commerce local",
    seoTitle: "Fiche Google d'un commerce local (démo)",
    sector: "Commerce · Boutique",
    category: "Google Business Profile",
    year: "Démo",
    short: "Une fiche Google complète et à jour pour aider les habitants du quartier à trouver la boutique.",
    cover: "shopOwner",
    gallery: ["clientShop", "gbp", "shopCafe"],
    services: ["Google Business Profile"],
    concept:
      "Une boutique fictive de quartier souhaite être mieux présentée sur Google : des informations exactes, des photos soignées et une description claire, pour inciter les habitants de sa commune à passer en magasin.",
    creative: [
      "Des catégories et une description rédigées pour décrire précisément l'offre de la boutique.",
      "Des conseils pour des photos de la devanture, de l'intérieur et des produits.",
      "Des horaires, coordonnées et services tenus à jour, avec une méthode simple pour répondre aux avis.",
    ],
    goals: [
      "Présenter des informations exactes et cohérentes.",
      "Faciliter la découverte de la boutique par les clients de la région.",
      "Donner au commerçant les clés pour faire vivre sa fiche dans la durée.",
    ],
    mock: { brand: "Boutique — démo", headline: "Votre boutique de quartier, ouverte aujourd'hui.", cta: "Itinéraire", tone: "light" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
