import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">EazyFly Travels</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner for memorable journeys. We provide comprehensive travel solutions including bespoke holiday packages, flight bookings, and reliable visa services.
            </p>
            <div className="flex items-center space-x-4">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-800 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-white transition-colors" aria-label="Instagram">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-800 hover:bg-[#1877F2] hover:text-white transition-colors" aria-label="Facebook">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hi, I'd like to know more about your travel services.`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-800 hover:bg-[#25D366] hover:text-white transition-colors" aria-label="WhatsApp">
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-[var(--accent-blue)] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[var(--accent-blue)] transition-colors">About Us</Link></li>
              <li><Link href="/services/holiday-packages" className="hover:text-[var(--accent-blue)] transition-colors">Destinations</Link></li>
              <li><Link href="/blog" className="hover:text-[var(--accent-blue)] transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--accent-blue)] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services/holiday-packages" className="hover:text-[var(--accent-blue)] transition-colors">Holiday Packages</Link></li>
              <li><Link href="/services/flight-tickets" className="hover:text-[var(--accent-blue)] transition-colors">Flight Tickets</Link></li>
              <li><Link href="/services/visa-services" className="hover:text-[var(--accent-blue)] transition-colors">Visa Services</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--accent-blue)] shrink-0 mt-0.5" />
                <span className="text-gray-400">{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[var(--accent-blue)] shrink-0" />
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="text-gray-400 hover:text-white transition-colors">{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="w-5 h-5 text-[var(--accent-blue)] shrink-0" />
                <a href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hi, I'd like to know more about your travel services.`} className="text-gray-400 hover:text-white transition-colors">{siteConfig.whatsappNumber}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--accent-blue)] shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="text-gray-400 hover:text-white transition-colors">{siteConfig.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {year} EazyFly Travels. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}