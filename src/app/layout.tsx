import type { Metadata, Viewport } from "next";
import { Geist, Inter, Newsreader, Caveat } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { site } from "@/config/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HideOnHome from "@/components/layout/HideOnHome";
import { CookieBanner, WhatsAppFloat } from "@/components/layout/Floating";
import MotionRoot from "@/components/motion/MotionRoot";
import Preloader from "@/components/motion/Preloader";
import Cursor from "@/components/motion/Cursor";
import ScrollUI from "@/components/motion/ScrollUI";
import JsonLd from "@/components/seo/JsonLd";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", weight: ["400", "500", "600"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500"] });
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["200", "300"],
  style: ["normal", "italic"],
});
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", weight: ["400"] });

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

/* Script exécuté avant l'affichage : active les animations (sauf mouvement réduit)
   et saute l'intro si elle a déjà été vue dans la session. Filet de sécurité : si
   les animations ne démarrent pas, le contenu redevient visible après 4 s. */
const bootScript = `(function(){try{var d=document.documentElement;var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r){d.classList.add('js-motion');}if(r||sessionStorage.getItem('ln-intro')){d.classList.add('no-preloader');}if(localStorage.getItem('ln-pause-animations')==='1'){d.classList.add('motion-paused');}if(location.pathname==='/'){d.classList.add('is-home');}setTimeout(function(){if(!d.classList.contains('motion-ready')){d.classList.remove('js-motion');}},6000);}catch(e){}})();`;

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
        <Preloader />
        <Header />
        <main id="contenu" tabIndex={-1}>
          {children}
        </main>
        <HideOnHome>
          <Footer />
        </HideOnHome>
        <WhatsAppFloat />
        <CookieBanner />
        <ScrollUI />
        <Cursor />
        <MotionRoot />
      </body>
    </html>
  );
}
