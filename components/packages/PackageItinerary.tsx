"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Info, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ItineraryDay } from "@/lib/types";

interface Props {
  itinerary: (string | ItineraryDay)[];
  title: string;
}

export default function PackageItinerary({ itinerary, title }: Props) {
  // Normalize data for the frontend
  const days: ItineraryDay[] = (itinerary || []).map((item, idx) => {
    if (typeof item === "string") {
      return {
        id: `day-${idx}`,
        title: "",
        description: item,
        activities: [],
        images: [],
        note: ""
      };
    }
    return item;
  });

  // Only Day 1 open initially as requested
  const [expandedDayId, setExpandedDayId] = useState<string | null>(
    days.length > 0 ? (days[0].id || `day-0`) : null
  );

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  if (!days.length) return null;

  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Itinerary</h2>
      
      <div className="relative">
        {days.map((day, idx) => {
          const dayId = day.id || `day-${idx}`;
          const isExpanded = expandedDayId === dayId;
          const isLast = idx === days.length - 1;
          
          return (
            <div key={dayId} className="relative pl-10 md:pl-16 mb-6 last:mb-0">
              {/* Timeline Line (Mobile & Desktop adapt) */}
              {!isLast && (
                <div className="absolute left-[15px] top-[36px] bottom-[-24px] w-0.5 bg-gray-200" />
              )}
              
              {/* Number Circle */}
              <div 
                className="absolute left-0 top-1.5 w-[32px] h-[32px] rounded-full bg-[#05A7FF] text-white flex items-center justify-center font-bold text-sm shadow-md"
              >
                {idx + 1}
              </div>

              {/* Day Card */}
              <div className="bg-gray-50/80 rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300">
                {/* Accordion Header */}
                <button
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between focus:outline-none"
                  onClick={() => setExpandedDayId(isExpanded ? null : dayId)}
                >
                  <div>
                    <span className="text-[var(--accent-blue)] font-bold text-sm tracking-wider uppercase mb-1 block">Day {idx + 1}</span>
                    <h4 className="text-xl md:text-2xl font-bold text-gray-900">{day.title || `Day ${idx + 1} Itinerary`}</h4>
                  </div>
                  <div className="text-[var(--accent-blue)] ml-4 shrink-0">
                    {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-5 md:px-6 pb-6">
                    {/* Description */}
                    {day.description && (
                      <p className="text-gray-600 leading-relaxed text-lg mb-6">
                        {day.description}
                      </p>
                    )}

                    {/* Activities */}
                    {day.activities && day.activities.length > 0 && (
                      <ul className="space-y-3 mb-6">
                        {day.activities.map((activity, actIdx) => (
                          <li key={actIdx} className="flex items-start gap-3 text-gray-700">
                            <span className="w-2 h-2 rounded-full bg-[#10b981] shrink-0 mt-2" />
                            <span className="text-lg">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Images Gallery */}
                    {day.images && day.images.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        {day.images.map((img, imgIdx) => (
                          <div 
                            key={imgIdx}
                            className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                            onClick={() => openLightbox(day.images, imgIdx)}
                          >
                            <Image
                              src={img}
                              alt={`${day.title} image ${imgIdx + 1}`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Note Box */}
                    {day.note && (
                      <div className="bg-green-50/70 border border-green-100 rounded-xl p-4 flex items-start gap-3">
                        <Info className="w-6 h-6 text-green-600 shrink-0" />
                        <p className="text-green-800 text-sm md:text-base">{day.note}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox for Images */}
      {lightboxOpen && lightboxImages.length > 0 && (
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
          
          {lightboxImages.length > 1 && (
             <button 
               aria-label="Previous image"
               className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
               onClick={() => setPhotoIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1))}
             >
               <ChevronLeft className="w-8 h-8" />
             </button>
          )}

          <div className="relative w-full max-w-5xl aspect-video md:aspect-[21/9]">
            <Image
              src={lightboxImages[photoIndex]}
              alt={`Gallery full size`}
              fill
              className="object-contain"
            />
          </div>

          {lightboxImages.length > 1 && (
            <button 
              aria-label="Next image"
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={() => setPhotoIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1))}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/75 font-medium">
            {photoIndex + 1} / {lightboxImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
