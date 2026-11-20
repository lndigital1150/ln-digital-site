import type { ReactNode } from "react";
import type { PhotoKey } from "@/config/images";
import { TO_COMPLETE } from "@/config/site";
import { InfoIcon } from "@/components/ui/Icons";
import { PageHero } from "./Shared";

/** Valeur légale : affichée telle quelle si renseignée, sinon « [À compléter] ». */
export function V({ value }: { value: string | null | undefined }) {
  return value ? <>{value}</> : <span className="todo">{TO_COMPLETE}</span>;
}

export function LegalPage({
  title,
  label,
  path,
  image,
  intro,
  sections,
}: {
  title: ReactNode;
  label: string;
  path: string;
  image: PhotoKey;
  intro: string;
  sections: { id: string; title: string; body: ReactNode }[];
}) {
  return (
    <>
      <PageHero
        label={label}
        crumbs={[
          { name: "Accueil", path: "/" },
          { name: label, path },
        ]}
        title={title}
        intro={intro}
        image={image}
      />
      <section className="section theme-light" data-chapter="Contenu">
        <div className="container legal">
          <nav className="legal__toc" aria-label="Sommaire">
            <p className="label" style={{ marginBottom: 6 }}>
              Sommaire
            </p>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                {s.title}
              </a>
            ))}
          </nav>
          <div className="legal__body">
            <div className="alert alert--warn" role="note" style={{ marginBottom: 40 }}>
              <InfoIcon />
              <div>
                <strong>Texte provisoire</strong>
                Ce document est un modèle à compléter et n&apos;a pas fait l&apos;objet d&apos;une validation juridique.
                Les mentions « {TO_COMPLETE} » doivent être renseignées et le texte relu par un professionnel avant
                publication.
              </div>
            </div>
            {sections.map((s) => (
              <div key={s.id}>
                <h2 id={s.id}>{s.title}</h2>
                {s.body}
              </div>
            ))}
            <p style={{ marginTop: 56, fontSize: 14 }}>
              Dernière mise à jour : <V value={null} />
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
