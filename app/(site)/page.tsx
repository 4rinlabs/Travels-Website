// app/(site)/page.tsx

import Hero from "@/components/Hero";
import DestinationCard from "@/components/DestinationCard";
import StatsSection from "@/components/StatsSection";
import VisaCard from "@/components/VisaCard";
import Link from "next/link";
import { Metadata } from "next";
import GoogleReviewsSection from "@/components/GoogleReviewsWidget";
import { supabase } from "@/lib/supabase";
import { safeImage } from "@/lib/safeImage";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "EazyFly Travels - Holiday Packages, Flights & Visa",
  description:
    "Book holiday packages, flight tickets, and visa services with EazyFly Travels.",
};

export default async function HomePage() {
  /* ---------------------------
     PACKAGES
  ---------------------------- */
  const { data: packages } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  /* ---------------------------
     VISA SERVICES
  ---------------------------- */
  const { data: visas } = await supabase
    .from("visa_services")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <>
      {/* HERO */}
      <Hero />

      {/* FEATURED PACKAGES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="section-label justify-center">
            Destinations
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#00297A] mt-4">
            Featured Holiday Packages
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto mt-4">
            Discover our most loved travel destinations with curated packages.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {packages?.map((pkg: any) => (
            <Link
              key={pkg.id}
              href={`/services/holiday-packages/${pkg.slug}`}
              className="animate-fade-in-up"
            >
              <DestinationCard
                title={pkg.title}
                image={safeImage(pkg.image)}
              />
            </Link>
          ))}
        </div>

        {packages?.length === 0 && (
          <p className="text-center text-slate-400 mt-8">
            Packages coming soon.
          </p>
        )}

        <div className="text-center mt-12">
          <Link
            href="/services/holiday-packages"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #2B67FF, #05A7FF)",
            }}
          >
            View All Packages
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* VISA SERVICES */}
      <section className="bg-[#f8fafc] py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <p className="section-label justify-center">
              Travel Documents
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#00297A] mt-4">
              Visa Services
            </h2>

            <p className="text-slate-500 max-w-2xl mx-auto mt-4">
              Fast and reliable visa assistance for popular travel destinations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {visas?.map((visa: any) => (
              <div key={visa.id} className="animate-fade-in-up">
                <VisaCard
                  title={`${visa.country} Visa`}
                  image={safeImage(visa.image)}
                  slug={visa.slug}
                />
              </div>
            ))}
          </div>

          {visas?.length === 0 && (
            <p className="text-center text-slate-400 mt-8">
              Visa services coming soon.
            </p>
          )}

          <div className="text-center mt-12">
            <Link
              href="/services/visa-services"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #2B67FF, #05A7FF)",
              }}
            >
              Explore Visa Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* GOOGLE REVIEWS */}
      <GoogleReviewsSection />

      {/* STATS */}
      <StatsSection />

      {/* CTA */}
      <section
        className="py-20 text-center text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #00297A, #2B67FF, #05A7FF)",
        }}
      >
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Ready to Plan Your Next Trip?
          </h2>

          <p className="mb-9 text-lg text-white/80 max-w-2xl mx-auto">
            Let us help you with holiday packages, flights, and visa services.
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