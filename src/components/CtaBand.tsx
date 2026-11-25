import Link from "next/link";
import { whatsappUrl } from "@/lib/whatsapp";

export function CtaBand() {
  return (
    <section className="section--tight surface-terracotta cta-band">
      <div className="wrap cta-band__inner">
        <div>
          <p className="eyebrow" style={{ color: "var(--cream)" }}>
            Canal directo
          </p>
          <h2>Cuéntanos qué estás buscando.</h2>
          <p className="lead">Coordina detalles, medidas, disponibilidad o citas directamente por WhatsApp.</p>
        </div>
        <div className="cta-band__actions">
          <a className="btn btn--light" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            Escríbenos por WhatsApp
          </a>
          <Link className="btn btn--outline-light" href="/contacto">
            Ver Contacto
          </Link>
        </div>
      </div>
    </section>
  );
}
