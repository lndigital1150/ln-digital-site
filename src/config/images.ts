/**
 * Banque de photos du site.
 * Source : Unsplash (licence Unsplash — usage commercial autorisé, sans attribution obligatoire).
 * https://unsplash.com/license
 *
 * Pour remplacer une photo : changez l'identifiant `id` (la partie après « photo- » dans l'URL
 * images.unsplash.com) ou indiquez un chemin local dans `src` (ex. « /photos/mon-image.webp »
 * placé dans le dossier public/photos).
 *
 * Aucune de ces photos ne représente un client de LN Digital.
 */

export type Photo = { src: string; alt: string };

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;
/*
 * Photos d'en-tête des pages intérieures hébergées localement (public/photos/hero, AVIF en 5 largeurs,
 * générées par scripts/local-hero-photos.mjs) : c'est le plus grand élément affiché (LCP) de ces pages.
 */
const hero = (key: string) => `/photos/hero/${key}.avif`;

export const photos = {
  // Accueil — composition principale
  heroMain: { src: u("1522202176988-66273c2fd55f"), alt: "Trois personnes travaillent ensemble autour d'un ordinateur portable" },
  heroDashboard: { src: u("1460925895917-afdab827c52f"), alt: "Ordinateur portable affichant un tableau de bord de statistiques marketing" },
  heroShop: { src: u("1556742049-0cfed4f6a45d"), alt: "Commerçant derrière son comptoir servant une cliente" },

  // Services
  web: { src: u("1547658719-da2b51169166"), alt: "Écrans d'ordinateur et de smartphone affichant la conception d'un site web" },
  webAlt: { src: u("1498050108023-c5249f4df085"), alt: "Ordinateur portable affichant du code sur un bureau lumineux" },
  gbp: { src: u("1528698827591-e19ccd7bc23d"), alt: "Devanture d'un commerce de quartier en soirée" },
  gbpAlt: { src: u("1559925393-8be0ec4767c8"), alt: "Terrasse d'un café dans une rue commerçante" },
  ads: { src: u("1551288049-bebda4e38f71"), alt: "Graphiques de performance d'une campagne sur un écran sombre" },
  adsAlt: { src: u("1545235617-9465d2a55698"), alt: "Smartphone affichant un fil de publications à côté d'un ordinateur" },
  brand: { src: u("1561070791-2526d30994b5"), alt: "Nuanciers de couleurs et esquisses de logos sur un bureau de graphiste" },
  brandAlt: { src: u("1522542550221-31fd19575a2d"), alt: "Planches de maquettes graphiques et de wireframes imprimées" },
  email: { src: u("1563986768609-322da13575f3"), alt: "Personne consultant ses e-mails sur un ordinateur et un smartphone" },
  emailAlt: { src: u("1512486130939-2c4f79935e4f"), alt: "Bureau épuré avec ordinateur portable et smartphone" },
  content: { src: u("1516035069371-29a1b244cc32"), alt: "Appareil photo professionnel posé sur une table sombre" },
  contentProduct: { src: u("1612817288484-6f916006741a"), alt: "Mise en scène de produits cosmétiques photographiés à plat" },
  contentHeadphones: { src: u("1505740420928-5e560c06d30e"), alt: "Casque audio photographié sur fond jaune" },
  contentCamera: { src: u("1526170375885-4d8ecf77b99f"), alt: "Appareil photo instantané sur fond clair" },
  contentShoot: { src: u("1542038784456-1ea8e935640e"), alt: "Photographe en pleine séance photo en extérieur" },
  contentBags: { src: u("1607082348824-0a96f2a4b9da"), alt: "Sacs shopping colorés pour une campagne promotionnelle" },
  seo: { src: u("1504868584819-f8e8b4b6d7e3"), alt: "Ordinateur portable affichant des courbes d'audience" },
  seoAlt: { src: u("1432888498266-38ffec3eaf0a"), alt: "Esquisse d'une structure de site sur papier à côté d'un smartphone" },

  // Pourquoi / méthode
  why: { src: u("1600880292203-757bb62b4baf"), alt: "Deux collègues se tapent dans la main dans un bureau lumineux" },
  whyShop: { src: u("1556742111-a301076d9d18"), alt: "Commerçante souriante dans sa boutique" },
  stepUnderstand: { src: u("1531403009284-440f080d1e12"), alt: "Atelier de réflexion devant un tableau blanc couvert de notes" },
  stepDesign: { src: u("1581291518857-4e27b48ff24e"), alt: "Main dessinant les maquettes d'une application sur papier" },
  stepBuild: { src: u("1517694712202-14dd9538aa97"), alt: "Ordinateur portable affichant du code de développement web" },
  stepOptimize: { src: u("1611224923853-80b023f02d71"), alt: "Notes adhésives « à faire », « en cours », « terminé » sur un tableau" },

  // Clientèle cible
  clientShop: { src: u("1441986300917-64674bd600d8"), alt: "Intérieur d'une boutique de vêtements" },
  clientCraft: { src: u("1504148455328-c376907d081c"), alt: "Perceuse d'artisan posée sur un établi" },
  clientHoreca: { src: u("1517248135467-4c7edcad34c4"), alt: "Salle de restaurant chaleureuse avant le service" },
  clientFreelance: { src: u("1499951360447-b19be8fe80f5"), alt: "Poste de travail d'un indépendant avec ordinateur portable" },
  clientSme: { src: u("1556761175-b413da4baf72"), alt: "Équipe d'une PME en réunion autour d'une table" },

  // Tarifs
  pricingHero: { src: hero("pricingHero"), alt: "Paiement en ligne avec une carte bancaire devant un ordinateur portable" },
  pricingTerminal: { src: u("1556745757-8d76bdb6984b"), alt: "Terminal de paiement sur le comptoir d'un commerce" },

  // À propos
  aboutTeam: { src: hero("aboutTeam"), alt: "Équipe en discussion dans un espace de travail convivial" },
  aboutWorkshop: { src: hero("aboutWorkshop"), alt: "Séance de travail collaborative dans un espace de coworking" },
  aboutOffice: { src: u("1559136555-9303baea8ebd"), alt: "Espace de travail contemporain baigné de lumière" },
  aboutMeeting: { src: u("1556761175-4b46a572b786"), alt: "Réunion de travail dans un bureau ouvert" },
  aboutPencils: { src: u("1513542789411-b6a5d4f31634"), alt: "Crayons de couleur alignés, symbole de créativité" },
  aboutStickies: { src: hero("aboutStickies"), alt: "Équipe organisant des idées avec des notes adhésives" },

  // Contact
  contactHandshake: { src: hero("contactHandshake"), alt: "Poignée de main entre deux professionnels" },
  contactCollab: { src: u("1557426272-fc759fdf7a8d"), alt: "Deux personnes construisant un plan de projet sur un mur de notes" },
  contactDesk: { src: u("1535957998253-26ae1ef29506"), alt: "Bureau de travail avec ordinateur portable ouvert" },

  // CTA
  cta: { src: u("1557804506-669a67965ba0"), alt: "Présentation d'un projet devant une équipe attentive" },

  // Pages légales
  legalSign: { src: hero("legalSign"), alt: "Signature d'un document contractuel" },
  legalJustice: { src: u("1589829545856-d10d557cf95f"), alt: "Statuette de la justice tenant une balance" },
  legalBooks: { src: hero("legalBooks"), alt: "Bibliothèque d'ouvrages juridiques" },
  legalPrivacy: { src: hero("legalPrivacy"), alt: "Personne utilisant un ordinateur portable et un smartphone" },
  legalPlan: { src: hero("legalPlan"), alt: "Crayon posé sur un plan technique" },

  // Projets de démonstration
  gardenPath: { src: u("1585320806297-9794b3e4eeae"), alt: "Allée de jardin bordée de massifs fleuris" },
  gardenLawn: { src: u("1558904541-efa843a96f01"), alt: "Pelouse fraîchement tondue devant une haie" },
  gardenSoil: { src: u("1416879595882-3373a0480b5b"), alt: "Pelle de jardinage plantée dans du terreau" },
  gardenHouse: { src: u("1600585154340-be6161a56a0c"), alt: "Maison moderne entourée d'un jardin paysager" },
  restoTable: { src: u("1414235077428-338989a2e8c0"), alt: "Assiette gastronomique dressée sur une table de restaurant" },
  restoFood: { src: u("1504674900247-0877df9cc836"), alt: "Plats colorés vus du dessus" },
  restoCoffee: { src: u("1495474472287-4d71bcdd2085"), alt: "Tasses de café latte vues du dessus" },
  restoRoom: { src: u("1600093463592-8e36ae95ef56"), alt: "Salle de restaurant décorée de plantes" },
  shopOwner: { src: u("1556740758-90de374c12ad"), alt: "Commerçante utilisant une tablette dans sa boutique" },
  shopCafe: { src: u("1554118811-1e0d58224f24"), alt: "Intérieur d'un café de quartier" },
  serviceElectric: { src: u("1621905251189-08b45d6a269e"), alt: "Électricien travaillant sur une installation" },
  serviceTools: { src: u("1530124566582-a618bc2615dc"), alt: "Outils d'artisan rangés dans un atelier" },
  servicePlan: { src: u("1503387762-592deb58ef4e"), alt: "Professionnel annotant des plans de chantier" },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
