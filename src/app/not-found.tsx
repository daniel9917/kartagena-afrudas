import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found surface-cream">
      <p className="eyebrow" style={{ justifySelf: "center" }}>
        404
      </p>
      <h1 className="h1" style={{ justifySelf: "center" }}>
        Esta raíz no existe.
      </h1>
      <p className="lead" style={{ justifySelf: "center" }}>
        Vuelve al inicio para seguir explorando.
      </p>
      <div style={{ justifySelf: "center" }}>
        <Link className="btn btn--primary" href="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
