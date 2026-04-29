import { Globe2, Users, ShieldCheck, Headset } from "lucide-react";

const stats = [
  { icon: Globe2, number: "20+", label: "Destinations" },
  { icon: Users, number: "1000+", label: "Happy Travelers" },
  { icon: ShieldCheck, number: "100%", label: "Trusted Support" },
  { icon: Headset, number: "24/7", label: "Customer Assistance" },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex flex-col items-center text-center py-8 ${
                  index < stats.length - 1
                    ? "md:border-r md:border-slate-200"
                    : ""
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2B67FF] to-[#05A7FF] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-[#00297A]">
                  {item.number}
                </h3>
                <p className="text-slate-500 text-sm mt-1">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}