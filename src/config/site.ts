/**
 * Configuration générale de LN Digital.
 * Modifiez ici les coordonnées, le slogan et les informations légales.
 * Toute valeur `null` est affichée comme « [À compléter] » sur le site.
 */

export const site = {
  name: "LN Digital",

  /** Slogan retenu (voir README pour les autres propositions). */
  slogan: "Connecter votre entreprise à ses clients.",

  /** Propositions alternatives, conservées pour mémoire. */
  sloganAlternatives: [
    "Le digital, au service de votre croissance.",
    "Votre entreprise, mieux vue. Mieux choisie.",
    "Des solutions digitales claires, pensées pour votre activité.",
  ],

  baseline: "Des solutions digitales pour accompagner la croissance de votre entreprise.",

  description:
    "LN Digital, agence de marketing digital en Belgique : création de sites web, Google Business Profile, publicité digitale, identité de marque, contenu visuel, SEO et e-mail marketing à Bruxelles et en Wallonie.",

  zone: "Bruxelles · Wallonie",
  zoneLong: "Bruxelles et Wallonie, Belgique",
  locale: "fr_BE",

  /**
   * Adresse publique du site : utilisée pour les balises canonical et og:url, le sitemap, robots.txt
   * et les données structurées. Le jour où un nom de domaine est choisi, remplacez-la ici
   * (ou définissez NEXT_PUBLIC_SITE_URL dans Cloudflare, qui a la priorité).
   */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ln-digital-site.lndigital1150.workers.dev",

  /** Téléphone affiché en clair (pied de page, bas de l’accueil) et cliquable (lien tel:). */
  phone: {
    tel: "+32492082589",
    display: "+32 492 08 25 89",
  },

  whatsapp: {
    number: "32492082589", // format international sans « + » ni espaces
    display: "+32 492 08 25 89",
    message:
      "Bonjour LN Digital, je souhaiterais obtenir des informations concernant vos services de marketing digital.",
  },

  /** Réseaux sociaux */
  instagram: {
    handle: "@lndigital1150",
    url: "https://www.instagram.com/lndigital1150/",
  },

  /** Adresse e-mail publique — à créer. Laissez null tant qu'elle n'existe pas. */
  email: (process.env.NEXT_PUBLIC_CONTACT_EMAIL || null) as string | null,

  /** Informations légales — à compléter avant publication. */
  legal: {
    denomination: null as string | null,
    forme: null as string | null,
    adresse: null as string | null,
    numeroEntreprise: null as string | null,
    tva: null as string | null,
    email: null as string | null,
    responsablePublication: null as string | null,
    hebergeur: null as string | null,
    conditionsPaiement: null as string | null,
    conditionsRealisation: null as string | null,
    politiqueAnnulation: null as string | null,
    remboursement: null as string | null,
  },
} as const;

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalNav = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
  { href: "/cookies", label: "Gestion des cookies" },
  { href: "/conditions-generales", label: "Conditions générales" },
] as const;

export const TO_COMPLETE = "[À compléter]";
