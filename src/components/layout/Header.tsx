"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/config/site";
import { photos, type PhotoKey } from "@/config/images";
import { getLenis, loadMotion, prefersReducedMotion } from "@/lib/motion-state";
import { whatsappUrl } from "@/lib/links";
import Button from "@/components/ui/Button";

const menuImages: PhotoKey[] = ["heroMain", "web", "pricingHero", "gardenPath", "aboutTeam", "contactHandshake"];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Menu « en sommeil » (display: none) tant que personne ne s'en approche : ses polices et photos
  // ne sont pas téléchargées au premier affichage. Il se prépare dès le survol ou le focus du bouton.
  const [armed, setArmed] = useState(false);
  const arm = () => setArmed(true);
  const [active, setActive] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Masquer au défilement vers le bas, réafficher vers le haut
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const h = headerRef.current;
      if (!h) return;
      // Sur l'accueil, tant que le héros est visible : en-tête minimal (symbole + MENU)
      const onHero = pathname === "/" && y < window.innerHeight * 0.85;
      // Menu ouvert : en-tête minimal aussi, pour que le bouton « Fermer » reste visible sur grand écran
      h.classList.toggle("header--hero", onHero || open);
      h.classList.toggle("is-scrolled", y > 40 && !onHero);
      if (!open) h.classList.toggle("is-hidden", y > last && y > 300 && !onHero);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, pathname]);

  // Animation du menu (GSAP chargé après le premier affichage)
  const openRef = useRef(open);
  openRef.current = open;
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    let dead = false;
    loadMotion().then(({ gsap }) => {
      if (dead) return;
      buildTimeline(gsap, menu);
      // Menu ouvert avant la fin du chargement : on joue l'ouverture maintenant
      if (openRef.current) tl.current?.play();
    });
    return () => {
      dead = true;
      tl.current?.kill();
    };
  }, []);

  const buildTimeline = (gsap: typeof import("gsap").gsap, menu: HTMLDivElement) => {
    const reduce = prefersReducedMotion();
    tl.current = gsap
      .timeline({ paused: true })
      .set(menu, { visibility: "visible" })
      .fromTo(
        menu,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: reduce ? 0 : 0.7, ease: "expo.inOut" },
      )
      .fromTo(
        menu.querySelectorAll(".menu__link"),
        { yPercent: 110 },
        { yPercent: 0, duration: reduce ? 0 : 0.8, stagger: 0.05, ease: "expo.out" },
        "-=0.35",
      )
      .fromTo(
        menu.querySelector(".menu__preview"),
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: reduce ? 0 : 1 },
        "<",
      )
      .fromTo(menu.querySelector(".menu__foot"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: reduce ? 0 : 0.8 }, "<0.2");
  };

  const firstOpenEffect = useRef(true);
  useEffect(() => {
    if (firstOpenEffect.current) {
      firstOpenEffect.current = false;
      if (!open) return; // premier rendu, menu fermé : rien à faire
    }
    const t = tl.current;
    if (open) {
      t?.timeScale(1).play();
      getLenis()?.stop();
      document.body.style.overflow = "hidden";
      setTimeout(() => menuRef.current?.querySelector<HTMLAnchorElement>(".menu__link")?.focus(), 400);
    } else {
      t?.timeScale(2).reverse(); // fermeture plus rapide que l'ouverture
      if (window.location.pathname !== "/") getLenis()?.start(); // l'accueil ne défile jamais
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Action au clavier : fermeture immédiate, sans animation
        tl.current?.pause(0);
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const f = menuRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = triggerRef.current!;
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header ref={headerRef} className={`header${pathname === "/" ? " header--hero" : ""}`}>
        <div className="container header__inner">
          <Link href="/" className="header__logo" aria-label={`${site.name} — accueil`}>
            {/* Emplacement du logo : fichier public/brand/ln-digital-horizontal-inverse.svg */}
            <img
              className="header__full"
              src="/brand/ln-digital-horizontal-inverse.svg"
              alt={site.name}
              width={123}
              height={26}
            />
            <img className="header__mono" src="/brand/ln-digital-monogramme-inverse.svg" alt="" width={30} height={30} />
          </Link>

          <nav className="header__nav" aria-label="Navigation principale">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                    <span className="roll">
                      <span>{item.label}</span>
                      <span aria-hidden="true">{item.label}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <Button href="/contact#devis" variant="accent" size="small" className="header__cta" magnetic={false}>
              Demander un devis
            </Button>
            <button
              ref={triggerRef}
              type="button"
              className="menu-trigger"
              aria-expanded={open}
              aria-controls="menu"
              onPointerEnter={arm}
              onTouchStart={arm}
              onFocus={arm}
              onClick={() => {
                arm();
                setOpen((o) => !o);
              }}
            >
              {/* Monogramme LN (version une couleur, découpe « petite taille » du kit) */}
              <svg className="menu-trigger__icon" viewBox="0 0 256 256" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M20 24H64V188H100V232H20Z M236 232H192V68H156V24H236Z M86.9 24H124.4L169.1 232H131.6Z"
                />
              </svg>
              {open ? "Fermer" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        id="menu"
        className={`menu${armed ? "" : " menu--dormant"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="menu__grid">
          <nav aria-label="Menu principal">
            <ul className="menu__list">
              {nav.map((item, i) => (
                <li key={item.href} className="menu__item">
                  <Link
                    href={item.href}
                    className="menu__link"
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setOpen(false)}
                  >


                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu__preview" aria-hidden="true">
            {menuImages.map((k, i) => (
              <div key={k} className={`photo${i === active ? " is-active" : ""}`}>
                <Image src={photos[k].src} alt="" fill sizes="40vw" />
              </div>
            ))}
          </div>
        </div>
        <div className="menu__foot">
          <span className="label label--muted">{site.zone}</span>
          <Link href="/contact#devis" className="link-arrow" onClick={() => setOpen(false)}>
            Demander un devis
          </Link>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="link-arrow">
            WhatsApp {site.whatsapp.display}
          </a>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link-arrow">
            Instagram {site.instagram.handle}
          </a>
        </div>
      </div>
    </>
  );
}
