import { Quote } from "lucide-react";

type TestimonialCardProps = {
  name: string;
  destination: string;
  review: string;
};

export default function TestimonialCard({
  name,
  destination,
  review,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-[var(--radius-card)] p-8 shadow-[var(--card-shadow)] border border-slate-100 hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 transition-all duration-300">
      <Quote className="w-7 h-7 text-[#05A7FF]/20 mb-3" />

      <p className="text-slate-600 leading-relaxed mb-6">
        &ldquo;{review}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2B67FF] to-[#05A7FF] flex items-center justify-center text-white font-bold text-sm">
          {name[0]}
        </div>
        <div>
          <h3 className="font-semibold text-[#00297A]">{name}</h3>
          <p className="text-xs text-slate-400">{destination} Traveler</p>
        </div>
      </div>
    </div>
  );
}