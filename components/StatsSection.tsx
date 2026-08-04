export default function StatsSection() {
  const stats = [
    { value: "20+", label: "Destinations" },
    { value: "1000+", label: "Happy Travelers" },
    { value: "100%", label: "Trusted Support" },
    { value: "24/7", label: "Assistance" },
  ];

  return (
    <section className="bg-[var(--primary-blue)] py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 50% 50%, var(--light-accent) 0%, transparent 50%)" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/20">
          {stats.map((stat, i) => (
            <div key={i} className={`text-center ${i === 0 ? "" : "pl-8 md:pl-12"}`}>
              <div className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-blue-100 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}