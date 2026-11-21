/**
 * Héberge localement les photos d'en-tête des pages intérieures (élément LCP de ces pages).
 *
 * Pourquoi : servies par le CDN d'Unsplash, ces photos mettaient 1,7 à 2,6 s à arriver (variantes générées à
 * la demande, autre domaine à contacter). Servies par Cloudflare depuis le même domaine, en AVIF à la bonne
 * taille, elles s'affichent beaucoup plus vite.
 *
 * Usage : node scripts/local-hero-photos.mjs
 * Résultat : public/photos/hero/<clé>-<largeur>.avif (640, 828, 1080, 1440, 1920 px).
 * Le chargeur d'images (src/lib/image-loader.ts) choisit automatiquement la bonne largeur.
 * Pour changer une photo : modifiez l'identifiant ci-dessous, relancez le script, et gardez la même clé.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

// Clé (src/config/images.ts) → identifiant Unsplash (licence Unsplash, usage commercial autorisé)
const PHOTOS = {
  aboutTeam: "1521737604893-d14cc237f11d",
  aboutWorkshop: "1556761175-5973dc0f32e7",
  aboutStickies: "1552664730-d307ca884978",
  contactHandshake: "1521791136064-7986c2920216",
  pricingHero: "1563013544-824ae1b704d3",
  legalSign: "1450101499163-c8848c66ca85",
  legalBooks: "1505664194779-8beaceb93744",
  legalPrivacy: "1563986768494-4dee2763ff3f",
  legalPlan: "1542621334-a254cf47733d",
};
export const WIDTHS = [640, 828, 1080, 1440, 1920];

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, "public", "photos", "hero");
await mkdir(outDir, { recursive: true });

for (const [key, id] of Object.entries(PHOTOS)) {
  const url = `https://images.unsplash.com/photo-${id}?fm=jpg&q=90&w=2400`;
  let buf;
  for (let attempt = 1; attempt <= 3 && !buf; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      buf = Buffer.from(await res.arrayBuffer());
    } catch (e) {
      console.warn(`${key} : tentative ${attempt} échouée (${e.message})`);
    }
  }
  if (!buf) throw new Error(`Impossible de télécharger ${key}`);
  for (const w of WIDTHS) {
    const file = path.join(outDir, `${key}-${w}.avif`);
    const out = await sharp(buf).resize({ width: w, withoutEnlargement: true }).avif({ quality: 50, effort: 6 }).toBuffer();
    await writeFile(file, out);
    console.log(`${key}-${w}.avif  ${Math.round(out.length / 1024)} Ko`);
  }
}
