"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { budgets, sectors, validateContact, type ContactPayload, type Errors } from "@/lib/validation";
import { CheckIcon, InfoIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappUrl } from "@/lib/links";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; message: string; demo?: boolean };

const DRAFT_KEY = "ln-devis-brouillon";

const FIELD_LABELS: Record<keyof ContactPayload, string> = {
  name: "Nom et prénom",
  company: "Nom de l'entreprise",
  email: "Adresse e-mail",
  phone: "Téléphone",
  sector: "Secteur d'activité",
  service: "Service recherché",
  budget: "Budget indicatif",
  message: "Description du projet",
  consent: "Consentement",
  website: "",
};

const empty: ContactPayload = {
  name: "",
  company: "",
  email: "",
  phone: "",
  sector: "",
  service: "",
  budget: "",
  message: "",
  consent: false,
  website: "",
};

export default function ContactForm({
  services,
  configured,
}: {
  services: { slug: string; title: string }[];
  configured: boolean;
}) {
  const [data, setData] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [submitted, setSubmitted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const restored = useRef(false);
  const slugs = services.map((s) => s.slug);

  // Brouillon (onglet en cours uniquement) + service présélectionné via ?service=...
  useEffect(() => {
    let draft: Partial<ContactPayload> = {};
    try {
      draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || "{}");
    } catch {}
    const s = new URLSearchParams(window.location.search).get("service");
    setData((d) => ({
      ...d,
      ...draft,
      consent: false,
      website: "",
      ...(s && services.some((x) => x.slug === s) ? { service: s } : {}),
    }));
    restored.current = true;
  }, [services]);

  // Sauvegarde automatique du brouillon (sans le consentement ni le champ anti-robots)
  useEffect(() => {
    if (!restored.current) return;
    const id = setTimeout(() => {
      try {
        const { consent: _c, website: _w, ...rest } = data;
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify(rest));
      } catch {}
    }, 400);
    return () => clearTimeout(id);
  }, [data]);

  const set = <K extends keyof ContactPayload>(k: K, v: ContactPayload[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  // Validation à la sortie du champ (pas à chaque frappe), seulement si le champ a été rempli ou après un envoi
  const onBlur = (k: keyof ContactPayload) => {
    const v = data[k];
    if (!submitted && (typeof v !== "string" || !v.trim())) return;
    const errs = validateContact(data, slugs);
    setErrors((e) => ({ ...e, [k]: errs[k] }));
  };

  const focusField = (k: keyof ContactPayload) => {
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${k}"]`);
    el?.focus();
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validateContact(data, slugs);
    setErrors(errs);
    if (Object.keys(errs).length) {
      // Récapitulatif des erreurs en haut du formulaire, qui reçoit le focus
      setShowSummary(true);
      setTimeout(() => summaryRef.current?.focus(), 30);
      return;
    }
    setShowSummary(false);
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus({ kind: "success" });
        setData(empty);
        try {
          sessionStorage.removeItem(DRAFT_KEY);
        } catch {}
      } else if (json.code === "invalid" && json.errors) {
        setErrors(json.errors);
        setStatus({ kind: "idle" });
      } else {
        setStatus({
          kind: "error",
          demo: json.code === "not_configured",
          message: json.message || "L'envoi a échoué. Réessayez plus tard ou contactez-nous sur WhatsApp.",
        });
      }
    } catch {
      setStatus({ kind: "error", message: "Connexion impossible. Vérifiez votre connexion internet et réessayez." });
    }
    setTimeout(() => statusRef.current?.focus(), 50);
  };

  const field = (k: keyof ContactPayload) => ({
    id: `f-${k}`,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `f-${k}-err` : undefined,
    onBlur: () => onBlur(k),
  });
  const errorKeys = (Object.keys(errors) as (keyof ContactPayload)[]).filter((k) => errors[k]);
  const Err = ({ k }: { k: keyof ContactPayload }) =>
    errors[k] ? (
      <p id={`f-${k}-err`} className="field__error">
        {errors[k]}
      </p>
    ) : null;
  const cls = (k: keyof ContactPayload) => `field${errors[k] ? " field--invalid" : ""}`;

  if (status.kind === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} className="alert alert--success" role="status">
        <CheckIcon />
        <div>
          <strong>Merci, votre demande a bien été transmise.</strong>
          Nous revenons vers vous dans les meilleurs délais. Pour une question urgente, vous pouvez aussi nous écrire
          sur WhatsApp.
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} className="form" noValidate onSubmit={onSubmit} aria-describedby="form-mode">
      {!configured && (
        <div id="form-mode" className="alert alert--warn" role="note">
          <InfoIcon />
          <div>
            <strong>Formulaire en mode démonstration</strong>
            Le service d&apos;envoi n&apos;est pas encore configuré : les demandes ne sont pas transmises. En
            attendant, contactez LN Digital sur{" "}
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
              WhatsApp
            </a>
            .
          </div>
        </div>
      )}

      {showSummary && errorKeys.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} className="alert alert--error" role="alert">
          <InfoIcon />
          <div>
            <strong>
              {errorKeys.length === 1 ? "1 champ à corriger" : `${errorKeys.length} champs à corriger`}
            </strong>
            <ul className="error-summary">
              {errorKeys.map((k) => (
                <li key={k}>
                  <button type="button" onClick={() => focusField(k)}>
                    {FIELD_LABELS[k]} — {errors[k]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <p className="muted" style={{ fontSize: 14 }}>
        Les champs marqués d&apos;un <span className="req" aria-hidden="true">*</span>
        <span className="sr-only">astérisque</span> sont obligatoires.
      </p>

      <div className="form__row form__row--2">
        <div className={cls("name")}>
          <label htmlFor="f-name">
            Nom et prénom <span className="req" aria-hidden="true">*</span>
          </label>
          <input
            {...field("name")}
            className="input"
            autoComplete="name"
            required
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
          />
          <Err k="name" />
        </div>
        <div className={cls("company")}>
          <label htmlFor="f-company">
            Nom de l&apos;entreprise <span className="req" aria-hidden="true">*</span>
          </label>
          <input
            {...field("company")}
            className="input"
            autoComplete="organization"
            required
            value={data.company}
            onChange={(e) => set("company", e.target.value)}
          />
          <Err k="company" />
        </div>
      </div>

      <div className="form__row form__row--2">
        <div className={cls("email")}>
          <label htmlFor="f-email">
            Adresse e-mail <span className="req" aria-hidden="true">*</span>
          </label>
          <input
            {...field("email")}
            type="email"
            className="input"
            autoComplete="email"
            required
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
          />
          <Err k="email" />
        </div>
        <div className={cls("phone")}>
          <label htmlFor="f-phone">Téléphone (facultatif)</label>
          <input
            {...field("phone")}
            type="tel"
            className="input"
            autoComplete="tel"
            value={data.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
          <Err k="phone" />
        </div>
      </div>

      <div className="form__row form__row--2">
        <div className={cls("sector")}>
          <label htmlFor="f-sector">
            Secteur d&apos;activité <span className="req" aria-hidden="true">*</span>
          </label>
          <select
            {...field("sector")}
            className="select"
            required
            value={data.sector}
            onChange={(e) => set("sector", e.target.value)}
          >
            <option value="">Sélectionnez…</option>
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <Err k="sector" />
        </div>
        <div className={cls("service")}>
          <label htmlFor="f-service">
            Service recherché <span className="req" aria-hidden="true">*</span>
          </label>
          <select
            {...field("service")}
            className="select"
            required
            value={data.service}
            onChange={(e) => set("service", e.target.value)}
          >
            <option value="">Sélectionnez…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
            <option value="autre">Plusieurs services / je ne sais pas encore</option>
          </select>
          <Err k="service" />
        </div>
      </div>

      <div className={cls("budget")}>
        <label htmlFor="f-budget">
          Budget indicatif <span className="req" aria-hidden="true">*</span>
        </label>
        <select
          {...field("budget")}
          className="select"
          required
          value={data.budget}
          onChange={(e) => set("budget", e.target.value)}
        >
          <option value="">Sélectionnez…</option>
          {budgets.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <Err k="budget" />
      </div>

      <div className={cls("message")}>
        <label htmlFor="f-message">
          Description du projet <span className="req" aria-hidden="true">*</span>
        </label>
        <textarea
          {...field("message")}
          className="textarea"
          required
          placeholder="Présentez votre entreprise, votre besoin, vos objectifs et vos éventuelles échéances."
          value={data.message}
          onChange={(e) => set("message", e.target.value)}
        />
        <Err k="message" />
      </div>

      {/* Champ piège anti-robots : invisible pour les visiteurs */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Ne pas remplir</label>
        <input
          id="f-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={data.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <div className={cls("consent")}>
        <label className="check" htmlFor="f-consent">
          <input
            id="f-consent"
            name="consent"
            type="checkbox"
            checked={data.consent}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "f-consent-err" : undefined}
            onChange={(e) => set("consent", e.target.checked)}
          />
          <span>
            J&apos;accepte que LN Digital utilise ces informations pour répondre à ma demande, conformément à la{" "}
            <Link href="/politique-de-confidentialite" style={{ textDecoration: "underline" }}>
              politique de confidentialité
            </Link>
            . <span className="req" aria-hidden="true">*</span>
          </span>
        </label>
        <Err k="consent" />
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite">
        {status.kind === "error" && (
          <div className={`alert ${status.demo ? "alert--warn" : "alert--error"}`} role="alert">
            <InfoIcon />
            <div>
              <strong>{status.demo ? "Demande non transmise (mode démonstration)" : "La demande n'a pas pu être envoyée"}</strong>
              {status.message}
            </div>
          </div>
        )}
      </div>

      <div className="btn-row">
        <button type="submit" className="btn btn--accent" disabled={status.kind === "sending"}>
          <span className="btn__label">
            <span>{status.kind === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}</span>
            <span aria-hidden="true">{status.kind === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}</span>
          </span>
        </button>
        <a className="btn btn--ghost" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
          <span className="btn__label">
            <span>Plutôt WhatsApp</span>
            <span aria-hidden="true">Plutôt WhatsApp</span>
          </span>
          <WhatsAppIcon className="btn__icon" />
        </a>
      </div>
    </form>
  );
}
