"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
  isMotionPaused,
  setMotionPaused,
  onMotionPause,
} from "@/lib/motion";
import { photos, type PhotoKey } from "@/config/images";
import { ArrowUpRight } from "@/components/ui/Icons";
import { legalNav, site } from "@/config/site";
import { LOGO_PATHS, LOGO_VIEWBOX, NAME_TRANSFORM, SYMBOL_TRANSFORM } from "@/config/logo";



const PauseIcon = () => (
  <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
    <path fill="currentColor" d="M2 1h3v10H2zM7 1h3v10H7z" />
  </svg>
);
const PlayIcon = () => (
  <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
    <path fill="currentColor" d="M2.5 1l8 5-8 5z" />
  </svg>
);

type ReelItem = { href: string; title: string; sub: string; image: PhotoKey };

/**
 * Héros de la page d'accueil — « carte-titre de cinéma » :
 * - fond plein écran : photos en fondu enchaîné avec lent zoom (effet Ken Burns), grain, vignette ;
 * - logo géant qui s'assemble (les deux L se rejoignent, la diagonale orange se trace, le nom se dévoile) ;
 * - bandeau défilant des services en bas : survoler un service change le fond ;
 * - compteur d'année ; logo d'origine qui flotte doucement, halo qui respire, inclinaison à la souris.
 * L'accueil ne défile pas : on entre dans le site par les boutons, le menu ou le bandeau.
 */
