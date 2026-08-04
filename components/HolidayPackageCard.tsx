import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import type { Package } from "@/lib/types";

type HolidayPackageCardProps = Pick<Package, "title" | "slug" | "image" | "price" | "duration" | "overview">;

export default function HolidayPackageCard({ title, slug, image, price, duration, overview }: HolidayPackageCardProps) {
  const safeImage = image || "/placeholder-package.jpg";
  
  return (
    <div className="group relative flex flex-col bg-white rounded-[var(--radius-card)] overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 border border-gray-100 h-full">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={safeImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold text-[var(--primary-blue)] shadow-md">
          ₹ {price?.toString().replace(/AED|₹/gi, '').trim() || 'N/A'} <span className="text-xs font-normal text-gray-500">/ person</span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-sm text-[var(--accent-blue)] font-medium mb-3">
          <Clock className="w-4 h-4" />
          {duration}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[var(--primary-blue)] transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
          {overview}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link 
            href={`/services/holiday-packages/${slug}`}
            className="flex items-center justify-between text-[var(--primary-blue)] font-semibold hover:text-[var(--brand-blue)] transition-colors group/btn after:absolute after:inset-0"
          >
            View Package Details
            <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}