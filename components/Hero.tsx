// Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/hero1.jpg",
    title: "Explore The World With Confidence",
    subtitle:
      "Holiday Packages, Flights & Visa Services — all in one place.",
  },
  {
    image: "/hero2.jpg",
    title: "Your Dream Vacation Starts Here",
    subtitle:
      "Beautiful destinations, curated packages, and hassle-free planning.",
  },
  {
    image: "/hero3.jpg",
    title: "Travel Smarter With EazyFly Travels",
    subtitle:
      "From booking to boarding, we make every trip smooth and memorable.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[92vh] min-h-[600px] overflow-hidden bg-slate-900 pointer-events-none">
      {/* BACKGROUND */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            current === index ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
        </div>
      ))}

      {/* CONTENT */}
      <div className="relative z-20 h-full flex items-center justify-center text-center px-6 pointer-events-auto">
        <div className="max-w-4xl">
          <p className="text-white/70 text-sm font-semibold uppercase tracking-[4px] mb-5">
            EazyFly Travels
          </p>

          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {slides[current].title}
          </h1>

          <p className="text-white/80 text-lg md:text-xl mt-5 max-w-2xl mx-auto leading-relaxed">
            {slides[current].subtitle}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-9">
            <Link
              href="/services/holiday-packages"
              className="px-8 py-3.5 rounded-full font-semibold bg-white text-[#00297A] pointer-events-auto"
            >
              Explore Packages
            </Link>

            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full font-semibold border border-white/30 text-white pointer-events-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* INDICATORS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 pointer-events-auto">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-[5px] rounded-full ${
              current === index
                ? "w-8 bg-white"
                : "w-[5px] bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}