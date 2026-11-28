import type { PhotoKey } from "./images";
import type { Faq } from "./faq";

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
  /** Adresse de la page dédiée : /services/<path>. */
  path: string;
  /** Balise title (sans « | LN Digital », ajouté automatiquement) et meta description de la page dédiée. */
  seo: { title: string; description: string };
  /** Titre H1 de la page dédiée ; `em` est affiché en italique. */
  hero: { before: string; em: string; after: string };
  /** À qui s'adresse ce service (page dédiée). */
  audience: string;
  /** Projet de démonstration (fictif) qui illustre ce service. */
  projectSlug: string;
  /** Questions fréquentes propres à ce service (distinctes de celles de la page Contact). [texte](/lien) = lien. */
  faq: Faq[];
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
    path: "creation-site-web",
    seo: {
      title: "Création de site web à Bruxelles et en Wallonie",
      description:
        "Création de site internet pour indépendants et PME en Belgique : site vitrine professionnel, adapté au mobile, pensé pour les demandes de devis. Dès 590 €.",
    },
    hero: { before: "Création de ", em: "sites web", after: " à Bruxelles et en Wallonie." },
    audience:
      "Pour les indépendants, artisans, commerces, professionnels de l'Horeca, professions libérales et PME de Bruxelles et de Wallonie qui veulent un site vitrine clair, à leur image, pour présenter leur activité et recevoir des demandes de contact.",
    projectSlug: "site-vitrine-jardinage-elagage",
    faq: [
      {
        q: "Un site est-il utile si je suis déjà sur Facebook ou Instagram ?",
        a: "Les deux se complètent. Les réseaux sociaux entretiennent le lien avec vos abonnés ; votre site présente votre activité de façon complète et durable, apparaît dans les résultats de Google et vous appartient.",
      },
      {
        q: "Mon site sera-t-il adapté aux smartphones ?",
        a: "Oui. Chaque site est conçu pour s'afficher correctement sur ordinateur, tablette et smartphone, et son fonctionnement est vérifié avant la mise en ligne.",
      },
      {
        q: "Mon site sera-t-il visible sur Google dès sa mise en ligne ?",
        a: "Google doit d'abord découvrir et indexer le site, ce qui peut prendre un peu de temps. L'optimisation SEO de base pose des fondations saines, mais aucune position ne peut être garantie. Pour les recherches locales, une [fiche Google Business Profile](/services/google-business-profile) bien renseignée est un complément utile.",
      },
      {
        q: "Ai-je besoin d'un logo avant de créer mon site ?",
        a: "Ce n'est pas obligatoire, mais un logo et des couleurs définis donnent un résultat plus cohérent. Si vous n'en avez pas encore, nous pouvons d'abord créer [votre identité visuelle](/services/identite-visuelle).",
      },
      {
        q: "Que dois-je fournir pour démarrer ?",
        a: "Une présentation de votre activité suffit pour un premier échange. Les textes, photos et informations nécessaires sont ensuite listés dans la proposition, avec ce qui est pris en charge de chaque côté.",
      },
      {
        q: "Combien coûte un site vitrine ?",
        a: "Le site vitrine essentiel démarre à 590 €. Les pages ou fonctionnalités supplémentaires au-delà de ce périmètre font l'objet d'un devis. Le détail est sur la page [Tarifs](/tarifs#site-vitrine).",
      },
    ],
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
    path: "identite-visuelle",
    seo: {
      title: "Création de logo et d'identité visuelle",
      description:
        "Création de logo professionnel, charte graphique et identité visuelle pour entreprises à Bruxelles et en Wallonie. À partir de 250 €, sur devis.",
    },
    hero: { before: "Création de ", em: "logo et d'identité visuelle", after: " pour votre entreprise." },
    audience:
      "Pour les entreprises qui se lancent, qui veulent moderniser leur image ou qui manquent de cohérence d'un support à l'autre : commerces, artisans, indépendants, restaurants et PME de Bruxelles et de Wallonie.",
    projectSlug: "identite-visuelle-restaurant",
    faq: [
      {
        q: "Que comprend une identité visuelle ?",
        a: "Selon l'offre : la définition de l'univers visuel, la création du logo, le choix des couleurs et des typographies, des déclinaisons graphiques, des supports de communication et un guide d'utilisation.",
      },
      {
        q: "Pourquoi l'identité visuelle est-elle sur devis ?",
        a: "Chaque identité dépend de vos besoins et des supports à décliner. Le prix de départ est de 250 € ; le montant exact est précisé dans un devis.",
      },
      {
        q: "Faut-il créer l'identité visuelle avant le site web ?",
        a: "C'est l'idéal : votre [site web](/services/creation-site-web) reprend alors directement votre logo, vos couleurs et vos typographies, et tout reste cohérent dès le départ.",
      },
      {
        q: "Mon identité pourra-t-elle servir sur mes réseaux sociaux et mes imprimés ?",
        a: "Oui, c'est l'objectif : une identité cohérente s'applique de la même manière sur votre site, vos réseaux sociaux, votre fiche Google et vos supports imprimés.",
      },
      {
        q: "Comment préparer la création de mon logo ?",
        a: "Rassemblez ce qui décrit votre entreprise : vos valeurs, votre clientèle, des logos ou univers que vous appréciez (et ceux que vous n'aimez pas), et les supports sur lesquels le logo sera utilisé.",
      },
    ],
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
    path: "google-business-profile",
    seo: {
      title: "Optimisation fiche Google Business Profile",
      description:
        "Création et optimisation de fiche Google Business Profile à Bruxelles et en Wallonie : catégories, description, services, photos, avis. 149 €.",
    },
    hero: { before: "Optimisation de votre ", em: "fiche Google Business Profile", after: "." },
    audience:
      "Pour les commerces, artisans, restaurants, professions libérales et entreprises locales de Bruxelles et de Wallonie qui reçoivent leurs clients ou se déplacent chez eux, et qui veulent être bien présentés quand on les cherche sur Google.",
    projectSlug: "google-business-profile-commerce-local",
    faq: [
      {
        q: "Faut-il déjà avoir une fiche Google ?",
        a: "Non. La prestation comprend la création de la fiche si elle n'existe pas encore, ou l'optimisation d'une fiche existante.",
      },
      {
        q: "Mon entreprise travaille uniquement en ligne : puis-je avoir une fiche ?",
        a: "Non. Google réserve ces fiches aux entreprises qui rencontrent leurs clients en personne, dans leurs locaux ou chez eux. Pour une activité exclusivement en ligne, un [site web professionnel](/services/creation-site-web) est plus adapté.",
      },
      {
        q: "Puis-je masquer mon adresse ?",
        a: "Oui, si vous vous déplacez chez vos clients sans les recevoir à votre adresse : vous indiquez alors une zone desservie. Si vous recevez des clients sur place, l'adresse doit être affichée.",
      },
      {
        q: "Qui fournit les horaires et les coordonnées ?",
        a: "Vous. Les horaires et coordonnées sont mis à jour à partir des informations que vous fournissez, pour qu'elles restent exactes.",
      },
      {
        q: "Combien de temps avant de voir un effet ?",
        a: "Les modifications sont d'abord examinées par Google, dans un délai variable. L'effet sur la visibilité dépend ensuite de nombreux facteurs : il n'est ni immédiat ni garanti.",
      },
      {
        q: "Dois-je avoir un site web ?",
        a: "Ce n'est pas obligatoire, mais une fiche qui renvoie vers un [site web professionnel](/services/creation-site-web) donne à vos clients plus d'informations pour vous choisir.",
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getServiceByPath = (path: string) => services.find((s) => s.path === path);
export const getServiceByTitle = (title: string) => services.find((s) => s.title === title);
/** Adresse de la page dédiée d'un service. */
export const servicePath = (s: Service) => `/services/${s.path}`;
