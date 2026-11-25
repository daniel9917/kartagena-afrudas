import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { LineCard } from "@/components/LineCard";
import { Steps } from "@/components/Steps";
import { BRAND, HERO, MANIFESTO } from "@/lib/content";

export const metadata: Metadata = {
  title: `${BRAND.name} — Cuidado que empieza en la raíz.`,
  description: HERO.subtitle,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <section className="hero surface-cream">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">{BRAND.name}</p>
            <h1 className="h1 hero__title">{HERO.title}</h1>
            <p className="lead hero__subtitle">{HERO.subtitle}</p>
            <div className="hero__actions">
              <Link className="btn btn--primary" href={HERO.primaryCta.href}>
                {HERO.primaryCta.label}
              </Link>
              <Link className="btn btn--secondary" href={HERO.secondaryCta.href}>
                {HERO.secondaryCta.label}
              </Link>
            </div>
          </div>
          <div className="hero__art">
            <Image
              src="/assets/brand/ka-primary-on-sage_v1.webp"
              alt="Símbolo de Kartagena Afrudas: corazón trenzado con bordado geométrico y el nombre de la marca"
              width={894}
              height={959}
              priority
            />
            <p className="craft-note hero__caption">Memoria que se lleva puesta.</p>
          </div>
        </div>
      </section>

      <section className="section surface-cream" aria-labelledby="lineas">
        <div className="wrap">
          <div className="section-heading">
            <p className="eyebrow">Dos caminos, una raíz</p>
            <h2 className="h2" id="lineas">
              Creación y cuidado.
            </h2>
            <p className="lead">Dos formas de habitar el lenguaje de las trenzas.</p>
          </div>
          <div className="line-grid">
            <LineCard line="creacion" />
            <LineCard line="cuidado" />
          </div>
        </div>
      </section>

      <section className="section surface-sage" aria-labelledby="manifiesto-resumen">
        <div className="wrap manifesto__grid">
          <div>
            <p className="eyebrow">Memoria y Raíz</p>
            <h2 className="h2" id="manifiesto-resumen">
              {MANIFESTO.heading}
            </h2>
            <p className="body-copy">
              En Kartagena Afrudas entendemos cada trenza, cada puntada y cada ritual como un archivo vivo.
            </p>
            <Link className="btn btn--secondary" href="/memoria-y-raiz" style={{ marginTop: "1.5rem" }}>
              Leer el manifiesto
            </Link>
          </div>
          <div className="manifesto__art">
            <Image
              src="/assets/brand/ka-isotype-transparent_v2.webp"
              alt="Isotype de Kartagena Afrudas: corazón trenzado simplificado"
              width={720}
              height={720}
            />
          </div>
        </div>
      </section>

      <Steps />
      <CtaBand />
    </>
  );
}
