export default function ContactPage() {
  const whatsappNumber = "919539430097";
  const message = "Hi, I would like to know more about your travel services";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

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
            Enquiries
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
            Start the conversation.
          </h1>
          <hr className="rule-gold" style={{ margin: "0 auto 3rem auto", width: "80px" }} />
          <p
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "1.125rem",
              fontWeight: 300,
              color: "var(--charcoal-soft)",
              lineHeight: 1.8,
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            We are here to assist with curating your next journey. Reach out to our travel specialists below.
          </p>
        </div>
      </section>

      {/* ═══ DETAILS ═══ */}
      <section
        className="contact-details-section"
        style={{
          background: "var(--charcoal)",
          padding: "8rem 0",
          color: "var(--ivory)",
        }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 2.5rem" }}>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            
            {/* LEFT - INFO */}
            <div>
              <p className="label-smallcaps" style={{ color: "var(--gold)", marginBottom: "3rem" }}>
                Contact Information
              </p>

              <div style={{ marginBottom: "3rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 300,
                    marginBottom: "1rem",
                  }}
                >
                  General Enquiries
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
                  info@eazyflytravels.com<br />
                  +91 9539430097
                </p>
              </div>

              <div style={{ marginBottom: "3rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 300,
                    marginBottom: "1rem",
                  }}
                >
                  Our Office
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
                  The Edge Offices, A17<br />
                  Vidya Nagar, Kasaragod<br />
                  Kerala 671123, India
                </p>
              </div>

              <div style={{ marginBottom: "4rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 300,
                    marginBottom: "1rem",
                  }}
                >
                  Working Hours
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
                  Monday - Saturday<br />
                  9:00 AM to 7:00 PM
                </p>
              </div>

              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-luxury btn-luxury-light">
                Message via WhatsApp <span>→</span>
              </a>
            </div>

            {/* RIGHT - MAP */}
            <div
              className="contact-map"
              style={{
                aspectRatio: "4/5",
                background: "var(--charcoal)",
                position: "relative",
              }}
            >
               <iframe
                src="https://www.google.com/maps?q=The%20Edge%20Offices%20A17%20Vidya%20Nagar%20Kasaragod%20Kerala%20671123&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) opacity(0.8) contrast(1.2)" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
