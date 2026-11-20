"use client";

import dynamic from "next/dynamic";

/*
 * Moteur d'animation, curseur et indicateurs de défilement chargés APRÈS le premier affichage :
 * GSAP, ScrollTrigger, SplitText et Lenis ne retardent plus l'apparition de la page.
 * (Ils n'affichent rien d'indispensable : un rideau de transition, un curseur décoratif, une barre de progression.)
 */
const MotionRoot = dynamic(() => import("./MotionRoot"), { ssr: false });
const Cursor = dynamic(() => import("./Cursor"), { ssr: false });
const ScrollUI = dynamic(() => import("./ScrollUI"), { ssr: false });

export default function LazyMotion() {
  return (
    <>
      <ScrollUI />
      <Cursor />
      <MotionRoot />
    </>
  );
}
