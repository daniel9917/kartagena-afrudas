export const BRAND = {
  name: "Kartagena Afrudas",
  whatsappNumber: "3003230109",
  whatsappInternational: "573003230109",
  instagram: {
    label: "@Kartagenaafrudas",
    href: "https://www.instagram.com/kartagenaafrudas/",
  },
  tiktok: {
    // Etiqueta legacy solicitada; el enlace apunta al perfil confirmado.
    label: "Kartagina_afrudas",
    href: "https://www.tiktok.com/@kartagena_afrudas?lang=en",
  },
} as const;

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Línea Creación", href: "/linea-creacion" },
  { label: "Línea Cuidado", href: "/linea-cuidado" },
  { label: "Memoria y Raíz", href: "/memoria-y-raiz" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const HERO = {
  title: "Cuidado que empieza en la raíz.",
  subtitle:
    "Resguardamos memoria y ancestralidad. Llevamos el lenguaje de las trenzas al tejido, al bordado y a la moda.",
  primaryCta: { label: "Explorar Línea Creación", href: "/linea-creacion" },
  secondaryCta: { label: "Descubrir Línea Cuidado", href: "/linea-cuidado" },
} as const;

export type LineKey = "creacion" | "cuidado";

export const LINES: Record<
  LineKey,
  {
    title: string;
    tagline: string;
    description: string;
    categories: readonly string[];
    cta: string;
    href: string;
    pattern: string;
  }
> = {
  creacion: {
    title: "Línea Creación",
    tagline: "Comparte, Crea, Aprende.",
    description:
      "Piezas hechas a mano que transforman la memoria trenzada en diseño cotidiano y textil.",
    categories: [
      "Bolsos y Mochilas",
      "Ropa Tejida",
      "Accesorios",
      "Turbantes",
      "Piezas decorativas",
      "Crochet y Macramé",
    ],
    cta: "Ver Línea Creación",
    href: "/linea-creacion",
    pattern: "/assets/patterns/pattern-creacion.svg",
  },
  cuidado: {
    title: "Línea Cuidado",
    tagline: "Cuidado capilar, bienestar y conexión con tus raíces.",
    description:
      "Rituales, técnicas y saberes dedicados a nutrir el cabello, honrar la identidad y cultivar el autocuidado.",
    categories: [
      "Cuidado capilar",
      "Trenzas y peinados",
      "Hidrataciones",
      "Productos naturales",
      "Autocuidados",
      "Asesorías y talleres",
    ],
    cta: "Ver Línea Cuidado",
    href: "/linea-cuidado",
    pattern: "/assets/patterns/pattern-cuidado.svg",
  },
} as const;

export const MANIFESTO = {
  heading: "Resguardamos Memoria y Ancestralidad",
  body: "En Kartagena Afrudas entendemos cada trenza, cada puntada y cada ritual como un archivo vivo. Llevamos el lenguaje de las trenzas al tejido, al bordado y a la moda, uniendo oficio artesanal y cuidado capilar para celebrar la raíz, el territorio y la autonomía de quienes crean y habitan su propio cuerpo.",
  quote: "cada trenza, cada puntada y cada ritual como un archivo vivo.",
} as const;

export const STEPS = [
  {
    title: "Elige tu pieza o servicio",
    body: "Explora Línea Creación o Línea Cuidado y encuentra lo que resuena contigo.",
  },
  {
    title: "Escríbenos o agenda",
    body: "Coordina detalles, medidas, disponibilidad o citas directamente por WhatsApp.",
  },
  {
    title: "Recibe o vive la experiencia",
    body: "Disfruta creaciones hechas con dedicación o sesiones pensadas para tu bienestar.",
  },
] as const;

export const FOOTER = {
  brandLine:
    "Kartagena Afrudas — Cuidado que empieza en la raíz. Resguardamos memoria y ancestralidad.",
  note: "Envíos, reservas y consultas personalizadas por canal directo.",
} as const;

export const WA_MESSAGES = {
  general: "Hola Kartagena Afrudas, quisiera más información.",
  product: (name: string) => `Hola Kartagena Afrudas, me interesa: ${name}. ¿Podrían contarme más detalles?`,
  service: (name: string) => `Hola Kartagena Afrudas, me gustaría agendar: ${name}.`,
  contact: (name: string, interest: string, message: string) =>
    `Hola Kartagena Afrudas. Mi nombre es ${name}. Me interesa ${interest}. ${message}`,
} as const;
