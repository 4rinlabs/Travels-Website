"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs?: FAQ[];
}

const defaultFaqs: FAQ[] = [
  {
    question: "Do I need a visa to travel to Dubai?",
    answer: "Most nationalities require a visa to enter the UAE. However, citizens of some countries can get a visa on arrival. Contact us with your nationality for specific requirements, and we can process your tourist visa quickly."
  },
  {
    question: "What is included in your holiday packages?",
    answer: "Our standard holiday packages typically include flights, hotel accommodation, airport transfers, and daily breakfast. Many packages also include guided tours. We can customize any package based on your preferences."
  },
  {
    question: "How long does visa processing take?",
    answer: "Processing times vary by destination. UAE tourist visas generally take 24-48 working hours. Schengen visas can take 2-4 weeks. We advise applying well in advance of your travel dates."
  },
  {
    question: "Can I book only flight tickets without a package?",
    answer: "Yes, absolutely! We offer competitive rates for flight tickets to any destination globally, without requiring you to book a full holiday package."
  }
];

export default function FAQSection({ faqs = defaultFaqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 w-full max-w-3xl mx-auto">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="bg-white border border-gray-200 rounded-[var(--radius-card)] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button
              className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-semibold text-gray-900 text-lg pr-8">{faq.question}</span>
              <ChevronDown className={`w-5 h-5 text-[var(--accent-blue)] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <div 
              id={`faq-answer-${index}`}
              role="region"
              className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <p className="text-gray-600 leading-relaxed pt-2 border-t border-gray-100">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}