export default function HomeHero({ items }: { items: ReelItem[] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Photos de fond chargées au fil de l'eau (la photo affichée + la suivante), pas les 10 d'un coup.
  // Au démarrage, seule la première : la suivante attend la fin du chargement de la page.
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));
  const [ready, setReady] = useState(false);
  const hovering = useRef(false);
  const yearRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let t = 0;
    const go = () => (t = window.setTimeout(() => setReady(true), 1500));
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    setLoaded((prev) => {
      // La photo affichée toujours ; la suivante seulement une fois la page chargée
      const wanted = ready ? [active, (active + 1) % items.length] : [active];
      if (wanted.every((i) => prev.has(i))) return prev;
      return new Set([...prev, ...wanted]);
    });
  }, [active, items.length, ready]);

  // Pause partagée avec tout le site (bouton du pied de page) ; mouvement réduit du système = immobile
  useEffect(() => {
    setPaused(prefersReducedMotion() || isMotionPaused());
    return onMotionPause(setPaused);
  }, []);

  // Défilement automatique des fonds (en pause au survol du bandeau, sur demande ou onglet masqué)
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      if (!hovering.current && !document.hidden) setActive((a) => (a + 1) % items.length);
    }, 5200);
    return () => clearInterval(id);
  }, [items.length, paused]);

  // Intro et parallaxe du fond à la souris
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const year = new Date().getFullYear();
    if (yearRef.current) yearRef.current.textContent = String(year);
    if (prefersReducedMotion()) return;

    const cleanups: Array<() => void> = [];

    // L'intro (fond, logo, boutons, bandeau) est en CSS (globals.css) et démarre dès le premier affichage.
    // Seul le compteur d'année façon « amorce de film » reste en JS ; il se termine quand le pied apparaît.
    const counter = { v: year - 26 };
    // Synchronisé sur l'animation CSS d'apparition de l'année (délai 1,2 s depuis le premier affichage)
    const appear = yearRef.current?.parentElement?.getAnimations?.()[0];
    const elapsed = typeof appear?.currentTime === "number" ? appear.currentTime : 0;
    // Page déjà affichée depuis longtemps (JS chargé tard) : on ne rejoue pas le compteur sous les yeux du visiteur
    if (elapsed <= 1600) {
      const tween = gsap.to(counter, {
        v: year,
        duration: 1.6,
        ease: "power3.out",
        delay: Math.max(0, (1200 - elapsed) / 1000),
        onUpdate: () => {
          if (yearRef.current) yearRef.current.textContent = String(Math.round(counter.v));
        },
      });
      cleanups.push(() => tween.kill());
    }

    // Inclinaison du logo et parallaxe du fond à la souris
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const wm = el.querySelector(".hero2__tilt")!;
      const bg = el.querySelector(".hero2__parallax")!;
      gsap.set(wm, { transformPerspective: 1200 });
      const rx = gsap.quickTo(wm, "rotationX", { duration: 1, ease: "power3" });
      const ry = gsap.quickTo(wm, "rotationY", { duration: 1, ease: "power3" });
      const bx = gsap.quickTo(bg, "x", { duration: 1.4, ease: "power3" });
      const by = gsap.quickTo(bg, "y", { duration: 1.4, ease: "power3" });
      const move = (e: PointerEvent) => {
        const px = e.clientX / window.innerWidth - 0.5;
        const py = e.clientY / window.innerHeight - 0.5;
        ry(px * 14);
        rx(-py * 10);
        bx(-px * 36);
        by(-py * 24);
      };
      el.addEventListener("pointermove", move);
      cleanups.push(() => el.removeEventListener("pointermove", move));
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  const onReelOver = useCallback((i: number) => {
    hovering.current = true;
    setActive(i);
  }, []);
  const onReelLeave = useCallback(() => {
    hovering.current = false;
  }, []);

  return (
    <section
      ref={root}
      className={`hero2${paused ? " is-paused" : ""}`}
      data-chapter="Accueil"
      aria-labelledby="hero-title"
    >
      {/* Fond cinéma */}
      <div className="hero2__bg" aria-hidden="true">
        <div className="hero2__parallax">
          {items.map((it, i) => (
            <div key={it.href} className={`hero2__slide${i === active ? " is-active" : ""}`}>
              {loaded.has(i) && (
                // Photo à 22 % d'opacité, assombrie et désaturée : une qualité basse suffit et allège fortement la page
                <Image src={photos[it.image].src} alt="" fill sizes="100vw" priority={i === 0} quality={25} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="hero2__overlay" aria-hidden="true" />
      <div className="hero2__grain" aria-hidden="true" />
      <div className="hero2__shade" aria-hidden="true" />

      {/* Logo géant + accroche */}
      <div className="hero2__center">
        <div className="hero2__wm">
          {/* Flottement lent (CSS) + inclinaison à la souris (GSAP) : deux couches pour ne pas se gêner */}
          <div className="hero2__float">
            <div className="hero2__tilt">
              <svg className="wm" viewBox={LOGO_VIEWBOX} role="img" aria-label="LN Digital">
                <defs>
                  <clipPath id="wm-clip">
                    <rect className="wm__clip" x="0" y="-150" width="700" height="210" />
                  </clipPath>
                </defs>
                {/* Logo d'origine (kit de marque, version inversée pour fond sombre) */}
                <g transform={SYMBOL_TRANSFORM}>
                  <path className="wm__l1" fill="#F7F5FC" d={LOGO_PATHS.l1} />
                  <path className="wm__l2" fill="#F7F5FC" d={LOGO_PATHS.l2} />
                  <path className="wm__diag" fill="#FF8138" d={LOGO_PATHS.diag} />
                </g>
                <g transform={NAME_TRANSFORM} clipPath="url(#wm-clip)">
                  <g className="wm__name">
                    <path fill="#BBA5F5" d={LOGO_PATHS.ln} />
                    <path fill="#F7F5FC" d={LOGO_PATHS.digital} />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>

        <div className="hero2__text">
          {/* Titre principal conservé pour le référencement et les lecteurs d'écran, sans affichage */}
          <h1 id="hero-title" className="sr-only">
            LN Digital — votre croissance mérite une stratégie digitale.
          </h1>
          <div className="hero2__ctas">
            <Link href="/contact#devis" className="hero2__cta hero2__cta--accent" data-magnetic="0.3">
              Demander un devis <ArrowUpRight className="hero2__cta-icon" />
            </Link>
            <Link href="/services" className="hero2__cta" data-magnetic="0.3">
              Découvrir nos services <ArrowUpRight className="hero2__cta-icon" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bandeau des services façon générique de film */}
      <div className="hero2__reel" onPointerLeave={onReelLeave}>
        <HeroReel items={items} active={active} onOver={onReelOver} paused={paused} />
      </div>

      <div className="hero2__foot">
        <span className="label">Bruxelles · Wallonie</span>
        <span className="hero2__year tabular" aria-label="Année en cours">
          <span ref={yearRef}>2026</span>
          <i aria-hidden="true" />
        </span>
        {/* Tout contenu qui bouge seul plus de 5 s doit pouvoir être mis en pause (WCAG 2.2.2) */}
        <button
          type="button"
          className="hero2__pause label"
          aria-pressed={paused}
          onClick={() => setMotionPaused(!paused)}
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
          {paused ? "Lecture" : "Pause"}
          <span className="sr-only"> des animations d&apos;arrière-plan</span>
        </button>
      </div>

      {/* Pas de pied de page sur l'accueil : les informations légales restent accessibles ici */}
      <nav className="hero2__legal" aria-label="Informations légales">
        {legalNav.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
        <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </nav>
    </section>
  );
}

/** Bandeau infini : chaque service avec sa vignette ; le survol met le défilement au ralenti. */
function HeroReel({
  items,
  active,
  onOver,
  paused,
}: {
  items: ReelItem[];
  active: number;
  onOver: (i: number) => void;
  paused: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const t = track.current;
    if (!t || prefersReducedMotion()) return;
    let x = 0;
    let slow = false;
    let focused = false;
    let boost = 0;
    // Largeur mesurée une fois (puis au redimensionnement), pas à chaque image : évite un recalcul de mise en page forcé
    let half = t.scrollWidth / 2;
    const ro = new ResizeObserver(() => (half = t.scrollWidth / 2));
    ro.observe(t);
    const tick = (_: number, dt: number) => {
      // À l'arrêt si l'utilisateur a mis en pause ou navigue au clavier dans le bandeau
      if (pausedRef.current || focused) return;
      const speed = (slow ? 6 : 30) + boost;
      x -= speed * (dt / 1000);
      if (half > 0 && x <= -half) x += half;
      t.style.transform = `translate3d(${x}px,0,0)`;
      boost *= 0.9;
    };
    gsap.ticker.add(tick);
    const st = ScrollTrigger.create({
      trigger: t,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (s) => (boost = Math.min(Math.abs(s.getVelocity()) / 5, 700)),
    });
    const enter = () => (slow = true);
    const leave = () => (slow = false);
    const focusIn = () => (focused = true);
    const focusOut = () => (focused = false);
    t.addEventListener("pointerenter", enter);
    t.addEventListener("pointerleave", leave);
    t.addEventListener("focusin", focusIn);
    t.addEventListener("focusout", focusOut);
    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      st.kill();
      t.removeEventListener("pointerenter", enter);
      t.removeEventListener("pointerleave", leave);
      t.removeEventListener("focusin", focusIn);
      t.removeEventListener("focusout", focusOut);
    };
  }, []);

  const row = (copy: boolean) =>
    items.map((it, i) => (
      <Link
        key={`${copy ? "c" : "o"}-${it.href}`}
        href={it.href}
        className={`reel2__item${i === active ? " is-active" : ""}`}
        onPointerEnter={() => onOver(i)}
        onFocus={() => onOver(i)}
        tabIndex={copy ? -1 : undefined}
        aria-hidden={copy || undefined}
      >
        <span className="reel2__thumb">
          {/* Vignette affichée en 52 × 30 px : on demande la bonne taille et une compression plus forte */}
          <Image src={photos[it.image].src} alt="" width={104} height={60} sizes="52px" quality={50} />
        </span>
        <span className="reel2__text">
          <span className="reel2__title">{it.title}</span>
          <span className="reel2__sub">{it.sub}</span>
        </span>
      </Link>
    ));

  return (
    <nav className="reel2" aria-label="Nos services">
      <div ref={track} className="reel2__track">
        {row(false)}
        {row(true)}
      </div>
    </nav>
  );
}
