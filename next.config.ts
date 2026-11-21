import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // experimental.inlineCss a été testé : Next intègre alors le CSS DEUX fois dans le HTML (balise <style>
  // + données d'hydratation), soit +25 Ko gzip par page ; le premier affichage était plus lent. Non retenu.
  images: {
    // Les photos Unsplash sont servies par leur CDN (WebP/AVIF automatiques, redimensionnées).
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
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
