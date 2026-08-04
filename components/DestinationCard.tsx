import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface DestinationCardProps {
  title: string;
  image: string;
}

export default function DestinationCard({ title, image }: DestinationCardProps) {
  const safeImage = image || "/placeholder-dest.jpg";
  
  return (
    <Link href={`/destinations#${title.toLowerCase().replace(/\s+/g, "-")}`} className="group relative block overflow-hidden rounded-[var(--radius-card)] aspect-[4/5] bg-gray-200">
      <Image
        src={safeImage}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <div className="flex items-center text-white/90 font-medium translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span>Explore destinations</span>
          <ArrowRight className="ml-2 w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}