import type { Metadata } from "next";
import { getOffer } from "@/config/pricing";
import Button from "@/components/ui/Button";
import { CheckIcon, InfoIcon } from "@/components/ui/Icons";
import { PageHero } from "@/components/sections/Shared";
import { checkoutConfigured, stripe } from "@/lib/server/integrations";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = { title: "Confirmation de commande", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

type Session = {
  id: string;
  payment_status: string;
  amount_total: number;
  currency: string;
  customer_details?: { email?: string };
  metadata?: Record<string, string>;
};

/**
 * Affiche une confirmation UNIQUEMENT si Stripe confirme que la session est payée.
 */
export default async function ConfirmationPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let session: Session | null = null;
  if (checkoutConfigured() && session_id && /^cs_[A-Za-z0-9_]+$/.test(session_id)) {
    const { ok, data } = await stripe<Session>(`checkout/sessions/${session_id}`, undefined, "GET");
    if (ok) session = data;
  }
  const paid = session?.payment_status === "paid";
  const offer = session ? getOffer(session.metadata?.offer_id || "") : undefined;

  return (
    <>
      <PageHero
        label="Confirmation"
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Confirmation", path: "/commande/confirmation" },
        ]}
        title={paid ? <>Merci, votre commande est <em>confirmée.</em></> : <>Commande <em>non confirmée.</em></>}
      />
      <section className="section theme-light">
        <div className="container" style={{ maxWidth: 820 }}>
          {paid && session ? (
            <div className="alert alert--success" role="status">
              <CheckIcon />
              <div>
                <strong>Paiement confirmé par le prestataire de paiement.</strong>
                Prestation : {offer?.name ?? session.metadata?.offer_id} — montant réglé :{" "}
                {(session.amount_total / 100).toFixed(2).replace(".", ",")} {session.currency.toUpperCase()}. Un
                récapitulatif est envoyé par le prestataire à {session.customer_details?.email}. LN Digital vous
                contactera pour lancer la prestation.
              </div>
            </div>
          ) : (
            <div className="alert alert--warn" role="status">
              <InfoIcon />
              <div>
                <strong>Nous ne pouvons pas confirmer de paiement pour cette page.</strong>
                {checkoutConfigured()
                  ? "Le paiement n'a pas été finalisé ou n'a pas encore été confirmé. Aucune commande n'est considérée comme passée sans confirmation du paiement."
                  : "Le paiement en ligne n'est pas encore activé sur ce site (mode démonstration). Aucune commande n'a été enregistrée."}
              </div>
            </div>
          )}
          <div className="btn-row mt-m">
            <Button href="/tarifs">Retour aux tarifs</Button>
            <Button href={whatsappUrl()} variant="ghost" icon="whatsapp">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
