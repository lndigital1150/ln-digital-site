import { site } from "@/config/site";
import { services } from "@/config/services";

/**
 * Données structurées (schema.org) de l'organisation.
 * Volontairement sans adresse physique ni e-mail tant que ces informations n'existent pas.
 */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    slogan: site.slogan,
    description: site.description,
    url: site.url,
    logo: new URL("/icon-512.png", site.url).toString(),
    telephone: `+${site.whatsapp.number}`,
    sameAs: [site.instagram.url],
    ...(site.email ? { email: site.email } : {}),
    areaServed: [
      { "@type": "AdministrativeArea", name: "Région de Bruxelles-Capitale" },
      { "@type": "AdministrativeArea", name: "Wallonie" },
    ],
    knowsLanguage: "fr",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de marketing digital",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.short },
      })),
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: new URL(it.path, site.url).toString(),
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
