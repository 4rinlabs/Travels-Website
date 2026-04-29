import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-[#00297A] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* COMPANY */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            {siteConfig.companyName}
          </h2>
          <p className="text-blue-200/70 leading-7 text-sm mb-6">
            Your trusted travel partner for holiday packages, flight tickets,
            and visa services.
          </p>

          <div className="flex gap-3">
            {siteConfig.social.instagram && (
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
            )}

            {siteConfig.social.facebook && (
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                aria-label="Facebook"
              >
                <FaFacebookF size={14} />
              </a>
            )}

            {siteConfig.social.youtube && (
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                aria-label="YouTube"
              >
                <FaYoutube size={16} />
              </a>
            )}

            {siteConfig.social.whatsapp && (
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200/50 mb-5">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "Holiday Packages", href: "/services/holiday-packages" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-blue-100/70 hover:text-white text-sm transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200/50 mb-5">
            Our Services
          </h3>
          <ul className="space-y-3">
            {[
              { label: "Holiday Packages", href: "/services/holiday-packages" },
              { label: "Flight Tickets", href: "/services/flight-tickets" },
              { label: "Visa Services", href: "/services/visa-services" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-blue-100/70 hover:text-white text-sm transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200/50 mb-5">
            Contact Info
          </h3>

          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <Phone className="w-4 h-4 mt-0.5 text-blue-300/50 flex-shrink-0" />
              <a
                href={`tel:${siteConfig.phone}`}
                className="text-blue-100/70 hover:text-white text-sm transition-colors"
              >
                {siteConfig.phone}
              </a>
            </div>

            <div className="flex gap-3 items-start">
              <Mail className="w-4 h-4 mt-0.5 text-blue-300/50 flex-shrink-0" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-blue-100/70 hover:text-white text-sm transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>

            <div className="flex gap-3 items-start">
              <MapPin className="w-4 h-4 mt-0.5 text-blue-300/50 flex-shrink-0" />
              <p className="text-blue-100/70 text-sm leading-6">{siteConfig.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-blue-200/50">
          <p>© 2026 {siteConfig.companyName}. All rights reserved.</p>
          <p>Designed and Developed by 4RinLabs.</p>
        </div>
      </div>
    </footer>
  );
}