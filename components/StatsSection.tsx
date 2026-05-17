const stats = [
  { number: "20+",  label: "Destinations Curated" },
  { number: "1K+",  label: "Journeys Crafted" },
  { number: "100%", label: "Dedicated Support" },
  { number: "24/7", label: "Personal Assistance" },
];

export default function StatsSection() {
  return (
    <section
      style={{
        padding: "5rem 0",
        background: "var(--charcoal)",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 2.5rem",
        }}
      >
        {/* Top rule */}
        <hr className="rule-gold" style={{ marginBottom: "4rem" }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "3rem 2rem",
          }}
        >
          {stats.map((item, i) => (
            <div key={i}>
              <p
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 300,
                  color: "var(--ivory)",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {item.number}
              </p>
              <div
                style={{
                  width: "24px",
                  height: "1px",
                  background: "var(--gold)",
                  marginBottom: "0.6rem",
                }}
              />
              <p
                className="label-smallcaps"
                style={{ color: "var(--charcoal-muted)", fontSize: "0.6rem" }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom rule */}
        <hr className="rule-gold" style={{ marginTop: "4rem" }} />
      </div>
    </section>
  );
}