import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/Icons";
import { legalNav, site } from "@/config/site";
import { LOGO_PATHS, LOGO_VIEWBOX, NAME_TRANSFORM, SYMBOL_TRANSFORM } from "@/config/logo";
import HeroShell, { type ReelItem } from "./HeroShell";

/**
 * Héros de la page d'accueil — « carte-titre de cinéma » :
 * - fond plein écran : photos en fondu enchaîné avec lent zoom (effet Ken Burns), grain, vignette ;
 * - logo géant qui s'assemble (les deux L se rejoignent, la diagonale orange se trace, le nom se dévoile) ;
 * - bandeau défilant des services en bas : survoler un service change le fond ;
 * - compteur d'année ; logo d'origine qui flotte doucement, halo qui respire, inclinaison à la souris.
 * L'accueil ne défile pas : on entre dans le site par les boutons, le menu ou le bandeau.
 *
 * Server Component : le logo, les boutons et les liens légaux sont rendus côté serveur.
 * Seules les parties interactives (fond, bandeau, pause, année) sont dans l'îlot client HeroShell.
 */
export default function HomeHero({ items }: { items: ReelItem[] }) {
  const logo = (
    <div className="hero2__wm">
      {/* Flottement lent (CSS) + inclinaison à la souris (GSAP, ordinateur) : deux couches pour ne pas se gêner */}
      <div className="hero2__float">
        <div className="hero2__tilt">
          <svg className="wm" viewBox={LOGO_VIEWBOX} role="img" aria-label="LN Digital">
            <defs>
              <clipPath id="wm-clip">
                <rect className="wm__clip" x="0" y="-150" width="700" height="210" />
              </clipPath>
            </defs>
            {/* Logo d'origine (kit de marque, version inversée pour fond sombre) */}
            <g transform={SYMBOL_TRANSFORM}>
              <path className="wm__l1" fill="#F7F5FC" d={LOGO_PATHS.l1} />
              <path className="wm__l2" fill="#F7F5FC" d={LOGO_PATHS.l2} />
              <path className="wm__diag" fill="#FF8138" d={LOGO_PATHS.diag} />
            </g>
            <g transform={NAME_TRANSFORM} clipPath="url(#wm-clip)">
              <g className="wm__name">
                <path fill="#BBA5F5" d={LOGO_PATHS.ln} />
                <path fill="#F7F5FC" d={LOGO_PATHS.digital} />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );

  const ctas = (
    <div className="hero2__text">
      {/* Titre principal conservé pour le référencement et les lecteurs d'écran, sans affichage */}
      <h1 id="hero-title" className="sr-only">
        LN Digital — votre croissance mérite une stratégie digitale.
      </h1>
      <div className="hero2__ctas">
        {/* Pas de préchargement en arrière-plan : l'accueil ne télécharge aucune autre page au chargement
            (le préchargement appliquait aussi à l'accueil les préchargements de police et de photo de ces pages) */}
        <Link href="/contact#devis" className="hero2__cta hero2__cta--accent" data-magnetic="0.3" prefetch={false}>
          Demander un devis <ArrowUpRight className="hero2__cta-icon" />
        </Link>
        <Link href="/services" className="hero2__cta" data-magnetic="0.3" prefetch={false}>
          Découvrir nos services <ArrowUpRight className="hero2__cta-icon" />
        </Link>
      </div>
    </div>
  );

  const legal = (
    // Pas de pied de page sur l'accueil : les informations légales restent accessibles ici
    <nav className="hero2__legal" aria-label="Contact et informations légales">
      {/* Numéro de téléphone en clair, cliquable sur mobile */}
      <a href={`tel:${site.phone.tel}`} className="hero2__phone">
        Tél. {site.phone.display}
      </a>
      {legalNav.map((l) => (
        // Pas de préchargement automatique : seuls les 2 boutons principaux de l'accueil préchargent
        <Link key={l.href} href={l.href} prefetch={false}>
          {l.label}
        </Link>
      ))}
      <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
        Instagram
      </a>
    </nav>
  );

  return <HeroShell items={items} logo={logo} ctas={ctas} legal={legal} />;
}
