import { NextResponse } from "next/server";
import { services } from "@/config/services";
import { validateContact, type ContactPayload } from "@/lib/validation";
import { mailConfigured, rateLimited, sendMail } from "@/lib/server/integrations";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request", message: "Requête invalide." }, { status: 400 });
  }

  // Champ piège : un robot l'a rempli → on ignore silencieusement, sans prétendre à un envoi.
  if (body.website) {
    return NextResponse.json({ ok: false, code: "rejected", message: "Demande refusée." }, { status: 400 });
  }

  const errors = validateContact(body, services.map((s) => s.slug));
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, code: "invalid", errors }, { status: 422 });
  }

  if (!mailConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        code: "not_configured",
        message:
          "Le formulaire est en mode démonstration : aucun service d'envoi n'est encore configuré. Votre demande n'a pas été transmise.",
      },
      { status: 503 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, code: "rate_limited", message: "Trop de demandes en peu de temps. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  const service = services.find((s) => s.slug === body.service)?.title ?? "Autre / je ne sais pas encore";
  const text = [
    "Nouvelle demande de devis — site LN Digital",
    "",
    `Nom : ${body.name}`,
    `Entreprise : ${body.company}`,
    `E-mail : ${body.email}`,
    `Téléphone : ${body.phone || "—"}`,
    `Secteur : ${body.sector}`,
    `Service : ${service}`,
    `Budget indicatif : ${body.budget}`,
    "",
    "Projet :",
    String(body.message),
    "",
    `Consentement au traitement des données : oui (${new Date().toISOString()})`,
  ].join("\n");

  const sent = await sendMail({
    subject: `Demande de devis — ${body.company} (${service})`,
    text,
    replyTo: body.email,
  });

  if (!sent) {
    return NextResponse.json(
      {
        ok: false,
        code: "send_failed",
        message: "L'envoi a échoué. Réessayez plus tard ou contactez-nous sur WhatsApp.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
