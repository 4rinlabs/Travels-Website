"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site";

export default function FlightEnquiryForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!from.trim() || !to.trim()) {
      setError("Please enter both departure and destination.");
      return;
    }

    const lines = [
      `✈️ *Flight Enquiry*`,
      ``,
      `*From:* ${from}`,
      `*To:* ${to}`,
      name ? `*Name:* ${name}` : null,
      phone ? `*Phone:* ${phone}` : null,
      date ? `*Travel Date:* ${date}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappLink = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(lines)}`;
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return (
      <>
        <style>{`
          .flight-card {
            border: 1px solid rgba(0,0,0,0.05);
            padding: 2rem 1.5rem;
            background: var(--ivory);
            box-shadow: 0 20px 40px rgba(0,0,0,0.03);
          }
          @media (min-width: 768px) {
            .flight-card {
              padding: 3rem;
            }
          }
        `}</style>
        <div className="flight-card" style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "3rem",
              color: "var(--gold)",
              marginBottom: "1rem",
              lineHeight: 1,
            }}
          >
            ✓
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "1.75rem",
              fontWeight: 300,
              color: "var(--charcoal)",
              marginBottom: "1rem",
            }}
          >
            Enquiry Sent
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "0.9375rem",
              fontWeight: 300,
              color: "var(--charcoal-soft)",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            Your WhatsApp has opened. Our travel specialist will respond shortly.
          </p>
          <button
            onClick={() => setSent(false)}
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "0.6875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--charcoal-muted)",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Submit another enquiry
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        .flight-card {
          border: 1px solid rgba(0,0,0,0.05);
          padding: 2rem 1.5rem;
          background: var(--ivory);
          box-shadow: 0 20px 40px rgba(0,0,0,0.03);
        }
        @media (min-width: 768px) {
          .flight-card {
            padding: 3rem;
          }
        }

        .flight-card h3 {
          font-family: var(--font-display), Georgia, serif;
          font-size: 1.35rem;
          font-weight: 400;
          color: var(--charcoal);
          margin-bottom: 1.5rem;
        }
        @media (min-width: 768px) {
          .flight-card h3 {
            font-size: 1.5rem;
            margin-bottom: 2rem;
          }
        }

        .flight-field {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        @media (min-width: 768px) {
          .flight-field {
            gap: 1.5rem;
          }
        }

        .flight-label {
          display: block;
          font-family: var(--font-body), system-ui, sans-serif;
          font-size: 0.625rem;
          font-weight: 300;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--charcoal-soft);
          margin-bottom: 0.4rem;
        }
        @media (min-width: 768px) {
          .flight-label {
            font-size: 0.6875rem;
            margin-bottom: 0.5rem;
          }
        }

        .flight-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.2);
          padding: 0.65rem 0;
          font-family: var(--font-body), system-ui, sans-serif;
          font-size: 0.9375rem;
          color: var(--charcoal);
          outline: none;
          -webkit-appearance: none;
          border-radius: 0;
        }
        @media (min-width: 768px) {
          .flight-input {
            padding: 0.75rem 0;
            font-size: 1rem;
          }
        }

        .flight-input::placeholder {
          color: rgba(0,0,0,0.3);
          font-size: 0.875rem;
        }

        .flight-input:focus {
          border-bottom-color: var(--gold);
        }

        .flight-submit {
          margin-top: 0.75rem;
        }
        @media (min-width: 768px) {
          .flight-submit {
            margin-top: 1rem;
          }
        }

        .flight-error {
          font-family: var(--font-body), system-ui, sans-serif;
          font-size: 0.8125rem;
          color: #c0392b;
          margin: 0;
        }
      `}</style>

      <div className="flight-card">
        <h3>Enquire Route</h3>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flight-field"
        >
          {/* FROM */}
          <div>
            <label className="flight-label">Departure *</label>
            <input
              id="flight-from"
              type="text"
              placeholder="e.g. Kochi (COK)"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="flight-input"
              autoComplete="off"
            />
          </div>

          {/* TO */}
          <div>
            <label className="flight-label">Destination *</label>
            <input
              id="flight-to"
              type="text"
              placeholder="e.g. Dubai (DXB)"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="flight-input"
              autoComplete="off"
            />
          </div>

          {/* NAME */}
          <div>
            <label className="flight-label">Your Name</label>
            <input
              id="flight-name"
              type="text"
              placeholder="e.g. Arjun Nair"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flight-input"
              autoComplete="name"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="flight-label">Phone / WhatsApp</label>
            <input
              id="flight-phone"
              type="tel"
              placeholder="e.g. +91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flight-input"
              autoComplete="tel"
            />
          </div>

          {/* DATE */}
          <div>
            <label className="flight-label">Preferred Travel Date</label>
            <input
              id="flight-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="flight-input"
              style={{ colorScheme: "light" }}
            />
          </div>

          {/* ERROR */}
          {error && <p className="flight-error">{error}</p>}

          {/* SUBMIT */}
          <div className="flight-submit">
            <button
              id="flight-submit"
              type="submit"
              className="btn-luxury w-full"
              style={{ justifyContent: "center" }}
            >
              Request Flight Details <span>→</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
