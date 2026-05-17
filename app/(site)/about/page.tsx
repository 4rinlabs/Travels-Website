import { Target, Eye, Award } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      num: "01",
      title: "Our Mission",
      text: "To elevate travel from a simple transaction to a carefully curated experience, making every journey deeply personal and effortlessly refined.",
    },
    {
      num: "02",
      title: "Our Vision",
      text: "To be the quiet, trusted architect behind the most memorable and seamless journeys for discerning travellers globally.",
    },
    {
      num: "03",
      title: "Our Ethos",
      text: "Restraint, precision, and personal attention. We believe the true luxury of travel is found in the unseen details.",
    },
  ];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        className="page-hero"
        style={{
          background: "var(--ivory)",
          padding: "12rem 0 6rem 0",
          textAlign: "center",
        }}
      >
        <div className="page-hero-inner" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 2.5rem" }}>
          <p className="label-smallcaps" style={{ marginBottom: "2rem" }}>
            The Company
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 300,
              color: "var(--charcoal)",
              lineHeight: 1.1,
              marginBottom: "3rem",
            }}
          >
            A quiet approach to extraordinary travel.
          </h1>
          <hr className="rule-gold" style={{ margin: "0 auto 3rem auto", width: "80px" }} />
          <p
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "1.125rem",
              fontWeight: 300,
              color: "var(--charcoal-soft)",
              lineHeight: 1.8,
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            We are not a booking engine. We are a team of passionate travellers and meticulous planners who understand that your time is your greatest luxury.
          </p>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section
        className="about-values-section"
        style={{
          background: "var(--charcoal)",
          padding: "8rem 0",
        }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 2.5rem" }}>
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {values.map((val) => (
              <div key={val.num} style={{ borderTop: "1px solid rgba(5,167,255,0.3)", paddingTop: "2.5rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "2.5rem",
                    color: "var(--gold)",
                    lineHeight: 1,
                    marginBottom: "1.5rem",
                  }}
                >
                  {val.num}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 300,
                    color: "var(--ivory)",
                    marginBottom: "1rem",
                  }}
                >
                  {val.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 300,
                    color: "var(--charcoal-muted)",
                    lineHeight: 1.8,
                  }}
                >
                  {val.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}