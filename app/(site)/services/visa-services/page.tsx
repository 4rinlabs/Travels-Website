// app/services/visa-services/page.tsx

import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { visas as mockVisas } from "@/data/visas";

export default async function VisaServicesPage() {
  let { data: visas, error } = await supabase
    .from("visa_services")
    .select("*")
    .order("created_at", { ascending: false });

  if (!visas || visas.length === 0) {
    visas = mockVisas as any;
  }

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        className="page-hero"
        style={{
          background: "var(--charcoal)",
          padding: "12rem 0 6rem 0",
          textAlign: "center",
          color: "var(--ivory)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="page-hero-inner" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 2.5rem", position: "relative", zIndex: 1 }}>
          <p className="label-smallcaps" style={{ color: "var(--gold)", marginBottom: "2rem" }}>
            Visas
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: "3rem",
            }}
          >
            Borders made seamless.
          </h1>
          <hr style={{ border: "none", borderTop: "1px solid rgba(5,167,255,0.5)", margin: "0 auto 3rem auto", width: "80px" }} />
          <p
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "1.125rem",
              fontWeight: 300,
              color: "var(--charcoal-muted)",
              lineHeight: 1.8,
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            Expert assistance and quiet efficiency for your international travel documentation. We handle the intricacies, you anticipate the journey.
          </p>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section
        className="visa-listing-section"
        style={{
          background: "var(--ivory)",
          padding: "8rem 0",
        }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 2.5rem" }}>
          
          {error && (
            <div style={{ color: "red", marginBottom: "2rem" }}>
              Failed to load visa services.
            </div>
          )}

          <div
            className="visa-listing-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "4rem 2rem",
            }}
          >
            {visas?.map((visa) => (
              <Link
                key={visa.id}
                href={`/services/visa-services/${visa.slug}`}
                className="group"
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "3/4",
                    overflow: "hidden",
                    marginBottom: "1.5rem",
                  }}
                >
                  <Image
                    src={visa.image || "/visa/default.jpg"}
                    alt={visa.country}
                    fill
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)",
                    }}
                  />
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 300,
                    color: "var(--charcoal)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {visa.country}
                </h2>
                
                <p
                  style={{
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 300,
                    color: "var(--charcoal-soft)",
                    lineHeight: 1.6,
                  }}
                >
                  Processing: {visa.processing_time || "Enquire"}<br/>
                  Validity: {visa.validity || "Varies"}
                </p>

                <div
                  style={{
                    marginTop: "1.5rem",
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontSize: "0.6875rem",
                    fontWeight: 300,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--charcoal-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span className="group-hover:text-black transition-colors">View Requirements</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>

          {visas?.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--charcoal-muted)", fontFamily: "var(--font-body), sans-serif", fontWeight: 300 }}>
              No visa services available right now.
            </div>
          )}
        </div>
      </section>
    </>
  );
}