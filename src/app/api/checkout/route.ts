import { NextResponse } from "next/server";
import { getOffer } from "@/config/pricing";
import { site } from "@/config/site";
import { validateCustomer, type OrderCustomer } from "@/lib/validation";
import { checkoutConfigured, stripe } from "@/lib/server/integrations";

export const runtime = "nodejs";

/**
 * Crée une session de paiement Stripe Checkout pour une offre en « achat direct ».
 * Le montant provient TOUJOURS de la configuration serveur (jamais du navigateur).
 * Aucune donnée de carte ne transite par ce site : le paiement a lieu chez Stripe.
 */
export async function POST(req: Request) {
  let body: { offerId?: string; customer?: Partial<OrderCustomer> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  const offer = body.offerId ? getOffer(body.offerId) : undefined;
  if (!offer || offer.mode !== "direct" || offer.amount === null) {
    return NextResponse.json({ ok: false, code: "unknown_offer", message: "Offre introuvable." }, { status: 404 });
  }

  const errors = validateCustomer(body.customer || {});
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, code: "invalid", errors }, { status: 422 });
  }

  if (!checkoutConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        code: "not_configured",
        message:
          "Le paiement en ligne n'est pas encore activé (mode démonstration). Aucune commande n'a été enregistrée et aucun paiement n'a été effectué.",
      },
      { status: 503 },
    );
  }

  const c = body.customer as OrderCustomer;
  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin || site.url;
  const params: Record<string, string> = {
    mode: "payment",
    locale: "fr",
    customer_email: c.email,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "eur",
    "line_items[0][price_data][unit_amount]": String(Math.round(offer.amount * 100)),
    "line_items[0][price_data][product_data][name]": `${offer.name} — ${site.name}`,
    "line_items[0][price_data][product_data][description]": offer.summary,
    success_url: `${origin}/commande/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/tarifs/commander/${offer.id}?annule=1`,
    "metadata[offer_id]": offer.id,
    "metadata[name]": c.name.slice(0, 450),
    "metadata[company]": c.company.slice(0, 450),
    "metadata[phone]": (c.phone || "").slice(0, 450),
    "metadata[vat]": (c.vat || "").slice(0, 450),
    "metadata[details]": (c.details || "").slice(0, 450),
    "metadata[terms_accepted_at]": new Date().toISOString(),
  };

  const { ok, data } = await stripe<{ url?: string }>("checkout/sessions", params);
  if (!ok || !data.url) {
    return NextResponse.json(
      { ok: false, code: "provider_error", message: "Le prestataire de paiement est indisponible. Réessayez plus tard." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, url: data.url });
}
