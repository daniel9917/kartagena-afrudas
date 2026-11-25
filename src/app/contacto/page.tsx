import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { BRAND, FOOTER, HERO } from "@/lib/content";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto",
  description: FOOTER.note,
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <PageHero eyebrow="Canal directo" title="Hablemos.">
        <p className="lead">{HERO.subtitle}</p>
      </PageHero>

      <section className="section surface-cream" aria-labelledby="canales">
        <div className="wrap">
          <div className="section-heading">
            <p className="eyebrow">Escríbenos o agenda</p>
            <h2 className="h2" id="canales">
              Coordina directamente con nosotros.
            </h2>
          </div>
          <div className="channel-grid">
            <article className="channel-card">
              <h2>Instagram</h2>
              <p>{BRAND.instagram.label}</p>
              <a href={BRAND.instagram.href} target="_blank" rel="noopener noreferrer">
                Abrir Instagram →
              </a>
            </article>
            <article className="channel-card">
              <h2>TikTok</h2>
              <p>{BRAND.tiktok.label}</p>
              <a href={BRAND.tiktok.href} target="_blank" rel="noopener noreferrer">
                Abrir TikTok →
              </a>
            </article>
            <article className="channel-card">
              <h2>WhatsApp</h2>
              <p>{BRAND.whatsappNumber}</p>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                Escribir por WhatsApp →
              </a>
            </article>
          </div>
          <p className="craft-note" style={{ marginTop: "1.5rem" }}>
            {FOOTER.note}
          </p>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
