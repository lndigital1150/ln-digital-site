import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // experimental.inlineCss a été testé : Next intègre alors le CSS DEUX fois dans le HTML (balise <style>
  // + données d'hydratation), soit +25 Ko gzip par page ; le premier affichage était plus lent. Non retenu.
  // Photos : fichiers locaux pré-générés (public/photos, AVIF + WebP, « npm run photos ») affichés par le
  // composant Picture — next/image et son chargeur ne sont plus utilisés.
  // Une seule adresse officielle : https://lndigital.be. Les autres adresses qui servent le même site
  // (www, ancienne adresse workers.dev, http) redirigent en 301 vers la même page sur lndigital.be,
  // pour éviter le contenu dupliqué dans Google.
  async redirects() {
    type Condition = { type: "host"; value: string } | { type: "header"; key: string; value: string };
    const toApex = (has: Condition[]) => ({
      source: "/:path*",
      has,
      destination: "https://lndigital.be/:path*",
      statusCode: 301 as const,
    });
    return [
      toApex([{ type: "host", value: "www.lndigital.be" }]),
      toApex([{ type: "host", value: "ln-digital-site.lndigital1150.workers.dev" }]),
      // Visite en http : Cloudflare l'indique dans l'en-tête CF-Visitor ({"scheme":"http"}).
      toApex([{ type: "header", key: "cf-visitor", value: '.*"scheme":"http".*' }]),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
