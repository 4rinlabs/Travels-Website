import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";
import { Globe, Plane, FileText, ArrowRight } from "lucide-react";

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="py-20 text-center text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #00297A, #2B67FF, #05A7FF)",
        }}
      >
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-white/60 mb-4">
            What We Do
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Travel Services
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-white/75">
            We provide complete travel solutions including holiday packages,
            flight bookings, and visa assistance.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="section-label justify-center">Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#00297A] mt-4">
            What We Offer
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <ServiceCard
            title="Holiday Packages"
            description="Customized travel packages for families, couples, and groups with the best destinations."
            link="/services/holiday-packages"
            Icon={Globe}
          />

          <ServiceCard
            title="Flight Tickets"
            description="Book affordable domestic and international flights with the best deals available."
            link="/services/flight-tickets"
            Icon={Plane}
          />

          <ServiceCard
            title="Visa Services"
            description="Get fast and hassle-free visa assistance for your international travel needs."
            link="/services/visa-services"
            Icon={FileText}
          />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-[#f8fafc] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="section-label justify-center">Why Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#00297A] mt-4">
              Why Choose EazyFly Travels?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Affordable Pricing", text: "We offer the best travel packages at competitive prices." },
              { title: "Trusted Support", text: "Our team provides full support before, during, and after your trip." },
              { title: "Easy Booking", text: "Quick and simple booking through WhatsApp and direct contact." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-7 rounded-[var(--radius-card)] shadow-[var(--card-shadow)] border border-slate-100">
                <h3 className="font-bold text-[#00297A] mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-center text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #00297A, #2B67FF, #05A7FF)",
        }}
      >
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Plan Your Dream Trip Today
          </h2>

          <p className="mb-9 text-lg text-white/75">
            Contact us now and get the best travel deals tailored for you.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white px-8 py-3.5 rounded-full font-semibold text-[#00297A] shadow-xl shadow-black/10 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}