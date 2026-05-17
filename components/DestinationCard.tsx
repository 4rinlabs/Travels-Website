import { safeImage } from "@/lib/safeImage";
import Image from "next/image";

type Props = {
  title: string;
  image: string;
  /** Optional: short excerpt/tagline for the card */
  tagline?: string;
  /** Variant controls aspect ratio in the editorial grid */
  variant?: "tall" | "wide" | "square";
};

export default function DestinationCard({
  title,
  image,
  tagline,
  variant = "tall",
}: Props) {
  const finalImage = safeImage(image);

  return (
    <article
      className="card-editorial"
      style={{
        height: "100%",
        width: "100%",
        minHeight: "320px",
        borderRadius: "4px",
        background: "var(--charcoal-deep)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image
        src={finalImage}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ 
          objectFit: "cover", 
          objectPosition: "center",
          transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
        className="card-image"
      />

      {/* Gradient overlay - more sophisticated multi-stop */}
      <div 
        className="card-overlay" 
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0, 41, 122, 0.8) 0%, rgba(0, 41, 122, 0.2) 40%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* Always-visible: bottom label */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "2.5rem 2rem",
        }}
      >
        {/* Location label */}
        <p
          className="label-smallcaps"
          style={{ color: "var(--gold)", marginBottom: "0.75rem", opacity: 0.9 }}
        >
          Curated Destination
        </p>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            fontWeight: 300,
            color: "var(--white)",
            lineHeight: 1.1,
            marginBottom: tagline ? "1rem" : 0,
            textShadow: "0 2px 10px rgba(0,0,0,0.2)"
          }}
        >
          {title}
        </h3>

        {/* Content revealed on hover */}
        <div className="card-reveal" style={{ display: "flex", flexDirection: "column" }}>
          {tagline && (
            <p
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.6,
                marginBottom: "1.5rem",
                maxWidth: "90%"
              }}
            >
              {tagline}
            </p>
          )}

          {/* Reveal CTA */}
          <span
            className="btn-luxury btn-luxury-light"
            style={{ width: "fit-content", borderBottom: "1px solid var(--gold)" }}
          >
            Explore Experience <span>→</span>
          </span>
        </div>
      </div>
    </article>
  );
}