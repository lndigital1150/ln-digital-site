import type { PhotoKey } from "./images";

/**
 * Contenus éditoriaux des pages de service (/services/<path>), en complément de services.ts.
 *
 * Syntaxe des textes : *mot* = italique (titres), [texte](/chemin) = lien interne.
 * Règles : aucune statistique, aucun témoignage, aucune promesse de position dans Google,
 * aucun délai ou livrable qui n'a pas été validé (voir aussi pricing.ts).
 */

export type ServiceBlock = {
  /** Nom court du chapitre (indicateur de défilement). */
  chapter: string;
  /** Titre H2. */
  title: string;
  intro?: string;
  /** points : liste numérotée titre + texte ; cards : grille de cartes (fond clair) ;
      steps : étapes avec photo fixe ; checklist : liste cochée. */
  kind: "points" | "cards" | "steps" | "checklist";
  theme: "theme-dark" | "theme-night" | "theme-light";
  items?: { title: string; text: string; image?: PhotoKey }[];
  list?: string[];
  outro?: string;
};

export type ServiceContent = {
  /** Phrase d'introduction du héros (différente du résumé de la page Services). */
  lead: string;
  /** Trois arguments concrets affichés dans le héros. */
  valuePoints: string[];
  /** Titre de la liste des prestations incluses. */
  includesTitle: string;
  /** Sections éditoriales, dans l'ordre d'affichage. */
  blocks: ServiceBlock[];
  /** « Pour qui » : une ligne par public (l'introduction est `audience` dans services.ts). */
  audienceTitle?: string;
  audienceItems?: { title: string; text: string }[];
  /** Texte d'accompagnement du tarif. */
  pricingText: string;
  /** Message prérempli du bouton WhatsApp. */
  whatsapp: string;
  /** Appel à l'action final. */
  cta: { title: string; text: string };
};

