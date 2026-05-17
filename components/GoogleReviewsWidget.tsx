import { Star, ExternalLink } from "lucide-react";

const testimonials = [
  {
    name: "Ameen K.",
    origin: "Kerala, India",
    review:
      "Seamless from the very first enquiry to the moment we landed back home. EazyFly curated every detail with a quiet, assured elegance.",
    rating: 5,
  },
  {
    name: "Fathima R.",
    origin: "Kasaragod",
    review:
      "There is a certain kind of travel company that makes you feel looked after without ever feeling managed. This is one of them.",
    rating: 5,
  },
  {
    name: "Shabeer M.",
    origin: "Mangalore",
    review:
      "Flight bookings, hotel confirmations, visa paperwork — not a single stone left unturned. I simply arrived, and the rest unfolded.",
    rating: 5,
  },
];

export default function GoogleReviewsSection() {
  return (
    <section
      style={{
        padding: "7rem 0",
        background: "var(--ivory-warm)",
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
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
            marginBottom: "5rem",
          }}
        >
          <div>
            <p className="label-smallcaps" style={{ marginBottom: "1rem" }}>
              Guest Voices
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 300,
                color: "var(--charcoal)",
                lineHeight: 1.2,
                maxWidth: "440px",
              }}
            >
              Words from those who have travelled with us
            </h2>
          </div>

          {/* Rating badge */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "0.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "3.5rem",
                fontWeight: 300,
                color: "var(--charcoal)",
                lineHeight: 1,
              }}
            >
              5.0
            </p>
            <div style={{ display: "flex", gap: "3px" }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  style={{ width: "14px", height: "14px", fill: "var(--gold)", color: "var(--gold)" }}
                />
              ))}
            </div>
            <p
              className="label-smallcaps"
              style={{ fontSize: "0.55rem", color: "var(--charcoal-muted)" }}
            >
              Google · 17 Reviews
            </p>
            <a
              href="https://www.google.com/search?q=EazyFly+Travels+Kasaragod"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury"
              style={{ marginTop: "0.75rem" }}
            >
              View on Google
              <ExternalLink style={{ width: "10px", height: "10px" }} />
            </a>
          </div>
        </div>

        <hr className="rule-charcoal" style={{ marginBottom: "4rem" }} />

        {/* Pull-quote testimonials */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "3rem",
          }}
        >
          {testimonials.map((item, i) => (
            <figure
              key={i}
              style={{
                margin: 0,
                paddingTop: "2rem",
                borderTop: "1px solid rgba(184,154,90,0.3)",
              }}
            >
              {/* Opening mark */}
              <p
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "5rem",
                  fontWeight: 300,
                  color: "var(--gold-pale)",
                  lineHeight: 0.5,
                  marginBottom: "1.5rem",
                  userSelect: "none",
                }}
                aria-hidden
              >
                &ldquo;
              </p>

              {/* The quote */}
              <blockquote
                className="pull-quote"
                style={{
                  margin: 0,
                  fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                  color: "var(--charcoal)",
                  marginBottom: "2rem",
                }}
              >
                {item.review}
              </blockquote>

              {/* Attribution */}
              <figcaption>
                <p
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "var(--charcoal)",
                  }}
                >
                  {item.name}
                </p>
                <p className="label-smallcaps" style={{ fontSize: "0.55rem", color: "var(--charcoal-muted)", marginTop: "0.25rem" }}>
                  {item.origin}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}