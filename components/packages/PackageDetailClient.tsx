"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import type { Package } from "@/lib/types";
import { Clock, CheckCircle2, Info, X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import PackageItinerary from "./PackageItinerary";

interface Props {
  pkg: Package;
}

export default function PackageDetailClient({ pkg }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const images = pkg.gallery && pkg.gallery.length > 0 ? pkg.gallery : (pkg.image ? [pkg.image] : []);
  const safeMainImage = pkg.image || "/placeholder-package.jpg";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") setPhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      if (e.key === "ArrowRight") setPhotoIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, images.length]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <Image
          src={safeMainImage}
          alt={pkg.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="container mx-auto px-4">
            <span className="inline-block bg-[var(--accent-blue)] text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
              {pkg.duration}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {pkg.title}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl font-medium">
              ₹ {pkg.price?.toString().replace(/AED|₹/gi, '').trim() || 'N/A'} <span className="text-sm font-normal">/ person</span>
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-14 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="prose max-w-none text-gray-600 leading-relaxed text-lg">
                {pkg.overview}
              </div>
            </section>

            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <PackageItinerary itinerary={pkg.itinerary} title={pkg.title} />
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pkg.inclusions && pkg.inclusions.length > 0 && (
                <section className="bg-green-50/50 rounded-2xl p-6 border border-green-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-7 h-7 text-green-500" /> Inclusions
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {pkg.exclusions && pkg.exclusions.length > 0 && (
                <section className="bg-red-50/50 rounded-2xl p-6 border border-red-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <X className="w-7 h-7 text-red-500" /> Exclusions
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    {pkg.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
            
            {images.length > 1 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ImageIcon className="w-8 h-8 text-[var(--accent-blue)]" /> Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                      onClick={() => {
                        setPhotoIndex(idx);
                        setLightboxOpen(true);
                      }}
                    >
                      <Image
                        src={img || ""}
                        alt={`${pkg.title} gallery ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-[var(--card-shadow)] border border-gray-100 sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Book This Package</h3>
              <p className="text-gray-500 mb-6">Get the best quote tailored for you.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-4 rounded-xl">
                  <Clock className="w-6 h-6 text-[var(--accent-blue)]" />
                  <span className="font-semibold">{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-4 rounded-xl">
                  <Info className="w-6 h-6 text-[var(--accent-blue)]" />
                  <span className="font-semibold">Starting from ₹ {pkg.price?.toString().replace(/AED|₹/gi, '').trim() || 'N/A'}</span>
                </div>
              </div>
              
              <a 
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hi, I am interested in the ${pkg.title} package.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <FaWhatsapp className="w-6 h-6" /> Book via WhatsApp
              </a>
              <p className="text-center text-sm text-gray-400 mt-4">We usually reply within 5 minutes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
        >
          <button 
            aria-label="Close gallery"
            className="absolute top-6 right-6 text-white/75 hover:text-white transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-10 h-10" />
          </button>
          
          {images.length > 1 && (
             <button 
               aria-label="Previous image"
               className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
               onClick={() => setPhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
             >
               <ChevronLeft className="w-8 h-8" />
             </button>
          )}

          <div className="relative w-full max-w-5xl aspect-video md:aspect-[21/9]">
            <Image
              src={images[photoIndex]}
              alt={`${pkg.title} gallery full size`}
              fill
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <button 
              aria-label="Next image"
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={() => setPhotoIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/75 font-medium">
            {photoIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
