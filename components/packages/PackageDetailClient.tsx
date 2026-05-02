// components/packages/PackageDetailClient.tsx

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { safeImage } from "@/lib/safeImage";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type PackageType = {
  title: string;
  image?: string | null;
  duration?: string | null;
  price?: string | null;
  overview?: string | null;
  itinerary?: string[];
  inclusions?: string[];
  exclusions?: string[];
  gallery?: string[];
};

type Props = {
  pkg: PackageType;
};

export default function PackageDetailClient({ pkg }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = useMemo(() => {
    const arr = [
      safeImage(pkg.image),
      ...(pkg.gallery || []).map((img) => safeImage(img)),
    ].filter(Boolean);

    return [...new Set(arr)];
  }, [pkg]);

  const whatsapp = encodeURIComponent(`Hi, I want details about ${pkg.title}`);

  function openGallery(i: number) {
    setIndex(i);
    setOpen(true);
  }

  function nextImage() {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  function prevImage() {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      {/* HERO */}
      <section className="relative h-[78vh] min-h-[620px] overflow-hidden">
        <Image
          src={images[0]}
          alt={pkg.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-end pb-14">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 w-full items-end">
            {/* LEFT HERO CONTENT */}
            <div className="text-white max-w-3xl">
              <p className="uppercase tracking-[4px] text-sm text-white/60 font-semibold">
                Premium Holiday Experience
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 leading-tight">
                {pkg.title}
              </h1>

              {pkg.overview && (
                <p className="mt-5 text-lg text-white/80 leading-relaxed max-w-2xl">
                  {pkg.overview}
                </p>
              )}

              <div className="flex flex-wrap gap-3 mt-7">
                {pkg.duration && (
                  <span className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sm">
                    {pkg.duration}
                  </span>
                )}

                {pkg.price && (
                  <span className="px-5 py-2.5 rounded-full bg-[#05A7FF] font-semibold text-sm shadow-lg">
                    {pkg.price}
                  </span>
                )}

                <button
                  onClick={() => openGallery(0)}
                  className="px-5 py-2.5 rounded-full bg-white text-[#00297A] font-semibold text-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  View Photos
                </button>
              </div>
            </div>

            {/* FLOATING BOOK CARD */}
            <div className="bg-white/95 backdrop-blur-xl rounded-[var(--radius-card)] p-8 shadow-2xl">
              <p className="text-xs uppercase tracking-[3px] text-[#05A7FF] font-semibold">
                Quick Booking
              </p>

              <h3 className="text-2xl font-bold text-[#00297A] mt-2">
                Reserve This Trip
              </h3>

              {pkg.price && (
                <p className="text-3xl font-bold text-[#05A7FF] mt-4">
                  {pkg.price}
                </p>
              )}

              <p className="text-slate-600 mt-3 leading-relaxed text-sm">
                Handpicked stays, smooth transfers and expert support for a
                stress-free journey.
              </p>

              <Link
                href={`https://wa.me/919539430097?text=${whatsapp}`}
                target="_blank"
                className="block mt-7 text-center py-3.5 rounded-full text-white text-sm font-semibold shadow-md shadow-blue-500/20"
                style={{
                  background: "linear-gradient(135deg,#00297A,#2B67FF,#05A7FF)",
                }}
              >
                WhatsApp Enquiry
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

      {/* GALLERY */}
      {images.length > 1 && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="section-label">Gallery</p>
              <h2 className="text-3xl font-bold text-[#00297A] mt-3">
                Explore The Destination
              </h2>
            </div>

            <button
              onClick={() => openGallery(0)}
              className="font-semibold text-[#05A7FF] text-sm hover:underline"
            >
              Open Full Gallery →
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {images.slice(1).map((img, i) => (
              <button
                key={i}
                onClick={() => openGallery(i + 1)}
                className={`relative overflow-hidden rounded-[var(--radius-card)] shadow-[var(--card-shadow)] group ${
                  i === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <Image
                  src={img}
                  alt={`${pkg.title}-${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors duration-300" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* DETAILS */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            {/* ITINERARY */}
            {!!pkg.itinerary?.length && (
              <div className="bg-white rounded-[var(--radius-card)] p-8 md:p-10 shadow-[var(--card-shadow)]">
                <p className="section-label">Travel Plan</p>

                <h2 className="text-3xl font-bold text-[#00297A] mt-3 mb-10">
                  Day-wise Itinerary
                </h2>

                <div className="space-y-7">
                  {pkg.itinerary.map((item, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-[#05A7FF] text-white font-bold text-sm flex items-center justify-center">
                          {i + 1}
                        </div>

                        {i !== pkg.itinerary!.length - 1 && (
                          <div className="w-[2px] h-full bg-slate-100 mt-2" />
                        )}
                      </div>

                      <div className="pt-1.5">
                        <p className="font-semibold text-[#00297A] text-sm">
                          Day {i + 1}
                        </p>
                        <p className="text-slate-600 mt-1 leading-relaxed text-sm">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INCLUDED / EXCLUDED */}
            <div className="grid md:grid-cols-2 gap-6">
              {!!pkg.inclusions?.length && (
                <div className="bg-white rounded-[var(--radius-card)] p-8 shadow-[var(--card-shadow)] border border-emerald-100">
                  <h3 className="text-xl font-bold text-emerald-600 mb-5">
                    Included
                  </h3>

                  <ul className="space-y-3">
                    {pkg.inclusions.map((item, i) => (
                      <li
                        key={i}
                        className="text-slate-700 text-sm leading-relaxed flex gap-2"
                      >
                        <span className="text-emerald-500 shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!!pkg.exclusions?.length && (
                <div className="bg-white rounded-[var(--radius-card)] p-8 shadow-[var(--card-shadow)] border border-red-100">
                  <h3 className="text-xl font-bold text-red-500 mb-5">
                    Not Included
                  </h3>

                  <ul className="space-y-3">
                    {pkg.exclusions.map((item, i) => (
                      <li
                        key={i}
                        className="text-slate-700 text-sm leading-relaxed flex gap-2"
                      >
                        <span className="text-red-400 shrink-0">✕</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT STICKY CARD */}
          <aside className="h-fit sticky top-24">
            <div className="bg-white rounded-[var(--radius-card)] p-8 shadow-[var(--card-shadow-hover)]">
              <h3 className="text-2xl font-bold text-[#00297A]">Need Help?</h3>

              <p className="text-slate-600 mt-3 leading-relaxed text-sm">
                Speak with our travel experts for best pricing, visa support and
                custom itineraries.
              </p>

              <Link
                href={`https://wa.me/919539430097?text=${whatsapp}`}
                target="_blank"
                className="block mt-7 text-center py-3.5 rounded-full text-white text-sm font-semibold shadow-md shadow-blue-500/20"
                style={{
                  background: "linear-gradient(135deg,#00297A,#2B67FF,#05A7FF)",
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

      {/* LIGHTBOX */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center px-4">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-5 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-5xl h-[80vh] rounded-[var(--radius-card)] overflow-hidden">
            <Image
              src={images[index]}
              alt="Gallery"
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-5 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 text-white/60 tracking-widest text-xs">
            {index + 1} / {images.length}
          </div>
        </div>
      )}
    </main>
  );
}
