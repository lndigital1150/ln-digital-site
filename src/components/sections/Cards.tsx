import Link from "next/link";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/Icons";
import { formatPrice, TO_DEFINE, type Offer } from "@/config/pricing";
import type { Project } from "@/config/projects";
import { photos } from "@/config/images";
import { orderUrl, questionUrl, quoteUrl } from "@/lib/links";

/* ---------- Carte tarif ---------- */
export function PriceCard({ offer, detailed = false }: { offer: Offer; detailed?: boolean }) {
  const List = ({ title, items }: { title: string; items: string[] }) => (
    <div className="details-block">
      <h4>{title}</h4>
      <ul>
        {items.map((it) => (
          <li key={it}>{it === TO_DEFINE ? <span className="todo">{TO_DEFINE}</span> : it}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <article className="price-card" id={offer.id} data-tilt="3">
      {offer.featured && <span className="price-card__badge">Tarif fixe</span>}
      <Photo name={offer.image} zoom sizes="(max-width: 760px) 100vw, 33vw" />
      <div className="price-card__body">
        <div className="stack" style={{ gap: 8 }}>
          <h3 className="h3">{offer.name}</h3>
          <p className="muted" style={{ fontSize: 15 }}>
            {offer.summary}
          </p>
        </div>
        <div className="price-card__price" aria-label={`Prix : ${formatPrice(offer)}`}>
          {offer.prefix && <span className="price-card__prefix">{offer.prefix}</span>}
          <span className="price-card__amount">{offer.priceLabel}</span>
          <span className="price-card__unit">
            {offer.recurring === "month" ? "/ mois" : ""} · {offer.unit}
          </span>
        </div>
        <ul className="checklist">
          {(detailed ? offer.includes : offer.includes.slice(0, 4)).map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
        {detailed && (
          <>
            <List title="Limites" items={offer.limits} />
            <List title="Options disponibles" items={offer.options} />
            <List title="Suppléments éventuels" items={offer.supplements} />
            <div className="details-block">
              <h4>Mode de commande</h4>
              <ul>
                <li>{offer.mode === "direct" ? "Achat direct en ligne (paiement sécurisé)" : "Sur demande de devis"}</li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="price-card__foot">
        {offer.mode === "direct" && (
          <Button href={orderUrl(offer.id)} size="small" magnetic={false}>
            Acheter cette prestation
          </Button>
        )}
        <Button
          href={quoteUrl(offer.serviceSlug)}
          size="small"
          variant={offer.mode === "direct" ? "ghost" : "primary"}
          magnetic={false}
        >
          Demander un devis
        </Button>
        {detailed && (
          <Button href={questionUrl(offer.name)} size="small" variant="ghost" icon="whatsapp" magnetic={false}>
            Poser une question
          </Button>
        )}
      </div>
    </article>
  );
}

/* ---------- Maquette navigateur (composition photo + interface fictive) ---------- */
export function MockBrowser({ project, image }: { project: Project; image?: Project["cover"] }) {
  const slugUrl = `demo-${project.slug.split("-").slice(0, 2).join("-")}.exemple`;
  return (
    <div className="mock-browser" aria-label={`Maquette de démonstration : ${project.title}`} role="img">
      <div className="mock-browser__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="mock-browser__url">{slugUrl}</span>
      </div>
      <div className="mock-browser__screen">
        <Photo name={image ?? project.cover} sizes="(max-width: 900px) 100vw, 60vw" alt="" />
        <div className={`mock-site${project.mock.tone === "light" ? " mock-site--light" : ""}`} aria-hidden="true">
          <div className="mock-site__nav">
            <span>{project.mock.brand}</span>
            <span>
              <span>Accueil</span>
              <span>Services</span>
              <span>Contact</span>
            </span>
          </div>
          <div className="mock-site__hero">
            <strong>{project.mock.headline}</strong>
            <span>{project.mock.cta}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MockPhone({ project, image }: { project: Project; image: Project["cover"] }) {
  return (
    <div className="mock-phone" role="img" aria-label={`Maquette mobile de démonstration : ${project.title}`}>
      <Photo name={image} sizes="240px" alt="" />
      <div className="mock-phone__ui" aria-hidden="true">
        <b>{project.mock.headline}</b>
        <small>{project.mock.brand}</small>
      </div>
    </div>
  );
}

/* ---------- Carte projet ---------- */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card" data-reveal>
      <Link href={`/realisations/${project.slug}`} data-cursor="Voir" aria-label={`Voir le projet : ${project.title}`}>
        <Photo
          name={project.cover}
          zoom
          sizes="(max-width: 800px) 100vw, 50vw"
          tag="Démo fictive"
          demo
          alt={photos[project.cover].alt}
        />
      </Link>
      <div className="project-card__meta">
        <span className="label label--muted">
          0{index + 1} — {project.sector}
        </span>
        <span className="label">{project.category}</span>
      </div>
      <h3>
        <Link href={`/realisations/${project.slug}`}>{project.title}</Link>
      </h3>
      <p className="muted">{project.short}</p>
      <div className="tags">
        {project.services.map((s) => (
          <span key={s} className="tag">
            {s}
          </span>
        ))}
      </div>
      <Link href={`/realisations/${project.slug}`} className="link-arrow">
        Découvrir le projet <ArrowUpRight />
      </Link>
    </article>
  );
}
