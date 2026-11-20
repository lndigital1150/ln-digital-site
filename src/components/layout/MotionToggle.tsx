"use client";

import { useEffect, useState } from "react";
import { isMotionPaused, onMotionPause, setMotionPaused } from "@/lib/motion-state";

/** Bouton présent sur toutes les pages : met en pause les animations qui défilent seules (WCAG 2.2.2). */
export default function MotionToggle() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setPaused(isMotionPaused());
    return onMotionPause(setPaused);
  }, []);

  return (
    <button type="button" className="motion-toggle" aria-pressed={paused} onClick={() => setMotionPaused(!paused)}>
      {paused ? "Relancer les animations" : "Mettre les animations en pause"}
    </button>
  );
}
