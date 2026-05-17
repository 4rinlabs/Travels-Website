// app/(site)/page.tsx

import Hero from "@/components/Hero";
import DestinationCard from "@/components/DestinationCard";
import StatsSection from "@/components/StatsSection";
import GoogleReviewsSection from "@/components/GoogleReviewsWidget";
import HomeCTA from "@/components/HomeCTA";
import Link from "next/link";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { safeImage } from "@/lib/safeImage";

export const metadata: Metadata = {
  title: "EazyFly Travels — Curated Journeys & Private Experiences",
  description:
    "Holiday packages, flight tickets, and visa services for discerning travellers. Quiet luxury, meticulous planning.",
};

const howWeWork = [
  {
    num: "01",
    title: "A Conversation",
    body: "Every journey begins with listening. We take the time to understand your vision, preferences, and what truly matters to you.",
  },
  {
    num: "02",
    title: "The Curation",
    body: "Our experts craft a bespoke itinerary — hotels, transfers, experiences — selecting only what merits your time.",
  },
  {
    num: "03",
    title: "Seamless Execution",
    body: "From visa submissions to real-time flight updates, every detail is managed so your only task is to arrive and experience.",
  },
  {
    num: "04",
    title: "You Return",
    body: "We believe the mark of a great journey is wanting to go again. We will be here when you are.",
  },
];

export default async function HomePage() {
  const { data: packages } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <Hero />

      {/* ═══ INTRO STATEMENT ═══ */}
      <section
        className="home-intro-section"
        style={{
          background: "var(--ivory)",
          padding: "7rem 0",
        }}
      >
        <div
          className="home-intro-grid"
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "0 2.5rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div>
            <p className="label-smallcaps" style={{ marginBottom: "1.5rem" }}>
              Our Philosophy
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                color: "var(--charcoal)",
                lineHeight: 1.15,
                marginBottom: "2rem",
              }}
            >
              Travel as it was always meant to be — unhurried, personal, and precisely right.
            </h2>
            <hr className="rule-gold" style={{ marginBottom: "2rem", width: "80px" }} />
          </div>
          <div>
            <p
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "1rem",
                color: "var(--charcoal-soft)",
                lineHeight: 1.9,
                marginBottom: "1.5rem",
              }}
            >
              EazyFly Travels was born from a simple belief: that the right journey can change a person. We are not a booking engine. We are a team of people who have travelled, who love to travel, and who understand that every itinerary is a story waiting to be written.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "1rem",
                color: "var(--charcoal-soft)",
                lineHeight: 1.9,
                marginBottom: "2rem",
              }}
            >
              From the Maldives to Mecca, from first-time flyers to frequent travellers — we bring the same quiet attentiveness to every single journey.
            </p>
            <Link href="/about" className="btn-luxury">
              About the Company <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ DESTINATIONS — magazine editorial grid ═══ */}
      <section
        className="destinations-section"
        style={{
          background: "var(--ivory-warm)",
          padding: "7rem 0",
        }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "0 2.5rem",
          }}
        >
          {/* Section header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
              marginBottom: "3rem",
            }}
          >
            <div>
              <p className="label-smallcaps" style={{ marginBottom: "1rem" }}>
                Curated Destinations
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 300,
                  color: "var(--charcoal)",
                  lineHeight: 1.15,
                  maxWidth: "480px",
                }}
              >
                Places worth the journey
              </h2>
            </div>
            <Link href="/services/holiday-packages" className="btn-luxury">
              All Destinations <span>→</span>
            </Link>
          </div>

          <hr className="rule-charcoal" style={{ marginBottom: "2.5rem" }} />

          {/* Editorial asymmetric grid */}
          {packages && packages.length > 0 ? (
            <div
              className="destinations-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gridAutoRows: "minmax(400px, auto)",
                gap: "1.5rem",
              }}
            >
              {packages.slice(0, 3).map((pkg: any, i: number) => {
                // Elegant 3-column layout
                const spans = [
                  "span 4", 
                  "span 4", 
                  "span 4", 
                ];
                
                // Assign a consistent premium height
                const height = "480px";
                const span = spans[i] || "span 4";

                return (
                  <Link
                    key={pkg.id}
                    href={`/services/holiday-packages/${pkg.slug}`}
                    style={{
                      gridColumn: span,
                      height: height,
                      display: "block",
                      textDecoration: "none",
                    }}
                  >
                    <DestinationCard
                      title={pkg.title}
                      image={safeImage(pkg.image)}
                      tagline={pkg.tagline || "Expertly curated for the discerning traveller."}
                    />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                height: "320px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--gold-pale)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "1.25rem",
                  color: "var(--charcoal-muted)",
                }}
              >
                New destinations arriving soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <StatsSection />

      {/* ═══ HOW WE WORK — ghost numerals ═══ */}
      <section
        className="how-we-work-section"
        style={{
          background: "var(--ivory)",
          padding: "7rem 0",
        }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "0 2.5rem",
          }}
        >
          <div
            className="how-we-work-header"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "4rem",
              alignItems: "start",
              marginBottom: "5rem",
            }}
          >
            <div>
              <p className="label-smallcaps" style={{ marginBottom: "1rem" }}>
                How We Work
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 300,
                  color: "var(--charcoal)",
                  lineHeight: 1.15,
                }}
              >
                Four steps to an extraordinary journey
              </h2>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "1rem",
                color: "var(--charcoal-soft)",
                lineHeight: 1.9,
                paddingTop: "2.5rem",
              }}
            >
              We believe exceptional travel is the result of exceptional preparation. Every detail, from the angle of your room view to the timing of your transfer, has been considered with care.
            </p>
          </div>

          <hr className="rule-charcoal" style={{ marginBottom: "0" }} />

          {/* Steps */}
          <div>
            {howWeWork.map((step, i) => (
              <div
                key={i}
                className="how-we-work-step"
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr 1fr",
                  gap: "3rem",
                  alignItems: "center",
                  padding: "3rem 0",
                  borderBottom: "1px solid rgba(42,37,32,0.08)",
                  position: "relative",
                }}
              >
                {/* Ghost numeral */}
                <div
                  className="ghost-numeral"
                  style={{ userSelect: "none" }}
                >
                  {step.num}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                    fontWeight: 300,
                    color: "var(--charcoal)",
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontWeight: 300,
                    fontSize: "0.9rem",
                    color: "var(--charcoal-soft)",
                    lineHeight: 1.8,
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS / PULL QUOTES ═══ */}
      <GoogleReviewsSection />

      {/* ═══ CTA ═══ */}
      <HomeCTA />
    </>
  );
}