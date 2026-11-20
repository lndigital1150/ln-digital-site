"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/** L'accueil est un écran d'entrée sans défilement : certains blocs (pied de page…) n'y apparaissent pas. */
export default function HideOnHome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return pathname === "/" ? null : <>{children}</>;
}
