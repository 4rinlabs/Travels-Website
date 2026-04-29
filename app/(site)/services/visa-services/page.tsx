// app/services/visa-services/page.tsx

import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { ArrowRight } from "lucide-react";

export default async function VisaServicesPage() {
  const { data: visas, error } = await supabase
    .from("visa_services")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="bg-[#f8fafc] min-h-screen">

      {/* HERO */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00297A] via-[#2B67FF] to-[#05A7FF]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="relative max-w-7xl mx-auto text-white">
          <p className="uppercase tracking-[4px] text-sm font-semibold text-white/60">
            EazyFly Travels
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            Visa Services
          </h1>

          <p className="max-w-2xl mt-5 text-lg text-white/75 leading-relaxed">
            Fast, reliable and expert visa assistance for your international travel.
            We simplify documentation, submission and approvals.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 rounded-2xl p-5 mb-10 text-sm">
            Failed to load visa services.
          </div>
        )}

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {visas?.map((visa) => (
            <Link
              key={visa.id}
              href={`/services/visa-services/${visa.slug}`}
              className="group bg-white rounded-[var(--radius-card)] overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={visa.image || "/visa/default.jpg"}
                  alt={visa.country}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-[#00297A] px-4 py-1.5 rounded-full text-xs font-semibold">
                    {visa.country} Visa
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6">

                <h2 className="text-xl font-bold text-[#00297A] group-hover:text-[#2B67FF] transition-colors duration-200">
                  {visa.country}
                </h2>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-700">
                      Processing:
                    </span>{" "}
                    {visa.processing_time || "Contact us"}
                  </p>

                  <p>
                    <span className="font-semibold text-slate-700">
                      Validity:
                    </span>{" "}
                    {visa.validity || "Contact us"}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 text-[#05A7FF] font-semibold text-sm mt-5 group-hover:gap-2.5 transition-all duration-200">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}

        </div>

        {/* Empty */}
        {visas?.length === 0 && (
          <div className="text-center py-20 text-slate-400 text-lg">
            No visa services available right now.
          </div>
        )}
      </section>
    </main>
  );
}