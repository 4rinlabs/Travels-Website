import { Target, Eye, Award } from "lucide-react";

export default function AboutPage() {
  const cards = [
    {
      Icon: Target,
      title: "Our Mission",
      text: "To make travel simple, affordable, and memorable.",
    },
    {
      Icon: Eye,
      title: "Our Vision",
      text: "To become a trusted travel partner across India and beyond.",
    },
    {
      Icon: Award,
      title: "Why Choose Us",
      text: "Personalized service, quick support, and best pricing.",
    },
  ];

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

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-white/60 mb-4">
            About Us
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            About EazyFly Travels
          </h1>
          <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
            We specialize in providing seamless travel experiences through curated holiday packages,
            flight bookings, and visa assistance.
          </p>
        </div>
      </section>

      {/* CARDS */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => {
            const { Icon } = card;
            return (
              <div
                key={card.title}
                className="bg-white p-8 rounded-[var(--radius-card)] shadow-[var(--card-shadow)] border border-slate-100 hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2B67FF] to-[#05A7FF] flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-[#00297A] mb-2">
                  {card.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {card.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}