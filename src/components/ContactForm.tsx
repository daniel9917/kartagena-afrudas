"use client";

import { useState } from "react";
import { WA_MESSAGES } from "@/lib/content";
import { whatsappUrl } from "@/lib/whatsapp";

export function ContactForm() {
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("Línea Creación");
  const [message, setMessage] = useState("");

  return (
    <section className="section surface-sage" aria-labelledby="formulario-contacto">
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow">Escríbenos</p>
          <h2 className="h2" id="formulario-contacto">
            Cuéntanos qué necesitas.
          </h2>
          <p className="lead">El formulario abre WhatsApp con tu mensaje listo para enviar.</p>
        </div>
        <form
          className="form-grid"
          style={{ maxWidth: "720px" }}
          onSubmit={(event) => {
            event.preventDefault();
            const text = WA_MESSAGES.contact(name || "Hola", interest, message.trim() || "Quisiera más información.");
            window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
          }}
        >
          <div className="field">
            <label htmlFor="contact-name">Tu nombre</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="contact-interest">Te interesa</label>
            <select
              id="contact-interest"
              name="interest"
              value={interest}
              onChange={(event) => setInterest(event.target.value)}
            >
              <option>Línea Creación</option>
              <option>Línea Cuidado</option>
              <option>Memoria y Raíz</option>
              <option>Información general</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="contact-message">Tu mensaje</label>
            <textarea
              id="contact-message"
              name="message"
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Cuéntanos qué estás buscando..."
            />
          </div>
          <button type="submit" className="btn btn--primary">
            Enviar por WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
