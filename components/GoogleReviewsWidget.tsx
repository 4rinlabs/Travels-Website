import { Star, ExternalLink, Quote } from "lucide-react";
import Link from "next/link";

const reviews = [
  {
    name: "Ameen",
    review:
      "Very smooth and professional service. Booking process was easy and support was excellent throughout.",
    rating: 5,
  },
  {
    name: "Fathima",
    review:
      "Had a great experience with EazyFly Travels. Friendly service and quick response for my travel needs.",
    rating: 5,
  },
  {
    name: "Shabeer",
    review:
      "Highly recommended for flight bookings and travel support. Everything was handled without hassle.",
    rating: 5,
  },
];

export default function GoogleReviewsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center mb-16">
          <p className="section-label justify-center">
            Google Reviews
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#00297A] mt-4">
            Trusted by Our Customers
          </h2>

          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            Real customer experiences that reflect the quality and trust behind
            EazyFly Travels.
          </p>
        </div>

        {/* RATING SUMMARY */}
        <div className="bg-[#f8fafc] rounded-[var(--radius-card)] p-8 md:p-10 border border-slate-100 mb-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-sm text-slate-500 mb-2">Google Rating</p>
            <div className="flex items-center gap-3">
              <h3 className="text-5xl font-bold text-[#00297A]">5.0</h3>

              <div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-500 text-sm mt-1">Based on 17 reviews</p>
              </div>
            </div>
          </div>

          <a
            href="https://www.google.com/search?q=EazyFly+Travels+Kasaragod"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #2B67FF, #05A7FF)",
            }}
          >
            View on Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* REVIEW CARDS */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[var(--radius-card)] p-8 shadow-[var(--card-shadow)] border border-slate-100 hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-[#05A7FF]/20 mb-3" />

              <div className="flex items-center gap-0.5 text-amber-400 mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-6">
                &ldquo;{item.review}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2B67FF] to-[#05A7FF] flex items-center justify-center text-white font-bold text-sm">
                  {item.name[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-[#00297A]">{item.name}</h4>
                  <p className="text-xs text-slate-400">
                    Verified Google Review
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}