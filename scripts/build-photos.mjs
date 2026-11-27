/**
 * Génère les photos du site, hébergées localement dans public/photos (aucun appel à Unsplash à l'affichage).
 *
 * Pour chaque photo de src/config/images.ts :
 *   - <clé>-<largeur>.avif et <clé>-<largeur>.webp pour chaque largeur de PHOTO_WIDTHS ;
 *   - <clé>-og.jpg en 1200 × 630 (aperçu de partage sur les réseaux sociaux).
 *
 * Usage : npm run photos            (ne génère que les photos manquantes)
 *         npm run photos -- --force (régénère tout)
 * Source : photo d'origine sur Unsplash (licence Unsplash, usage commercial autorisé), téléchargée une fois.
 */
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, "public", "photos");
const force = process.argv.includes("--force");

// Lecture du registre (src/config/images.ts) : lignes « clé: p("identifiant", "texte alternatif") »
const registry = await readFile(path.join(root, "src", "config", "images.ts"), "utf8");
const photos = [...registry.matchAll(/^\s+(\w+): p\("([^"]+)",/gm)].map(([, key, id]) => ({ key, id }));
const widthsMatch = registry.match(/PHOTO_WIDTHS = \[([\d,\s]+)\]/);
if (!widthsMatch) throw new Error("PHOTO_WIDTHS introuvable dans images.ts");
const WIDTHS = widthsMatch[1].split(",").map((n) => Number(n.trim()));

const exists = (f) => access(f).then(() => true, () => false);

async function download(id) {
  const url = `https://images.unsplash.com/photo-${id}?fm=jpg&q=90&w=2400`;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      console.warn(`  tentative ${attempt} échouée (${e.message})`);
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
  throw new Error(`téléchargement impossible : ${id}`);
}

await mkdir(outDir, { recursive: true });
let done = 0;
for (const { key, id } of photos) {
  const targets = [
    ...WIDTHS.flatMap((w) => [`${key}-${w}.avif`, `${key}-${w}.webp`]),
    `${key}-og.jpg`,
  ];
  const missing = [];
  for (const t of targets) if (force || !(await exists(path.join(outDir, t)))) missing.push(t);
  if (missing.length === 0) continue;

  const src = await download(id);
  for (const w of WIDTHS) {
    const img = () => sharp(src).resize({ width: w, withoutEnlargement: true });
    // Vignettes (≤ 104 px) un peu plus nettes ; grandes photos plus compressées (qualité visuelle équivalente)
    const small = w <= 104;
    await writeFile(path.join(outDir, `${key}-${w}.avif`), await img().avif({ quality: small ? 55 : 50, effort: 4 }).toBuffer());
    await writeFile(path.join(outDir, `${key}-${w}.webp`), await img().webp({ quality: small ? 78 : 72, effort: 4 }).toBuffer());
  }
  await writeFile(
    path.join(outDir, `${key}-og.jpg`),
    await sharp(src).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 78, mozjpeg: true }).toBuffer(),
  );
  done++;
  console.log(`${key} ✓ (${done})`);
}
console.log(`Terminé : ${done} photo(s) générée(s), ${photos.length} au total.`);
