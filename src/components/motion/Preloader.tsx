"use client";

import { useEffect, useRef } from "react";
import { gsap, markIntroDone, prefersReducedMotion } from "@/lib/motion";

/** Écran d'introduction (une fois par session) : compteur 0 → 100 puis lever de rideau. */
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const html = document.documentElement;
    if (!el || html.classList.contains("no-preloader") || prefersReducedMotion()) {
      if (el) el.style.display = "none";
      markIntroDone();
      return;
    }
    try {
      sessionStorage.setItem("ln-intro", "1");
    } catch {}

    const counter = { v: 0 };
    const tl = gsap.timeline();
    tl.from(el.querySelectorAll(".preloader__logo path"), {
      yPercent: 100,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "expo.out",
    })
      .to(
        counter,
        {
          v: 100,
          duration: 1.5,
          ease: "power3.inOut",
          onUpdate: () => {
            if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        },
        0.1,
      )
      .to(lineRef.current, { scaleX: 1, duration: 1.5, ease: "power3.inOut" }, 0.1)
      .add(() => markIntroDone(), "-=0.1")
      .to(el.querySelector(".preloader__inner"), { yPercent: -30, opacity: 0, duration: 0.6, ease: "power3.inOut" })
      .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, "-=0.35")
      .add(() => { el.style.display = "none"; });

    return () => {
      tl.kill();
      markIntroDone();
    };
  }, []);

  return (
    <div ref={ref} className="preloader" aria-hidden="true">
      <div className="preloader__inner">
        <svg className="preloader__logo" viewBox="0 0 256 256" aria-hidden="true">
          <path fill="#F7F5FC" d="M24 28H64V190H107V228H24Z M232 228H192V66H149V28H232Z" />
          <path fill="#FF8138" d="M81.53 28H120.87L174.47 228H135.13Z" />
        </svg>
        <span ref={countRef} className="preloader__count tabular">000</span>
        <span className="preloader__line">
          <span ref={lineRef} />
        </span>
        <span className="preloader__caption">Agence de marketing digital — Bruxelles · Wallonie</span>
      </div>
    </div>
  );
}
