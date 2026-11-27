"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { afterLoadIdle } from "@/lib/motion-state";

/*
 * Moteur d'animation (GSAP, ScrollTrigger, SplitText, Lenis), curseur et indicateurs de défilement :
 * téléchargés et exécutés seulement APRÈS le chargement de la page, quand le navigateur est inactif.
 * Ils n'affichent rien d'indispensable au premier écran (rideau de transition, curseur décoratif,
 * barre de progression) et ne bloquent donc plus le fil principal au démarrage (Total Blocking Time).
 * Le curseur personnalisé n'est même pas téléchargé sur les écrans tactiles.
 *
 * Sur mobile (écran tactile), l'accueil n'utilise aucune de ces animations : rien n'est chargé tant que le
 * visiteur reste sur l'accueil sans le toucher. Le moteur se charge au premier contact avec l'écran (avant
 * qu'il ouvre une page) ou dès qu'il arrive sur une page intérieure.
 */
const MotionRoot = dynamic(() => import("./MotionRoot"), { ssr: false });
const Cursor = dynamic(() => import("./Cursor"), { ssr: false });
const ScrollUI = dynamic(() => import("./ScrollUI"), { ssr: false });

export default function LazyMotion() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [wanted, setWanted] = useState(false); // tactile : premier contact ou page intérieure

  useEffect(() => {
    setFinePointer(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    return afterLoadIdle(() => setReady(true));
  }, []);

  // Tactile sur l'accueil : on attend le premier contact avec l'écran
  useEffect(() => {
    if (wanted) return;
    if (pathname !== "/") return setWanted(true);
    const want = () => setWanted(true);
    window.addEventListener("pointerdown", want, { once: true, passive: true });
    window.addEventListener("keydown", want, { once: true });
    return () => {
      window.removeEventListener("pointerdown", want);
      window.removeEventListener("keydown", want);
    };
  }, [pathname, wanted]);

  if (!ready || (!finePointer && !wanted)) return null;
  return (
    <>
      <ScrollUI />
      {finePointer && <Cursor />}
      <MotionRoot />
    </>
  );
}
