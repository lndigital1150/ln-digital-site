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
    name: "Identité de marque essentielle",
    amount: 250,
    prefix: "À partir de",
    priceLabel: "250 €",
    unit: "Prix de départ",
    mode: "quote",
    summary: "Les bases d'une identité visuelle cohérente pour votre entreprise.",
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
    id: "contenu-visuel",
    serviceSlug: "creation-contenu-visuel",
    name: "Création de contenu visuel",
    amount: 199,
    prefix: "À partir de",
    priceLabel: "199 €",
    unit: "Par mois",
    recurring: "month",
    mode: "quote",
    summary: "Des visuels réguliers pour vos réseaux sociaux et vos supports digitaux.",
    includes: [
      "Visuels pour les réseaux sociaux",
      "Créations promotionnelles",
      "Déclinaisons graphiques selon les formats",
    ],
    limits: [
      `Nombre de visuels par mois : ${TO_DEFINE.toLowerCase()}.`,
      `Durée d'engagement : ${TO_DEFINE.toLowerCase()}.`,
    ],
    options: [TO_DEFINE],
    supplements: [TO_DEFINE],
    image: "content",
  },
  {
    id: "publicite-digitale",
    serviceSlug: "publicite-digitale",
    name: "Publicité digitale",
    amount: null,
    priceLabel: "Sur devis",
    unit: "Selon vos objectifs",
    mode: "quote",
    summary: "Des campagnes définies selon vos objectifs, vos plateformes et votre budget.",
    includes: [
      "Définition des objectifs publicitaires",
      "Choix des plateformes pertinentes",
      "Préparation des annonces et visuels",
      "Paramétrage et suivi des campagnes",
    ],
    limits: [
      "Le budget publicitaire versé aux plateformes est distinct des honoraires de LN Digital, sauf mention contraire dans une offre.",
    ],
    options: [TO_DEFINE],
    supplements: [TO_DEFINE],
    image: "ads",
  },
  {
    id: "seo",
    serviceSlug: "referencement-naturel-seo",
    name: "Référencement naturel (SEO)",
    amount: null,
    priceLabel: "Sur devis",
    unit: "Selon votre site",
    mode: "quote",
    summary: "Un accompagnement SEO adapté à votre site et à votre marché.",
    includes: [
      "Recherche de mots-clés pertinents",
      "Optimisation des titres et méta-descriptions",
      "Amélioration de la structure et du maillage interne",
      "Optimisations techniques de base",
    ],
    limits: ["Aucune position précise ni aucun délai déterminé ne peuvent être garantis."],
    options: [TO_DEFINE],
    supplements: [TO_DEFINE],
    image: "seo",
  },
  {
    id: "e-mail-marketing",
    serviceSlug: "e-mail-marketing",
    name: "E-mail marketing",
    amount: null,
    priceLabel: "Sur devis",
    unit: "Selon vos besoins",
    mode: "quote",
    summary: "Newsletters, modèles et campagnes adaptés à votre audience.",
    includes: [
      "Création de newsletters et de modèles d'e-mails",
      "Organisation et segmentation des listes",
      "Préparation de campagnes et automatisations",
    ],
    limits: ["Envois réalisés dans le respect du RGPD et des règles de prospection électronique."],
    options: [TO_DEFINE],
    supplements: [TO_DEFINE],
    image: "email",
  },
];

export const getOffer = (id: string) => offers.find((o) => o.id === id);

export const formatPrice = (o: Offer) =>
  `${o.prefix ? o.prefix + " " : ""}${o.priceLabel}${o.recurring === "month" ? "/mois" : ""}`;
