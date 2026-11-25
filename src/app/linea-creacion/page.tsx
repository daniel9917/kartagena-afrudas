import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { LINES } from "@/lib/content";

const data = LINES.creacion;

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  alternates: { canonical: "/linea-creacion" },
};

export default function LineaCreacionPage() {
  return (
    <>
      <PageHero eyebrow={data.tagline} title={data.title}>
        <p className="lead">{data.description}</p>
      </PageHero>
      <Catalog line="creacion" />
      <CtaBand />
    </>
  );
}
