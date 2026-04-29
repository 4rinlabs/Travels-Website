// app/admin/layout.tsx

import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FBFF]">

      {/* NAVBAR */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-10">
            <Link
              href="/admin"
              className="text-2xl font-bold text-[#00297A]"
            >
              EazyFly Admin
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">

              <Link
                href="/admin"
                className="text-gray-700 hover:text-[#05A7FF]"
              >
                Dashboard
              </Link>

              <Link
                href="/admin/packages"
                className="text-gray-700 hover:text-[#05A7FF]"
              >
                Packages
              </Link>

              <Link
                href="/admin/visa"
                className="text-gray-700 hover:text-[#05A7FF]"
              >
                Visa
              </Link>

              <Link
                href="/admin/packages/new"
                className="text-gray-700 hover:text-[#05A7FF]"
              >
                Add Package
              </Link>

              <Link
                href="/admin/visa/new"
                className="text-gray-700 hover:text-[#05A7FF]"
              >
                Add Visa
              </Link>

            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-full border text-sm font-semibold text-[#00297A]"
            >
              View Site
            </Link>

            <Link
              href="/admin/login"
              className="px-4 py-2 rounded-full text-sm font-semibold text-white"
              style={{
                background:
                  "linear-gradient(135deg,#00297A,#2B67FF,#05A7FF)",
              }}
            >
              Logout
            </Link>

          </div>

        </div>
      </header>

      {/* PAGE */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}