export const serviceContent: Record<string, ServiceContent> = {
  /* ------------------------------------------------------------------ */
  "creation-sites-web": {
    lead: "Un site vitrine professionnel pour présenter votre activité, inspirer confiance et recevoir des demandes de devis, partout en Belgique francophone.",
    valuePoints: [
      "Site vitrine à partir de 590 €",
      "Adapté aux ordinateurs, tablettes et smartphones",
      "Formulaire de contact et optimisation SEO de base inclus",
    ],
    includesTitle: "Ce que comprend votre site vitrine",
    blocks: [
      {
        chapter: "Pourquoi",
        title: "Pourquoi un *site professionnel* pour votre entreprise ?",
        intro:
          "Les réseaux sociaux et les annuaires sont utiles, mais ils ne remplacent pas un site qui vous appartient. Pour un indépendant ou une PME, un site vitrine bien construit remplit plusieurs rôles.",
        kind: "points",
        theme: "theme-dark",
        items: [
          {
            title: "Être trouvé quand on vous cherche",
            text: "Quand un client potentiel cherche votre nom, votre métier ou votre commune sur Google, un site clair et bien structuré lui donne les bonnes informations : ce que vous faites, où vous intervenez et comment vous joindre.",
          },
          {
            title: "Rassurer avant le premier contact",
            text: "Un site soigné montre votre sérieux : vos prestations, votre façon de travailler, vos coordonnées complètes. C'est souvent ce qui départage deux prestataires que le client ne connaît pas encore.",
          },
          {
            title: "Recevoir des demandes, pas seulement des visites",
            text: "Chaque page mène à une action : remplir le formulaire de contact, appeler ou écrire. Sur smartphone, ces actions restent accessibles en un geste.",
          },
          {
            title: "Garder la main sur votre présentation",
            text: "Contrairement à une page sur un réseau social, votre site présente votre activité comme vous le souhaitez, sans dépendre de l'algorithme d'une plateforme.",
          },
        ],
      },
      {
        chapter: "Étapes",
        title: "Les étapes de *création* de votre site",
        intro:
          "Une démarche claire, du premier échange à la mise en ligne. Le délai dépend du projet et de la disponibilité des contenus : il est précisé dans la proposition.",
        kind: "steps",
        theme: "theme-night",
        items: [
          {
            title: "Comprendre vos objectifs",
            text: "Nous faisons le point sur votre activité, vos clients, vos services prioritaires et ce que le site doit vous apporter : plus de demandes, une meilleure image, des informations plus claires.",
            image: "stepUnderstand",
          },
          {
            title: "Organiser les pages",
            text: "Nous définissons la structure du site : les pages utiles, leur ordre et le contenu de chacune, pour que vos visiteurs trouvent rapidement ce qu'ils cherchent.",
            image: "contactCollab",
          },
          {
            title: "Concevoir l'interface",
            text: "Nous créons une interface adaptée à votre activité et à votre identité visuelle, lisible et agréable sur tous les écrans.",
            image: "stepDesign",
          },
          {
            title: "Développer et optimiser",
            text: "Le site est développé et adapté aux ordinateurs, tablettes et smartphones, avec un formulaire de contact et une optimisation SEO de base : titres, descriptions et structure des pages.",
            image: "stepBuild",
          },
          {
            title: "Vérifier et mettre en ligne",
            text: "Avant la mise en ligne, nous vérifions le fonctionnement du site : affichage, liens, formulaire. Votre entreprise dispose alors d'une vitrine prête à être partagée.",
            image: "stepOptimize",
          },
        ],
      },
      {
        chapter: "Préparer",
        title: "Bien *préparer* votre projet de site",
        intro:
          "Pas besoin que tout soit prêt : ces éléments nous aident simplement à vous faire une proposition précise.",
        kind: "checklist",
        theme: "theme-dark",
        list: [
          "Une description de votre activité et de vos services prioritaires.",
          "Votre zone d'intervention et le type de clients que vous visez.",
          "Les textes, photos ou documents dont vous disposez déjà.",
          "Votre logo et vos couleurs, si vous en avez. Sinon, pensez à créer [votre identité visuelle](/services/identite-visuelle).",
          "Deux ou trois sites que vous appréciez, et ce qui vous plaît dans chacun.",
          "Votre nom de domaine, si vous en possédez déjà un.",
          "L'action que vos visiteurs doivent faire en priorité : appeler, demander un devis, venir sur place…",
        ],
      },
    ],
    audienceTitle: "Un site adapté à *votre métier*",
    audienceItems: [
      { title: "Indépendants", text: "Présenter votre expertise et faciliter la prise de contact ou de rendez-vous." },
      { title: "Artisans", text: "Montrer vos réalisations, votre zone d'intervention et recevoir des demandes de devis." },
      { title: "Commerces", text: "Donner envie de passer en boutique : horaires, accès, produits et services." },
      { title: "Restaurants et Horeca", text: "Présenter votre carte, votre ambiance et vos coordonnées de réservation." },
      { title: "Professions libérales", text: "Exposer vos domaines d'intervention avec clarté et sobriété." },
      { title: "PME", text: "Présenter vos services et votre équipe, et centraliser les demandes entrantes." },
    ],
    pricingText:
      "Le site vitrine essentiel démarre à 590 €. Les pages ou fonctionnalités supplémentaires font l'objet d'un devis : vous savez exactement ce que vous payez avant de vous engager.",
    whatsapp: "Bonjour LN Digital, j'aimerais des informations sur la création d'un site web pour mon entreprise.",
    cta: {
      title: "Votre futur site *commence ici.*",
      text: "Décrivez-nous votre activité : nous revenons vers vous avec une proposition claire, adaptée à vos objectifs.",
    },
  },

  /* ------------------------------------------------------------------ */
  "identite-de-marque": {
    lead: "Un logo professionnel et une identité visuelle cohérente, pour que vos clients vous reconnaissent au premier coup d'œil, sur tous vos supports.",
    valuePoints: [
      "Identité visuelle à partir de 250 €, sur devis",
      "Logo, couleurs et typographies",
      "Déclinaisons et guide d'utilisation selon l'offre",
    ],
    includesTitle: "Ce que peut comprendre votre identité",
    blocks: [
      {
        chapter: "Différence",
        title: "Logo ou identité visuelle : *quelle différence ?*",
        intro: "On confond souvent les deux. Pourtant, le logo n'est qu'une partie de l'image de votre entreprise.",
        kind: "points",
        theme: "theme-dark",
        items: [
          {
            title: "Le logo, votre signature",
            text: "C'est le symbole qui identifie votre entreprise : sur votre enseigne, votre site, vos cartes de visite. Il doit rester lisible en grand comme en tout petit.",
          },
          {
            title: "L'identité visuelle, votre système",
            text: "Elle réunit le logo, une palette de couleurs, des typographies, un style d'images et des éléments graphiques. C'est elle qui rend votre communication reconnaissable, même quand le logo n'est pas visible.",
          },
          {
            title: "La charte graphique, votre mode d'emploi",
            text: "Elle consigne les règles d'utilisation : versions du logo, couleurs exactes, polices, exemples à suivre et à éviter. Vous, un imprimeur ou un collaborateur pouvez ainsi appliquer votre identité sans erreur.",
          },
        ],
      },
      {
        chapter: "Cohérence",
        title: "Pourquoi la *cohérence graphique* compte",
        intro: "Une identité appliquée de la même façon partout travaille pour vous à chaque contact avec un client.",
        kind: "cards",
        theme: "theme-light",
        items: [
          {
            title: "Être reconnu",
            text: "Les mêmes couleurs, la même typographie et le même logo, vus encore et encore, ancrent votre marque dans la mémoire de vos clients.",
          },
          {
            title: "Inspirer confiance",
            text: "Une image soignée et homogène donne une impression de sérieux et de professionnalisme, avant même le premier échange.",
          },
          {
            title: "Se démarquer",
            text: "Une identité pensée pour votre activité et vos valeurs vous distingue des autres entreprises de votre secteur et de votre région.",
          },
          {
            title: "Gagner du temps",
            text: "Avec des règles claires, chaque nouveau support (flyer, publication, devis) se crée plus vite, sans repartir de zéro.",
          },
        ],
      },
      {
        chapter: "Étapes",
        title: "Les étapes de *création* de votre identité",
        intro: "Une démarche structurée, pour un résultat qui vous ressemble et qui dure.",
        kind: "steps",
        theme: "theme-night",
        items: [
          {
            title: "Découvrir votre entreprise",
            text: "Nous échangeons sur votre activité, vos valeurs, votre clientèle et vos concurrents, pour définir ce que votre image doit exprimer.",
            image: "stepUnderstand",
          },
          {
            title: "Définir l'univers visuel",
            text: "Nous explorons des pistes graphiques : ambiance, couleurs, typographies, style. Elles servent de base à la création du logo.",
            image: "aboutPencils",
          },
          {
            title: "Créer et ajuster le logo",
            text: "Le logo est dessiné puis affiné avec vous, en vérifiant sa lisibilité sur différents formats et supports.",
            image: "stepDesign",
          },
          {
            title: "Décliner et documenter",
            text: "Selon l'offre, l'identité est déclinée sur vos supports et ses règles d'utilisation sont réunies dans un guide.",
            image: "aboutStickies",
          },
        ],
      },
      {
        chapter: "Supports",
        title: "Où utiliser votre *identité visuelle ?*",
        intro: "Une fois définie, votre identité s'applique partout où votre entreprise est visible.",
        kind: "checklist",
        theme: "theme-dark",
        list: [
          "Votre [site web](/services/creation-site-web), pour une présentation cohérente en ligne.",
          "Votre [fiche Google Business Profile](/services/google-business-profile) : logo, photo de couverture, visuels.",
          "Vos réseaux sociaux : photo de profil, publications, stories.",
          "Vos cartes de visite, flyers et brochures.",
          "Votre enseigne, votre vitrine et vos véhicules.",
          "Vos menus, emballages ou étiquettes.",
          "Vos devis, factures et signatures d'e-mail.",
        ],
      },
    ],
    audienceTitle: "Une identité pour *chaque étape*",
    audienceItems: [
      { title: "Entreprises qui se lancent", text: "Démarrer avec une image professionnelle et cohérente dès le premier jour." },
      { title: "Entreprises qui évoluent", text: "Moderniser une image qui ne reflète plus votre activité." },
      { title: "Commerces et restaurants", text: "Une image reconnaissable, de l'enseigne à la carte en passant par les réseaux sociaux." },
      { title: "Indépendants et professions libérales", text: "Une image sobre et crédible qui inspire confiance." },
      { title: "Artisans", text: "Un logo lisible sur vos véhicules, vos vêtements de travail et vos devis." },
      { title: "PME", text: "Harmoniser la communication de toute l'équipe grâce à des règles communes." },
    ],
    pricingText:
      "L'identité visuelle essentielle démarre à 250 €. Chaque identité dépend de vos besoins et des supports à décliner : le montant exact est précisé dans un devis.",
    whatsapp: "Bonjour LN Digital, j'aimerais des informations sur la création d'un logo et d'une identité visuelle.",
    cta: {
      title: "Donnons une *image* à votre entreprise.",
      text: "Parlez-nous de votre activité et de vos valeurs : nous vous proposons une identité visuelle adaptée, avec un devis clair.",
    },
  },

  /* ------------------------------------------------------------------ */
  "google-business-profile": {
    lead: "Une fiche Google complète et à jour, pour que les clients de votre région trouvent les bonnes informations, vous appellent ou viennent vous voir.",
    valuePoints: [
      "Prestation ponctuelle à 149 €",
      "Création ou optimisation de votre fiche",
      "Conseils pour la faire vivre dans la durée",
    ],
    includesTitle: "Ce que comprend la prestation",
    blocks: [
      {
        chapter: "Fonctionnement",
        title: "Comment fonctionne une *fiche Google Business Profile ?*",
        intro:
          "La fiche Google Business Profile (anciennement Google My Business) est le profil gratuit de votre entreprise sur Google. Elle s'affiche dans les résultats de recherche et sur Google Maps quand quelqu'un cherche votre nom ou un service près de chez lui. Pour classer les fiches, Google indique tenir compte de trois critères.",
        kind: "points",
        theme: "theme-dark",
        items: [
          {
            title: "La pertinence",
            text: "Votre fiche correspond-elle à ce que l'internaute recherche ? Des catégories justes, une description claire et des services détaillés aident Google à le comprendre.",
          },
          {
            title: "La distance",
            text: "La proximité entre votre entreprise et la personne qui cherche, ou le lieu indiqué dans sa recherche. Ce critère ne se contrôle pas.",
          },
          {
            title: "La notoriété",
            text: "Ce que Google sait de votre entreprise : avis, mentions et présence sur le web. Elle se construit dans la durée.",
          },
        ],
      },
      {
        chapter: "Éléments",
        title: "Les éléments d'une fiche *bien renseignée*",
        intro: "Chaque rubrique compte, pour Google comme pour vos futurs clients.",
        kind: "cards",
        theme: "theme-light",
        items: [
          {
            title: "Les catégories",
            text: "Une catégorie principale, la plus précise possible, et quelques catégories secondaires pertinentes : elles indiquent à Google ce que fait votre entreprise.",
          },
          {
            title: "La description",
            text: "Un texte clair, de 750 caractères maximum, qui présente votre activité sans lien ni promotion, comme l'exigent les règles de Google.",
          },
          {
            title: "Les services",
            text: "La liste de ce que vous proposez, pour informer précisément vos clients avant même qu'ils vous contactent.",
          },
          {
            title: "Les horaires et coordonnées",
            text: "Adresse ou zone desservie, téléphone, site web, horaires habituels et exceptionnels : des informations exactes évitent les déplacements inutiles et les appels sans réponse.",
          },
          {
            title: "Les photos",
            text: "Façade, intérieur, équipe, réalisations : des photos récentes et réelles aident les clients à se projeter et à vous reconnaître sur place.",
          },
          {
            title: "Les avis",
            text: "Les avis et vos réponses comptent pour la confiance. Google interdit d'acheter des avis ou de les obtenir contre une contrepartie : nous vous conseillons des façons légitimes de les solliciter.",
          },
        ],
      },
      {
        chapter: "Avantages",
        title: "Les avantages d'une fiche *complète*",
        kind: "points",
        theme: "theme-night",
        items: [
          {
            title: "Des informations fiables",
            text: "Vos clients trouvent les bons horaires, le bon numéro et la bonne adresse, au moment où ils en ont besoin.",
          },
          {
            title: "Un contact en un geste",
            text: "Appeler, obtenir l'itinéraire ou visiter votre site directement depuis la fiche, notamment sur smartphone.",
          },
          {
            title: "Une meilleure première impression",
            text: "Une fiche soignée, avec des photos et des réponses aux avis, montre une entreprise active et attentive.",
          },
        ],
      },
      {
        chapter: "Éligibilité",
        title: "Votre entreprise est-elle *éligible ?*",
        intro:
          "Google réserve les fiches Business Profile aux entreprises qui ont un contact direct avec leurs clients pendant leurs horaires. Avant toute prestation, nous vérifions avec vous que votre activité répond à ces règles.",
        kind: "points",
        theme: "theme-dark",
        items: [
          {
            title: "Vous recevez vos clients",
            text: "Boutique, cabinet, restaurant, atelier ouvert au public : votre adresse est affichée sur la fiche.",
          },
          {
            title: "Vous vous déplacez chez vos clients",
            text: "Artisan, dépannage, services à domicile : vous indiquez une zone desservie et vous pouvez masquer votre adresse.",
          },
          {
            title: "Vous travaillez uniquement en ligne",
            text: "Sans contact en personne avec vos clients, Google n'autorise pas de fiche. Un [site web professionnel](/services/creation-site-web) est alors plus adapté.",
          },
        ],
      },
      {
        chapter: "Étapes",
        title: "Notre prestation en *quatre étapes*",
        intro: "Une intervention ponctuelle, claire du début à la fin.",
        kind: "steps",
        theme: "theme-night",
        items: [
          {
            title: "Faire le point",
            text: "Nous vérifions l'éligibilité de votre activité et rassemblons avec vous les informations à jour : coordonnées, horaires, services, zone d'intervention.",
            image: "contactDesk",
          },
          {
            title: "Créer ou optimiser la fiche",
            text: "Nous créons la fiche ou optimisons l'existante : catégories, description, services, horaires et coordonnées. La validation auprès de Google se fait de votre côté, selon la méthode que Google vous demande.",
            image: "clientShop",
          },
          {
            title: "Conseiller photos et avis",
            text: "Nous vous conseillons sur les photos à publier et sur la gestion des avis : comment les solliciter et comment y répondre.",
            image: "whyShop",
          },
          {
            title: "Vous rendre autonome",
            text: "Vous repartez avec des recommandations pour garder une fiche à jour : horaires exceptionnels, nouvelles photos, réponses aux avis.",
            image: "stepOptimize",
          },
        ],
      },
      {
        chapter: "Limites",
        title: "Les limites du *référencement local*",
        intro: "Une fiche bien renseignée met toutes les chances de votre côté, mais elle ne fait pas tout. Nous préférons être clairs.",
        kind: "points",
        theme: "theme-dark",
        items: [
          {
            title: "Aucune position garantie",
            text: "Personne ne peut garantir une place dans Google ou dans Maps. Méfiez-vous des promesses de « première position ».",
          },
          {
            title: "Des critères hors de portée",
            text: "La distance avec la personne qui cherche, la concurrence de votre secteur ou les évolutions de Google ne se contrôlent pas.",
          },
          {
            title: "Un effort dans la durée",
            text: "Avis, photos, informations : une fiche doit vivre. Laissée à l'abandon, elle perd de son intérêt pour vos clients.",
          },
        ],
      },
    ],
    pricingText:
      "La prestation est proposée au tarif fixe de 149 €, en une seule fois. Une question avant de vous lancer ? Écrivez-nous sur WhatsApp.",
    whatsapp: "Bonjour LN Digital, j'aimerais des informations sur l'optimisation de ma fiche Google Business Profile.",
    cta: {
      title: "Soyez bien présenté *près de chez vous.*",
      text: "Envoyez-nous le nom de votre entreprise : nous vérifions avec vous l'éligibilité de votre activité et l'état de votre fiche actuelle.",
    },
  },
};
