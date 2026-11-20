"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/links";
import { WhatsAppIcon } from "@/components/ui/Icons";

/** Bouton WhatsApp flottant. */
export function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous contacter sur WhatsApp (nouvelle fenêtre)"
      data-magnetic="0.4"
    >
      <WhatsAppIcon />
      <span className="wa-float__tip" aria-hidden="true">
        Une question ? WhatsApp
      </span>
    </a>
  );
}

/**
 * Bandeau d'information cookies.
 * Le site n'utilise actuellement QUE des cookies / stockages strictement nécessaires.
 * Le choix est conservé localement (clé « ln-consent ») pour activer plus tard,
 * uniquement après consentement, d'éventuels outils de mesure d'audience.
 */
export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("ln-consent")) setTimeout(() => setShow(true), 2600);
    } catch {}
    const reopen = () => setShow(true);
    window.addEventListener("ln:cookie-settings", reopen);
    return () => window.removeEventListener("ln:cookie-settings", reopen);
  }, []);

  const save = (analytics: boolean) => {
    try {
      localStorage.setItem("ln-consent", JSON.stringify({ analytics, date: new Date().toISOString() }));
    } catch {}
    window.dispatchEvent(new CustomEvent("ln:consent", { detail: { analytics } }));
    setShow(false);
  };

  if (!show) return null;
  return (
    <div className="cookie" role="region" aria-label="Préférences cookies">
      <p>
        <strong style={{ color: "var(--blanc-lavande)" }}>Cookies.</strong> Ce site utilise uniquement des éléments
        strictement nécessaires à son fonctionnement. Aucun traceur publicitaire ou de mesure d&apos;audience n&apos;est
        activé sans votre accord. <Link href="/cookies">En savoir plus</Link>
      </p>
      <div className="btn-row">
        <button type="button" className="btn btn--ghost btn--small" onClick={() => save(false)}>
          Refuser
        </button>
        <button type="button" className="btn btn--small" onClick={() => save(true)}>
          Accepter
        </button>
      </div>
    </div>
  );
}
