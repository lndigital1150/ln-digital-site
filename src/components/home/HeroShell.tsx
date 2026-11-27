"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
// GSAP n'est pas importé directement : il est chargé après la page, sur ordinateur seulement (loadMotion)
import {
  afterLoadIdle,
  loadMotion,
  prefersReducedMotion,
  isMotionPaused,
  setMotionPaused,
  onMotionPause,
} from "@/lib/motion-state";
import { photoFile, photoSrcSet, type PhotoKey } from "@/config/images";

export type ReelItem = {
  href: string;
  title: string;
  sub: string;
  image: PhotoKey;
};

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

/**
 * Photos de fond de l'accueil (22 % d'opacité) : rendues SANS adresse (data-srcset / data-src), puis leur
 * source est posée directement dans le DOM après le chargement de la page. Elles ne ralentissent pas le
 * premier affichage et leur arrivée ne provoque aucun nouveau rendu React. Fichiers locaux AVIF / WebP.
 */
function loadImg(img: HTMLImageElement | null | undefined) {
  if (!img || img.getAttribute("src") || !img.dataset.src) return;
  img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
  img.parentElement?.querySelectorAll<HTMLSourceElement>("source[data-srcset]").forEach((source) => {
    source.srcset = source.dataset.srcset!;
  });
  img.src = img.dataset.src;
}

/**
 * Îlot client du héros d'accueil : fond (diaporama), bandeau des services, pied (année, pause).
 * Le logo, les boutons et les liens légaux sont rendus côté serveur (HomeHero) et passés en props.
 */
export default function HeroShell({
  items,
  logo,
  ctas,
  legal,
}: {
  items: ReelItem[];
  logo: ReactNode;
  ctas: ReactNode;
  legal: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const hovering = useRef(false);
  const pageLoaded = useRef(false);
  const preloadNext = useRef(false);
  const yearRef = useRef<HTMLSpanElement>(null);

  // Photo affichée (et la suivante, 1,5 s après le chargement) : source posée directement dans le DOM
  const loadSlides = useCallback(
    (index: number) => {
      const slides = root.current?.querySelectorAll<HTMLImageElement>(".hero2__slide img");
      if (!slides || !pageLoaded.current) return;
      loadImg(slides[index]);
      if (preloadNext.current) loadImg(slides[(index + 1) % items.length]);
    },
    [items.length],
  );

  useEffect(() => {
    let t = 0;
    const go = () => {
      pageLoaded.current = true;
      loadSlides(0);
      t = window.setTimeout(() => {
        preloadNext.current = true;
        loadSlides(0);
      }, 1500);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      clearTimeout(t);
    };
  }, [loadSlides]);

  useEffect(() => loadSlides(active), [active, loadSlides]);

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

  // Compteur d'année et inclinaison du logo
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const year = new Date().getFullYear();
    if (yearRef.current) yearRef.current.textContent = String(year);
    if (prefersReducedMotion()) return;

    const cleanups: Array<() => void> = [];
    let dead = false;

    // L'intro (fond, logo, boutons, bandeau) est en CSS (globals.css) et démarre dès le premier affichage.
    // Compteur d'année façon « amorce de film » : boucle native requestAnimationFrame (pas de GSAP),
    // synchronisée sur l'animation CSS d'apparition de l'année (délai 1,2 s depuis le premier affichage).
    const appear = yearRef.current?.parentElement?.getAnimations?.()[0];
    const elapsed = typeof appear?.currentTime === "number" ? appear.currentTime : 0;
    // Page déjà affichée depuis longtemps (JS chargé tard) : on ne rejoue pas le compteur sous les yeux du visiteur
    if (elapsed <= 1600) {
      const from = year - 26;
      const start = performance.now() + Math.max(0, 1200 - elapsed);
      let raf = 0;
      let shown = -1;
      const step = (now: number) => {
        const t = Math.min(1, Math.max(0, (now - start) / 1600));
        const v = Math.round(from + (year - from) * (1 - (1 - t) ** 3)); // power3.out
        if (v !== shown && yearRef.current) yearRef.current.textContent = String((shown = v));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      cleanups.push(() => cancelAnimationFrame(raf));
    }

    // Inclinaison du logo et parallaxe du fond à la souris : ordinateur uniquement, GSAP chargé après la page
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      cleanups.push(
        afterLoadIdle(() =>
          loadMotion().then(({ gsap }) => {
            if (dead) return;
            const wm = el.querySelector(".hero2__tilt")!;
            const bg = el.querySelector(".hero2__parallax")!;
            gsap.set(wm, { transformPerspective: 1200 });
            const rx = gsap.quickTo(wm, "rotationX", {
              duration: 1,
              ease: "power3",
            });
            const ry = gsap.quickTo(wm, "rotationY", {
              duration: 1,
              ease: "power3",
            });
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
          }),
        ),
      );
    }

    return () => {
      dead = true;
      cleanups.forEach((c) => c());
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
              {/* Photo à 22 % d'opacité, assombrie et désaturée : une qualité basse suffit et allège fortement la page */}
              <picture>
                <source type="image/avif" sizes="100vw" data-srcset={photoSrcSet(it.image, "avif")} />
                <source type="image/webp" sizes="100vw" data-srcset={photoSrcSet(it.image, "webp")} />
                <img alt="" decoding="async" data-src={photoFile(it.image, 1080, "webp")} />
              </picture>
            </div>
          ))}
        </div>
      </div>
      <div className="hero2__overlay" aria-hidden="true" />
      <div className="hero2__grain" aria-hidden="true" />
      <div className="hero2__shade" aria-hidden="true" />

      {/* Logo géant + accroche (rendus côté serveur) */}
      <div className="hero2__center">
        {logo}
        {ctas}
      </div>

      {/* Bandeau des services façon générique de film */}
      <div className="hero2__reel" onPointerLeave={onReelLeave}>
        {/* Frontière Suspense : le bandeau (20 liens) est hydraté dans une tâche séparée du reste du héros */}
        <Suspense fallback={null}>
          <HeroReel items={items} active={active} onOver={onReelOver} paused={paused} />
        </Suspense>
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

      {legal}
    </section>
  );
}

