import type { PhotoKey } from "./images";

/**
 * Les trois services de LN Digital : création de sites web, identité visuelle, Google Business Profile.
 * L'ordre de ce tableau est l'ordre d'affichage sur le site.
 */
export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  short: string;
  headline: string;
  intro: string[];
  benefits: string[];
  includes: string[];
  note?: string;
  image: PhotoKey;
  imageAlt: PhotoKey;
  offerId: string;
};

export const services: Service[] = [
  {
    slug: "creation-sites-web",
    title: "Création de sites web",
    shortTitle: "Sites web",
    short: "Présentez votre entreprise avec un site moderne, professionnel et adapté à tous les écrans.",
    headline: "Un site qui présente, rassure et donne envie de vous contacter.",
    intro: [
      "Votre site web est souvent le premier contact entre votre entreprise et un futur client. Il doit présenter clairement votre activité, vos services et votre façon de travailler, quel que soit l'écran utilisé.",
      "Nous concevons des sites vitrines pour indépendants et PME, organisés autour de vos objectifs : expliquer votre offre, inspirer confiance et faciliter la prise de contact grâce à des formulaires et des appels à l'action bien placés.",
    ],
    benefits: [
      "Une présentation claire de votre activité, accessible à tout moment.",
      "Une image professionnelle qui rassure vos visiteurs.",
      "Une prise de contact simplifiée, sur ordinateur comme sur smartphone.",
      "Une base solide pour votre référencement naturel.",
    ],
    includes: [
      "Conception de sites vitrines",
      "Organisation de la structure des pages",
      "Présentation des produits et services",
      "Création d'une interface adaptée à l'activité",
      "Adaptation aux ordinateurs, tablettes et smartphones",
      "Intégration de formulaires de contact",
      "Optimisation SEO de base",
      "Vérification du fonctionnement du site",
    ],
    image: "web",
    imageAlt: "webAlt",
    offerId: "site-vitrine",
  },
  {
    slug: "identite-de-marque",
    title: "Identité visuelle",
    shortTitle: "Identité visuelle",
    short: "Un logo et une identité visuelle cohérente, reconnaissable, qui reflète les valeurs de votre entreprise.",
    headline: "Un logo et une image cohérente, reconnaissable, fidèle à vos valeurs.",
    intro: [
      "Votre identité visuelle est ce qui permet à vos clients de vous reconnaître au premier coup d'œil : logo, couleurs, typographies, ton des visuels.",
      "Une identité cohérente, appliquée de la même manière sur votre site, vos réseaux sociaux et vos supports imprimés, renforce la mémorisation de votre marque et la confiance qu'elle inspire.",
    ],
    benefits: [
      "Une marque reconnaissable sur tous vos supports.",
      "Une image alignée avec votre positionnement.",
      "Des règles simples pour rester cohérent dans le temps.",
    ],
    includes: [
      "Définition de l'univers visuel",
      "Création de logos pour les clients",
      "Choix des couleurs et typographies",
      "Création d'une identité visuelle cohérente",
      "Déclinaisons graphiques",
      "Supports de communication",
      "Guide d'utilisation de l'identité visuelle selon l'offre",
    ],
    image: "brand",
    imageAlt: "brandAlt",
    offerId: "identite-de-marque",
  },
  {
    slug: "google-business-profile",
    title: "Google Business Profile",
    shortTitle: "Google Business",
    short: "Améliorez la présentation de votre entreprise sur Google et facilitez sa découverte par les clients de votre région.",
    headline: "Soyez bien présenté là où vos clients locaux vous cherchent.",
    intro: [
      "Quand un client cherche un commerce, un artisan ou un restaurant près de chez lui, la fiche Google Business Profile est souvent l'une des premières informations qu'il consulte : horaires, coordonnées, photos, services et avis.",
      "Une fiche complète et à jour facilite la découverte de votre entreprise locale et aide les internautes à choisir en connaissance de cause. Le classement dans Google dépend toutefois de nombreux facteurs : aucune position précise ne peut être garantie.",
    ],
    benefits: [
      "Des informations exactes et cohérentes pour vos clients.",
      "Une fiche plus complète et plus engageante.",
      "Des conseils concrets pour la faire vivre dans la durée.",
    ],
    includes: [
      "Création ou optimisation de la fiche",
      "Choix des catégories pertinentes",
      "Rédaction de la description",
      "Ajout des services",
      "Mise à jour des horaires et coordonnées fournis par le client",
      "Conseils concernant les photographies",
      "Recommandations pour la gestion des avis",
      "Conseils pour maintenir la fiche à jour",
    ],
    note: "Aucune position précise dans Google n'est garantie.",
    image: "gbp",
    imageAlt: "gbpAlt",
    offerId: "google-business-profile",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
