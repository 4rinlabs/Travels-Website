"use client";

import Link from "next/link";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--charcoal)",
        color: "var(--ivory)",
      }}
    >
      {/* Main content */}
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "5rem 2.5rem 4rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "3rem",
        }}
      >
        {/* Brand */}
        <div style={{ gridColumn: "span 1" }}>
          <p
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "1.5rem",
              fontWeight: 300,
              color: "var(--ivory)",
              marginBottom: "1rem",
            }}
          >
            {siteConfig.companyName}
          </p>
          <div
            style={{
              width: "32px",
              height: "1px",
              background: "var(--gold)",
              marginBottom: "1.25rem",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontWeight: 300,
              fontSize: "0.8125rem",
              color: "var(--charcoal-muted)",
              lineHeight: 1.8,
              marginBottom: "1.75rem",
              maxWidth: "240px",
            }}
          >
            Crafting thoughtful journeys for discerning travellers since our founding.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "1.25rem" }}>
            {siteConfig.social.instagram && (
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: "var(--charcoal-muted)", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--charcoal-muted)")}
              >
                <FaInstagram size={16} />
              </a>
            )}
            {siteConfig.social.facebook && (
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{ color: "var(--charcoal-muted)", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--charcoal-muted)")}
              >
                <FaFacebookF size={14} />
              </a>
            )}
            {siteConfig.social.youtube && (
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{ color: "var(--charcoal-muted)", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--charcoal-muted)")}
              >
                <FaYoutube size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p
            className="label-smallcaps"
            style={{
              color: "var(--charcoal-muted)",
              fontSize: "0.6rem",
              marginBottom: "1.5rem",
            }}
          >
            Explore
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {[
              { label: "Home", href: "/" },
              { label: "Holiday Packages", href: "/services/holiday-packages" },
              { label: "Flight Tickets", href: "/services/flight-tickets" },
              { label: "Visa Services", href: "/services/visa-services" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontWeight: 300,
                    fontSize: "0.875rem",
                    color: "var(--charcoal-muted)",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ivory)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--charcoal-muted)")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p
            className="label-smallcaps"
            style={{
              color: "var(--charcoal-muted)",
              fontSize: "0.6rem",
              marginBottom: "1.5rem",
            }}
          >
            Reach Us
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <a
              href={`tel:${siteConfig.phone}`}
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "0.875rem",
                color: "var(--charcoal-muted)",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ivory)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--charcoal-muted)")}
            >
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "0.875rem",
                color: "var(--charcoal-muted)",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ivory)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--charcoal-muted)")}
            >
              {siteConfig.email}
            </a>
            <p
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "0.8125rem",
                color: "var(--charcoal-muted)",
                lineHeight: 1.7,
              }}
            >
              {siteConfig.address}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "1.5rem 2.5rem",
          maxWidth: "1320px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <p
          className="label-smallcaps"
          style={{ fontSize: "0.55rem", color: "var(--charcoal-muted)" }}
        >
          © 2026 {siteConfig.companyName}. All rights reserved.
        </p>
        <p
          className="label-smallcaps"
          style={{ fontSize: "0.55rem", color: "var(--charcoal-muted)" }}
        >
          Designed by 4RinLabs
        </p>
      </div>
    </footer>
  );
}