/**
 * Bandeau infini : chaque service avec sa vignette ; le survol met le défilement au ralenti.
 * Défilement par la Web Animations API (translateX de -50 % sur deux copies identiques) : l'animation
 * tourne sur le compositeur, sans JavaScript à chaque image ni lecture de mise en page.
 */
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
  const anim = useRef<Animation | null>(null);
  const state = useRef({ paused, focused: false });
  state.current.paused = paused;

  const sync = useCallback(() => {
    const a = anim.current;
    if (!a) return;
    if (state.current.paused || state.current.focused) a.pause();
    else a.play();
  }, []);

  useEffect(() => {
    const t = track.current;
    if (!t || prefersReducedMotion() || typeof t.animate !== "function") return;
    const SPEED = 30; // px par seconde
    // Largeur fournie par le ResizeObserver (après la mise en page) : aucune lecture forcée
    const ro = new ResizeObserver(([entry]) => {
      const half = entry.contentRect.width / 2;
      if (half <= 0) return;
      const duration = (half / SPEED) * 1000;
      const a = anim.current;
      if (!a) {
        anim.current = t.animate([{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }], {
          duration,
          iterations: Infinity,
          easing: "linear",
        });
        sync();
      } else {
        // Nouvelle largeur : on garde la même position relative
        const timing = a.effect?.getComputedTiming();
        const progress = Number(timing?.progress ?? 0);
        a.effect?.updateTiming({ duration });
        a.currentTime = progress * duration;
      }
    });
    ro.observe(t);
    const slow = () => anim.current?.updatePlaybackRate(0.2); // 30 → 6 px/s au survol
    const normal = () => anim.current?.updatePlaybackRate(1);
    const focusIn = () => {
      state.current.focused = true;
      sync();
    };
    const focusOut = () => {
      state.current.focused = false;
      sync();
    };
    t.addEventListener("pointerenter", slow);
    t.addEventListener("pointerleave", normal);
    t.addEventListener("focusin", focusIn);
    t.addEventListener("focusout", focusOut);
    return () => {
      ro.disconnect();
      anim.current?.cancel();
      anim.current = null;
      t.removeEventListener("pointerenter", slow);
      t.removeEventListener("pointerleave", normal);
      t.removeEventListener("focusin", focusIn);
      t.removeEventListener("focusout", focusOut);
    };
  }, [sync]);

  // Bouton pause du héros ou du pied de page
  useEffect(sync, [paused, sync]);

  // Peu d'éléments (3 services + 3 démos) : la liste est répétée pour qu'une copie du bandeau soit toujours
  // plus large que l'écran, sinon un vide apparaîtrait à la jonction de la boucle sur grand écran.
  const repeat = Math.max(1, Math.ceil(12 / items.length));
  const loop = Array.from({ length: repeat }, () => items).flat();

  const row = (copy: boolean) =>
    loop.map((it, j) => {
      const i = j % items.length;
      // Seule la première occurrence de chaque lien est atteignable au clavier et lue par les lecteurs d'écran
      const duplicate = copy || j >= items.length;
      return (
        <Link
          key={`${copy ? "c" : "o"}-${j}`}
          href={it.href}
          // Pas de préchargement automatique : seuls les 2 boutons principaux de l'accueil préchargent
          prefetch={false}
          className={`reel2__item${i === active ? " is-active" : ""}`}
          onPointerEnter={() => onOver(i)}
          onFocus={() => onOver(i)}
          tabIndex={duplicate ? -1 : undefined}
          aria-hidden={duplicate || undefined}
        >
          <span className="reel2__thumb">
            {/* Vignette affichée en 52 px de large : fichiers locaux à la taille exacte (1x = 52 px, 2x = 104 px),
                AVIF sinon WebP, chargement différé natif */}
            <picture>
              <source
                type="image/avif"
                srcSet={`${photoFile(it.image, 52, "avif")} 1x, ${photoFile(it.image, 104, "avif")} 2x`}
              />
              <source
                type="image/webp"
                srcSet={`${photoFile(it.image, 52, "webp")} 1x, ${photoFile(it.image, 104, "webp")} 2x`}
              />
              <img
                src={photoFile(it.image, 104, "webp")}
                alt=""
                width={104}
                height={60}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </span>
          <span className="reel2__text">
            <span className="reel2__title">{it.title}</span>
            <span className="reel2__sub">{it.sub}</span>
          </span>
        </Link>
      );
    });

  return (
    <nav className="reel2" aria-label="Nos services">
      <div ref={track} className="reel2__track">
        {row(false)}
        {row(true)}
      </div>
    </nav>
  );
}
