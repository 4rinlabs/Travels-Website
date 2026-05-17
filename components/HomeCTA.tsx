"use client";

import Link from "next/link";

export default function HomeCTA() {
  return (
    <section
      className="home-cta-section"
      style={{
        background: "var(--charcoal)",
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Faint ghost watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-4rem",
          right: "-2rem",
          fontFamily: "var(--font-display), Georgia, serif",
          fontSize: "clamp(10rem, 25vw, 22rem)",
          fontWeight: 300,
          color: "transparent",
          WebkitTextStroke: "1px rgba(5,167,255,0.08)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        Fly
      </div>

      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 2.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p className="label-smallcaps" style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>
          Begin Here
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 300,
            color: "var(--ivory)",
            lineHeight: 1.1,
            maxWidth: "680px",
            marginBottom: "2.5rem",
          }}
        >
          Your next chapter starts with a single conversation.
        </h2>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid var(--gold)",
            opacity: 0.3,
            maxWidth: "680px",
            marginBottom: "2.5rem",
          }}
        />

        <div className="home-cta-buttons" style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/contact" className="btn-luxury btn-luxury-light" style={{ fontSize: "0.75rem" }}>
            Plan My Journey <span>→</span>
          </Link>
          <Link
            href="/services/holiday-packages"
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontWeight: 300,
              fontSize: "0.6875rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--charcoal-muted)",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ivory)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--charcoal-muted)")}
          >
            Browse Destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
