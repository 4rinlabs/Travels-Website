import { Phone, Mail, MapPin, Clock3, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const whatsappNumber = "919539430097";

  const message = "Hi, I would like to know more about your travel services";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <>
      {/* HERO */}
      <section
        className="py-20 text-center text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #00297A, #2B67FF, #05A7FF)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-white/60 mb-4">
            Get In Touch
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>

          <p className="text-lg max-w-2xl mx-auto px-4 text-white/75">
            We&apos;re here to help you with holiday packages, flights, visa
            services and travel support.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--card-shadow)] border border-slate-100 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-[#00297A] mb-8">
              Get in Touch
            </h2>

            <div className="space-y-7">
              {/* PHONE */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#2B67FF]" />
                </div>

                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Phone</p>
                  <p className="text-base font-medium text-slate-700">
                    +91 9539430097
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#2B67FF]" />
                </div>

                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Email</p>
                  <p className="text-base font-medium text-slate-700">
                    info@eazyflytravels.com
                  </p>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#2B67FF]" />
                </div>

                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Location</p>
                  <p className="text-base font-medium text-slate-700 leading-7">
                    EazyFly Travels
                    <br />
                    The Edge Offices, A17
                    <br />
                    Vidya Nagar, Kasaragod
                    <br />
                    Kerala 671123, India
                  </p>
                </div>
              </div>

              {/* WORKING HOURS */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Clock3 className="w-5 h-5 text-[#2B67FF]" />
                </div>

                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Working Hours</p>
                  <p className="text-base font-medium text-slate-700">
                    Monday - Saturday:
                    <br />
                    9:00 AM to 7:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* WHATSAPP */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 mt-10 px-6 py-3 rounded-full text-sm font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-white"
              style={{
                background: "linear-gradient(135deg, #2B67FF, #05A7FF)",
              }}
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* RIGHT MAP */}
          <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--card-shadow)] border border-slate-100 overflow-hidden">
            <iframe
              src="https://www.google.com/maps?q=The%20Edge%20Offices%20A17%20Vidya%20Nagar%20Kasaragod%20Kerala%20671123&z=15&output=embed"
              width="100%"
              height="100%"
              className="min-h-[550px] border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
