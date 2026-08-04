import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Package, VisaService } from "@/lib/types";
import Link from "next/link";
import { Plane, Globe, ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import FlightEnquiryForm from "@/components/FlightEnquiryForm";
import HolidayPackageCard from "@/components/HolidayPackageCard";
import VisaCard from "@/components/VisaCard";
import GoogleReviewsWidget from "@/components/GoogleReviewsWidget";

export const metadata: Metadata = {
  title: "EazyFly Travels - Your Gateway to the World",
  description: "Book flight tickets, holiday packages, and visa services with EazyFly Travels.",
};

export default async function HomePage() {
  const supabase = await createClient();
  
  const { data: packages, error: pkgError } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);
    
  const { data: visas, error: visaError } = await supabase
    .from("visa_services")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <StatsSection />

      {/* Error Banners */}
      {(pkgError || visaError) && (
        <div className="bg-red-50 text-red-600 p-4 text-center">
          <p>We are having trouble loading some content. Please try again later.</p>
        </div>
      )}

      {/* Holiday Packages Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="section-label">Top Destinations</div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Glimpse of <span className="text-[var(--primary-blue)]">Packages</span>
              </h2>
              <p className="text-lg text-gray-600">
                Explore our handpicked holiday packages designed for unforgettable experiences.
              </p>
            </div>
            <Link 
              href="/services/holiday-packages"
              className="inline-flex items-center gap-2 text-[var(--primary-blue)] font-bold hover:text-[var(--brand-blue)] transition-colors group"
            >
              View all packages 
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages?.map((pkg: Package) => (
              <HolidayPackageCard key={pkg.id} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Flight Ticket Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 transform origin-top-right z-0 hidden lg:block" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label">Book Flights</div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Fly Anywhere with <span className="text-[var(--primary-blue)]">EazyFly</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We offer the best flight deals across the globe. Tell us where you want to go, and our agents will find you the cheapest and most convenient flights available.
              </p>
              
              <ul className="space-y-4 mb-10">
                {["Lowest price guarantee", "24/7 customer support", "Flexible booking options", "Instant ticketing assistance"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[var(--brand-blue)]">
                      <Plane className="w-4 h-4" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-brand rounded-[2rem] opacity-20 blur-xl"></div>
              <div className="relative">
                <FlightEnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="section-label">Visa Assistance</div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Hassle-Free <span className="text-[var(--primary-blue)]">Visa Services</span>
              </h2>
              <p className="text-lg text-gray-600">
                Get your tourist and business visas processed quickly and efficiently with our expert team.
              </p>
            </div>
            <Link 
              href="/services/visa-services"
              className="inline-flex items-center gap-2 text-[var(--primary-blue)] font-bold hover:text-[var(--brand-blue)] transition-colors group"
            >
              View all visas 
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visas?.map((visa: VisaService) => (
              <VisaCard key={visa.id} title={visa.country} image={visa.image || ""} slug={visa.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews & Trust Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="section-label justify-center">Testimonials</div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              What Our <span className="text-[var(--primary-blue)]">Clients Say</span>
            </h2>
            <p className="text-lg text-gray-600">
              Don't just take our word for it. Read what our happy travelers have to say about their experiences with EazyFly Travels.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <GoogleReviewsWidget />
          </div>
        </div>
      </section>

    </div>
  );
}