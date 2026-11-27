# Site web LN Digital

Site de l'agence de marketing digital **LN Digital** (Bruxelles · Wallonie).
Next.js 16 · React 19 · TypeScript · GSAP (ScrollTrigger, SplitText) · Lenis.

---

## 1. Installation et lancement

Prérequis : [Node.js](https://nodejs.org) 20 ou plus récent.

```bash
cd site
npm install
npm run dev        # développement → http://localhost:3000
npm run build      # vérification + build de production
npm run start      # lance la version de production
```

> Le projet est dans un dossier OneDrive : le dossier `node_modules` (lourd) est synchronisé lui aussi.
> Si la synchronisation ralentit l'ordinateur, excluez `site/node_modules` et `site/.next` de OneDrive
> (clic droit → « Libérer de l'espace »), ou déplacez le projet hors de OneDrive.

---

## 2. Où modifier quoi ?

| Je veux modifier…                         | Fichier                                    |
|-------------------------------------------|--------------------------------------------|
| Slogan, WhatsApp, e-mail, zone, infos légales | `src/config/site.ts`                    |
| Les 3 services (textes, prestations, photos)  | `src/config/services.ts`                |
| Les tarifs, offres, mode d'achat              | `src/config/pricing.ts`                 |
| Les projets de démonstration                  | `src/config/projects.ts`                |
| Les questions fréquentes                      | `src/config/faq.ts`                     |
| Les photos                                    | `src/config/images.ts`                  |
| Les couleurs, typographies, styles            | `src/app/globals.css` (variables en haut du fichier) |
| Le contenu d'une page                         | `src/app/<page>/page.tsx`               |
| Le logo                                       | `public/brand/` (issu de `../branding/`) |

### Textes
Les textes longs des services, tarifs, projets et FAQ sont dans `src/config/`. Les textes propres à une page
(titres de sections, introductions) sont directement dans `src/app/<page>/page.tsx`.

### Prix
Dans `src/config/pricing.ts` :
- `amount` : montant en euros utilisé pour le paiement en ligne (`null` = sur devis) ;
- `mode` : `"direct"` affiche **Acheter cette prestation**, `"quote"` affiche seulement **Demander un devis** ;
- les mentions **« À préciser »** sont affichées en évidence sur le site : remplacez-les avant publication ;
- `PRICES_VALIDATED = true` retire le badge « Tarifs à valider avant publication ».

Les prix ne mentionnent pas la TVA : le texte `vatNote` est à adapter selon votre statut.

### Photos
Les photos viennent d'**Unsplash** (licence Unsplash : usage commercial autorisé, attribution non obligatoire).
Elles sont servies par le CDN d'Unsplash en WebP/AVIF, à la bonne taille selon l'écran.

- Remplacer une photo : changez l'identifiant (`u("…")`) dans `src/config/images.ts`.
  L'identifiant est la partie après `photo-` dans une URL `images.unsplash.com/photo-…`.
- Utiliser vos propres photos : placez le fichier dans `public/photos/` (idéalement en `.webp`)
  et remplacez `src: u("…")` par `src: "/photos/mon-image.webp"`.
- Pensez à garder un texte alternatif (`alt`) descriptif.

### Coordonnées
`src/config/site.ts` → `whatsapp` (numéro au format international sans « + »), `email`, `legal`.
Toute information légale laissée à `null` s'affiche « [À compléter] ».

### Logo
Le logo final (concept « Connexion ») est utilisé depuis `public/brand/` :
`ln-digital-horizontal-inverse.svg` (en-tête et pied de page), `ln-digital-nom-seul-inverse.svg`
(grand logo du pied de page). Les favicons viennent de `branding/04-icones/web/`.

### Slogan
Slogan retenu : **« Connecter votre entreprise à ses clients. »** — il prolonge l'idée du symbole
« Connexion » (deux L reliés par la diagonale orange). Alternatives proposées :
- « Le digital, au service de votre croissance. »
- « Votre entreprise, mieux vue. Mieux choisie. »
- « Des solutions digitales claires, pensées pour votre activité. »

---

## 3. Ce qui fonctionne déjà / ce qui reste à configurer

| Élément | État |
|---|---|
| 10 pages + 4 pages de projets + page de commande | ✅ fonctionnelles |
| Menu responsive (ordinateur, tablette, mobile) | ✅ |
| Bouton WhatsApp (message prérempli) | ✅ ouvre `wa.me/32492082589` |
| Formulaire de devis : validation, erreurs, anti-spam | ✅ |
| Formulaire de devis : **envoi des e-mails** | ⚙️ à configurer (Resend) — sinon « mode démonstration » affiché |
| Parcours d'achat direct (4 étapes) | ✅ |
| **Paiement en ligne** | ⚙️ à configurer (Stripe) — sinon « mode démonstration », aucune commande enregistrée |
| Confirmation de commande | ✅ affichée **uniquement** si Stripe confirme le paiement |
| SEO : titres/descriptions uniques, sitemap.xml, robots.txt, données structurées, fil d'Ariane | ✅ |
| Pages légales | 📝 modèles à compléter et à faire relire |
| Nom de domaine, e-mail professionnel, statut juridique | 📝 à définir |

### 3.1 Recevoir les demandes de devis (Resend)
1. Créez un compte sur [resend.com](https://resend.com) et vérifiez votre nom de domaine (enregistrements DNS).
2. Créez une clé API.
3. Renseignez `RESEND_API_KEY`, `CONTACT_TO_EMAIL` et `CONTACT_FROM_EMAIL` (voir `.env.example`).
4. Redéployez. L'alerte « mode démonstration » disparaît et un message de confirmation ne s'affiche
   qu'après acceptation réelle de l'e-mail par Resend.

### 3.2 Activer le paiement en ligne (Stripe Checkout)
1. Créez un compte [Stripe](https://stripe.com), complétez les informations de l'entreprise.
2. Mode **test** d'abord : copiez la clé secrète `sk_test_…` dans `STRIPE_SECRET_KEY` et mettez `CHECKOUT_ENABLED=true`.
3. Dans Stripe → Développeurs → Webhooks, ajoutez l'URL `https://<votre-domaine>/api/stripe/webhook`,
   événement `checkout.session.completed`, puis copiez le secret dans `STRIPE_WEBHOOK_SECRET`.
   Chaque commande payée vous est alors notifiée par e-mail (si Resend est configuré).
4. Testez avec la carte de test Stripe `4242 4242 4242 4242`.
5. Validez prix, CGV et TVA, puis passez à la clé `sk_live_…`.

Aucune donnée de carte ne transite par le site : le paiement se fait sur la page sécurisée de Stripe.
Le montant est toujours calculé côté serveur à partir de `pricing.ts`.

### 3.3 Mise en ligne (Cloudflare Workers)
Le site est hébergé sur **Cloudflare Workers** grâce à l’adaptateur OpenNext (`@opennextjs/cloudflare`).
Le dépôt GitHub est relié à Cloudflare : **chaque envoi sur la branche `main` met le site à jour automatiquement.**

- `npm run build` : compilation complète pour Cloudflare (Next.js puis OpenNext) — c’est la commande utilisée par Cloudflare.
- `npm run build:next` puis `npm run start` : version de production classique sur votre PC (http://localhost:3000).
- `npm run preview` : test local dans le moteur de Cloudflare.
- Configuration : `wrangler.jsonc` (nom du worker, options) et `open-next.config.ts`.

Variables d’environnement (Resend, Stripe, `NEXT_PUBLIC_SITE_URL`…) : à renseigner dans le tableau de bord Cloudflare
(Workers & Pages → ln-digital-site → Settings → *Variables and secrets*, et *Build variables* pour celles qui commencent par `NEXT_PUBLIC_`).

---

## 4. Direction artistique et animations

Inspiration « carte-titre de cinéma » (fond sombre velours, titres serif ultra-légers, filets fins,
labels entre parenthèses, mots manuscrits), transposée sur la palette officielle :
violet profond (fond), blanc lavande (texte), violet digital (boutons), orange vibrant (accent rare),
lavande lumineuse (sections d'alternance). Aucun blanc pur.

Typographies (auto-hébergées par Next.js) : **Newsreader** 200 (titres), **Geist** (interface, cohérent
avec le logo), **Inter** (texte courant), **Caveat** (petites touches manuscrites).

Animations (`src/components/motion/`) :
- intro animée (une fois par session), transitions de page en rideau ;
- défilement fluide (Lenis), barre de progression, indicateur de chapitre ;
- titres révélés ligne par ligne, texte qui s'illumine au défilement, photos dévoilées + parallaxe ;
- plan « cinéma » qui s'ouvre en plein écran, services en défilement horizontal, méthode à photo fixe ;
- bandeaux défilants réactifs à la vitesse de défilement, aperçu photo qui suit la souris ;
- boutons magnétiques, cartes inclinables, curseur personnalisé, textes qui roulent au survol.

Les animations se déclarent par attributs (`data-split`, `data-reveal`, `data-img-reveal`, `data-parallax`,
`data-magnetic`…) — voir l'en-tête de `MotionRoot.tsx`.
**Accessibilité :** si l'utilisateur a activé « réduire les animations » dans son système, tout le contenu
s'affiche sans mouvement. Le curseur natif reste visible, la navigation fonctionne au clavier.

---

## 5. Structure

```
site/
├── public/                 favicons, logos (public/brand)
├── src/
│   ├── app/                pages (App Router) + API (contact, checkout, webhook Stripe)
│   ├── components/
│   │   ├── forms/          formulaire de devis, parcours de commande
│   │   ├── layout/         en-tête + menu, pied de page, WhatsApp, bandeau cookies
│   │   ├── motion/         moteur d'animation, préchargement, curseur, sections animées
│   │   ├── sections/       blocs réutilisables (en-têtes, cartes, CTA, pages légales)
│   │   ├── seo/            données structurées
│   │   └── ui/             boutons, photos, icônes, FAQ, bandeau défilant
│   ├── config/             ← contenus et réglages modifiables
│   └── lib/                liens, SEO, validation, intégrations serveur
└── .env.example            variables d'environnement à renseigner
```

---

## 6. Avant publication — liste de contrôle

- [ ] Valider les tarifs et compléter les « À préciser » (`pricing.ts`), puis `PRICES_VALIDATED = true`
- [ ] Compléter les informations légales (`site.ts` → `legal`) et faire relire les pages légales
- [ ] Définir le régime de TVA et adapter `vatNote`
- [ ] Créer l'adresse e-mail professionnelle (`NEXT_PUBLIC_CONTACT_EMAIL`)
- [ ] Configurer Resend (formulaire) et, si souhaité, Stripe (paiement)
- [ ] Définir `NEXT_PUBLIC_SITE_URL` avec le domaine définitif
- [ ] Remplacer progressivement les photos d'illustration par vos propres visuels si vous le souhaitez
