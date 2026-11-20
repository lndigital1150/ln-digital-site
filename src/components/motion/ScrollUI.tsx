"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/motion";

/** Barre de progression de lecture + indicateur de chapitre (« 03 / 08 — Méthode »). */
export default function ScrollUI() {
  const pathname = usePathname();
  const barRef = useRef<HTMLSpanElement>(null);
  const chapterBar = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [chapter, setChapter] = useState<{ index: number; total: number; label: string } | null>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setChapter(null);
    const onChapter = (e: Event) => {
      const d = (e as CustomEvent).detail as { index: number; total: number; label: string };
      setChapter(d);
    };
    window.addEventListener("ln:chapter", onChapter);
    return () => window.removeEventListener("ln:chapter", onChapter);
  }, [pathname]);

  useEffect(() => {
    if (!chapter) return;
    if (chapterBar.current) gsap.to(chapterBar.current, { scaleX: chapter.index / chapter.total, duration: 0.8 });
    if (labelRef.current) gsap.fromTo(labelRef.current, { yPercent: 100 }, { yPercent: 0, duration: 0.6 });
  }, [chapter]);

  return (
    <>
      <div className="progress" aria-hidden="true">
        <span ref={barRef} />
      </div>
      <div className="chapter" aria-hidden="true" style={{ opacity: chapter && !(pathname === "/" && chapter.index === 1) ? 1 : 0 }}>
        <span className="tabular">
          {String(chapter?.index ?? 0).padStart(2, "0")} / {String(chapter?.total ?? 0).padStart(2, "0")}
        </span>
        <span className="chapter__bar">
          <span ref={chapterBar} />
        </span>
        <span className="chapter__label">
          <span ref={labelRef}>{chapter?.label}</span>
        </span>
      </div>
    </>
  );
}
