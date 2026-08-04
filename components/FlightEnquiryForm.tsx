"use client";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { Plane, Calendar, Users } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import AirportAutocomplete from "@/components/AirportAutocomplete";

export default function FlightEnquiryForm() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "1",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.from) newErrors.from = "Departure city is required";
    if (!formData.to) newErrors.to = "Destination is required";
    if (!formData.date) newErrors.date = "Travel date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const message = `Hi, I'd like to book a flight ticket.%0A %0A *From:* ${formData.from}%0A*To:* ${formData.to}%0A*Date:* ${formData.date}%0A*Passengers:* ${formData.passengers}`;
      window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${message}`, "_blank");
    }
  };

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 md:p-8 shadow-[var(--card-shadow)] border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Request a Flight Quote</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="from" className="block text-sm font-semibold text-gray-700 mb-2">From</label>
            <AirportAutocomplete
              id="from"
              name="from"
              value={formData.from}
              onChange={(val) => setFormData({ ...formData, from: val })}
              placeholder="City or Airport"
            />
            {errors.from && <p className="text-red-500 text-xs mt-1">{errors.from}</p>}
          </div>
          <div>
            <label htmlFor="to" className="block text-sm font-semibold text-gray-700 mb-2">To</label>
            <AirportAutocomplete
              id="to"
              name="to"
              value={formData.to}
              onChange={(val) => setFormData({ ...formData, to: val })}
              placeholder="City or Airport"
              iconRotation="transform rotate-90"
            />
            {errors.to && <p className="text-red-500 text-xs mt-1">{errors.to}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">Departure Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.date ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-[var(--brand-blue)]"} focus:outline-none focus:ring-2 transition-all bg-gray-50 text-gray-700`}
              />
            </div>
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>
          <div>
            <label htmlFor="passengers" className="block text-sm font-semibold text-gray-700 mb-2">Passengers</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                id="passengers"
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-[var(--brand-blue)] focus:outline-none focus:ring-2 transition-all bg-gray-50 text-gray-700 appearance-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--primary-blue)] hover:bg-[var(--brand-blue)] text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <FaWhatsapp className="w-5 h-5" /> Get Best Price on WhatsApp
        </button>
      </form>
    </div>
  );
}