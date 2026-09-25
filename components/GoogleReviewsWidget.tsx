"use client";

import { Star, ExternalLink, Quote } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleReviewsWidget() {
  const reviews = [
    {
      id: 1,
      author: "Firoz Ozman",
      date: "Local Guide",
      text: "EazyFly Travels made our whole trip stress-free from start to finish. We booked multiple flight tickets through them, and everything was handled smoothly, quickly, and with great attention to detail.",
      rating: 5,
      initial: "F",
      service: "Flight Booking"
    },
    {
      id: 2,
      author: "Abdulla Mohammed",
      date: "Verified Customer",
      text: "I have been booking my flight tickets through Mr. Mohammed Anas for the last 2 years, and the service has always been excellent. He is very professional, supportive, and always helps me get flight tickets at a cheaper price.",
      rating: 5,
      initial: "A",
      service: "Flight Assistance"
    },
    {
      id: 3,
      author: "Shaheer Ahamad",
      date: "Verified Customer",
      text: "I approached EazyFly Travels Kasaragod for visa assistance and I'm satisfied with the service. They checked all documents carefully and guided me step by step through the entire process.",
      rating: 5,
      initial: "S",
      service: "Visa Assistance"
    },
    {
      id: 4,
      author: "Hameed B.",
      date: "Family Traveler",
      text: "Booked a family holiday package to Malaysia and Thailand through EazyFly. Everything from hotel transfers to sightseeing tours was arranged punctually. Best travel agency in Kasaragod!",
      rating: 5,
      initial: "H",
      service: "Holiday Package"
    },
    {
      id: 5,
      author: "Noufal K.",
      date: "Frequent Traveler",
      text: "Super fast response on WhatsApp even late at night when our flight got rescheduled. Mohammed Anas immediately sorted out our alternative tickets without any extra hassle. Highly recommended!",
      rating: 5,
      initial: "N",
      service: "Emergency Ticketing"
    },
    {
      id: 6,
      author: "Safeer Ali",
      date: "Verified Customer",
      text: "Got my Dubai tourist visa and return tickets within just 48 hours. Transparent pricing with no hidden charges. Genuine and trustworthy agency.",
      rating: 5,
      initial: "S",
      service: "Dubai Visa & Flights"
    },
    {
      id: 7,
      author: "Ramees K.",
      date: "Verified Customer",
      text: "Very professional team. They gave us the lowest fare quotes compared to major online travel portals. Excellent customer service from start to finish.",
      rating: 5,
      initial: "R",
      service: "Air Ticketing"
    },
    {
      id: 8,
      author: "Aysha K.",
      date: "Family Trip",
      text: "The customized holiday itinerary they created for our family vacation was top-notch. Every driver was courteous and the hotels matched our expectations completely.",
      rating: 5,
      initial: "A",
      service: "Custom Tour"
    }
  ];

  // Duplicate list to achieve a seamless, gap-free infinite scrolling loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-[var(--card-shadow)] border border-gray-100 overflow-hidden">
      {/* Widget Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center shadow-xs">
            <FcGoogle className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">Google Rating</h3>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                Verified
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-yellow-400" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-gray-900 text-sm">5.0 / 5.0</span>
              <span className="text-gray-400 text-xs">• 18+ Customer Reviews</span>
            </div>
          </div>
        </div>

        <a 
          href="https://google.com/search?q=eazyfly+travels+kasaragod+reviews" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-blue)] hover:text-[var(--brand-blue)] bg-blue-50/80 hover:bg-blue-100/80 px-4 py-2.5 rounded-xl transition-all self-start md:self-auto"
        >
          View all on Google <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Flowing Marquee Carousel Container */}
      <div className="relative -mx-6 md:-mx-10 overflow-hidden">
        {/* Soft edge fade overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling Strip */}
        <div className="animate-marquee py-2 flex gap-5 hover:[animation-play-state:paused]">
          {duplicatedReviews.map((review, idx) => (
            <div 
              key={`${review.id}-${idx}`}
              className="w-[300px] md:w-[350px] shrink-0 bg-gray-50/90 hover:bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 bg-white px-2 py-0.5 rounded-md border border-gray-100">
                    {review.service}
                  </span>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                  "{review.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-gray-200/50 mt-auto">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[var(--primary-blue)] to-[var(--brand-blue)] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {review.initial}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{review.author}</div>
                  <div className="text-[11px] text-gray-500 flex items-center gap-1">
                    <FcGoogle className="w-3.5 h-3.5 inline" /> Google Review
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}