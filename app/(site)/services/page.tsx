import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      num: "01",
      title: "Holiday Packages",
      description: "Curated itineraries designed for absolute comfort and immersion.",
      link: "/services/holiday-packages"
    },
    {
      num: "02",
      title: "Flight Bookings",
      description: "Premium flight arrangements and itinerary management.",
      link: "/services/flight-tickets"
    },
    {
      num: "03",
      title: "Visa Services",
      description: "Expert assistance and quiet efficiency for your travel documentation.",
      link: "/services/visa-services"
    }
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
            Expertise
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
            A holistic approach to travel.
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
            We curate the world&apos;s most exceptional experiences, meticulously managed from departure to return.
          </p>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section
        className="services-cards-section"
        style={{
          background: "var(--charcoal)",
          padding: "8rem 0",
        }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 2.5rem" }}>
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {services.map((svc) => (
              <div key={svc.num} style={{ borderTop: "1px solid rgba(5,167,255,0.3)", paddingTop: "2.5rem", display: "flex", flexDirection: "column" }}>
                <p
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "2.5rem",
                    color: "var(--gold)",
                    lineHeight: 1,
                    marginBottom: "1.5rem",
                  }}
                >
                  {svc.num}
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
                  {svc.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 300,
                    color: "var(--charcoal-muted)",
                    lineHeight: 1.8,
                    marginBottom: "2.5rem",
                    flexGrow: 1,
                  }}
                >
                  {svc.description}
                </p>
                <Link
                  href={svc.link}
                  style={{
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontSize: "0.6875rem",
                    fontWeight: 300,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--gold)",
                    paddingBottom: "0.25rem",
                    alignSelf: "flex-start",
                  }}
                  className="hover:text-[var(--ivory)] hover:border-[var(--ivory)] transition-colors"
                >
                  Discover
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY US ═══ */}
      <section
        className="services-why-section"
        style={{
          background: "var(--ivory)",
          padding: "8rem 0",
        }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 2.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p className="label-smallcaps" style={{ marginBottom: "1rem" }}>The Standard</p>
            <h2
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "var(--charcoal)",
              }}
            >
              The EazyFly Difference
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { title: "Uncompromising Quality", text: "Every partner, property, and route is vetted against rigorous standards." },
              { title: "Absolute Discretion", text: "Your privacy and peace of mind remain our foremost priority throughout your journey." },
              { title: "Effortless Process", text: "A seamless, white-glove approach from the first consultation to the final arrival." },
            ].map((item, idx) => (
              <div key={idx}>
                <h3
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "1.75rem",
                    fontWeight: 300,
                    color: "var(--charcoal)",
                    marginBottom: "1rem",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 300,
                    color: "var(--charcoal-soft)",
                    lineHeight: 1.8,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}