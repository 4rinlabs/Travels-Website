// app/(site)/services/flight-tickets/page.tsx
// Server Component — mobile-optimized

import FlightEnquiryForm from "@/components/flights/FlightEnquiryForm";

export const metadata = {
  title: "Flight Tickets | EazyFly Travels",
  description:
    "Book premium flight tickets with EazyFly Travels. Tell us your route and our specialists will find the best options for you.",
};

export default function FlightTicketsPage() {
  return (
    <>
      <style>{`
        .flight-hero {
          background: var(--charcoal);
          padding: 9rem 0 4rem 0;
          text-align: center;
          color: var(--ivory);
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .flight-hero {
            padding: 12rem 0 6rem 0;
          }
        }

        .flight-hero-inner {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 768px) {
          .flight-hero-inner {
            padding: 0 2.5rem;
          }
        }

        .flight-hero h1 {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(2.25rem, 8vw, 5.5rem);
          font-weight: 300;
          line-height: 1.1;
          margin-bottom: 2rem;
        }
        @media (min-width: 768px) {
          .flight-hero h1 {
            margin-bottom: 3rem;
          }
        }

        .flight-hero-sub {
          font-family: var(--font-body), system-ui, sans-serif;
          font-size: 1rem;
          font-weight: 300;
          color: rgba(255,255,255,0.6);
          line-height: 1.8;
          max-width: 500px;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .flight-hero-sub {
            font-size: 1.125rem;
          }
        }

        .flight-watermark {
          position: absolute;
          top: -2rem;
          left: -2rem;
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(5rem, 20vw, 18rem);
          font-weight: 300;
          color: transparent;
          -webkit-text-stroke: 1px rgba(5,167,255,0.08);
          line-height: 1;
          user-select: none;
          pointer-events: none;
        }

        .flight-content {
          background: var(--ivory);
          padding: 4rem 0;
        }
        @media (min-width: 768px) {
          .flight-content {
            padding: 8rem 0;
          }
        }

        .flight-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        @media (min-width: 768px) {
          .flight-container {
            padding: 0 2.5rem;
          }
        }

        .flight-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 768px) {
          .flight-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: start;
          }
        }

        .flight-copy h2 {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(1.75rem, 5vw, 3.5rem);
          font-weight: 300;
          color: var(--charcoal);
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        @media (min-width: 768px) {
          .flight-copy h2 {
            margin-bottom: 2rem;
          }
        }

        .flight-copy p {
          font-family: var(--font-body), system-ui, sans-serif;
          font-size: 0.9375rem;
          font-weight: 300;
          color: var(--charcoal-soft);
          line-height: 1.9;
          margin-bottom: 1rem;
        }
        @media (min-width: 768px) {
          .flight-copy p {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }
        }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="flight-hero">
        <div className="flight-watermark" aria-hidden>Ascend</div>
        <div className="flight-hero-inner">
          <p className="label-smallcaps" style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>
            Flights
          </p>
          <h1>Seamless flight arrangements.</h1>
          <hr style={{ border: "none", borderTop: "1px solid rgba(5,167,255,0.5)", margin: "0 auto 2rem auto", width: "60px" }} />
          <p className="flight-hero-sub">
            We curate the most direct routes and premium cabins, ensuring your journey begins before you even depart.
          </p>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="flight-content">
        <div className="flight-container">
          <div className="flight-grid">

            {/* LEFT - COPY */}
            <div className="flight-copy">
              <p className="label-smallcaps" style={{ marginBottom: "1.5rem" }}>
                The Booking
              </p>
              <h2>Let us handle the logistics.</h2>
              <p>
                Whether a brief domestic hop or a complex multi-city international itinerary, our team navigates flight schedules to find the optimal balance of comfort, time, and value.
              </p>
              <p style={{ marginBottom: 0 }}>
                Share your intended route with us, and a dedicated travel specialist will return with the best available options.
              </p>
            </div>

            {/* RIGHT - CLIENT FORM */}
            <FlightEnquiryForm />

          </div>
        </div>
      </section>
    </>
  );
}