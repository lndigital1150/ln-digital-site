"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { loadMotion, prefersReducedMotion } from "@/lib/motion-state";
import { photos, type PhotoKey } from "@/config/images";

/**
 * Liste avec aperçu photo qui suit le pointeur au survol des lignes.
 * Chaque ligne enfant doit porter l'attribut data-preview-index="n".
 */
export default function HoverPreview({
  images,
  children,
  className,
}: {
  images: PhotoKey[];
  children: ReactNode;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = wrap.current;
    const b = box.current;
    if (
      !el ||
      !b ||
      prefersReducedMotion() ||
      !window.matchMedia("(hover: hover)").matches
    )
      return;
    // Souris uniquement, GSAP chargé à la demande
    let dead = false;
    let detach = () => {};
    loadMotion().then(({ gsap }) => {
      if (dead) return;
      const xTo = gsap.quickTo(b, "x", { duration: 0.7, ease: "power3" });
      const yTo = gsap.quickTo(b, "y", { duration: 0.7, ease: "power3" });
      const rTo = gsap.quickTo(b, "rotation", {
        duration: 0.9,
        ease: "power3",
      });
      let lastX = 0;
      const move = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        rTo(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
      };
      const over = (e: PointerEvent) => {
        const row = (e.target as HTMLElement).closest<HTMLElement>(
          "[data-preview-index]",
        );
        if (!row) return;
        if (gsap.getProperty(b, "opacity") === 0)
          gsap.set(b, { x: e.clientX, y: e.clientY });
        setActive(Number(row.dataset.previewIndex));
        gsap.to(b, { opacity: 1, scale: 1, duration: 0.45, ease: "expo.out" });
      };
      const leave = () => {
        setActive(-1);
        // Sortie plus rapide que l'entrée ; jamais depuis/vers une échelle trop petite
        gsap.to(b, {
          opacity: 0,
          scale: 0.88,
          duration: 0.25,
          ease: "expo.out",
        });
      };
      gsap.set(b, { xPercent: -50, yPercent: -50, scale: 0.88 });
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerover", over);
      el.addEventListener("pointerleave", leave);
      detach = () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerover", over);
        el.removeEventListener("pointerleave", leave);
      };
    });
    return () => {
      dead = true;
      detach();
    };
  }, []);

  return (
    <div ref={wrap} className={className}>
      {children}
      <div ref={box} className="hover-preview" aria-hidden="true">
        {images.map((k, i) => (
          <div
            key={k + i}
            className={`photo${i === active ? " is-active" : ""}`}
          >
            <Image src={photos[k].src} alt="" fill sizes="320px" />
          </div>
        ))}
      </div>
    </div>
  );
}
