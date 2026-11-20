"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import Photo from "@/components/ui/Photo";
import type { PhotoKey } from "@/config/images";

type Step = { title: string; text: string; image: PhotoKey };

/** Méthode : la photo de gauche reste fixe et change à chaque étape. */
export default function MethodSteps({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setActive(0);
    }
    const triggers = Array.from(el.querySelectorAll<HTMLElement>(".step")).map((step, i) =>
      ScrollTrigger.create({
        trigger: step,
        start: "top 60%",
        end: "bottom 60%",
        onToggle: (self) => self.isActive && setActive(i),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div ref={ref} className="method">
      <div className="method__visual" aria-hidden="true">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className={`photo${i === active ? " is-active" : ""}${i < active ? " is-past" : ""}`}
            style={{ zIndex: i + 1 }}
          >
            <Photo name={s.image} sizes="(max-width: 1000px) 100vw, 50vw" className="photo--fill" alt="" />
          </div>
        ))}
        <span className="method__counter tabular">0{active + 1}</span>
      </div>
      <ol className="steps">
        {steps.map((s, i) => (
          <li key={s.title} className={`step${i === active ? " is-active" : ""}`}>
            <span className="step__num">Étape 0{i + 1}</span>
            <h3 className="h2">{s.title}</h3>
            <p>{s.text}</p>
            <Photo name={s.image} sizes="100vw" />
          </li>
        ))}
      </ol>
    </div>
  );
}
