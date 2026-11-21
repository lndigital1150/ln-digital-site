"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { afterLoadIdle } from "@/lib/motion-state";

/*
 * Moteur d'animation (GSAP, ScrollTrigger, SplitText, Lenis), curseur et indicateurs de défilement :
 * téléchargés et exécutés seulement APRÈS le chargement de la page, quand le navigateur est inactif.
 * Ils n'affichent rien d'indispensable au premier écran (rideau de transition, curseur décoratif,
 * barre de progression) et ne bloquent donc plus le fil principal au démarrage (Total Blocking Time).
 * Le curseur personnalisé n'est même pas téléchargé sur les écrans tactiles.
 */
const MotionRoot = dynamic(() => import("./MotionRoot"), { ssr: false });
const Cursor = dynamic(() => import("./Cursor"), { ssr: false });
const ScrollUI = dynamic(() => import("./ScrollUI"), { ssr: false });

export default function LazyMotion() {
  const [ready, setReady] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    setFinePointer(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    return afterLoadIdle(() => setReady(true));
  }, []);

  if (!ready) return null;
  return (
    <>
      <ScrollUI />
      {finePointer && <Cursor />}
      <MotionRoot />
    </>
  );
}
