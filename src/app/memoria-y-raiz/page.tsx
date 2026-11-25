import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { MANIFESTO } from "@/lib/content";

export const metadata: Metadata = {
  title: "Memoria y Raíz",
  description: MANIFESTO.body,
  alternates: { canonical: "/memoria-y-raiz" },
};

export default function MemoriaYRaizPage() {
  return (
    <>
      <PageHero eyebrow="Kartagena Afrudas" title={MANIFESTO.heading} />

      <section className="section surface-sage" aria-labelledby="manifiesto-completo">
        <div className="wrap manifesto__grid">
          <div>
            <p className="eyebrow">Manifiesto</p>
            <h2 className="h2" id="manifiesto-completo">
              Un archivo vivo.
            </h2>
            <p className="lead">{MANIFESTO.body}</p>
            <blockquote className="pull-quote">“{MANIFESTO.quote}”</blockquote>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <Link className="btn btn--primary" href="/linea-creacion">
                Ver Línea Creación
              </Link>
              <Link className="btn btn--secondary" href="/linea-cuidado">
                Ver Línea Cuidado
              </Link>
            </div>
          </div>
          <div className="manifesto__art">
            <Image
              src="/assets/brand/ka-primary-on-sage_v1.webp"
              alt="Arte principal de Kartagena Afrudas con corazón trenzado, bordado geométrico y tipografía de la marca"
              width={894}
              height={959}
            />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
