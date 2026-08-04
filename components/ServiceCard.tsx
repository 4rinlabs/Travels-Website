import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  href: string;
}

export default function ServiceCard({ title, description, Icon, href }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-[var(--radius-card)] p-8 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 border border-gray-100 group">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-[var(--primary-blue)] transition-colors duration-300">
        <Icon className="w-7 h-7 text-[var(--brand-blue)] group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-8 leading-relaxed">
        {description}
      </p>
      <Link 
        href={href}
        className="inline-flex items-center text-[var(--primary-blue)] font-semibold hover:text-[var(--brand-blue)] transition-colors"
      >
        Learn More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}