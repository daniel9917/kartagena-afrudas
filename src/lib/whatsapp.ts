import { BRAND } from "@/lib/content";

const BASE = `https://wa.me/${BRAND.whatsappInternational}`;

export function whatsappUrl(message?: string): string {
  if (!message) return BASE;
  return `${BASE}?text=${encodeURIComponent(message)}`;
}
