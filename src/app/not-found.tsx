import Button from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";

export default function NotFound() {
  return (
    <section className="page-hero theme-dark" style={{ minHeight: "100svh" }}>
      <div className="container page-hero__grid">
        <div className="stack" style={{ gap: 28 }}>
          <p className="label">Erreur 404</p>
          <h1 className="display">
            Page <em>introuvable.</em>
          </h1>
          <p className="lead">La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
          <div className="btn-row">
            <Button href="/">Retour à l&apos;accueil</Button>
            <Button href="/contact" variant="ghost">
              Nous contacter
            </Button>
          </div>
        </div>
        <Photo name="stepUnderstand" className="ratio-4-5" sizes="40vw" />
      </div>
    </section>
  );
}
