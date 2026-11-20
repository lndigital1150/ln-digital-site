import { site } from "@/config/site";

/** Lien WhatsApp avec message prérempli. */
export const whatsappUrl = (message: string = site.whatsapp.message) =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;

/** Lien vers le formulaire de devis, avec service présélectionné. */
export const quoteUrl = (serviceSlug?: string) =>
  serviceSlug ? `/contact?service=${serviceSlug}#devis` : "/contact#devis";

export const orderUrl = (offerId: string) => `/tarifs/commander/${offerId}`;

export const questionUrl = (offerName: string) =>
  whatsappUrl(`Bonjour LN Digital, j'ai une question concernant l'offre « ${offerName} ».`);
