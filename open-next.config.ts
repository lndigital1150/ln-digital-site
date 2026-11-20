import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Le site n'utilise pas de revalidation (ISR) : les pages pré-générées au build
 * sont servies directement depuis les fichiers statiques de Cloudflare.
 * Pas besoin de bucket R2 ni de KV.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
