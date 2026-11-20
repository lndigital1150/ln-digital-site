"use client";

import type Lenis from "lenis";

/*
 * État partagé des animations, SANS la bibliothèque GSAP.
 * Les composants présents sur toutes les pages (en-tête, accueil, bouton pause) importent ce fichier :
 * GSAP et Lenis ne font ainsi pas partie du JavaScript chargé avant le premier affichage.
 * Pour GSAP, utiliser loadMotion() (chargement différé) ou « @/lib/motion » dans les pages intérieures.
 */

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Charge GSAP (+ ScrollTrigger, SplitText) à la demande. Le module est mis en cache après le premier appel. */
export const loadMotion = () => import("./motion");

/*
 * Ancien signal « fin de l'écran d'intro ». L'écran de chargement (compteur 000 → 100) a été retiré :
 * il retardait l'affichage du contenu de plusieurs secondes (score de performance).
 * Le signal est conservé, déjà résolu, pour garder un seul point d'attente si on en remet un.
 */
export const introDone: Promise<void> = Promise.resolve();

/*
 * Pause des animations automatiques (fonds qui défilent, bandeaux) — WCAG 2.2.2.
 * Un seul état pour tout le site, mémorisé dans le navigateur, partagé par tous les boutons « Pause ».
 */
const PAUSE_KEY = "ln-pause-animations";
let motionPaused = false;
if (typeof window !== "undefined") {
  try {
    motionPaused = localStorage.getItem(PAUSE_KEY) === "1";
  } catch {}
}
export const isMotionPaused = () => motionPaused;
export const setMotionPaused = (value: boolean) => {
  motionPaused = value;
  try {
    if (value) localStorage.setItem(PAUSE_KEY, "1");
    else localStorage.removeItem(PAUSE_KEY);
  } catch {}
  document.documentElement.classList.toggle("motion-paused", value);
  window.dispatchEvent(new CustomEvent("ln:motion-pause", { detail: { paused: value } }));
};
/** Abonnement React-friendly : renvoie la fonction de désabonnement. */
export const onMotionPause = (cb: (paused: boolean) => void) => {
  const handler = (e: Event) => cb((e as CustomEvent).detail.paused);
  window.addEventListener("ln:motion-pause", handler);
  return () => window.removeEventListener("ln:motion-pause", handler);
};

/* Instance Lenis partagée (défilement fluide). */
let lenisInstance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => (lenisInstance = l);
export const getLenis = () => lenisInstance;

export const scrollToTarget = (target: string | HTMLElement | number, immediate = false) => {
  let y: number;
  if (typeof target === "number") y = target;
  else {
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    if (!el) return;
    y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 90);
  }
  const l = getLenis();
  if (l) l.scrollTo(y, { immediate, force: true });
  else window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
};
