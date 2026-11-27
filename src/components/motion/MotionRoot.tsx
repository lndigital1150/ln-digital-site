"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import {
  gsap,
  ScrollTrigger,
  SplitText,
  introDone,
  prefersReducedMotion,
  setLenis,
  getLenis,
  scrollToTarget,
} from "@/lib/motion";

/**
 * Moteur d'animation global :
 * - défilement fluide (Lenis) synchronisé avec GSAP ScrollTrigger ;
 * - transitions de page (rideau violet) ;
 * - animations déclaratives via attributs data-* :
 *   data-split        → titres révélés ligne par ligne
 *   data-scrub        → mots qui s'illuminent au défilement
 *   data-reveal       → apparition en fondu vers le haut
 *   data-stagger      → enfants apparaissant en cascade
 *   data-img-reveal   → photo dévoilée par un rideau (+ zoom arrière)
 *   data-parallax     → parallaxe de la photo (valeur = amplitude en %)
 *   data-speed        → déplacement vertical au défilement
 *   data-line         → filet qui se trace
 *   data-magnetic     → bouton magnétique
 *   data-tilt         → inclinaison 3D au survol
 *   data-chapter      → section signalée dans l'indicateur de chapitre
 */
/** Rend la main au navigateur entre deux lots de travail (scheduler.yield si disponible). */
const yieldToMain = () => {
  const sch = (globalThis as unknown as { scheduler?: { yield?: () => Promise<void> } }).scheduler;
  if (sch?.yield) return sch.yield();
  return new Promise<void>((r) => setTimeout(r, 0));
};

