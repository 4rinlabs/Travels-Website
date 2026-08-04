import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { FileText } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface VisaCardProps {
  title: string;
  image: string;
  slug: string;
}

export default function VisaCard({ title, image, slug }: VisaCardProps) {
  const safeImage = image || "/placeholder-visa.jpg";
  
  return (
    <div className="group bg-white rounded-[var(--radius-card)] overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 border border-gray-100 flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={safeImage}
          alt={`${title} Visa Services`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-[var(--primary-blue)] flex items-center gap-1">
          <FileText className="w-3 h-3" /> E-Visa
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title} Visa</h3>
        <p className="text-gray-600 text-sm mb-6 flex-grow">
          Fast and reliable visa processing for {title}. Complete guidance from application to approval.
        </p>
        
        <div className="flex items-center gap-3 mt-auto">
          <Link 
            href={`/services/visa-services/${slug}`}
            className="flex-1 bg-gray-50 hover:bg-gray-100 text-[var(--primary-blue)] text-center py-2.5 rounded-lg font-medium text-sm transition-colors border border-gray-200"
          >
            View Details
          </Link>
          <a 
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-colors shadow-sm"
          >
            <FaWhatsapp className="w-4 h-4" /> Apply
          </a>
        </div>
      </div>
    </div>
  );
}
