import type { PhotoKey } from "./images";

/**
 * Les sept services de LN Digital.
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
  {
    slug: "publicite-digitale",
    title: "Publicité digitale",
    shortTitle: "Publicité",
    short: "Développez votre visibilité grâce à des campagnes publicitaires ciblées et adaptées à vos objectifs.",
    headline: "Des campagnes ciblées pour toucher une audience pertinente.",
    intro: [
      "La publicité digitale permet de présenter votre offre à des personnes susceptibles d'être intéressées, selon leur zone géographique, leurs centres d'intérêt ou leurs recherches.",
      "Nous définissons avec vous des objectifs réalistes, choisissons les plateformes pertinentes, préparons les annonces et suivons les indicateurs disponibles pour ajuster les campagnes au fil des données recueillies.",
    ],
    benefits: [
      "Une visibilité accrue auprès d'une audience choisie.",
      "Des annonces cohérentes avec votre image.",
      "Des ajustements fondés sur les données disponibles.",
    ],
    includes: [
      "Définition des objectifs publicitaires",
      "Choix des plateformes pertinentes",
      "Préparation des annonces et visuels",
      "Paramétrage des campagnes",
      "Suivi des indicateurs disponibles",
      "Optimisation selon les données recueillies",
    ],
    note: "Le budget publicitaire versé aux plateformes est distinct des honoraires de LN Digital, sauf mention contraire dans une offre.",
    image: "ads",
    imageAlt: "adsAlt",
    offerId: "publicite-digitale",
  },
  {
    slug: "identite-de-marque",
    title: "Identité de marque",
    shortTitle: "Identité",
    short: "Construisez une image cohérente et reconnaissable qui reflète les valeurs de votre entreprise.",
    headline: "Une image cohérente, reconnaissable, fidèle à vos valeurs.",
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
    slug: "e-mail-marketing",
    title: "E-mail marketing",
    shortTitle: "E-mail",
    short: "Communiquez efficacement avec vos clients grâce à des newsletters et des campagnes adaptées à votre audience.",
    headline: "Entretenez la relation avec vos clients, directement dans leur boîte mail.",
    intro: [
      "L'e-mail reste un canal direct pour partager vos actualités, vos nouveautés et vos offres avec des personnes qui ont choisi de vous suivre.",
      "Nous créons vos modèles d'e-mails, organisons vos listes de contacts et préparons des campagnes adaptées à votre audience, dans le respect des règles applicables en matière de protection des données (RGPD) et de prospection électronique.",
    ],
    benefits: [
      "Un lien régulier avec vos clients et prospects.",
      "Des messages adaptés à chaque segment d'audience.",
      "Des envois conformes aux règles de consentement.",
    ],
    includes: [
      "Création de newsletters",
      "Conception de modèles d'e-mails",
      "Organisation et segmentation des listes de contacts",
      "Préparation de campagnes",
      "Automatisations adaptées aux besoins",
      "Analyse des performances disponibles",
    ],
    note: "Les campagnes respectent les règles applicables en matière de protection des données et de prospection électronique.",
    image: "email",
    imageAlt: "emailAlt",
    offerId: "e-mail-marketing",
  },
  {
    slug: "creation-contenu-visuel",
    title: "Création de contenu visuel",
    shortTitle: "Contenu visuel",
    short: "Valorisez votre entreprise avec des visuels professionnels pour vos supports digitaux.",
    headline: "Des visuels qui donnent envie de s'arrêter, de regarder, de cliquer.",
    intro: [
      "Sur les réseaux sociaux comme dans vos campagnes, l'image est souvent ce qui retient l'attention en premier. Des visuels soignés renforcent votre image de marque et rendent votre communication plus attractive.",
      "Nous créons des visuels adaptés à chaque format : publications, promotions, mises en avant de produits ou de services, supports publicitaires, flyers et supports numériques.",
    ],
    benefits: [
      "Une communication plus attractive et plus professionnelle.",
      "Des visuels cohérents avec votre identité.",
      "Des formats adaptés à chaque plateforme.",
    ],
    includes: [
      "Visuels pour les réseaux sociaux",
      "Créations promotionnelles",
      "Visuels de produits et services",
      "Supports pour les campagnes publicitaires",
      "Flyers et supports numériques",
      "Déclinaisons graphiques selon les formats",
    ],
    image: "content",
    imageAlt: "contentProduct",
    offerId: "contenu-visuel",
  },
  {
    slug: "referencement-naturel-seo",
    title: "Référencement naturel (SEO)",
    shortTitle: "SEO",
    short: "Optimisez votre site pour améliorer sa visibilité dans les résultats naturels des moteurs de recherche.",
    headline: "Aidez les moteurs de recherche à comprendre — et à présenter — votre site.",
    intro: [
      "Le référencement naturel regroupe les actions qui aident les moteurs de recherche à comprendre votre site et à le proposer aux internautes qui recherchent vos services.",
      "Mots-clés, structure des pages, contenus, aspects techniques, maillage interne : nous travaillons ces leviers pour contribuer à améliorer votre visibilité organique. Le SEO s'inscrit dans la durée : ni position précise, ni délai déterminé ne peuvent être garantis.",
    ],
    benefits: [
      "Un site mieux compris par les moteurs de recherche.",
      "Des contenus pensés pour les recherches de vos clients.",
      "Une visibilité organique qui se construit dans le temps.",
    ],
    includes: [
      "Recherche de mots-clés pertinents",
      "Optimisation des titres et méta-descriptions",
      "Amélioration de la structure des pages",
      "Recommandations concernant les contenus",
      "Optimisations techniques de base",
      "Amélioration du maillage interne",
      "Suivi des indicateurs disponibles",
    ],
    note: "Aucune position précise ni aucun délai déterminé ne peuvent être garantis.",
    image: "seo",
    imageAlt: "seoAlt",
    offerId: "seo",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
