"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, Plane, Map, FileText } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@/lib/site";

const slides = [
  { image: "/hero2.jpg", title: "Unforgettable Journeys", highlight: "Await You", subtitle: "Discover handpicked travel experiences crafted for comfort and adventure." },
  { image: "/hero3.jpg", title: "Your Dream Vacation", highlight: "Starts Here", subtitle: "From stunning beaches to majestic mountains — we have it all." },
  { image: "/hero4.jpg", title: "Fly with", highlight: "Confidence", subtitle: "Best flight deals, visa support, and complete travel assistance." },
  { image: "/hero5.jpg", title: "Explore the World with", highlight: "EazyFly", subtitle: "Affordable packages to the most popular destinations worldwide." },
];

const quickActions = [
  { title: "Book Flights", icon: Plane, href: "/services/flight-tickets" },
  { title: "Holiday Packages", icon: Map, href: "/services/holiday-packages" },
  { title: "Visa Services", icon: FileText, href: "/services/visa-services" },
  { title: "WhatsApp Us", icon: FaWhatsapp, href: siteConfig.social.whatsapp, external: true },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="relative h-screen min-h-[750px] flex flex-col justify-center items-center overflow-hidden bg-black">
      {/* Dynamic Backgrounds */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100 z-0" : "opacity-0 z-0"}`}
        >
          {/* Subtle Overlay to let the image shine */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover ${index === current ? "animate-kenburns" : ""}`}
          />
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center mt-[-4rem]">
        
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in-up shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-white text-sm md:text-base font-medium tracking-wide">
            5.0 Rated on Google | 1000+ Happy Travelers
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up drop-shadow-2xl" style={{ animationDelay: "0.1s" }}>
          {slides[current].title} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-100 drop-shadow-lg">
            {slides[current].highlight}
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-gray-100 mb-12 max-w-3xl animate-fade-in-up font-light drop-shadow-md" style={{ animationDelay: "0.2s" }}>
          {slides[current].subtitle}
        </p>
        
      </div>

      {/* Floating Quick Action Bar */}
      <div className="absolute bottom-12 md:bottom-16 left-0 w-full z-30 px-3 md:px-4">
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
                  <action.icon className="w-4 h-4 md:w-6 md:h-6 text-blue-200 group-hover:text-white group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold text-[10px] md:text-sm">{action.title}</span>
                </a>
              ) : (
                <Link 
                  key={idx}
                  href={action.href}
                  className="group flex flex-col md:flex-row items-center gap-1 md:gap-3 px-1 md:px-6 py-2 rounded-xl md:rounded-full hover:bg-white/20 transition-all cursor-pointer text-white justify-center border border-transparent hover:border-white/10 text-center"
                >
                  <action.icon className="w-4 h-4 md:w-6 md:h-6 text-blue-200 group-hover:text-white group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold text-[10px] md:text-sm">{action.title}</span>
                </Link>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Slider Controls (Hidden on mobile for cleaner look) */}
      <button onClick={prevSlide} aria-label="Previous slide" className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md border border-white/20 hidden md:block group">
        <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
      </button>
      <button onClick={nextSlide} aria-label="Next slide" className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md border border-white/20 hidden md:block group">
        <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${index === current ? "bg-white w-8" : "bg-white/40 w-2 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </section>
  );
}