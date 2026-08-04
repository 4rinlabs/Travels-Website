"use client";
import { siteConfig } from "@/lib/site";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <a
      href={siteConfig.social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300 whatsapp-pulse focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
    >
      <FaWhatsapp className="w-7 h-7" />
    </a>
  );
}
