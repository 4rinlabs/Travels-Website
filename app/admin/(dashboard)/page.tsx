import Link from "next/link";
import { Package, FileText, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-[#F5FAFF] px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#05A7FF]">
            Admin Panel
          </p>
          <h1 className="text-4xl font-bold text-[#00297A] mt-3">
            Manage Website Content
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl">
            Manage holiday packages and visa services from one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Packages Card */}
          <Link
            href="/admin/packages"
            className="bg-white rounded-3xl p-8 shadow-md border border-blue-50 hover:shadow-xl transition group"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
              <Package className="w-8 h-8 text-[#2B67FF]" />
            </div>

            <h2 className="text-2xl font-bold text-[#00297A] mb-3">
              Manage Packages
            </h2>

            <p className="text-gray-600 leading-8 mb-6">
              Add, edit, or remove holiday travel packages displayed on your
              website.
            </p>

            <div className="flex items-center gap-2 text-[#2B67FF] font-semibold group-hover:gap-3 transition-all">
              Go to Packages
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>

          {/* Visa Card */}
          <Link
            href="/admin/visa"
            className="bg-white rounded-3xl p-8 shadow-md border border-blue-50 hover:shadow-xl transition group"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
              <FileText className="w-8 h-8 text-[#2B67FF]" />
            </div>

            <h2 className="text-2xl font-bold text-[#00297A] mb-3">
              Manage Visa Services
            </h2>

            <p className="text-gray-600 leading-8 mb-6">
              Add, edit, or remove visa service entries shown on your website.
            </p>

            <div className="flex items-center gap-2 text-[#2B67FF] font-semibold group-hover:gap-3 transition-all">
              Go to Visa Services
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}