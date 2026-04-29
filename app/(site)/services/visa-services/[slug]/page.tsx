// app/services/visa-services/[slug]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { safeImage } from "@/lib/safeImage";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

/* ---------------------------
   SEO
---------------------------- */
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: visa } = await supabase
    .from("visa_services")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!visa) {
    return {
      title: "Visa Not Found | EazyFly Travels",
    };
  }

  return {
    title: `${visa.country} Visa | EazyFly Travels`,
    description: `Get ${visa.country} visa assistance with EazyFly Travels.`,
    openGraph: {
      title: `${visa.country} Visa`,
      images: visa.image
        ? [{ url: visa.image }]
        : [],
    },
  };
}

/* ---------------------------
   PAGE
---------------------------- */
export default async function VisaDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const { data: visa } = await supabase
    .from("visa_services")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!visa) notFound();

  const whatsapp = encodeURIComponent(
    `Hi, I need ${visa.country} visa details`
  );

  const requirements =
    visa.requirements || [];

  return (
    <main className="bg-[#f8fafc] min-h-screen">

      {/* HERO */}
      <section className="relative h-[72vh] min-h-[560px] overflow-hidden">
        <Image
          src={safeImage(visa.image)}
          alt={visa.country}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-end pb-14">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 w-full items-end">

            {/* LEFT */}
            <div className="text-white max-w-3xl">

              <p className="uppercase tracking-[4px] text-sm font-semibold text-white/60">
                Trusted Visa Assistance
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
                {visa.country} Visa
              </h1>

              <p className="mt-5 text-lg text-white/80 leading-relaxed">
                Fast, reliable and professional visa support for your travel plans.
                Documentation guidance, submission help and smooth processing.
              </p>

              <div className="flex flex-wrap gap-3 mt-7">

                {visa.processing_time && (
                  <span className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sm">
                    {visa.processing_time}
                  </span>
                )}

                {visa.validity && (
                  <span className="px-5 py-2.5 rounded-full bg-[#05A7FF] font-semibold text-sm">
                    {visa.validity}
                  </span>
                )}

              </div>

            </div>

            {/* RIGHT CARD */}
            <div className="bg-white/95 backdrop-blur-xl rounded-[var(--radius-card)] p-8 shadow-2xl">

              <p className="uppercase tracking-[3px] text-xs font-semibold text-[#05A7FF]">
                Quick Apply
              </p>

              <h3 className="text-2xl font-bold text-[#00297A] mt-2">
                Apply Today
              </h3>

              <p className="text-slate-600 mt-3 leading-relaxed text-sm">
                Our experts simplify your visa process and guide you at every step.
              </p>

              <Link
                href={`https://wa.me/919995410097?text=${whatsapp}`}
                target="_blank"
                className="block mt-7 text-center py-3.5 rounded-full text-white text-sm font-semibold shadow-md shadow-blue-500/20"
                style={{
                  background:
                    "linear-gradient(135deg,#00297A,#2B67FF,#05A7FF)",
                }}
              >
                WhatsApp Now
              </Link>

              <Link
                href="/contact"
                className="block mt-3 text-center py-3.5 rounded-full border border-slate-200 text-sm font-semibold text-[#00297A] hover:bg-slate-50 transition-colors"
              >
                Request Callback
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-[1fr_360px] gap-10">

          {/* LEFT */}
          <div className="space-y-8">

            {/* INFO CARDS */}
            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-white rounded-[var(--radius-card)] p-8 shadow-[var(--card-shadow)]">
                <p className="section-label">Processing Time</p>

                <h3 className="text-2xl font-bold text-[#00297A] mt-3">
                  {visa.processing_time || "Contact Us"}
                </h3>
              </div>

              <div className="bg-white rounded-[var(--radius-card)] p-8 shadow-[var(--card-shadow)]">
                <p className="section-label">Visa Validity</p>

                <h3 className="text-2xl font-bold text-[#00297A] mt-3">
                  {visa.validity || "Contact Us"}
                </h3>
              </div>

            </div>

            {/* REQUIREMENTS */}
            <div className="bg-white rounded-[var(--radius-card)] p-8 md:p-10 shadow-[var(--card-shadow)]">

              <p className="section-label">Documents</p>

              <h2 className="text-3xl font-bold text-[#00297A] mt-3 mb-10">
                Required Documents
              </h2>

              <div className="space-y-4">
                {requirements.length > 0 ? (
                  requirements.map(
                    (item: string, i: number) => (
                      <div
                        key={i}
                        className="flex gap-4 items-start"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#05A7FF] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          ✓
                        </div>

                        <p className="pt-1 text-slate-700 leading-relaxed text-sm">
                          {item}
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <p className="text-slate-500 text-sm">
                    Contact us for complete document list.
                  </p>
                )}
              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="h-fit sticky top-24">

            <div className="bg-white rounded-[var(--radius-card)] p-8 shadow-[var(--card-shadow-hover)]">

              <h3 className="text-2xl font-bold text-[#00297A]">
                Need Help?
              </h3>

              <p className="text-slate-600 mt-3 leading-relaxed text-sm">
                Get expert assistance for approvals, urgent applications and document checks.
              </p>

              <Link
                href={`https://wa.me/919995410097?text=${whatsapp}`}
                target="_blank"
                className="block mt-7 text-center py-3.5 rounded-full text-white text-sm font-semibold shadow-md shadow-blue-500/20"
                style={{
                  background:
                    "linear-gradient(135deg,#00297A,#2B67FF,#05A7FF)",
                }}
              >
                Chat on WhatsApp
              </Link>

              <Link
                href="/contact"
                className="block mt-3 text-center py-3.5 rounded-full border border-slate-200 text-sm font-semibold text-[#00297A] hover:bg-slate-50 transition-colors"
              >
                Contact Team
              </Link>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}