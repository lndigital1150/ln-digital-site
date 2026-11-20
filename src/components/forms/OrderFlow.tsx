"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { validateCustomer, type OrderCustomer } from "@/lib/validation";
import { InfoIcon } from "@/components/ui/Icons";
import { whatsappUrl, quoteUrl } from "@/lib/links";

type OfferView = {
  id: string;
  name: string;
  priceText: string;
  unit: string;
  serviceSlug: string;
  includes: string[];
  options: string[];
  hasOptions: boolean;
};

type Errs = Partial<Record<keyof OrderCustomer, string>>;
const STEPS = ["Prestation", "Vos informations", "Récapitulatif", "Paiement sécurisé"];

export default function OrderFlow({
  offer,
  checkoutEnabled,
  testMode,
  cancelled,
}: {
  offer: OfferView;
  checkoutEnabled: boolean;
  testMode: boolean;
  cancelled: boolean;
}) {
  const [step, setStep] = useState(0);
  const [c, setC] = useState<OrderCustomer>({
    name: "",
    company: "",
    email: "",
    phone: "",
    vat: "",
    details: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Errs>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ kind: "demo" | "error"; message: string } | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof OrderCustomer>(k: K, v: OrderCustomer[K]) => {
    setC((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const go = (n: number) => {
    setStep(n);
    setTimeout(() => topRef.current?.focus(), 30);
  };

  const nextFromInfo = (e: FormEvent) => {
    e.preventDefault();
    const errs = validateCustomer({ ...c, acceptTerms: true });
    setErrors(errs);
    if (Object.keys(errs).length === 0) go(2);
  };

  const pay = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateCustomer(c);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offerId: offer.id, customer: c }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.url) {
        window.location.assign(json.url); // redirection vers la page de paiement du prestataire
        return;
      }
      setResult({
        kind: json.code === "not_configured" ? "demo" : "error",
        message: json.message || "Une erreur est survenue. Aucun paiement n'a été effectué.",
      });
    } catch {
      setResult({ kind: "error", message: "Connexion impossible. Aucun paiement n'a été effectué." });
    }
    setBusy(false);
  };

  const Err = ({ k }: { k: keyof OrderCustomer }) =>
    errors[k] ? (
      <p id={`o-${k}-err`} className="field__error">
        {errors[k]}
      </p>
    ) : null;
  const a = (k: keyof OrderCustomer) => ({
    id: `o-${k}`,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `o-${k}-err` : undefined,
  });
  const cls = (k: keyof OrderCustomer) => `field${errors[k] ? " field--invalid" : ""}`;

  return (
    <div className="stack" style={{ gap: 24 }}>
      {!checkoutEnabled && (
        <div className="alert alert--warn" role="note">
          <InfoIcon />
          <div>
            <strong>Mode démonstration — paiement non activé</strong>
            Le parcours de commande est consultable, mais le paiement en ligne n&apos;est pas encore configuré : aucune
            commande ne sera enregistrée et aucun paiement ne sera effectué. Pour commander dès maintenant,{" "}
            <Link href={quoteUrl(offer.serviceSlug)} style={{ textDecoration: "underline" }}>
              faites une demande de devis
            </Link>
            .
          </div>
        </div>
      )}
      {checkoutEnabled && testMode && (
        <div className="alert alert--info" role="note">
          <InfoIcon />
          <div>
            <strong>Paiement en mode test</strong>
            Le prestataire de paiement est configuré avec des clés de test : aucun montant réel ne sera débité.
          </div>
        </div>
      )}
      {cancelled && (
        <div className="alert alert--info" role="status">
          <InfoIcon />
          <div>
            <strong>Paiement annulé</strong>
            Vous avez quitté la page de paiement. Aucun montant n&apos;a été débité ; vous pouvez reprendre votre
            commande.
          </div>
        </div>
      )}

      <ol className="order-steps" aria-label="Étapes de la commande">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined}>
            {s}
          </li>
        ))}
      </ol>

      <div ref={topRef} tabIndex={-1} style={{ outline: "none" }}>
        {step === 0 && (
          <div className="stack" style={{ gap: 20 }}>
            <h2 className="h3">1. Votre prestation</h2>
            <fieldset className="fieldset">
              <legend>Prestation sélectionnée</legend>
              <p>
                <strong>{offer.name}</strong> — {offer.priceText} <span className="muted">({offer.unit})</span>
              </p>
              <ul className="checklist checklist--muted">
                {offer.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </fieldset>
            <fieldset className="fieldset">
              <legend>Options</legend>
              {offer.hasOptions ? (
                <ul className="checklist">
                  {offer.options.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              ) : (
                <p className="muted">
                  Aucune option n&apos;est configurée pour cette prestation pour le moment{" "}
                  <span className="todo">À préciser</span>.
                </p>
              )}
              <div className={cls("details")}>
                <label htmlFor="o-details">Précisions sur votre besoin (facultatif)</label>
                <textarea
                  {...a("details")}
                  className="textarea"
                  style={{ minHeight: 110 }}
                  value={c.details}
                  onChange={(e) => set("details", e.target.value)}
                />
                <Err k="details" />
              </div>
            </fieldset>
            <div className="btn-row">
              <button type="button" className="btn" onClick={() => go(1)}>
                <span className="btn__label">
                  <span>Continuer</span>
                  <span aria-hidden="true">Continuer</span>
                </span>
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <form className="form" noValidate onSubmit={nextFromInfo}>
            <h2 className="h3">2. Vos informations</h2>
            <div className="form__row form__row--2">
              <div className={cls("name")}>
                <label htmlFor="o-name">
                  Nom et prénom <span className="req">*</span>
                </label>
                <input {...a("name")} className="input" autoComplete="name" value={c.name} onChange={(e) => set("name", e.target.value)} />
                <Err k="name" />
              </div>
              <div className={cls("company")}>
                <label htmlFor="o-company">
                  Entreprise <span className="req">*</span>
                </label>
                <input
                  {...a("company")}
                  className="input"
                  autoComplete="organization"
                  value={c.company}
                  onChange={(e) => set("company", e.target.value)}
                />
                <Err k="company" />
              </div>
            </div>
            <div className="form__row form__row--2">
              <div className={cls("email")}>
                <label htmlFor="o-email">
                  E-mail <span className="req">*</span>
                </label>
                <input
                  {...a("email")}
                  type="email"
                  className="input"
                  autoComplete="email"
                  value={c.email}
                  onChange={(e) => set("email", e.target.value)}
                />
                <Err k="email" />
              </div>
              <div className={cls("phone")}>
                <label htmlFor="o-phone">Téléphone (facultatif)</label>
                <input {...a("phone")} type="tel" className="input" autoComplete="tel" value={c.phone} onChange={(e) => set("phone", e.target.value)} />
                <Err k="phone" />
              </div>
            </div>
            <div className={cls("vat")}>
              <label htmlFor="o-vat">Numéro de TVA (facultatif)</label>
              <input {...a("vat")} className="input" value={c.vat} onChange={(e) => set("vat", e.target.value)} />
              <Err k="vat" />
            </div>
            <div className="btn-row">
              <button type="button" className="btn btn--ghost" onClick={() => go(0)}>
                <span className="btn__label">
                  <span>Retour</span>
                  <span aria-hidden="true">Retour</span>
                </span>
              </button>
              <button type="submit" className="btn">
                <span className="btn__label">
                  <span>Voir le récapitulatif</span>
                  <span aria-hidden="true">Voir le récapitulatif</span>
                </span>
              </button>
            </div>
          </form>
        )}

        {step >= 2 && (
          <form className="form" noValidate onSubmit={pay}>
            <h2 className="h3">3. Récapitulatif et conditions</h2>
            <fieldset className="fieldset">
              <legend>Votre commande</legend>
              <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 16px", fontSize: 15 }}>
                <dt className="muted">Prestation</dt>
                <dd>{offer.name}</dd>
                <dt className="muted">Prix</dt>
                <dd>{offer.priceText}</dd>
                <dt className="muted">Client</dt>
                <dd>
                  {c.name} — {c.company}
                </dd>
                <dt className="muted">E-mail</dt>
                <dd>{c.email}</dd>
                {c.phone && (
                  <>
                    <dt className="muted">Téléphone</dt>
                    <dd>{c.phone}</dd>
                  </>
                )}
                {c.vat && (
                  <>
                    <dt className="muted">TVA</dt>
                    <dd>{c.vat}</dd>
                  </>
                )}
              </dl>
              <p className="muted" style={{ fontSize: 14 }}>
                Régime de TVA : à préciser selon le statut de l&apos;entreprise.
              </p>
            </fieldset>
            <div className={cls("acceptTerms")}>
              <label className="check" htmlFor="o-acceptTerms">
                <input
                  id="o-acceptTerms"
                  type="checkbox"
                  checked={c.acceptTerms}
                  aria-invalid={errors.acceptTerms ? true : undefined}
                  aria-describedby={errors.acceptTerms ? "o-acceptTerms-err" : undefined}
                  onChange={(e) => set("acceptTerms", e.target.checked)}
                />
                <span>
                  J&apos;ai lu et j&apos;accepte les{" "}
                  <Link href="/conditions-generales" target="_blank" style={{ textDecoration: "underline" }}>
                    conditions générales de vente et de prestation
                  </Link>{" "}
                  et la{" "}
                  <Link href="/politique-de-confidentialite" target="_blank" style={{ textDecoration: "underline" }}>
                    politique de confidentialité
                  </Link>
                  . <span className="req">*</span>
                </span>
              </label>
              <Err k="acceptTerms" />
            </div>

            <div aria-live="polite">
              {result && (
                <div className={`alert ${result.kind === "demo" ? "alert--warn" : "alert--error"}`} role="alert">
                  <InfoIcon />
                  <div>
                    <strong>{result.kind === "demo" ? "Mode démonstration" : "Paiement impossible"}</strong>
                    {result.message}{" "}
                    <Link href={quoteUrl(offer.serviceSlug)} style={{ textDecoration: "underline" }}>
                      Demander un devis
                    </Link>{" "}
                    ou{" "}
                    <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
                      nous écrire sur WhatsApp
                    </a>
                    .
                  </div>
                </div>
              )}
            </div>

            <div className="btn-row">
              <button type="button" className="btn btn--ghost" onClick={() => go(1)}>
                <span className="btn__label">
                  <span>Modifier</span>
                  <span aria-hidden="true">Modifier</span>
                </span>
              </button>
              <button type="submit" className="btn btn--accent" disabled={busy}>
                <span className="btn__label">
                  <span>{busy ? "Redirection…" : "Procéder au paiement sécurisé"}</span>
                  <span aria-hidden="true">{busy ? "Redirection…" : "Procéder au paiement sécurisé"}</span>
                </span>
              </button>
            </div>
            <p className="muted" style={{ fontSize: 13 }}>
              Le paiement est réalisé sur la page sécurisée du prestataire de paiement. Aucune donnée bancaire
              n&apos;est saisie ni conservée sur ce site. La commande n&apos;est confirmée qu&apos;après confirmation
              effective du paiement.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
