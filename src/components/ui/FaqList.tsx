"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { loadMotion, prefersReducedMotion } from "@/lib/motion-state";
import type { Faq } from "@/config/faq";
import { PlusIcon } from "./Icons";
import { rich } from "./RichText";

/** Questions fréquentes en accordéon accessible (boutons aria-expanded + panneaux animés). */
export default function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const first = useRef(true);

  useLayoutEffect(() => {
    // État initial posé directement (avant l'affichage, sans GSAP)
    if (first.current) {
      first.current = false;
      panels.current.forEach((p, i) => {
        if (!p) return;
        p.style.height = i === open ? "auto" : "0px";
        p.style.visibility = i === open ? "visible" : "hidden";
      });
      return;
    }
    // Ensuite : GSAP chargé à la demande (déjà en cache après le démarrage du moteur d'animation)
    let dead = false;
    loadMotion().then(({ gsap }) => {
      if (dead) return;
      const dur = prefersReducedMotion() ? 0 : 0.42; // ouverture ; la fermeture est plus rapide (× 0.7)
      panels.current.forEach((p, i) => {
        if (!p) return;
        if (i === open) {
          gsap.set(p, { visibility: "visible" });
          gsap.fromTo(p, { height: p.offsetHeight }, { height: "auto", duration: dur, ease: "expo.out" });
        } else if (p.offsetHeight > 0) {
          gsap.to(p, {
            height: 0,
            duration: dur * 0.7,
            ease: "expo.out",
            onComplete: () => gsap.set(p, { visibility: "hidden" }),
          });
        }
      });
    });
    return () => {
      dead = true;
    };
  }, [open]);

  return (
    <div className="faq">
      {items.map((item, i) => {
        const qid = `${id}-q${i}`;
        const aid = `${id}-a${i}`;
        return (
          <div key={item.q} className="faq__item">
            <h3>
              <button
                id={qid}
                type="button"
                className="faq__q"
                aria-expanded={open === i}
                aria-controls={aid}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {item.q}
                <span className="faq__icon" aria-hidden="true">
                  <PlusIcon />
                </span>
              </button>
            </h3>
            <div
              id={aid}
              role="region"
              aria-labelledby={qid}
              className="faq__a"
              ref={(el) => {
                panels.current[i] = el;
              }}
            >
              <p>{rich(item.a)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
