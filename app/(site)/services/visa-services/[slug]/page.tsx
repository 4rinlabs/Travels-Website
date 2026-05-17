// app/services/visa-services/[slug]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { safeImage } from "@/lib/safeImage";
import { Metadata } from "next";
import { visas as mockVisas } from "@/data/visas";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

/* ---------------------------
   SEO
---------------------------- */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  let { data: visa } = await supabase
    .from("visa_services")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!visa) {
    visa = mockVisas.find((v) => v.slug === slug) as any;
  }

  if (!visa) {
    return {
      title: "Visa Not Found | EazyFly Travels",
    };
  }

  return {
    title: `${visa.country} Visa | EazyFly Travels`,
    description: `Get ${visa.country} visa assistance with EazyFly Travels.`,
    openGraph: {
      title: `${visa.country} Visa`,
      images: visa.image ? [{ url: visa.image }] : [],
    },
  };
}

/* ---------------------------
   PAGE
---------------------------- */
export default async function VisaDetailPage({ params }: Props) {
  const { slug } = await params;

  let { data: visa } = await supabase
    .from("visa_services")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!visa) {
    visa = mockVisas.find((v) => v.slug === slug) as any;
  }

  if (!visa) notFound();

  const whatsapp = encodeURIComponent(
    `Hi, I need ${visa.country} visa details`,
  );

  const requirements = visa.requirements || [];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        style={{
          position: "relative",
          height: "80vh",
          minHeight: "600px",
          overflow: "hidden",
          background: "var(--charcoal)",
        }}
      >
        <Image
          src={safeImage(visa.image)}
          alt={visa.country}
          fill
          priority
          className="object-cover opacity-60"
        />

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }} />

        <div style={{ position: "absolute", bottom: "4rem", left: "0", right: "0" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 2.5rem" }}>
            <p className="label-smallcaps" style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>
              Visa Documentation
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(3.5rem, 8vw, 6rem)",
                fontWeight: 300,
                color: "var(--ivory)",
                lineHeight: 1,
                marginBottom: "2rem",
              }}
            >
              {visa.country}
            </h1>
            <div style={{ display: "flex", gap: "2rem" }}>
               {visa.processing_time && (
                  <div style={{ borderLeft: "1px solid var(--gold)", paddingLeft: "1.5rem" }}>
                    <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", marginBottom: "0.25rem" }}>Processing</p>
                    <p style={{ fontFamily: "var(--font-display), serif", fontSize: "1.5rem", color: "var(--ivory)", lineHeight: 1 }}>{visa.processing_time}</p>
                  </div>
                )}
                {visa.validity && (
                  <div style={{ borderLeft: "1px solid var(--gold)", paddingLeft: "1.5rem" }}>
                    <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", marginBottom: "0.25rem" }}>Validity</p>
                    <p style={{ fontFamily: "var(--font-display), serif", fontSize: "1.5rem", color: "var(--ivory)", lineHeight: 1 }}>{visa.validity}</p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section
        style={{
          background: "var(--ivory)",
          padding: "8rem 0",
        }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 2.5rem" }}>
          <div className="grid lg:grid-cols-[1fr_380px] gap-16">
            
            {/* LEFT - REQUIREMENTS */}
            <div>
              <p className="label-smallcaps" style={{ marginBottom: "2rem" }}>
                The Requisites
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 300,
                  color: "var(--charcoal)",
                  lineHeight: 1.1,
                  marginBottom: "3rem",
                }}
              >
                Required Documentation
              </h2>
              
              <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", marginBottom: "3rem" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {requirements.length > 0 ? (
                  requirements.map((item: string, i: number) => (
                    <div key={i} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-display), Georgia, serif",
                          fontSize: "1.5rem",
                          color: "var(--gold)",
                          lineHeight: 1,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p
                        style={{
                          fontFamily: "var(--font-body), system-ui, sans-serif",
                          fontSize: "1rem",
                          fontWeight: 300,
                          color: "var(--charcoal-soft)",
                          lineHeight: 1.8,
                          paddingTop: "0.25rem",
                        }}
                      >
                        {item}
                      </p>
                    </div>
                  ))
                ) : (
                  <p
                    style={{
                      fontFamily: "var(--font-body), system-ui, sans-serif",
                      fontSize: "1rem",
                      fontWeight: 300,
                      color: "var(--charcoal-soft)",
                    }}
                  >
                    Please contact us for the complete and current list of required documents.
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT - ASSISTANCE */}
            <div>
              <div
                style={{
                  position: "sticky",
                  top: "120px",
                  border: "1px solid rgba(0,0,0,0.05)",
                  padding: "3rem",
                  background: "var(--ivory)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.03)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 300,
                    color: "var(--charcoal)",
                    marginBottom: "1rem",
                  }}
                >
                  Expert Assistance
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 300,
                    color: "var(--charcoal-soft)",
                    lineHeight: 1.8,
                    marginBottom: "2.5rem",
                  }}
                >
                  Navigating visa requirements requires precision. Allow our team to review your documents and manage the submission process.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <Link
                    href={`https://wa.me/919539430097?text=${whatsapp}`}
                    target="_blank"
                    className="btn-luxury"
                    style={{ justifyContent: "center" }}
                  >
                    Consult via WhatsApp <span>→</span>
                  </Link>
                  <Link
                    href="/contact"
                    style={{
                      fontFamily: "var(--font-body), system-ui, sans-serif",
                      fontSize: "0.6875rem",
                      fontWeight: 300,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--charcoal-muted)",
                      textDecoration: "none",
                      textAlign: "center",
                      padding: "1rem",
                    }}
                  >
                    Or request a callback
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
