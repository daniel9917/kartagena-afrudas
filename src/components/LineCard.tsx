import Link from "next/link";
import type { CSSProperties } from "react";
import { LINES, type LineKey } from "@/lib/content";

export function LineCard({ line }: { line: LineKey }) {
  const data = LINES[line];

  return (
    <article className="line-card">
      <div
        className="line-card__media"
        role="img"
        aria-label={`Patrón geométrico de ${data.title}`}
        style={{ "--pattern": `url("${data.pattern}")` } as CSSProperties}
      />
      <div className="line-card__body">
        <p className="eyebrow">{data.tagline}</p>
        <h2 className="line-card__title h3">{data.title}</h2>
        <p className="body-copy">{data.description}</p>
        <ul className="tag-list">
          {data.categories.map((category) => (
            <li className="tag" key={category}>
              {category}
            </li>
          ))}
        </ul>
        <Link className="btn btn--primary btn--block" href={data.href}>
          {data.cta}
        </Link>
      </div>
    </article>
  );
}
