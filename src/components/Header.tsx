"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BRAND, NAV_LINKS } from "@/lib/content";
import { whatsappUrl } from "@/lib/whatsapp";

const waHref = whatsappUrl();

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", open);
    if (!open) return;

    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;

      const focusables = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("mobile-menu-open");
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand-lockup" aria-label={`${BRAND.name} — Inicio`}>
          {/* Recorte del isotype generado desde logo/logo.png por scripts/prepare-assets.mjs */}
          <Image className="brand-mark" src="/assets/brand/ka-isotype-transparent_v2.webp" alt="" width={44} height={44} priority />
          <span className="brand-wordmark">
            Kartagena
            <br />
            Afrudas
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a className="btn btn--primary btn--sm header-wa" href={waHref} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="mobile-menu" id="menu-movil" role="dialog" aria-modal="true" aria-label="Menú de navegación" ref={menuRef}>
          <nav aria-label="Navegación móvil">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-menu__link"
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </nav>
          <a className="btn btn--primary btn--block" href={waHref} target="_blank" rel="noopener noreferrer">
            Escríbenos por WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
