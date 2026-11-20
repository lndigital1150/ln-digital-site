import type { Metadata, Viewport } from "next";
import { Geist, Inter, Newsreader, Caveat } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { site } from "@/config/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HideOnHome from "@/components/layout/HideOnHome";
import { CookieBanner, WhatsAppFloat } from "@/components/layout/Floating";
import LazyMotion from "@/components/motion/LazyMotion";
import JsonLd from "@/components/seo/JsonLd";

/* Seule Geist (boutons, interface) est préchargée : les autres polices se chargent quand une page en a
   besoin, sans bloquer le premier affichage (préchargées toutes ensemble, elles pesaient 250 Ko). */
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", weight: ["400", "500", "600"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500"], preload: false });
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["200", "300"],
  style: ["normal", "italic"],
  preload: false,
});
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", weight: ["400"], preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Agence de marketing digital à Bruxelles et en Wallonie`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#34205F",
  width: "device-width",
  initialScale: 1,
};

/* Script exécuté avant l'affichage : active les animations (sauf mouvement réduit), mémorise
   la pause des animations et masque le bandeau cookies si le choix a déjà été fait.
   Filet de sécurité : si les animations ne démarrent pas, le contenu redevient visible après 6 s. */
const bootScript = `(function(){try{var d=document.documentElement;var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r){d.classList.add('js-motion');}if(localStorage.getItem('ln-consent')){d.classList.add('has-consent');}if(localStorage.getItem('ln-pause-animations')==='1'){d.classList.add('motion-paused');}if(location.pathname==='/'){d.classList.add('is-home');}setTimeout(function(){if(!d.classList.contains('motion-ready')){d.classList.remove('js-motion');}},6000);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr-BE"
      className={`${geist.variable} ${inter.variable} ${newsreader.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <JsonLd />
      </head>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" tabIndex={-1}>
          {children}
        </main>
        <HideOnHome>
          <Footer />
        </HideOnHome>
        <WhatsAppFloat />
        <CookieBanner />
        <LazyMotion />
      </body>
    </html>
  );
}
