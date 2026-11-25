"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { LINES, WA_MESSAGES, type LineKey } from "@/lib/content";
import { whatsappUrl } from "@/lib/whatsapp";

export function Catalog({ line }: { line: LineKey }) {
  const data = LINES[line];
  const [active, setActive] = useState<string>("Todos");
  const filters = useMemo(() => ["Todos", ...data.categories], [data.categories]);
  const items = useMemo(
    () =>
      active === "Todos"
        ? data.categories
        : data.categories.filter((category) => category === active),
    [active, data.categories],
  );

  return (
    <section className="section surface-cream" aria-labelledby="catalogo">
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow">{data.tagline}</p>
          <h2 className="h2" id="catalogo">
            Explora por categoría.
          </h2>
          <p className="lead">{data.description}</p>
        </div>

        <div className="filter-bar" role="group" aria-label="Filtrar categorías">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className="filter-chip"
              aria-pressed={active === filter}
              onClick={() => setActive(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <p className="filter-status" aria-live="polite">
          {items.length} {items.length === 1 ? "categoría" : "categorías"}
          {active !== "Todos" ? ` · ${active}` : ""}
        </p>

        <div className="catalog-grid">
          {items.map((category, index) => (
            <article className="catalog-card" key={category}>
              <div
                className="catalog-card__media"
                role="img"
                aria-label={`Detalle geométrico para ${category}`}
                style={{ "--pattern": `url("${data.pattern}")`, backgroundPosition: `${(index * 17) % 100}% center` } as CSSProperties}
              />
              <div className="catalog-card__body">
                <p className="craft-note" style={{ marginBottom: 0 }}>
                  {data.title}
                </p>
                <h3>{category}</h3>
                <p>Haznos una consulta y te contamos disponibilidad, medidas y detalles.</p>
                <a
                  className="btn btn--secondary btn--block btn--sm"
                  href={whatsappUrl(WA_MESSAGES.product(category))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
