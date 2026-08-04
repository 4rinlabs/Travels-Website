"use client";

import { useEffect, useState, useRef } from "react";

function AnimatedCounter({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Extract the numeric part and the suffix
  const numMatch = value.match(/^\d+/);
  const targetNumber = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = value.replace(/^\d+/, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < duration) {
        const percentage = progress / duration;
        const easedProgress = easeOutQuart(percentage);
        setCount(Math.floor(targetNumber * easedProgress));
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(targetNumber);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, targetNumber, duration]);

  return (
    <div ref={elementRef} className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
      {count}{suffix}
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    { value: "20+", label: "Destinations" },
    { value: "1000+", label: "Happy Travelers" },
    { value: "100%", label: "Trusted Support" },
    { value: "24/7", label: "Assistance" },
  ];

  return (
    <section className="bg-[var(--primary-blue)] py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 50% 50%, var(--light-accent) 0%, transparent 50%)" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <AnimatedCounter value={stat.value} />
              <div className="text-sm md:text-base text-blue-100 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}