export default function MotionRoot() {
  const pathname = usePathname();
  const router = useRouter();
  const curtainRef = useRef<HTMLDivElement>(null);
  const navigating = useRef(false);
  const positions = useRef<Record<string, number>>({});
  const isPop = useRef(false);
  const firstRun = useRef(true);

  /* Lenis (défilement fluide à la molette) : inutile sur écran tactile, où il ne lisse pas le défilement */
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, touchMultiplier: 1.4 });
    setLenis(lenis);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis; // pratique pour le débogage
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Liens d'ancre internes (#...) → défilement fluide
    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!;
      if (id.length < 2) return;
      const el = document.querySelector<HTMLElement>(id);
      if (!el) return;
      e.preventDefault();
      scrollToTarget(el);
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onAnchor);

    return () => {
      document.removeEventListener("click", onAnchor);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  /* Transition de sortie : interception des liens internes */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // même page (ancre ou rechargement)
      e.preventDefault();
      if (navigating.current) return;
      navigating.current = true;
      positions.current[location.pathname] = window.scrollY;
      const curtain = curtainRef.current;
      if (!curtain) return router.push(url.pathname + url.search + url.hash);
      // Rideau court : la navigation ne doit pas sembler retardée
      gsap.fromTo(
        curtain,
        { scaleY: 0, transformOrigin: "bottom" },
        {
          scaleY: 1,
          duration: 0.38,
          ease: "expo.inOut",
          onComplete: () => router.push(url.pathname + url.search + url.hash),
        },
      );
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  /* Bouton Retour / Avancer : on retrouve la position de lecture de la page */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!navigating.current) positions.current[location.pathname] = window.scrollY;
      });
    };
    const onPop = () => (isPop.current = true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  /* À chaque page : remise en haut / ancre, rideau d'entrée, animations */
  useEffect(() => {
    let cancelled = false;
    let ctx: gsap.Context | null = null;
    const cleanups: Array<() => void> = [];
    const root = document.documentElement;

    // Accueil = écran d'entrée : pas de défilement (molette, clavier, tactile)
    const isHome = pathname === "/";
    root.classList.toggle("is-home", isHome);
    if (isHome) getLenis()?.stop();
    else getLenis()?.start();

    const hash = window.location.hash;
    const fromHistory = isPop.current;
    isPop.current = false;

    // Lecteurs d'écran / clavier : après un changement de page, le focus va au contenu principal
    const isFirst = firstRun.current;
    if (firstRun.current) firstRun.current = false;
    else document.getElementById("contenu")?.focus({ preventScroll: true });

    if (isFirst) {
      // Premier passage : ce moteur démarre après le chargement de la page (LazyMotion). Le navigateur a déjà
      // placé la page (ancre éventuelle comprise) et le visiteur a peut-être défilé : on ne touche à rien.
    } else if (fromHistory) {
      // Retour arrière : on restaure la position une fois la page mise en place
      const y = positions.current[window.location.pathname] ?? 0;
      getLenis()?.scrollTo(0, { immediate: true, force: true });
      introDone.then(() =>
        setTimeout(() => {
          ScrollTrigger.refresh();
          scrollToTarget(y, true);
        }, 120),
      );
    } else if (hash) {
      const jump = () => {
        const el = document.querySelector<HTMLElement>(decodeURIComponent(hash));
        if (el) scrollToTarget(el, true);
      };
      setTimeout(jump, 80);
      introDone.then(() => setTimeout(jump, 120));
    } else {
      getLenis()?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    }

    const curtain = curtainRef.current;
    if (curtain && navigating.current) {
      gsap.to(curtain, { scaleY: 0, transformOrigin: "top", duration: 0.6, ease: "expo.inOut", delay: 0.05 });
    }
    navigating.current = false;

    const run = async () => {
      await introDone;
      if (document.fonts?.ready) await document.fonts.ready;
      await new Promise((r) => requestAnimationFrame(() => r(null)));
      if (cancelled) return;

      if (prefersReducedMotion()) {
        root.classList.add("motion-ready");
        return;
      }

      /*
       * Initialisation découpée en petits lots (titres, mots, apparitions, photos…) séparés par une pause :
       * le navigateur reprend la main entre chaque lot, aucune tâche ne bloque le fil principal longtemps
       * (Total Blocking Time). Chaque lot est ajouté au même contexte GSAP (nettoyage groupé).
       */
      const context = gsap.context(() => {});
      ctx = context;
      const q = <T extends HTMLElement = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);
      const batch = async (fn: () => void) => {
        if (cancelled) return false;
        context.add(fn);
        await yieldToMain();
        return !cancelled;
      };

      if (!(await batch(() => {
        // Titres ligne par ligne
        q("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { visibility: "visible" });
              // Laisse de la place aux accents (À, É) et aux jambages au-dessus/au-dessous du masque
              gsap.set(self.masks, { paddingTop: "0.18em", marginTop: "-0.18em", paddingBottom: "0.12em", marginBottom: "-0.12em" });
              return gsap.from(self.lines, {
                yPercent: 110,
                rotate: 2,
                duration: 1.3,
                ease: "expo.out",
                stagger: 0.09,
                delay: parseFloat(el.dataset.delay || "0"),
                scrollTrigger: { trigger: el, start: "top 90%", once: true },
              });
            },
          });
        });

      }))) return;
      if (!(await batch(() => {
        // Mots qui s'illuminent
        q("[data-scrub]").forEach((el) => {
          // aria « none » : les mots restent du texte lisible normalement par les lecteurs d'écran
          // (pas d'aria-label ajouté sur un <p>, refusé par les contrôles d'accessibilité)
          const split = SplitText.create(el, { type: "words", aria: "none" });
          gsap.fromTo(
            split.words,
            // Opacité de départ 0,42 : contraste ≥ 3:1 même avant l'illumination (texte de grande taille, WCAG AA)
            { opacity: 0.42 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.08,
              scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 45%", scrub: true },
            },
          );
        });

      }))) return;
      if (!(await batch(() => {
        // Apparitions
        q("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              delay: parseFloat(el.dataset.delay || "0"),
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            },
          );
        });
        q("[data-stagger]").forEach((el) => {
          gsap.fromTo(
            el.children,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              stagger: 0.08,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });

      }))) return;
      if (!(await batch(() => {
        // Photos : rideau + zoom arrière
        q("[data-img-reveal]").forEach((el) => {
          const dir = el.dataset.imgReveal;
          const from =
            dir === "left" ? "inset(0% 100% 0% 0%)" : dir === "right" ? "inset(0% 0% 0% 100%)" : "inset(100% 0% 0% 0%)";
          const img = el.querySelector("img");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            delay: parseFloat(el.dataset.delay || "0"),
          });
          tl.fromTo(el, { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" });
          if (img) tl.fromTo(img, { scale: 1.35 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0.1);
        });

      }))) return;
      if (!(await batch(() => {
        // Parallaxe
        q("[data-parallax]").forEach((el) => {
          const amt = parseFloat(el.dataset.parallax || "10");
          const target = el.querySelector<HTMLElement>(".photo__inner") || el;
          gsap.fromTo(
            target,
            { yPercent: -amt },
            {
              yPercent: amt,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
        q("[data-speed]").forEach((el) => {
          const speed = parseFloat(el.dataset.speed || "0.2");
          gsap.to(el, {
            y: () => -speed * window.innerHeight * 0.5,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
          });
        });

        // Filets
        q("[data-line]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 95%", once: true } },
          );
        });

      }))) return;
      if (!(await batch(() => {
        // Chapitres
        const chapters = q("[data-chapter]");
        chapters.forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => {
              if (self.isActive)
                window.dispatchEvent(
                  new CustomEvent("ln:chapter", {
                    detail: { index: i + 1, total: chapters.length, label: el.dataset.chapter },
                  }),
                );
            },
          });
        });
        window.dispatchEvent(new CustomEvent("ln:chapters", { detail: { total: chapters.length } }));
      }))) return;

      // Interactions au pointeur (bureau uniquement)
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
          const strength = parseFloat(el.dataset.magnetic || "0.35");
          // Ressort discret : un léger rebond, pas un élastique (agence professionnelle, pas un jouet)
          const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "elastic.out(1, 0.75)" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "elastic.out(1, 0.75)" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * strength);
            yTo((e.clientY - (r.top + r.height / 2)) * strength);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
            gsap.set(el, { x: 0, y: 0 });
          });
        });

        document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
          const max = parseFloat(el.dataset.tilt || "6");
          gsap.set(el, { transformPerspective: 900 });
          const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
          const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            ry(px * max * 2);
            rx(-py * max * 2);
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });
      }

      root.classList.add("motion-ready");
      ScrollTrigger.refresh();
    };

    run().catch((err) => {
      // Une erreur d'animation ne doit jamais laisser du contenu masqué
      console.error("[animations]", err);
      root.classList.remove("js-motion");
    });

    // Recalcul après chargement des images
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      cleanups.forEach((c) => c());
      ctx?.revert();
    };
  }, [pathname]);

  return <div ref={curtainRef} className="curtain" aria-hidden="true" />;
}
