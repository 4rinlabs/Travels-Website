"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Plane, Map, FileText } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@/lib/site";

const quickActions = [
  { title: "Book Flights", icon: Plane, href: "/services/flight-tickets" },
  { title: "Holiday Packages", icon: Map, href: "/services/holiday-packages" },
  { title: "Visa Services", icon: FileText, href: "/services/visa-services" },
  { title: "WhatsApp Us", icon: FaWhatsapp, href: `https://wa.me/${siteConfig.whatsappNumber}?text=Hi, I'd like to know more about your travel services.`, external: true },
];

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[750px] flex flex-col justify-center items-center overflow-hidden bg-black">
      {/* Nature Background Image (Option 2: Alpine Peaks & Mirror Lake) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/hero-nature.jpg"
          alt="EazyFly Travels - Majestic Nature Landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover animate-kenburns"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center mt-[-4rem]">
        
        {/* Trust Badge - Clean, transparent background removed */}
        <div className="inline-flex items-center gap-2.5 mb-6 animate-fade-in-up">
          <div className="flex text-yellow-400 drop-shadow">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <span className="text-white text-base md:text-lg font-semibold tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            5.0 Rated on Google
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up drop-shadow-2xl" style={{ animationDelay: "0.1s" }}>
          Unforgettable Journeys <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-100 drop-shadow-lg">
            Await You
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-gray-100 mb-12 max-w-3xl animate-fade-in-up font-light drop-shadow-md" style={{ animationDelay: "0.2s" }}>
          Discover handpicked travel experiences crafted for comfort, wonder, and adventure.
        </p>
        
      </div>

      {/* Floating Quick Action Bar */}
      <div className="absolute bottom-28 md:bottom-12 left-0 w-full z-30 px-3 md:px-4">
        <div className="container mx-auto flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-0 w-full max-w-4xl backdrop-blur-xl bg-white/10 p-1.5 md:p-3 rounded-2xl md:rounded-full border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            {quickActions.map((action, idx) => (
              action.external ? (
                <a 
                  key={idx}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col md:flex-row items-center gap-1 md:gap-3 px-1 md:px-6 py-2 rounded-xl md:rounded-full hover:bg-white/20 transition-all cursor-pointer text-white justify-center border border-transparent hover:border-white/10 text-center"
                >
                  <action.icon className="w-6 h-6 md:w-6 md:h-6 text-blue-200 group-hover:text-white group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold text-xs md:text-sm mt-1 md:mt-0">{action.title}</span>
                </a>
              ) : (
                <Link 
                  key={idx}
                  href={action.href}
                  className="group flex flex-col md:flex-row items-center gap-1 md:gap-3 px-1 md:px-6 py-2 rounded-xl md:rounded-full hover:bg-white/20 transition-all cursor-pointer text-white justify-center border border-transparent hover:border-white/10 text-center"
                >
                  <action.icon className="w-6 h-6 md:w-6 md:h-6 text-blue-200 group-hover:text-white group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold text-xs md:text-sm mt-1 md:mt-0">{action.title}</span>
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}