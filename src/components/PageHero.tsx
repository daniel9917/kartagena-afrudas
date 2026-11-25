import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="page-hero surface-cream">
      <div className="wrap page-hero__inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="h1">{title}</h1>
        {children}
      </div>
    </section>
  );
}
