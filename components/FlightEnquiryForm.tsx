"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { Send } from "lucide-react";

export default function FlightEnquiryForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleEnquiry = () => {
    if (!from || !to) {
      alert("Please select both departure and destination.");
      return;
    }

    const message = `I want to enquire on flight booking from ${from} to ${to}`;
    const whatsappLink = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--card-shadow)] border border-slate-100 p-8">
      <h2 className="text-2xl font-bold text-[#00297A] mb-6">
        Flight Booking Enquiry
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2B67FF] focus:ring-2 focus:ring-[#2B67FF]/10 transition-all duration-200 placeholder:text-slate-400"
        />

        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2B67FF] focus:ring-2 focus:ring-[#2B67FF]/10 transition-all duration-200 placeholder:text-slate-400"
        />
      </div>

      <button
        onClick={handleEnquiry}
        className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        style={{
          background: "linear-gradient(135deg, #2B67FF, #05A7FF)",
        }}
      >
        <Send className="w-4 h-4" />
        Enquire on WhatsApp
      </button>
    </div>
  );
}