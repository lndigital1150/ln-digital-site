import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // experimental.inlineCss a été testé : Next intègre alors le CSS DEUX fois dans le HTML (balise <style>
  // + données d'hydratation), soit +25 Ko gzip par page ; le premier affichage était plus lent. Non retenu.
  // Photos : fichiers locaux pré-générés (public/photos, AVIF + WebP, « npm run photos ») affichés par le
  // composant Picture — next/image et son chargeur ne sont plus utilisés.
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
