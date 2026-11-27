import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { offers, getOffer, formatPrice, TO_DEFINE } from "@/config/pricing";
import Photo from "@/components/ui/Photo";
import OrderFlow from "@/components/forms/OrderFlow";
import { PageHero } from "@/components/sections/Shared";
import { checkoutConfigured, stripeTestMode } from "@/lib/server/integrations";

type Props = { params: Promise<{ offre: string }>; searchParams: Promise<{ annule?: string }> };

export function generateStaticParams() {
  return offers.filter((o) => o.mode === "direct").map((o) => ({ offre: o.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { offre } = await params;
  const o = getOffer(offre);
  return {
    title: o ? `Commander : ${o.name}` : "Commander",
    description: o ? `Commande en ligne de la prestation ${o.name} — LN Digital.` : undefined,
    robots: { index: false, follow: true },
  };
}

export default async function OrderPage({ params, searchParams }: Props) {
  const { offre } = await params;
  const { annule } = await searchParams;
  const o = getOffer(offre);
  if (!o || o.mode !== "direct" || o.amount === null) notFound();

  const realOptions = o.options.filter((x) => x !== TO_DEFINE);

  return (
    <>
      <PageHero
        label="Commande"
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: "Tarifs", path: "/tarifs" },
          { name: o.name, path: `/tarifs/commander/${o.id}` },
        ]}
        title={
          <>
            Commander : <em>{o.name}</em>
          </>
        }
        intro={`${formatPrice(o)} — ${o.unit}. Vérifiez la prestation, renseignez vos informations puis accédez au paiement sécurisé.`}
      />
      <section className="section theme-light" style={{ paddingTop: "clamp(48px, 6vw, 96px)" }}>
        <div className="container order">
          <OrderFlow
            offer={{
              id: o.id,
              name: o.name,
              priceText: formatPrice(o),
              unit: o.unit,
              serviceSlug: o.serviceSlug,
              includes: o.includes,
              options: realOptions,
              hasOptions: realOptions.length > 0,
            }}
            checkoutEnabled={checkoutConfigured()}
            testMode={stripeTestMode()}
            cancelled={annule === "1"}
          />
          <aside className="order-summary" aria-label="Résumé de la prestation">
            <Photo name={o.image} sizes="(max-width: 1000px) 100vw, 35vw" />
            <div className="order-summary__body">
              <p className="label">Résumé</p>
              <h2 className="h3">{o.name}</h2>
              <dl>
                <dt>Prix</dt>
                <dd>{formatPrice(o)}</dd>
                <dt>Type</dt>
                <dd>{o.unit}</dd>
                <dt className="total">Total</dt>
                <dd className="total">{o.prefix ? `${o.priceLabel} (base)` : o.priceLabel}</dd>
              </dl>
              <p className="muted" style={{ fontSize: 13 }}>
                Montant indicatif — régime de TVA à préciser selon le statut de l&apos;entreprise.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
