"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Info, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ItineraryDay } from "@/lib/types";
import { normalizeItinerary } from "@/lib/itinerary";

interface Props {
  itinerary: (string | ItineraryDay)[];
  title: string;
}

export default function PackageItinerary({ itinerary }: Props) {
  // Normalize data safely with stable IDs and clean structure
  const days: ItineraryDay[] = normalizeItinerary(itinerary);

  // Day 1 is open by default, all others closed
  const [expandedDayId, setExpandedDayId] = useState<string | null>(
    days.length > 0 ? (days[0].id ?? null) : null
  );

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Touch gesture support for mobile swiping
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || lightboxImages.length <= 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 45) {
      // Swiped left -> Next photo
      setPhotoIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
    } else if (diff < -45) {
      // Swiped right -> Prev photo
      setPhotoIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
    }
    setTouchStartX(null);
  };

  if (!days.length) return null;

  return (
    <section className="pt-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Itinerary</h2>
      
      <div className="relative">
        {days.map((day, idx) => {
          const isExpanded = expandedDayId === day.id;
          const isLast = idx === days.length - 1;
          
          return (
            <div key={day.id} className="relative pl-10 md:pl-16 mb-6 last:mb-0">
              {/* Connecting Timeline Line */}
              {!isLast && (
                <div 
                  className="absolute left-[15px] top-[36px] bottom-[-24px] w-[2px] bg-[#00A299] opacity-60" 
                  aria-hidden="true"
                />
              )}
              
              {/* Timeline Number Circle */}
              <div 
                className={`absolute left-0 top-1.5 w-[32px] h-[32px] rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 z-10 ${
                  isExpanded
                    ? "bg-[#00A299] text-white shadow-sm ring-4 ring-[#00A299]/15"
                    : "bg-white border-2 border-[#00A299] text-[#00A299]"
                }`}
              >
                {idx + 1}
              </div>

              {/* Day Accordion Card */}
              <div className="bg-gray-50/90 hover:bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                {/* Full Header Clickable */}
                <button
                  type="button"
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between cursor-pointer focus:outline-none select-none"
                  onClick={() => setExpandedDayId(isExpanded ? null : (day.id ?? null))}
                  aria-expanded={isExpanded}
                >
                  <div className="pr-4">
                    <span className="text-[#00A299] font-bold text-xs tracking-wider uppercase mb-1 block">
                      Day {idx + 1}
                    </span>
                    <h4 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                      {day.title || `Day ${idx + 1}`}
                    </h4>
                  </div>
                  <div className="text-[#00A299] shrink-0 p-1">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
                    ) : (
                      <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
                    )}
                  </div>
                </button>

                {/* Expanded Day Details */}
                {isExpanded && (
                  <div className="px-5 md:px-6 pb-6 pt-1 border-t border-gray-100/60">
                    {/* Description Paragraph */}
                    {day.description && (
                      <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-6 whitespace-pre-line">
                        {day.description}
                      </p>
                    )}

                    {/* Bullet Activities */}
                    {day.activities && day.activities.length > 0 && (
                      <ul className="space-y-3 mb-6">
                        {day.activities.map((activity, actIdx) => (
                          <li key={actIdx} className="flex items-start gap-3 text-gray-700">
                            <span className="w-2 h-2 rounded-full bg-[#10b981] shrink-0 mt-2" />
                            <span className="text-base md:text-lg leading-relaxed">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Day Photos Grid */}
                    {day.images && day.images.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        {day.images.map((img, imgIdx) => (
                          <div 
                            key={imgIdx}
                            className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group bg-gray-200"
                            onClick={() => openLightbox(day.images, imgIdx)}
                          >
                            <Image
                              src={img}
                              alt={`${day.title || `Day ${idx + 1}`} photo ${imgIdx + 1}`}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-xs bg-black/50 px-2 py-1 rounded backdrop-blur-xs">
                                View
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Note Box */}
                    {day.note && (
                      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 flex items-start gap-3">
                        <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <p className="text-emerald-900 text-sm md:text-base leading-relaxed">
                          <span className="font-semibold">Note:</span>{" "}
                          {day.note.replace(/^note:\s*/i, "")}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal with Touch Swipe */}
      {lightboxOpen && lightboxImages.length > 0 && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button */}
          <button 
            aria-label="Close gallery"
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-20"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>
          
          {/* Previous Button */}
          {lightboxImages.length > 1 && (
            <button 
              aria-label="Previous image"
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
              onClick={() => setPhotoIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1))}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Main Photo */}
          <div className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/10] max-h-[85vh] px-4">
            <Image
              src={lightboxImages[photoIndex]}
              alt="Itinerary photo full size"
              fill
              className="object-contain"
            />
          </div>

          {/* Next Button */}
          {lightboxImages.length > 1 && (
            <button 
              aria-label="Next image"
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
              onClick={() => setPhotoIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1))}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}
          
          {/* Counter indicator */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
            {photoIndex + 1} / {lightboxImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
