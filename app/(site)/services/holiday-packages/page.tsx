import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { ArrowRight } from "lucide-react";

export default async function HolidayPackagesPage() {
  const supabase = await createClient();
  const { data: packages, error } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="py-24 text-center text-red-600">
        <h1 className="text-2xl font-bold mb-4">Error loading packages</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!packages || packages.length === 0) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">No Packages Found</h1>
      </div>
    );
  }

  return (
    <>
      {/* HERO */}
      <section
        className="pt-32 pb-16 text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #00297A, #2B67FF, #05A7FF)",
        }}
      >
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Holiday Packages
          </h1>

          <p className="text-white/70 max-w-2xl text-lg">
            Discover premium travel packages crafted for unforgettable journeys.
          </p>
        </div>
      </section>

      {/* LISTING */}
      <section className="bg-[#f8fafc] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages?.map((pkg) => (
              <Link
                key={pkg.id}
                href={`/services/holiday-packages/${pkg.slug}`}
                className="group bg-white rounded-[var(--radius-card)] overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={pkg.image || "/packages/default.jpg"}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#00297A] group-hover:text-[#2B67FF] transition-colors duration-200">
                    {pkg.title}
                  </h2>

                  <p className="text-slate-500 text-sm mt-2">
                    {pkg.duration}
                  </p>

                  <p className="text-[#05A7FF] font-bold text-lg mt-3">
                    {pkg.price}
                  </p>

                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#2B67FF] text-sm mt-4 group-hover:gap-2.5 transition-all duration-200">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}