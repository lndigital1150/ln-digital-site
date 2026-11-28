import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Mise en forme minimale des textes de src/config :
 *   *mot*            → <em>mot</em> (italique des titres)
 *   [texte](/chemin) → lien interne souligné
 * Ne pas utiliser de lien dans un titre animé (data-split) : le découpage des lignes le masquerait
 * aux lecteurs d'écran.
 */
export function rich(text: string): ReactNode {
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*([^*]+)\*/g;
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      m[1] ? (
        <Link key={key++} href={m[2]} className="text-link">
          {m[1]}
        </Link>
      ) : (
        <em key={key++}>{m[3]}</em>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
