import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  link: string;
  Icon: LucideIcon;
};

export default function ServiceCard({
  title,
  description,
  link,
  Icon,
}: ServiceCardProps) {
  return (
    <Link href={link}>
      <div className="group bg-white rounded-[var(--radius-card)] p-8 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 border border-slate-100 cursor-pointer hover:-translate-y-1">

        <div
          className="w-12 h-12 flex items-center justify-center rounded-xl mb-5"
          style={{
            background: "linear-gradient(135deg, #2B67FF, #05A7FF)",
          }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>

        <h3 className="text-xl font-bold text-[#00297A] mb-2 group-hover:text-[#2B67FF] transition-colors duration-200">
          {title}
        </h3>

        <p className="text-slate-600 leading-relaxed mb-5">
          {description}
        </p>

        <span className="inline-flex items-center gap-1.5 font-semibold text-[#2B67FF] text-sm group-hover:gap-2.5 transition-all duration-200">
          Learn More
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}