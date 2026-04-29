import { safeImage } from "@/lib/safeImage";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  image: string;
};

export default function DestinationCard({ title, image }: Props) {
  const finalImage = safeImage(image);

  return (
    <div className="group relative bg-white rounded-[var(--radius-card)] overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 transition-all duration-300">
      {/* IMAGE */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={finalImage}
          alt={title}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <h3 className="text-white text-2xl font-bold leading-tight">
            {title}
          </h3>

          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white group-hover:bg-white group-hover:text-[#2B67FF] transition-all duration-300">
            <ArrowRight className="w-5 h-5" />
          </span>
        </div>
      </div>
    </div>
  );
}