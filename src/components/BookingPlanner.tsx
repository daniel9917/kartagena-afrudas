"use client";

import { useState } from "react";
import { LINES, WA_MESSAGES } from "@/lib/content";
import { whatsappUrl } from "@/lib/whatsapp";

export function BookingPlanner() {
  const services = LINES.cuidado.categories;
  const [selected, setSelected] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");

  const message = selected
    ? [
        WA_MESSAGES.service(selected),
        name ? `Mi nombre es ${name}.` : "",
        date ? `Fecha preferida: ${date}.` : "",
      ]
        .filter(Boolean)
        .join(" ")
    : "";

  return (
    <section className="section surface-sage" aria-labelledby="agenda">
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow">Agenda tu sesión</p>
          <h2 className="h2" id="agenda">
            Elige un servicio y escríbenos.
          </h2>
          <p className="lead">
            Coordina detalles, medidas, disponibilidad o citas directamente por WhatsApp.
          </p>
        </div>

        <div className="service-list" style={{ marginBottom: "var(--space-6)" }}>
          {services.map((service) => (
            <article
              className={`service-card${selected === service ? " service-card--selected" : ""}`}
              key={service}
            >
              <div>
                <h3>{service}</h3>
                <p>Consulta disponibilidad y detalles de esta sesión por canal directo.</p>
              </div>
              <button
                type="button"
                className={`btn ${selected === service ? "btn--primary" : "btn--secondary"} btn--sm`}
                aria-pressed={selected === service}
                onClick={() => setSelected(service)}
              >
                {selected === service ? "Seleccionado" : "Seleccionar"}
              </button>
            </article>
          ))}
        </div>

        <div className="booking surface-espresso">
          <div>
            <p className="eyebrow">Paso 2</p>
            <h2 className="h2">Cuéntanos tu preferencia.</h2>
            <p className="body-copy" style={{ color: "var(--cream)", marginBottom: 0 }}>
              Los datos que ingreses se incluirán en el mensaje de WhatsApp. No se guardan en este sitio.
            </p>
          </div>
          <form
            className="form-grid"
            onSubmit={(event) => {
              event.preventDefault();
              if (!selected) return;
              window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
            }}
          >
            <div className="form-grid form-grid--two">
              <div className="field">
                <label htmlFor="booking-name">Tu nombre</label>
                <input
                  id="booking-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Opcional"
                />
              </div>
              <div className="field">
                <label htmlFor="booking-date">Fecha preferida</label>
                <input
                  id="booking-date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <span className="field-hint">
                {selected ? `Servicio seleccionado: ${selected}` : "Selecciona un servicio de la lista anterior."}
              </span>
            </div>
            <button
              type="submit"
              className="btn btn--primary btn--block"
              aria-disabled={!selected}
              disabled={!selected}
            >
              Continuar por WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
