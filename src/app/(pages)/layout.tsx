import "./pages.css";

/**
 * Groupe de routes « (pages) » : toutes les pages intérieures (Services, Tarifs, Réalisations, À propos,
 * Contact, pages légales, commande). Les parenthèses n'apparaissent pas dans les URL.
 * Seul rôle de ce layout : charger pages.css, les styles propres à ces pages, pour que l'accueil
 * ne télécharge que les siens (globals.css).
 */
export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
