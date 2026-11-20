import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Le site n'utilise pas de revalidation (ISR) : les pages pré-générées au build
 * sont servies directement depuis les fichiers statiques de Cloudflare.
 * Pas besoin de bucket R2 ni de KV.
 */
const config = defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});

/*
 * « npm run build » lance la compilation Cloudflare complète (c'est la commande
 * utilisée par défaut par Cloudflare). OpenNext lance lui-même la compilation
 * Next.js via « build:next » : sans cela, il rappellerait « npm run build » en boucle.
 */
export default { ...config, buildCommand: "npm run build:next" };
