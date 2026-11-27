import type { PhotoKey } from "./images";

/**
 * Tarifs de LN Digital — INDICATIFS, À VALIDER AVANT PUBLICATION.
 *
 * - `amount` : montant en euros (nombre) utilisé pour le paiement en ligne. `null` = sur devis.
 * - `mode`   : "direct" → bouton « Acheter cette prestation » (parcours de commande)
 *              "quote"  → uniquement « Demander un devis ».
 * - Les éléments « À préciser » doivent être complétés avant publication.
 * - La mention de TVA dépend du statut réel de l'entreprise (voir `vatNote`).
 */

export const PRICES_VALIDATED = false;

export const vatNote =
  "Les montants sont indicatifs. Le régime de TVA applicable (prix HTVA ou TVAC) sera précisé selon le statut de l'entreprise.";

export const TO_DEFINE = "À préciser";

export type Offer = {
  id: string;
  serviceSlug: string;
  name: string;
  amount: number | null;
  priceLabel: string;
  prefix?: string;
  unit: string;
  recurring?: "month";
  mode: "direct" | "quote";
  summary: string;
  includes: string[];
  limits: string[];
  options: string[];
  supplements: string[];
  image: PhotoKey;
  featured?: boolean;
};

export const offers: Offer[] = [
  {
    id: "site-vitrine",
    serviceSlug: "creation-sites-web",
    name: "Site vitrine essentiel",
    amount: 590,
    prefix: "À partir de",
    priceLabel: "590 €",
    unit: "Prix de départ",
    mode: "direct",
    summary: "Un site vitrine professionnel, adapté à tous les écrans, pour présenter votre activité.",
    includes: [
      "Conception d'un site vitrine",
      "Organisation de la structure des pages",
      "Présentation des produits et services",
      "Adaptation aux ordinateurs, tablettes et smartphones",
      "Intégration d'un formulaire de contact",
      "Optimisation SEO de base",
      "Vérification du fonctionnement du site",
    ],
    limits: [
      `Nombre de pages inclus : ${TO_DEFINE.toLowerCase()}.`,
      `Fourniture des textes et photos : ${TO_DEFINE.toLowerCase()}.`,
      `Nom de domaine et hébergement : ${TO_DEFINE.toLowerCase()}.`,
    ],
    options: [TO_DEFINE],
    supplements: [
      "Les fonctionnalités ou pages supplémentaires au-delà du périmètre de départ peuvent faire l'objet d'un devis.",
    ],
    image: "web",
  },
  {
    id: "identite-de-marque",
    serviceSlug: "identite-de-marque",
    name: "Identité visuelle essentielle",
    amount: 250,
    prefix: "À partir de",
    priceLabel: "250 €",
    unit: "Prix de départ",
    mode: "quote",
    summary: "Votre logo et les bases d'une identité visuelle cohérente pour votre entreprise.",
    includes: [
      "Définition de l'univers visuel",
      "Création de logo",
      "Choix des couleurs et typographies",
    ],
    limits: [`Contenu exact de la formule essentielle : ${TO_DEFINE.toLowerCase()}.`],
    options: ["Déclinaisons graphiques et supports de communication", "Guide d'utilisation de l'identité visuelle"],
    supplements: [`Tarif des options : ${TO_DEFINE.toLowerCase()}.`],
    image: "brand",
  },
  {
    id: "google-business-profile",
    serviceSlug: "google-business-profile",
    name: "Google Business Profile",
    amount: 149,
    priceLabel: "149 €",
    unit: "Prestation ponctuelle",
    mode: "direct",
    summary: "Création ou optimisation complète de votre fiche Google Business Profile.",
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
    limits: [
      "Les informations (horaires, coordonnées, photos) sont fournies par le client.",
      "Aucune position précise dans Google n'est garantie.",
    ],
    options: [TO_DEFINE],
    supplements: [TO_DEFINE],
    image: "gbp",
    featured: true,
  },
];

export const getOffer = (id: string) => offers.find((o) => o.id === id);

export const formatPrice = (o: Offer) =>
  `${o.prefix ? o.prefix + " " : ""}${o.priceLabel}${o.recurring === "month" ? "/mois" : ""}`;
