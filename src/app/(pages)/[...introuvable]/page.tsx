import { notFound } from "next/navigation";

/**
 * Toute adresse inconnue arrive ici et affiche la page 404 du groupe (pages) — avec ses styles (pages.css).
 * Sans cette route, la page 404 serait celle de la racine, et ses styles seraient chargés par TOUTES les pages,
 * accueil compris.
 */
export default function PageIntrouvable() {
  notFound();
}
