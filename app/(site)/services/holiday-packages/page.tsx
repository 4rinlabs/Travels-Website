import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { packages as mockPackages } from "@/data/packages";

export default async function HolidayPackagesPage() {
  let { data: packages } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false });

  if (!packages || packages.length === 0) {
    packages = mockPackages as any;
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
            Destinations
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
            Curated Journeys.
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
            Discover our collection of premium travel itineraries. Designed for those who value authentic experiences and quiet luxury.
          </p>
        </div>
      </section>

      {/* ═══ LISTING ═══ */}
      <section
        className="packages-listing-section"
        style={{
          background: "var(--ivory)",
          padding: "8rem 0",
        }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 2.5rem" }}>
          <div
            className="packages-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "4rem",
            }}
          >
            {packages?.map((pkg: any) => (
              <Link
                key={pkg.id || pkg.slug}
                href={`/services/holiday-packages/${pkg.slug}`}
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
                    src={pkg.image || "/packages/default.jpg"}
                    alt={pkg.title}
                    fill
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)",
                    }}
                  />
                  
                  <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-display), Georgia, serif",
                        fontSize: "2rem",
                        fontWeight: 300,
                        color: "var(--ivory)",
                        marginBottom: "0.25rem",
                        textShadow: "0 2px 10px rgba(0,0,0,0.3)"
                      }}
                    >
                      {pkg.title}
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-body), system-ui, sans-serif",
                        fontSize: "0.875rem",
                        fontWeight: 300,
                        color: "var(--charcoal-soft)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {pkg.duration}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body), system-ui, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 300,
                        color: "var(--charcoal)",
                      }}
                    >
                      {pkg.price}
                    </p>
                  </div>

                  <span
                    style={{
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
                    <span className="group-hover:text-black transition-colors">Explore</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {packages?.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--charcoal-muted)", fontFamily: "var(--font-body), sans-serif", fontWeight: 300 }}>
              No holiday packages available right now.
            </div>
          )}
        </div>
      </section>
    </>
  );
}