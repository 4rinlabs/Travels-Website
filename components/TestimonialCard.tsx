import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  destination: string;
  review: string;
}

export default function TestimonialCard({ name, destination, review }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-[var(--radius-card)] p-8 shadow-[var(--card-shadow)] border border-gray-100 relative h-full flex flex-col">
      <Quote className="absolute top-6 right-6 w-10 h-10 text-blue-50 opacity-50" />
      
      <div className="flex text-yellow-400 mb-6">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      <p className="text-gray-700 italic mb-8 flex-grow">
        "{review}"
      </p>
      
      <div className="mt-auto">
        <h4 className="font-bold text-gray-900">{name}</h4>
        <p className="text-sm text-[var(--accent-blue)] font-medium mt-1">Visited {destination}</p>
      </div>
    </div>
  );
}