"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const close = () => setMenuOpen(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/services/holiday-packages" },
    { label: "Flights", href: "/services/flight-tickets" },
    { label: "Visas", href: "/services/visa-services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // Header is solid when scrolled OR when menu is open
  const solidHeader = scrolled || menuOpen;
  
  // These pages have ivory/white hero sections, so they need dark text immediately
  const isLightHeroPage = pathname === "/about" || pathname === "/contact" || pathname === "/services";
  const useDarkText = solidHeader || isLightHeroPage;

  return (
    <>
      <style>{`
        /* ── Navbar container ── */
        .navbar-nav {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 2.5rem;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        @media (max-width: 767px) {
          .navbar-nav {
            padding: 0 1.25rem;
            height: 64px;
          }
        }

        /* ── Logo ── */
        .navbar-logo-img {
          height: auto;
          width: auto;
          max-width: 120px;
        }
        @media (max-width: 767px) {
          .navbar-logo-img {
            max-width: 95px;
          }
        }

        /* ── Desktop links ── */
        .navbar-desktop-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }
        @media (max-width: 767px) {
          .navbar-desktop-links {
            display: none;
          }
        }

        /* ── Desktop CTA ── */
        .navbar-desktop-cta {
          display: inline-flex;
        }
        @media (max-width: 767px) {
          .navbar-desktop-cta {
            display: none;
          }
        }

        /* ── Burger button ── */
        .navbar-burger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          /* Minimum 44×44 touch target */
          min-width: 44px;
          min-height: 44px;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 5px;
        }
        @media (max-width: 767px) {
          .navbar-burger {
            display: flex;
          }
        }

        /* ── Mobile overlay ── */
        .mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 9998;
          background: var(--ivory);
          flex-direction: column;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        @media (max-width: 767px) {
          .mobile-overlay {
            display: flex;
          }
        }

        /* ── Mobile overlay top bar ── */
        .mobile-overlay-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.25rem;
          height: 64px;
          flex-shrink: 0;
          border-bottom: 1px solid rgba(5,167,255,0.15);
        }

        /* ── Mobile close button ── */
        .mobile-close-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          min-width: 44px;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--charcoal);
        }

        /* ── Mobile nav links ── */
        .mobile-nav-link {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(1.75rem, 7vw, 2.75rem);
          font-weight: 300;
          color: var(--charcoal);
          text-decoration: none;
          display: flex;
          align-items: baseline;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          transition: color 0.2s ease;
        }
        .mobile-nav-link:last-child {
          border-bottom: none;
        }
        .mobile-nav-link.active {
          color: var(--gold);
        }
        .mobile-nav-link:active {
          color: var(--gold);
        }
        .mobile-nav-num {
          font-family: var(--font-body), system-ui, sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--charcoal-muted);
          flex-shrink: 0;
        }

        /* ── Mobile contact strip ── */
        .mobile-contact-strip {
          background: var(--charcoal);
          padding: 1.5rem 1.25rem;
          margin-top: auto;
          flex-shrink: 0;
        }
      `}</style>

      {/* ═══ HEADER BAR ═══ */}
      <header
        id="site-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          transition: "background 0.4s ease, border-color 0.4s ease",
          background: solidHeader ? "rgba(248,250,252,0.97)" : "transparent",
          backdropFilter: solidHeader ? "blur(16px)" : "none",
          borderBottom: solidHeader
            ? "1px solid rgba(5,167,255,0.2)"
            : "1px solid transparent",
        }}
      >
        <nav className="navbar-nav">

          {/* LOGO */}
          <Link href="/" onClick={close} style={{ flexShrink: 0, lineHeight: 0 }}>
            <Image
              src="/logo.png"
              alt="EazyFly Travels"
              width={120}
              height={42}
              priority
              className="navbar-logo-img"
            />
          </Link>

          {/* DESKTOP LINKS */}
          <div className="navbar-desktop-links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontWeight: 300,
                  fontSize: "0.625rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color:
                    pathname === link.href
                      ? "var(--gold)"
                      : useDarkText
                      ? "var(--charcoal)"
                      : "rgba(245,240,232,0.9)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--gold)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    pathname === link.href
                      ? "var(--gold)"
                      : useDarkText
                      ? "var(--charcoal)"
                      : "rgba(245,240,232,0.9)")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* DESKTOP CTA */}
          <a
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-desktop-cta"
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontWeight: 300,
              fontSize: "0.625rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: useDarkText ? "var(--charcoal)" : "var(--ivory)",
              borderBottom: "1px solid var(--gold)",
              paddingBottom: "2px",
              textDecoration: "none",
              transition: "color 0.3s",
              whiteSpace: "nowrap",
            }}
          >
            Enquire Now
          </a>

          {/* MOBILE BURGER / CLOSE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="navbar-burger"
          >
            {menuOpen ? (
              /* × close icon */
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="var(--charcoal)"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="3" y1="3" x2="17" y2="17" />
                <line x1="17" y1="3" x2="3" y2="17" />
              </svg>
            ) : (
              /* Hamburger lines */
              <svg
                width="24"
                height="16"
                viewBox="0 0 24 16"
                fill="none"
                stroke={useDarkText ? "var(--charcoal)" : "var(--ivory)"}
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="0" y1="1" x2="24" y2="1" />
                <line x1="6" y1="8" x2="24" y2="8" />
                <line x1="0" y1="15" x2="24" y2="15" />
              </svg>
            )}
          </button>

        </nav>
      </header>

      {/* ═══ MOBILE FULL-SCREEN OVERLAY ═══ */}
      <div
        className="mobile-overlay"
        style={{
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition:
            "opacity 0.35s ease, visibility 0.35s ease, transform 0.35s ease",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {/* Top bar with logo + close */}
        <div className="mobile-overlay-topbar">
          <Link href="/" onClick={close} style={{ lineHeight: 0 }}>
            <Image
              src="/logo.png"
              alt="EazyFly Travels"
              width={95}
              height={33}
              style={{ height: "auto", width: "auto", maxWidth: 95 }}
            />
          </Link>
          <button
            className="mobile-close-btn"
            onClick={close}
            aria-label="Close menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              stroke="var(--charcoal)"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="3" y1="3" x2="19" y2="19" />
              <line x1="19" y1="3" x2="3" y2="19" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ padding: "1.5rem 1.25rem 0", flex: 1 }}>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className={`mobile-nav-link${pathname === link.href ? " active" : ""}`}
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(24px)",
                transition: `opacity 0.4s ease ${i * 55 + 100}ms, transform 0.4s ease ${i * 55 + 100}ms`,
              }}
            >
              <span className="mobile-nav-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom contact strip */}
        <div
          className="mobile-contact-strip"
          style={{
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 0.4s ease 450ms",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--charcoal-muted)",
              marginBottom: "1rem",
            }}
          >
            Quick Contact
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <a
              href={`tel:${siteConfig.phone}`}
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "1.25rem",
                fontWeight: 300,
                color: "var(--ivory)",
                textDecoration: "none",
              }}
            >
              +91 {siteConfig.phone}
            </a>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury btn-luxury-light"
              style={{ fontSize: "0.7rem", marginTop: "0.5rem" }}
            >
              Enquire via WhatsApp <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}