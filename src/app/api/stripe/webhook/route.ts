import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getOffer } from "@/config/pricing";
import { sendMail } from "@/lib/server/integrations";

export const runtime = "nodejs";

/**
 * Webhook Stripe : enregistre (par e-mail de notification) les commandes payées.
 * À déclarer dans le tableau de bord Stripe : https://<domaine>/api/stripe/webhook
 * Événement : checkout.session.completed
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });

  const payload = await req.text();
  const header = req.headers.get("stripe-signature") || "";
  const parts = Object.fromEntries(
    header.split(",").map((p) => {
      const [k, ...v] = p.split("=");
      return [k, v.join("=")];
    }),
  ) as Record<string, string>;
  const timestamp = parts.t;
  const signatures = header
    .split(",")
    .filter((p) => p.startsWith("v1="))
    .map((p) => p.slice(3));

  if (!timestamp || !signatures.length) return NextResponse.json({ ok: false }, { status: 400 });
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return NextResponse.json({ ok: false }, { status: 400 });

  const expected = crypto.createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
  const valid = signatures.some(
    (s) => s.length === expected.length && crypto.timingSafeEqual(Buffer.from(s), Buffer.from(expected)),
  );
  if (!valid) return NextResponse.json({ ok: false }, { status: 400 });

  const event = JSON.parse(payload) as {
    type: string;
    data: { object: Record<string, unknown> & { metadata?: Record<string, string> } };
  };

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as {
      id: string;
      payment_status: string;
      amount_total: number;
      currency: string;
      customer_details?: { email?: string; name?: string };
      metadata?: Record<string, string>;
    };
    if (s.payment_status === "paid") {
      const offer = getOffer(s.metadata?.offer_id || "");
      await sendMail({
        subject: `Nouvelle commande payée — ${offer?.name ?? s.metadata?.offer_id}`,
        text: [
          "Commande confirmée par Stripe (paiement reçu).",
          "",
          `Prestation : ${offer?.name ?? s.metadata?.offer_id}`,
          `Montant : ${(s.amount_total / 100).toFixed(2)} ${s.currency.toUpperCase()}`,
          `Client : ${s.metadata?.name} — ${s.metadata?.company}`,
          `E-mail : ${s.customer_details?.email}`,
          `Téléphone : ${s.metadata?.phone || "—"}`,
          `TVA : ${s.metadata?.vat || "—"}`,
          `Précisions : ${s.metadata?.details || "—"}`,
          `Conditions acceptées le : ${s.metadata?.terms_accepted_at}`,
          `Session Stripe : ${s.id}`,
        ].join("\n"),
        replyTo: s.customer_details?.email,
      });
    }
  }

  return NextResponse.json({ received: true });
}
