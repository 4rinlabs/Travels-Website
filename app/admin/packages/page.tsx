import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { supabase } from "@/lib/supabase";
import DeletePackageButton from "@/components/admin/DeletePackageButton";

export default async function AdminPackagesPage() {
  const { data: packages, error } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#F5FAFF] px-4 md:px-6 py-10 md:py-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm text-[#05A7FF] uppercase">
              Admin / Packages
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-[#00297A] mt-2">
              Manage Packages
            </h1>
          </div>

          <Link
            href="/admin/visa/new"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white font-semibold shadow-md w-full md:w-auto"
            style={{
              background:
                "linear-gradient(135deg, #00297A, #2B67FF, #05A7FF)",
            }}
          >
            <Plus className="w-5 h-5" />
            Add Package
          </Link>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-3xl shadow-md overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-4 bg-[#F5FAFF] font-semibold">
            <div className="col-span-3">Title</div>
            <div className="col-span-2">Duration</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-3">Slug</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {packages?.map((pkg) => (
            <div key={pkg.id} className="grid grid-cols-12 px-6 py-5 border-t">
              <div className="col-span-3">{pkg.title}</div>
              <div className="col-span-2">{pkg.duration}</div>
              <div className="col-span-2">{pkg.price}</div>
              <div className="col-span-3">{pkg.slug}</div>

              <div className="col-span-2 flex items-center justify-end gap-3">
                <Link href={`/admin/packages/${pkg.id}/edit`}>
                  <Pencil className="w-4 h-4 text-blue-500" />
                </Link>
                <DeletePackageButton id={pkg.id} />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-5">
          {packages?.map((pkg) => (
            <div key={pkg.id} className="bg-white p-5 rounded-2xl shadow">
              <h2 className="font-bold text-lg text-[#00297A]">
                {pkg.title}
              </h2>

              <div className="text-sm text-gray-600 mt-2">
                <p><strong>Duration:</strong> {pkg.duration}</p>
                <p><strong>Price:</strong> {pkg.price}</p>
                <p><strong>Slug:</strong> {pkg.slug}</p>
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <Link href={`/admin/packages/${pkg.id}/edit`}>
                  <Pencil className="w-5 h-5 text-blue-500" />
                </Link>
                <DeletePackageButton id={pkg.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}