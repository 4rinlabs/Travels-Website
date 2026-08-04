import { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, Shield, Users, HeartHandshake, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | EazyFly Travels",
  description: "Learn more about EazyFly Travels, your trusted partner for visa and holiday services.",
};

export default function AboutPage() {
  return (
    <div className="bg-gray-50 pb-24">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80"
            alt="Travel background"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-brand-900/60" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About EazyFly Travels</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Making your travel dreams a reality with expert guidance and seamless services.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-14 md:py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-[var(--radius-card)] shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow">
            <div className="w-14 h-14 bg-brand-100 rounded-full flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-brand-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide hassle-free, transparent, and comprehensive travel solutions that empower our clients to explore the world with confidence and peace of mind.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[var(--radius-card)] shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow">
            <div className="w-14 h-14 bg-brand-100 rounded-full flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-brand-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be the most trusted and preferred travel partner, recognized for our commitment to excellence, customer satisfaction, and innovative travel services.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-14 md:py-24 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We stand out by delivering exceptional value and personalized service to every traveler.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Shield, title: "Trusted Agency", desc: "Years of experience in handling complex travel requirements." },
              { icon: HeartHandshake, title: "Personalized Service", desc: "Tailored solutions that fit your specific travel needs." },
              { icon: Users, title: "Expert Support", desc: "Dedicated team available to guide you through every step." },
              { icon: Globe, title: "Global Reach", desc: "Connections worldwide for the best travel deals and processing." }
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}