import "server-only";

/**
 * Intégrations externes — activées uniquement si les variables d'environnement existent.
 * Aucune clé secrète n'est jamais envoyée au navigateur.
 *
 * E-mail (Resend — https://resend.com) :
 *   RESEND_API_KEY, CONTACT_TO_EMAIL (réception), CONTACT_FROM_EMAIL (expéditeur d'un domaine vérifié)
 * Paiement (Stripe Checkout — https://stripe.com) :
 *   STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, CHECKOUT_ENABLED=true
 */

export const mailConfigured = () =>
  Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);

export const checkoutConfigured = () =>
  Boolean(process.env.STRIPE_SECRET_KEY && process.env.CHECKOUT_ENABLED === "true");

export const stripeTestMode = () => (process.env.STRIPE_SECRET_KEY || "").startsWith("sk_test_");

/** Envoie un e-mail via l'API Resend. Renvoie true uniquement si Resend confirme la réception. */
export async function sendMail({ subject, text, replyTo }: { subject: string; text: string; replyTo?: string }) {
  if (!mailConfigured()) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL!.split(",").map((s) => s.trim()),
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("[mail] Échec Resend", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}

/** Appel à l'API Stripe (format x-www-form-urlencoded). */
export async function stripe<T = Record<string, unknown>>(
  path: string,
  params?: Record<string, string>,
  method: "GET" | "POST" = "POST",
): Promise<{ ok: boolean; data: T }> {
  const body = params ? new URLSearchParams(params).toString() : undefined;
  const res = await fetch(`https://api.stripe.com/v1/${path}${method === "GET" && body ? `?${body}` : ""}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: method === "POST" ? body : undefined,
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as T;
  if (!res.ok) console.error("[stripe] Erreur", res.status, data);
  return { ok: res.ok, data };
}

/** Limitation simple du nombre d'envois par adresse IP (en mémoire, au mieux). */
const hits = new Map<string, number[]>();
export function rateLimited(ip: string, max = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > max;
}
