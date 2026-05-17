"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/hero1.jpg",
    location: "Santorini, Greece",
    headline: "Where the\nSea Meets\nEternity",
    sub: "Private villas, curated itineraries, and the art of doing nothing beautifully.",
  },
  {
    image: "/hero2.jpg",
    location: "Maldives",
    headline: "Still Waters,\nDeep Calm",
    sub: "Overwater sanctuaries for those who seek silence as a luxury.",
  },
  {
    image: "/hero3.jpg",
    location: "Kyoto, Japan",
    headline: "Seasons Change,\nMoments Remain",
    sub: "Ancient temples, ryokan retreats, and the ceremony of slow travel.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section
      style={{
        position: "relative",
        height: "100svh",
        minHeight: "600px",
        overflow: "hidden",
        background: "var(--charcoal)",
      }}
    >
      {/* BACKGROUND IMAGES with Ken Burns */}
      {slides.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: current === i ? 1 : 0,
            transition: "opacity 1.4s ease",
            zIndex: current === i ? 1 : 0,
          }}
        >
          <Image
            src={s.image}
            alt={s.headline}
            fill
            priority={i === 0}
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              animation: current === i ? "kenburns-luxury 12s ease-out forwards" : "none",
            }}
          />
          {/* Dark vignette — heavier at bottom-left for text legibility */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(42,37,32,0.75) 0%, rgba(42,37,32,0.3) 50%, rgba(42,37,32,0.15) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(42,37,32,0.6) 0%, transparent 55%)",
            }}
          />
        </div>
      ))}

      {/* CONTENT — lower-left, editorial asymmetric */}
      <div
        className="hero-content"
        style={{
          position: "absolute",
          zIndex: 20,
          bottom: "12%",
          left: 0,
          right: 0,
          padding: "0 2.5rem",
          maxWidth: "1320px",
          margin: "0 auto",
        }}
      >
        {/* Location label */}
        <p
          className="label-smallcaps anim-slide-right"
          style={{
            color: "var(--gold)",
            marginBottom: "1.25rem",
            opacity: loaded ? 1 : 0,
            animationDelay: "0.2s",
          }}
        >
          {slide.location}
        </p>

        {/* Rule */}
        <div
          style={{
            width: "40px",
            height: "1px",
            background: "var(--gold)",
            opacity: 0.7,
            marginBottom: "1.5rem",
          }}
        />

        {/* Headline */}
        <h1
          key={`headline-${current}`}
          className="anim-fade-rise"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            color: "var(--ivory)",
            whiteSpace: "pre-line",
            maxWidth: "720px",
            marginBottom: "1.75rem",
            animationDelay: "0.3s",
          }}
        >
          {slide.headline}
        </h1>

        {/* Sub */}
        <p
          key={`sub-${current}`}
          className="anim-fade-rise"
          style={{
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontWeight: 300,
            fontSize: "clamp(0.875rem, 1.5vw, 1.05rem)",
            color: "rgba(245,240,232,0.75)",
            maxWidth: "480px",
            lineHeight: 1.8,
            marginBottom: "2.5rem",
            animationDelay: "0.5s",
          }}
        >
          {slide.sub}
        </p>

        {/* CTAs */}
        <div
          className="anim-fade-rise hero-cta-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
            flexWrap: "wrap",
            animationDelay: "0.7s",
          }}
        >
          <Link href="/services/holiday-packages" className="btn-luxury btn-luxury-light">
            Explore Journeys
            <span style={{ fontSize: "0.9em" }}>→</span>
          </Link>
          <Link
            href="/contact"
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontWeight: 300,
              fontSize: "0.6875rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.6)",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,240,232,1)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.6)")}
          >
            Speak to an Expert
          </Link>
        </div>
      </div>

      {/* SLIDE INDICATORS — right side, vertical */}
      <div
        style={{
          position: "absolute",
          zIndex: 20,
          right: "2.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "center",
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: "1px",
              height: current === i ? "40px" : "16px",
              background: current === i ? "var(--gold)" : "rgba(245,240,232,0.35)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "height 0.4s ease, background 0.4s ease",
            }}
          />
        ))}
      </div>

      {/* SCROLL HINT */}
      <div
        className="anim-fade-in"
        style={{
          position: "absolute",
          zIndex: 20,
          bottom: "2.5rem",
          right: "2.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          animationDelay: "1.2s",
        }}
      >
        <span
          className="label-smallcaps"
          style={{ color: "rgba(245,240,232,0.5)", fontSize: "0.55rem" }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "rgba(245,240,232,0.3)",
          }}
        />
      </div>
    </section>
  );
}