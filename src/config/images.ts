/**
 * Banque de photos du site.
 * Source : Unsplash (licence Unsplash — usage commercial autorisé, sans attribution obligatoire).
 * https://unsplash.com/license
 *
 * Toutes les photos sont HÉBERGÉES SUR LE SITE (public/photos) : aucune dépendance à un service externe
 * au moment de l'affichage. Chaque photo existe en AVIF et en WebP, en plusieurs largeurs
 * (voir PHOTO_WIDTHS), plus une image de partage JPG 1200 × 630 (« -og.jpg »).
 *
 * Pour ajouter ou remplacer une photo : indiquez ici son identifiant Unsplash (la partie après « photo- »
 * dans l'URL images.unsplash.com), puis lancez « npm run photos » pour générer les fichiers.
 *
 * Aucune de ces photos ne représente un client de LN Digital.
 */

export type Photo = { src: string; alt: string; id: string };

/** Largeurs générées pour chaque photo (px). 52 et 104 = vignettes du bandeau d'accueil (1x / 2x). */
export const PHOTO_WIDTHS = [52, 104, 256, 384, 640, 828, 1080, 1440, 1920] as const;

const p = (id: string, alt: string) => ({ id, alt });

const registry = {
  // Accueil — composition principale
  heroMain: p("1522202176988-66273c2fd55f", "Trois personnes travaillent ensemble autour d'un ordinateur portable"),

  // Services
  web: p("1547658719-da2b51169166", "Écrans d'ordinateur et de smartphone affichant la conception d'un site web"),
  webAlt: p("1498050108023-c5249f4df085", "Ordinateur portable affichant du code sur un bureau lumineux"),
  gbp: p("1528698827591-e19ccd7bc23d", "Devanture d'un commerce de quartier en soirée"),
  gbpAlt: p("1559925393-8be0ec4767c8", "Terrasse d'un café dans une rue commerçante"),
  brand: p("1561070791-2526d30994b5", "Nuanciers de couleurs et esquisses de logos sur un bureau de graphiste"),
  brandAlt: p("1522542550221-31fd19575a2d", "Planches de maquettes graphiques et de wireframes imprimées"),

  // Pourquoi / méthode
  why: p("1600880292203-757bb62b4baf", "Deux collègues se tapent dans la main dans un bureau lumineux"),
  whyShop: p("1556742111-a301076d9d18", "Commerçante souriante dans sa boutique"),
  stepUnderstand: p("1531403009284-440f080d1e12", "Atelier de réflexion devant un tableau blanc couvert de notes"),
  stepDesign: p("1581291518857-4e27b48ff24e", "Main dessinant les maquettes d'une application sur papier"),
  stepBuild: p("1517694712202-14dd9538aa97", "Ordinateur portable affichant du code de développement web"),
  stepOptimize: p("1611224923853-80b023f02d71", "Notes adhésives « à faire », « en cours », « terminé » sur un tableau"),

  // Clientèle cible
  clientShop: p("1441986300917-64674bd600d8", "Intérieur d'une boutique de vêtements"),
  clientCraft: p("1504148455328-c376907d081c", "Perceuse d'artisan posée sur un établi"),
  clientHoreca: p("1517248135467-4c7edcad34c4", "Salle de restaurant chaleureuse avant le service"),
  clientFreelance: p("1499951360447-b19be8fe80f5", "Poste de travail d'un indépendant avec ordinateur portable"),
  clientSme: p("1556761175-b413da4baf72", "Équipe d'une PME en réunion autour d'une table"),

  // Tarifs
  pricingHero: p("1563013544-824ae1b704d3", "Paiement en ligne avec une carte bancaire devant un ordinateur portable"),
  pricingTerminal: p("1556745757-8d76bdb6984b", "Terminal de paiement sur le comptoir d'un commerce"),

  // À propos
  aboutTeam: p("1521737604893-d14cc237f11d", "Équipe en discussion dans un espace de travail convivial"),
  aboutWorkshop: p("1556761175-5973dc0f32e7", "Séance de travail collaborative dans un espace de coworking"),
  aboutOffice: p("1559136555-9303baea8ebd", "Espace de travail contemporain baigné de lumière"),
  aboutMeeting: p("1556761175-4b46a572b786", "Réunion de travail dans un bureau ouvert"),
  aboutPencils: p("1513542789411-b6a5d4f31634", "Crayons de couleur alignés, symbole de créativité"),
  aboutStickies: p("1552664730-d307ca884978", "Équipe organisant des idées avec des notes adhésives"),

  // Contact
  contactHandshake: p("1521791136064-7986c2920216", "Poignée de main entre deux professionnels"),
  contactCollab: p("1557426272-fc759fdf7a8d", "Deux personnes construisant un plan de projet sur un mur de notes"),
  contactDesk: p("1535957998253-26ae1ef29506", "Bureau de travail avec ordinateur portable ouvert"),

  // CTA
  cta: p("1557804506-669a67965ba0", "Présentation d'un projet devant une équipe attentive"),

  // Pages légales
  legalSign: p("1450101499163-c8848c66ca85", "Signature d'un document contractuel"),
  legalBooks: p("1505664194779-8beaceb93744", "Bibliothèque d'ouvrages juridiques"),
  legalPrivacy: p("1563986768494-4dee2763ff3f", "Personne utilisant un ordinateur portable et un smartphone"),
  legalPlan: p("1542621334-a254cf47733d", "Crayon posé sur un plan technique"),

  // Projets de démonstration
  gardenPath: p("1585320806297-9794b3e4eeae", "Allée de jardin bordée de massifs fleuris"),
  gardenLawn: p("1558904541-efa843a96f01", "Pelouse fraîchement tondue devant une haie"),
  gardenSoil: p("1416879595882-3373a0480b5b", "Pelle de jardinage plantée dans du terreau"),
  gardenHouse: p("1600585154340-be6161a56a0c", "Maison moderne entourée d'un jardin paysager"),
  restoTable: p("1414235077428-338989a2e8c0", "Assiette gastronomique dressée sur une table de restaurant"),
  restoFood: p("1504674900247-0877df9cc836", "Plats colorés vus du dessus"),
  restoCoffee: p("1495474472287-4d71bcdd2085", "Tasses de café latte vues du dessus"),
  restoRoom: p("1600093463592-8e36ae95ef56", "Salle de restaurant décorée de plantes"),
  shopOwner: p("1556740758-90de374c12ad", "Commerçante utilisant une tablette dans sa boutique"),
  shopCafe: p("1554118811-1e0d58224f24", "Intérieur d'un café de quartier"),
};

export type PhotoKey = keyof typeof registry;

/** Chemin de base local d'une photo (sans largeur ni extension) : /photos/<clé>. */
export const photos = Object.fromEntries(
  Object.entries(registry).map(([key, v]) => [key, { ...v, src: `/photos/${key}` }]),
) as Record<PhotoKey, Photo>;

/** Fichier d'une photo à une largeur et un format donnés. */
export const photoFile = (key: PhotoKey, width: number, format: "avif" | "webp") =>
  `/photos/${key}-${width}.${format}`;

/** srcset d'une photo (toutes les largeurs générées, éventuellement plafonnées). */
export const photoSrcSet = (key: PhotoKey, format: "avif" | "webp", max = 1920) =>
  PHOTO_WIDTHS.filter((w) => w >= 256 && w <= max)
    .map((w) => `${photoFile(key, w, format)} ${w}w`)
    .join(", ");

/** Image d'aperçu de partage (Open Graph) : JPG 1200 × 630, le format le mieux lu par les réseaux sociaux. */
export const shareImage = (src: string) => `${src}-og.jpg`;
