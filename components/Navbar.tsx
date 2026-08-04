"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLLIElement>(null);
  const mobileDropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isOutsideDesktop = dropdownRef.current && !dropdownRef.current.contains(e.target as Node);
      const isOutsideMobile = mobileDropdownRef.current && !mobileDropdownRef.current.contains(e.target as Node);
      
      if (isOutsideDesktop && isOutsideMobile) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Destinations", href: "/services/holiday-packages" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className={`relative w-40 h-12 transition-all ${scrolled ? "opacity-100" : "opacity-90 hover:opacity-100"}`}>
              <Image src={(scrolled || menuOpen) ? "/logo.png" : "/EAZYFLY%20white.png"} alt="EazyFly Travels" fill className="object-contain object-left" />
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className={`text-sm font-medium hover:text-[var(--accent-blue)] transition-colors ${scrolled ? "text-gray-700" : "text-white/90 hover:text-white"}`}>
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setServicesOpen(!servicesOpen)}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                className={`flex items-center text-sm font-medium hover:text-[var(--accent-blue)] transition-colors ${scrolled ? "text-gray-700" : "text-white/90 hover:text-white"}`}
              >
                Services <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {servicesOpen && (
                <ul className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 animate-slide-down">
                  <li><Link href="/services/holiday-packages" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[var(--primary-blue)]">Holiday Packages</Link></li>
                  <li><Link href="/services/flight-tickets" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[var(--primary-blue)]">Flight Tickets</Link></li>
                  <li><Link href="/services/visa-services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[var(--primary-blue)]">Visa Services</Link></li>
                </ul>
              )}
            </li>
          </ul>

          <div className="hidden md:flex items-center">
            <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[var(--primary-blue)] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[var(--brand-blue)] transition-colors shadow-md hover:shadow-lg">
              <FaWhatsapp className="w-4 h-4" /> Connect
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            type="button"
            className={`md:hidden p-3 -mr-3 rounded-md cursor-pointer relative z-50 ${scrolled ? "text-gray-900" : "text-white"}`} 
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-label="Toggle menu" 
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6 pointer-events-none" /> : <Menu className="w-6 h-6 pointer-events-none" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl animate-slide-down">
          <ul className="flex flex-col py-4 px-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="block text-gray-800 font-medium hover:text-[var(--brand-blue)]">
                  {link.name}
                </Link>
              </li>
            ))}
            <li ref={mobileDropdownRef}>
              <button onClick={() => setServicesOpen(!servicesOpen)} className="flex items-center justify-between w-full text-gray-800 font-medium py-2">
                Services <ChevronDown className={`w-5 h-5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen && (
                <ul className="mt-2 ml-4 space-y-2 border-l-2 border-gray-100 pl-4">
                  <li><Link href="/services/holiday-packages" className="block py-2 text-gray-600 hover:text-[var(--primary-blue)]">Holiday Packages</Link></li>
                  <li><Link href="/services/flight-tickets" className="block py-2 text-gray-600 hover:text-[var(--primary-blue)]">Flight Tickets</Link></li>
                  <li><Link href="/services/visa-services" className="block py-2 text-gray-600 hover:text-[var(--primary-blue)]">Visa Services</Link></li>
                </ul>
              )}
            </li>
            <li className="pt-4 border-t border-gray-100">
              <a href={siteConfig.social.whatsapp} className="flex items-center justify-center gap-2 w-full bg-[var(--primary-blue)] text-white px-4 py-3 rounded-md font-medium">
                <FaWhatsapp className="w-5 h-5" /> Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}