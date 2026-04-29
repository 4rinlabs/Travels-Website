"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I book a package?",
    answer: "You can contact us via WhatsApp or phone to book your package.",
  },
  {
    question: "Do you provide visa services?",
    answer: "Yes, we provide visa assistance for multiple countries.",
  },
  {
    question: "Are flights included?",
    answer: "Flights can be included or booked separately.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <p className="section-label justify-center">Support</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#00297A] mt-4">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = open === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 ${
                isOpen
                  ? "border-[#2B67FF]/20 bg-blue-50/30 shadow-sm"
                  : "border-slate-100 bg-white hover:border-slate-200"
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <h3 className={`font-semibold pr-4 transition-colors ${
                  isOpen ? "text-[#2B67FF]" : "text-slate-700"
                }`}>
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[#2B67FF]" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 pb-5 text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}