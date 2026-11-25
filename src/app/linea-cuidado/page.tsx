import type { Metadata } from "next";
import { BookingPlanner } from "@/components/BookingPlanner";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { LINES } from "@/lib/content";

const data = LINES.cuidado;

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  alternates: { canonical: "/linea-cuidado" },
};

export default function LineaCuidadoPage() {
  return (
    <>
      <PageHero eyebrow={data.tagline} title={data.title}>
        <p className="lead">{data.description}</p>
      </PageHero>
      <BookingPlanner />
      <CtaBand />
    </>
  );
}
