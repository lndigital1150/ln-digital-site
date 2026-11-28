import { site } from "@/config/site";
import { services, servicePath, type Service } from "@/config/services";
import { getOffer } from "@/config/pricing";

/*
 * Données structurées (schema.org).
 * Volontairement SANS adresse physique ni e-mail tant que ces informations n'existent pas : c'est pourquoi
 * l'entreprise est décrite comme « Organization » (zone desservie : Bruxelles et Wallonie) et non comme
 * « LocalBusiness / ProfessionalService », type pour lequel Google exige une adresse.
 */

const abs = (path: string) => new URL(path, site.url).toString();
const ORG_ID = abs("/#organization");
const SITE_ID = abs("/#website");

const areaServed = [
  { "@type": "AdministrativeArea", name: "Région de Bruxelles-Capitale" },
  { "@type": "AdministrativeArea", name: "Wallonie" },
];

const toScript = (data: object) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

/** L'organisation LN Digital, sur toutes les pages. */
export default function JsonLd() {
  return toScript({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: site.url,
    logo: abs("/icon-512.png"),
    slogan: site.slogan,
    description: site.description,
    telephone: site.phone.tel,
    ...(site.email ? { email: site.email } : {}),
    sameAs: [site.instagram.url],
    areaServed,
    knowsLanguage: "fr",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.phone.tel,
      areaServed: "BE",
      availableLanguage: "French",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de LN Digital",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.short, url: abs(servicePath(s)) },
      })),
    },
  });
}

/** Le site web (page d'accueil uniquement). */
export function WebSiteJsonLd() {
  return toScript({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "fr-BE",
    publisher: { "@id": ORG_ID },
  });
}

/** Un service, sur sa page dédiée. Prix repris de la page Tarifs (indicatifs). */
export function ServiceJsonLd({ service }: { service: Service }) {
  const offer = getOffer(service.offerId);
  return toScript({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.short,
    url: abs(servicePath(service)),
    provider: { "@id": ORG_ID },
    areaServed,
    ...(offer?.amount != null
      ? {
          offers: {
            "@type": "Offer",
            url: abs(`/tarifs#${offer.id}`),
            priceCurrency: "EUR",
            ...(offer.prefix
              ? { priceSpecification: { "@type": "PriceSpecification", minPrice: offer.amount, priceCurrency: "EUR" } }
              : { price: offer.amount }),
          },
        }
      : {}),
  });
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return toScript({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  });
}
