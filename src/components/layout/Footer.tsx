import Link from "next/link";
import { legalNav, nav, site } from "@/config/site";
import { services } from "@/config/services";
import { whatsappUrl } from "@/lib/links";
import CurrentYear from "./CurrentYear";
import MotionToggle from "./MotionToggle";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          {/* Emplacement du logo (version inversée pour fond sombre) */}
          <img src="/brand/ln-digital-horizontal-inverse.svg" alt={site.name} width={180} height={38} />
          <p className="muted" style={{ maxWidth: "34ch" }}>
            {site.baseline}
          </p>
          <p className="label">
            Zone d&apos;activité <span className="accent-dot">·</span> {site.zone}
          </p>
        </div>

        <div>
          <h2>Navigation</h2>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Services</h2>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Contact</h2>
          <ul>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                WhatsApp · {site.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                Instagram · {site.instagram.handle}
              </a>
            </li>
            <li>
              {site.email ? (
                <a href={`mailto:${site.email}`}>{site.email}</a>
              ) : (
                <span className="muted">E-mail professionnel : bientôt disponible</span>
              )}
            </li>
            <li>
              <Link href="/contact#devis">Demander un devis</Link>
            </li>
          </ul>
          <h2 style={{ marginTop: 36 }}>Informations</h2>
          <ul>
            {legalNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__wordmark" data-reveal aria-hidden="true">
        <img src="/brand/ln-digital-nom-seul-inverse.svg" alt="" width={1400} height={300} />
      </div>

      <div className="container">
        <div className="footer__bottom">
          <span>
            © <CurrentYear /> {site.name}. Tous droits réservés.
          </span>
          <MotionToggle />
          <span>Photographies : Unsplash (licence Unsplash).</span>
        </div>
      </div>
    </footer>
  );
}
