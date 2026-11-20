"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "expo.out" });
}

/*
 * GSAP + état partagé des animations.
 * Les composants chargés sur toutes les pages importent plutôt « @/lib/motion-state »
 * et appellent loadMotion() pour charger GSAP après le premier affichage.
 */
export { gsap, ScrollTrigger, SplitText };
export * from "./motion-state";
