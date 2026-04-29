"use client";

import { useState } from "react";
import { Plane, BadgeCheck, Clock3, Wallet, ArrowRightLeft, Send } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function FlightTicketsPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleEnquiry = () => {
    if (!from.trim() || !to.trim()) {
      alert("Please enter both departure and destination.");
      return;
    }

    const message = `I want to enquire on flight booking from ${from} to ${to}`;
    const whatsappLink = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <>
      {/* HERO */}
      <section
        className="py-20 text-center text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #00297A, #2B67FF, #05A7FF)",
        }}
      >
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-white/60 mb-4">
            Flights
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Flight Ticket Booking</h1>
          <p className="text-lg max-w-2xl mx-auto text-white/75">
            Book affordable domestic and international flights with trusted support from {siteConfig.companyName}.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT SIDE */}
          <div>
            <p className="section-label">Booking</p>
            <h2 className="text-3xl font-bold text-[#00297A] mt-3 mb-5">
              Hassle-Free Flight Booking
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              We help you find the best available flight options for your travel plans,
              whether it&apos;s domestic or international. Enjoy competitive pricing,
              easy booking support, and fast WhatsApp assistance.
            </p>

            <div className="space-y-4">
              {[
                { Icon: BadgeCheck, text: "Affordable airfare options" },
                { Icon: Clock3, text: "Quick and easy booking process" },
                { Icon: Wallet, text: "Best deals for international routes" },
                { Icon: Plane, text: "Support for one-way, round trip, and multi-city" },
              ].map((item) => (
                <div key={item.text} className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <item.Icon className="w-4 h-4 text-[#2B67FF]" />
                  </div>
                  <p className="text-slate-700 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-[#f8fafc] rounded-[var(--radius-card)] p-8 md:p-10 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2B67FF] to-[#05A7FF] flex items-center justify-center mb-5">
              <ArrowRightLeft className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-[#00297A] mb-3">
              Flight Booking Enquiry
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Enter your travel route and enquire instantly on WhatsApp.
            </p>

            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="From (e.g. Kochi)"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2B67FF] focus:ring-2 focus:ring-[#2B67FF]/10 transition-all duration-200 placeholder:text-slate-400"
              />

              <input
                type="text"
                placeholder="To (e.g. Dubai)"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2B67FF] focus:ring-2 focus:ring-[#2B67FF]/10 transition-all duration-200 placeholder:text-slate-400"
              />
            </div>

            <button
              onClick={handleEnquiry}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #2B67FF, #05A7FF)",
              }}
            >
              <Send className="w-4 h-4" />
              Enquire on WhatsApp
            </button>

            <p className="text-xs text-slate-400 mt-4 text-center">
              Direct WhatsApp support available at {siteConfig.phone}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}