"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  /* Header scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  /* Desktop dropdown outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* HEADER */}
      <header
        className={`sticky top-0 z-[9999] transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100"
            : "bg-white border-b border-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="shrink-0"
            onClick={closeMenu}
          >
            <Image
              src="/logo.png"
              alt="EazyFly Travels"
              width={160}
              height={55}
              priority
              className="w-[120px] sm:w-[140px] md:w-[152px] h-auto"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-1 text-[0.925rem] font-medium text-slate-600">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg hover:text-blue-600 hover:bg-blue-50"
            >
              Home
            </Link>

            {/* SERVICES */}
            <div
              className="relative"
              ref={dropdownRef}
            >
              <button
                onClick={() =>
                  setServicesOpen(!servicesOpen)
                }
                className="flex items-center gap-1 px-4 py-2 rounded-lg hover:text-blue-600 hover:bg-blue-50"
              >
                Services

                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    servicesOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {servicesOpen && (
                <div className="absolute top-full mt-2 left-0 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2">
                  <Link
                    href="/services/holiday-packages"
                    className="block px-5 py-3 hover:bg-blue-50"
                  >
                    Holiday Packages
                  </Link>

                  <Link
                    href="/services/flight-tickets"
                    className="block px-5 py-3 hover:bg-blue-50"
                  >
                    Flight Tickets
                  </Link>

                  <Link
                    href="/services/visa-services"
                    className="block px-5 py-3 hover:bg-blue-50"
                  >
                    Visa Services
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="px-4 py-2 rounded-lg hover:text-blue-600 hover:bg-blue-50"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg hover:text-blue-600 hover:bg-blue-50"
            >
              Contact
            </Link>
          </div>

          {/* DESKTOP CTA */}
          <div className="hidden md:block">
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
              style={{
                background:
                  "linear-gradient(135deg,#2B67FF,#05A7FF)",
              }}
            >
              <MessageCircle className="w-4 h-4" />
              Enquire Now
            </a>
          </div>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            style={{
              WebkitTapHighlightColor:
                "transparent",
            }}
            className="md:hidden relative z-[10060] p-2 rounded-lg touch-manipulation active:scale-95"
          >
            {menuOpen ? (
              <X className="w-7 h-7 text-slate-700" />
            ) : (
              <Menu className="w-7 h-7 text-slate-700" />
            )}
          </button>
        </nav>
      </header>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-[10050] md:hidden transition-all duration-300 ${
          menuOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
      >
        {/* BACKDROP */}
        <div
          onClick={closeMenu}
          className="absolute inset-0 bg-black/40"
        />

        {/* DRAWER */}
        <aside
          className={`absolute right-0 top-0 h-full w-[84%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
            menuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          {/* TOP */}
          <div className="h-[72px] px-5 border-b border-slate-100 flex items-center justify-between">
            <Image
              src="/logo.png"
              alt="EazyFly Travels"
              width={120}
              height={40}
              className="h-auto"
            />

            <button
              onClick={closeMenu}
              className="p-2 rounded-lg active:bg-slate-100"
            >
              <X className="w-6 h-6 text-slate-700" />
            </button>
          </div>

          {/* LINKS */}
          <nav className="px-5 py-4 flex flex-col text-slate-700">
            <Link
              href="/"
              onClick={closeMenu}
              className="py-4 border-b border-slate-100"
            >
              Home
            </Link>

            <p className="pt-5 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Services
            </p>

            <Link
              href="/services/holiday-packages"
              onClick={closeMenu}
              className="py-3 pl-3 rounded-lg hover:bg-blue-50"
            >
              Holiday Packages
            </Link>

            <Link
              href="/services/flight-tickets"
              onClick={closeMenu}
              className="py-3 pl-3 rounded-lg hover:bg-blue-50"
            >
              Flight Tickets
            </Link>

            <Link
              href="/services/visa-services"
              onClick={closeMenu}
              className="py-3 pl-3 rounded-lg hover:bg-blue-50"
            >
              Visa Services
            </Link>

            <Link
              href="/about"
              onClick={closeMenu}
              className="py-4 border-b border-slate-100 mt-2"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className="py-4 border-b border-slate-100"
            >
              Contact
            </Link>

            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-center px-6 py-3 rounded-full font-semibold text-white"
              style={{
                background:
                  "linear-gradient(135deg,#2B67FF,#05A7FF)",
              }}
            >
              Enquire Now
            </a>
          </nav>
        </aside>
      </div>
    </>
  );
}