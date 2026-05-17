// components/packages/PackageDetailClient.tsx

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { safeImage } from "@/lib/safeImage";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type PackageType = {
  title: string;
  image?: string | null;
  duration?: string | null;
  price?: string | null;
  overview?: string | null;
  itinerary?: string[];
  inclusions?: string[];
  exclusions?: string[];
  gallery?: string[];
};

type Props = {
  pkg: PackageType;
};

export default function PackageDetailClient({ pkg }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = useMemo(() => {
    const arr = [
      safeImage(pkg.image),
      ...(pkg.gallery || []).map((img) => safeImage(img)),
    ].filter(Boolean);

    return [...new Set(arr)];
  }, [pkg]);

  const whatsapp = encodeURIComponent(`Hi, I want details about ${pkg.title}`);

  function openGallery(i: number) {
    setIndex(i);
    setOpen(true);
  }

  function nextImage() {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  function prevImage() {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        style={{
          position: "relative",
          height: "85vh",
          minHeight: "650px",
          overflow: "hidden",
          background: "var(--charcoal)",
        }}
      >
        <Image
          src={images[0]}
          alt={pkg.title}
          fill
          priority
          className="object-cover opacity-60"
        />

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }} />

        <div style={{ position: "absolute", bottom: "4rem", left: "0", right: "0" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 2.5rem" }}>
            <p className="label-smallcaps" style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>
              Destinations
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
              {pkg.title}
            </h1>
            <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
               {pkg.duration && (
                  <div style={{ borderLeft: "1px solid var(--gold)", paddingLeft: "1.5rem" }}>
                    <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", marginBottom: "0.25rem" }}>Duration</p>
                    <p style={{ fontFamily: "var(--font-display), serif", fontSize: "1.5rem", color: "var(--ivory)", lineHeight: 1 }}>{pkg.duration}</p>
                  </div>
                )}
                {pkg.price && (
                  <div style={{ borderLeft: "1px solid var(--gold)", paddingLeft: "1.5rem" }}>
                    <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", marginBottom: "0.25rem" }}>From</p>
                    <p style={{ fontFamily: "var(--font-display), serif", fontSize: "1.5rem", color: "var(--gold)", lineHeight: 1 }}>{pkg.price}</p>
                  </div>
                )}
                <button
                  onClick={() => openGallery(0)}
                  style={{
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontSize: "0.6875rem",
                    fontWeight: 300,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--ivory)",
                    borderBottom: "1px solid rgba(255,255,255,0.3)",
                    paddingBottom: "0.25rem",
                    marginLeft: "1rem"
                  }}
                  className="hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors"
                >
                  View Gallery
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section
        className="pkg-detail-section"
        style={{
          background: "var(--ivory)",
          padding: "8rem 0",
        }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 2.5rem" }}>
          <div className="grid lg:grid-cols-[1fr_380px] gap-16">
            
            {/* LEFT - DETAILS */}
            <div>
              {pkg.overview && (
                <div style={{ marginBottom: "5rem" }}>
                  <p className="label-smallcaps" style={{ marginBottom: "2rem" }}>
                    The Experience
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body), system-ui, sans-serif",
                      fontSize: "1.125rem",
                      fontWeight: 300,
                      color: "var(--charcoal-soft)",
                      lineHeight: 1.9,
                    }}
                  >
                    {pkg.overview}
                  </p>
                </div>
              )}

              {/* GALLERY PREVIEW */}
              {images.length > 1 && (
                <div style={{ marginBottom: "5rem" }}>
                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      {images.slice(1, 3).map((img, i) => (
                        <div key={i} style={{ position: "relative", aspectRatio: "4/3", cursor: "pointer", overflow: "hidden" }} onClick={() => openGallery(i + 1)}>
                          <Image src={img} alt={`${pkg.title} scene ${i + 1}`} fill style={{ objectFit: "cover" }} className="hover:scale-105 transition-transform duration-700" />
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {/* ITINERARY */}
              {!!pkg.itinerary?.length && (
                <div style={{ marginBottom: "5rem" }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 300,
                      color: "var(--charcoal)",
                      lineHeight: 1.1,
                      marginBottom: "3rem",
                    }}
                  >
                    The Itinerary
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                    {pkg.itinerary.map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: "2rem", position: "relative" }}>
                        <div
                          style={{
                            fontFamily: "var(--font-display), Georgia, serif",
                            fontSize: "2.5rem",
                            color: "rgba(184,154,90,0.3)",
                            lineHeight: 1,
                            minWidth: "4rem",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div style={{ paddingTop: "0.5rem" }}>
                          <p
                            style={{
                              fontFamily: "var(--font-body), system-ui, sans-serif",
                              fontSize: "1rem",
                              fontWeight: 300,
                              color: "var(--charcoal)",
                              lineHeight: 1.8,
                            }}
                          >
                            {item}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* INCLUSIONS & EXCLUSIONS */}
              <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
                {!!pkg.inclusions?.length && (
                  <div style={{ flex: "1 1 250px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display), Georgia, serif",
                        fontSize: "1.5rem",
                        fontWeight: 300,
                        color: "var(--charcoal)",
                        marginBottom: "1.5rem",
                      }}
                    >
                      Included
                    </h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {pkg.inclusions.map((item, i) => (
                        <li key={i} style={{ display: "flex", gap: "0.75rem", fontFamily: "var(--font-body), sans-serif", fontSize: "0.875rem", fontWeight: 300, color: "var(--charcoal-soft)" }}>
                          <span style={{ color: "var(--gold)" }}>+</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {!!pkg.exclusions?.length && (
                  <div style={{ flex: "1 1 250px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display), Georgia, serif",
                        fontSize: "1.5rem",
                        fontWeight: 300,
                        color: "var(--charcoal)",
                        marginBottom: "1.5rem",
                      }}
                    >
                      Excluded
                    </h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {pkg.exclusions.map((item, i) => (
                        <li key={i} style={{ display: "flex", gap: "0.75rem", fontFamily: "var(--font-body), sans-serif", fontSize: "0.875rem", fontWeight: 300, color: "rgba(0,0,0,0.4)" }}>
                          <span>-</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT - ASSISTANCE / BOOKING */}
            <div>
              <div
                className="pkg-sidebar"
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
                  Reserve this Journey
                </h3>
                
                {pkg.price && (
                  <p style={{ fontFamily: "var(--font-display), serif", fontSize: "2rem", color: "var(--gold)", marginBottom: "1.5rem", lineHeight: 1 }}>{pkg.price}</p>
                )}

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
                  Connect with a dedicated travel specialist to tailor this itinerary to your specific requirements.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <Link
                    href={`https://wa.me/919539430097?text=${whatsapp}`}
                    target="_blank"
                    className="btn-luxury"
                    style={{ justifyContent: "center" }}
                  >
                    Enquire via WhatsApp <span>→</span>
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

      {/* LIGHTBOX */}
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "var(--charcoal)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <button
            onClick={() => setOpen(false)}
            style={{ position: "absolute", top: "2rem", right: "2rem", color: "var(--ivory)", background: "transparent", border: "none", cursor: "pointer" }}
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            style={{ position: "absolute", left: "2rem", color: "var(--ivory)", background: "transparent", border: "none", cursor: "pointer" }}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div style={{ position: "relative", width: "100%", maxWidth: "1200px", height: "80vh" }}>
            <Image
              src={images[index]}
              alt="Gallery Preview"
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={nextImage}
            style={{ position: "absolute", right: "2rem", color: "var(--ivory)", background: "transparent", border: "none", cursor: "pointer" }}
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div style={{ position: "absolute", bottom: "2rem", color: "var(--gold)", fontFamily: "var(--font-display), serif", fontSize: "1.5rem" }}>
            {index + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
