import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    template: "%s | EazyFly Travels",
    default: "EazyFly Travels - Your Dream Journey",
  },
  description: "Best flight deals, visa support, and complete travel assistance tailored to your needs.",
  openGraph: {
    title: "EazyFly Travels",
    description: "Best flight deals, visa support, and complete travel assistance tailored to your needs.",
    type: "website",
    locale: "en_US",
    siteName: "EazyFly Travels",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}