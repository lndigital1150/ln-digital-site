"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "expo.out" });
}

export { gsap, ScrollTrigger, SplitText };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Fin de l'intro (préchargement) : les animations du haut de page attendent ce signal. */
let resolveIntro: (() => void) | null = null;
export const introDone: Promise<void> =
  typeof window === "undefined" ? Promise.resolve() : new Promise<void>((r) => (resolveIntro = r));
export const markIntroDone = () => {
  resolveIntro?.();
  resolveIntro = null;
};

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
