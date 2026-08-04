"use client";

import { useState } from "react";
import { Plane, Calendar, Users } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@/lib/site";
import AirportAutocomplete from "@/components/AirportAutocomplete";

export default function FlightTicketsClient() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "1",
    tripType: "One Way"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi EazyFly! I need a flight ticket.%0A*From:* ${formData.from}%0A*To:* ${formData.to}%0A*Date:* ${formData.date}%0A*Passengers:* ${formData.passengers}%0A*Type:* ${formData.tripType}`;
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="py-20 text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #00297A, #2B67FF, #05A7FF)",
        }}
      >
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-white/60 mb-3">
            EazyFly Travels
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Flight Tickets
          </h1>

          <p className="text-white/70 max-w-2xl text-lg">
            Get the best deals on flights worldwide. Fill the details below and we will get back to you with the best prices.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="bg-[#f8fafc] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-10 rounded-[var(--radius-card)] shadow-[var(--card-shadow)] border border-gray-100 relative overflow-hidden">
            
            {/* Decorative background shape */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              
              {/* Trip Type Toggle */}
              <div className="flex gap-6 border-b border-gray-100 pb-4">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.tripType === "One Way" ? "border-[#2B67FF] bg-[#2B67FF]" : "border-gray-300 group-hover:border-gray-400"}`}>
                    {formData.tripType === "One Way" && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <input type="radio" name="tripType" value="One Way" checked={formData.tripType === "One Way"} onChange={handleChange} className="hidden" />
                  <span className={`font-medium ${formData.tripType === "One Way" ? "text-[#00297A]" : "text-gray-500 group-hover:text-gray-700"}`}>One Way</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.tripType === "Round Trip" ? "border-[#2B67FF] bg-[#2B67FF]" : "border-gray-300 group-hover:border-gray-400"}`}>
                    {formData.tripType === "Round Trip" && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <input type="radio" name="tripType" value="Round Trip" checked={formData.tripType === "Round Trip"} onChange={handleChange} className="hidden" />
                  <span className={`font-medium ${formData.tripType === "Round Trip" ? "text-[#00297A]" : "text-gray-500 group-hover:text-gray-700"}`}>Round Trip</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="from" className="block text-sm font-semibold text-gray-700 mb-2">From</label>
                  <AirportAutocomplete
                    id="from"
                    name="from"
                    value={formData.from}
                    onChange={(val) => setFormData({ ...formData, from: val })}
                    placeholder="Departure City or Airport"
                  />
                </div>

                <div>
                  <label htmlFor="to" className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                  <AirportAutocomplete
                    id="to"
                    name="to"
                    value={formData.to}
                    onChange={(val) => setFormData({ ...formData, to: val })}
                    placeholder="Destination City or Airport"
                    iconRotation="transform rotate-90"
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2B67FF]/20 focus:border-[#2B67FF] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="passengers" className="block text-sm font-semibold text-gray-700 mb-2">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      id="passengers"
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2B67FF]/20 focus:border-[#2B67FF] outline-none transition-all appearance-none"
                    >
                      {[1,2,3,4,5,6,7,8,9].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#2B67FF] hover:bg-[#00297A] text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 duration-300"
                >
                  <FaWhatsapp className="w-5 h-5" />Get Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
