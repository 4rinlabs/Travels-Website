import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock3, ArrowRight } from "lucide-react";

type HolidayPackageCardProps = {
  title: string;
  image: string;
  description: string;
  duration: string;
  price: string;
  slug: string;
};

export default function HolidayPackageCard({
  title,
  image,
  description,
  duration,
  price,
  slug,
}: HolidayPackageCardProps) {
  return (
    <Link href={`/services/holiday-packages/${slug}`}>
      <div className="group bg-white rounded-[var(--radius-card)] overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm text-sm font-bold text-[#00297A]">
            {price}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-[#00297A] group-hover:text-[#2B67FF] transition-colors duration-200">
            {title}
          </h3>

          <div className="flex items-center gap-4 text-sm text-slate-500 mt-3">
            <div className="flex items-center gap-1.5">
              <Clock3 className="w-3.5 h-3.5 text-[#2B67FF]" />
              <span>{duration}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#2B67FF]" />
              <span>International</span>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed mt-3 line-clamp-2">
            {description}
          </p>

          <span className="inline-flex items-center gap-1.5 font-semibold text-[#2B67FF] mt-4 text-sm group-hover:gap-2.5 transition-all duration-200">
            View Details
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}