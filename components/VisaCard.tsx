import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function VisaCard({
  title,
  image,
  slug,
}: {
  title: string;
  image: string;
  slug: string;
}) {
  return (
    <div className="group bg-white rounded-[var(--radius-card)] overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-[#00297A]">
          {title}
        </h3>

        <div className="mt-5 flex gap-3">
          <Link
            href={`/services/visa-services/${slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2B67FF] text-white text-sm font-semibold hover:shadow-md hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href={`https://wa.me/919995410097?text=I want to know more about ${title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 rounded-full border border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}