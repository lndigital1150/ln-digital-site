"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  gsap,
  ScrollTrigger,
  introDone,
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
  // Photos de fond chargées au fil de l'eau (la photo affichée + la suivante), pas les 10 d'un coup
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0, 1]));
  const hovering = useRef(false);
  const yearRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setLoaded((prev) => {
      const next = (active + 1) % items.length;
      if (prev.has(active) && prev.has(next)) return prev;
      return new Set([...prev, active, next]);
    });
  }, [active, items.length]);

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

    let ctx: gsap.Context | null = null;
    let cancelled = false;
    const cleanups: Array<() => void> = [];

    introDone.then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(".hero2__bg", { scale: 1.25, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.4 }, 0)
          .fromTo(".wm__l1", { x: -140, opacity: 0 }, { x: 0, opacity: 1, duration: 1.4 }, 0.2)
          .fromTo(".wm__l2", { x: 140, opacity: 0 }, { x: 0, opacity: 1, duration: 1.4 }, 0.2)
          .fromTo(
            ".wm__diag",
            { scaleY: 0, opacity: 1, transformOrigin: "50% 0%" },
            { scaleY: 1, duration: 1.1, ease: "expo.inOut" },
            0.75,
          )
          .fromTo(".wm__clip", { attr: { width: 0 } }, { attr: { width: 700 }, duration: 1.6, ease: "expo.inOut" }, 0.9)
          .fromTo(".wm__name", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 1.6 }, 0.9)
          .fromTo(".hero2__cta", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.1 }, 1.6)
          .fromTo(".reel2", { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.4 }, 1.7)
          .fromTo(".hero2__foot > *", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 2);

        // Compteur d'année façon « amorce de film »
        const counter = { v: year - 26 };
        tl.to(
          counter,
          {
            v: year,
            duration: 1.6,
            ease: "power3.out",
            onUpdate: () => {
              if (yearRef.current) yearRef.current.textContent = String(Math.round(counter.v));
            },
          },
          2,
        );

      }, el);
    });

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

    return () => {
      cancelled = true;
      cleanups.forEach((c) => c());
      ctx?.revert();
    };
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
                // Photo à 22 % d'opacité et désaturée : une qualité basse suffit et allège fortement la page
                <Image src={photos[it.image].src} alt="" fill sizes="100vw" priority={i === 0} quality={40} />
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
    const tick = (_: number, dt: number) => {
      // À l'arrêt si l'utilisateur a mis en pause ou navigue au clavier dans le bandeau
      if (pausedRef.current || focused) return;
      const speed = (slow ? 6 : 30) + boost;
      x -= speed * (dt / 1000);
      const half = t.scrollWidth / 2;
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
          <Image src={photos[it.image].src} alt="" width={192} height={112} sizes="96px" />
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
