import { ReactNode } from "react";
import LogoutButton from "@/components/admin/LogoutButton";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Briefcase, Globe, PenTool } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="relative w-32 h-10">
              <Image src="/logo.png" alt="EazyFly Logo" fill className="object-contain object-left" />
            </div>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/packages" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Briefcase className="h-5 w-5" />
            <span>Holiday Packages</span>
          </Link>
          <Link href="/admin/visa" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Globe className="h-5 w-5" />
            <span>Visa Services</span>
          </Link>
          <Link href="/admin/blogs" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <PenTool className="h-5 w-5" />
            <span>Blogs</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 shadow-sm h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-2 lg:hidden">
             <Link href="/admin" className="flex items-center space-x-2">
                <div className="relative w-28 h-8">
                  <Image src="/logo.png" alt="EazyFly Logo" fill className="object-contain object-left" />
                </div>
             </Link>
          </div>
          <div className="hidden lg:block"></div>
          <div className="flex items-center space-x-4">
            <LogoutButton />
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}