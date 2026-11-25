import type { Metadata, Viewport } from "next";
import { Courier_Prime, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BRAND, FOOTER } from "@/lib/content";
import { whatsappUrl } from "@/lib/whatsapp";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-fraunces",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-jakarta",
});

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-courier",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.name} — Cuidado que empieza en la raíz.`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Resguardamos memoria y ancestralidad. Llevamos el lenguaje de las trenzas al tejido, al bordado y a la moda.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: BRAND.name,
    title: `${BRAND.name} — Cuidado que empieza en la raíz.`,
    description: FOOTER.brandLine,
    images: [{ url: "/assets/brand/og-image-1200x630.jpg", width: 1200, height: 630, alt: BRAND.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — Cuidado que empieza en la raíz.`,
    description: FOOTER.brandLine,
    images: ["/assets/brand/og-image-1200x630.jpg"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#F3E3D0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${fraunces.variable} ${jakarta.variable} ${courier.variable}`}>
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <WhatsAppButton href={whatsappUrl()} />
      </body>
    </html>
  );
}
