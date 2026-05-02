import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919539430097"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-pulse fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 hover:scale-110 hover:shadow-xl hover:shadow-green-500/40 active:scale-105 transition-all duration-200"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={26} />
    </a>
  );
}
