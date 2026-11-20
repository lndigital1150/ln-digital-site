/** Règles de validation partagées entre le navigateur et le serveur. */

export const sectors = [
  "Commerce",
  "Artisanat",
  "Horeca (restaurant, café, hôtel…)",
  "Profession libérale",
  "Indépendant",
  "PME",
  "Autre",
] as const;

export const budgets = [
  "Moins de 500 €",
  "500 € – 1 000 €",
  "1 000 € – 2 500 €",
  "2 500 € – 5 000 €",
  "Plus de 5 000 €",
  "Je ne sais pas encore",
] as const;

export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  sector: string;
  service: string;
  budget: string;
  message: string;
  consent: boolean;
  website?: string; // champ piège anti-spam (doit rester vide)
};

export type Errors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s./-]{6,20}$/;

export function validateContact(d: Partial<ContactPayload>, serviceSlugs: string[]): Errors {
  const e: Errors = {};
  const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  if (s(d.name).length < 2) e.name = "Indiquez votre nom et prénom.";
  if (s(d.name).length > 120) e.name = "Ce nom est trop long (120 caractères maximum).";
  if (s(d.company).length < 2) e.company = "Indiquez le nom de votre entreprise.";
  if (s(d.company).length > 160) e.company = "Ce nom est trop long (160 caractères maximum).";
  if (!EMAIL.test(s(d.email))) e.email = "Indiquez une adresse e-mail valide, par exemple nom@entreprise.be.";
  if (s(d.phone) && !PHONE.test(s(d.phone))) e.phone = "Ce numéro ne semble pas valide. Exemple : +32 470 12 34 56.";
  if (!sectors.includes(s(d.sector) as (typeof sectors)[number])) e.sector = "Sélectionnez votre secteur d'activité.";
  if (!(serviceSlugs.includes(s(d.service)) || s(d.service) === "autre")) e.service = "Sélectionnez le service recherché.";
  if (!budgets.includes(s(d.budget) as (typeof budgets)[number])) e.budget = "Sélectionnez un budget indicatif.";
  if (s(d.message).length < 20) e.message = "Décrivez votre projet en quelques phrases (20 caractères minimum).";
  if (s(d.message).length > 5000) e.message = "Votre message est trop long (5 000 caractères maximum).";
  if (d.consent !== true) e.consent = "Votre accord est nécessaire pour que nous puissions traiter votre demande.";
  return e;
}

export type OrderCustomer = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  vat?: string;
  details?: string;
  acceptTerms: boolean;
};

export function validateCustomer(d: Partial<OrderCustomer>): Partial<Record<keyof OrderCustomer, string>> {
  const e: Partial<Record<keyof OrderCustomer, string>> = {};
  const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  if (s(d.name).length < 2) e.name = "Indiquez votre nom et prénom.";
  if (s(d.company).length < 2) e.company = "Indiquez le nom de votre entreprise.";
  if (!EMAIL.test(s(d.email))) e.email = "Indiquez une adresse e-mail valide.";
  if (s(d.phone) && !PHONE.test(s(d.phone))) e.phone = "Ce numéro ne semble pas valide.";
  if (s(d.vat).length > 30) e.vat = "Numéro trop long.";
  if (s(d.details).length > 2000) e.details = "Texte trop long (2 000 caractères maximum).";
  if (d.acceptTerms !== true) e.acceptTerms = "Vous devez accepter les conditions générales pour poursuivre.";
  return e;
}
