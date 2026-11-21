"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadMotion, prefersReducedMotion, isMotionPaused } from "@/lib/motion-state";

type Props = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  /** Pixels par seconde. */
  speed?: number;
  reverse?: boolean;
  /** Accélère et change de sens selon le défilement de la page. */
  scrollReactive?: boolean;
  label?: string;
};

/** Bandeau défilant infini. Le contenu est dupliqué pour une boucle sans couture. */
export default function Marquee({
  children,
  className = "marquee",
  trackClassName = "marquee__track",
  speed = 60,
  reverse,
  scrollReactive = true,
  label,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;
    // Largeur mise en cache (ResizeObserver) : aucune lecture de mise en page à chaque image
    let w = 0;
    const ro = new ResizeObserver(([entry]) => (w = entry.contentRect.width / 2));
    ro.observe(track);
    let x = 0;
    let dir = reverse ? 1 : -1;
    let boost = 0;
    let hovered = false;
    let dead = false;
    const cleanups: Array<() => void> = [() => ro.disconnect()];

    const tick = (_t: number, dt: number) => {
      if (isMotionPaused()) return; // pause demandée par le visiteur
      const factor = hovered ? 0.25 : 1;
      x += dir * (speed * factor + boost) * (dt / 1000);
      if (w > 0) {
        if (x <= -w) x += w;
        if (x > 0) x -= w;
      }
      track.style.transform = `translate3d(${x}px,0,0)`;
      boost *= 0.92;
    };

    // GSAP (horloge + vitesse de défilement) chargé à la demande, pas dans le JavaScript initial de la page
    loadMotion().then(({ gsap, ScrollTrigger }) => {
      if (dead) return;
      gsap.ticker.add(tick);
      cleanups.push(() => gsap.ticker.remove(tick));
      if (scrollReactive) {
        const st = ScrollTrigger.create({
          trigger: track,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = self.getVelocity();
            boost = Math.min(Math.abs(v) / 4, 900);
            dir = (reverse ? -1 : 1) * (v >= 0 ? -1 : 1) * 1;
          },
        });
        cleanups.push(() => st.kill());
      }
    });
    const enter = () => (hovered = true);
    const leave = () => (hovered = false);
    track.addEventListener("pointerenter", enter);
    track.addEventListener("pointerleave", leave);
    return () => {
      dead = true;
      cleanups.forEach((c) => c());
      track.removeEventListener("pointerenter", enter);
      track.removeEventListener("pointerleave", leave);
    };
  }, [speed, reverse, scrollReactive]);

  return (
    <div className={className} aria-label={label} role={label ? "marquee" : undefined}>
      <div ref={trackRef} className={trackClassName}>
        <div style={{ display: "flex" }}>{children}</div>
        <div style={{ display: "flex" }} aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}
