import Image from "next/image";
import Link from "next/link";
import { BRAND, FOOTER, NAV_LINKS } from "@/lib/content";
import { whatsappUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="site-footer surface-espresso">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Image
              src="/assets/brand/ka-isotype_mono-cream_v2.webp"
              alt=""
              width={64}
              height={64}
              style={{ opacity: 0.38, marginBottom: "1rem" }}
            />
            <p className="footer-brand">{FOOTER.brandLine}</p>
            <p className="craft-note" style={{ color: "var(--ochre)", marginTop: "1.25rem" }}>
              {BRAND.name}
            </p>
          </div>
          <div>
            <ul className="footer-links">
              <li>
                <a href={BRAND.instagram.href} target="_blank" rel="noopener noreferrer">
                  Instagram: {BRAND.instagram.label}
                </a>
              </li>
              <li>
                <a href={BRAND.tiktok.href} target="_blank" rel="noopener noreferrer">
                  TikTok: {BRAND.tiktok.label}
                </a>
              </li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  WhatsApp: {BRAND.whatsappNumber}
                </a>
              </li>
            </ul>
            <nav aria-label="Enlaces del pie de página" style={{ marginTop: "1.25rem" }}>
              <ul className="footer-links">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <p className="footer-note">{FOOTER.note}</p>
      </div>
    </footer>
  );
}
