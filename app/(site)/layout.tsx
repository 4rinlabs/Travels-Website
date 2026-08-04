import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-600 text-white p-2 rounded z-50">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}