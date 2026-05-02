import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { supabase } from "@/lib/supabase";
import DeleteVisaButton from "@/components/admin/DeleteVisaButton";

export default async function AdminVisaPage() {
  const { data: visas, error } = await supabase
    .from("visa_services")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#F5FAFF] px-4 md:px-6 py-10 md:py-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#05A7FF]">
              Admin / Visa
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-[#00297A] mt-2">
              Manage Visa Services
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
            Add Visa
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600">
            Failed to load visa services.
          </div>
        )}

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-3xl shadow-md border border-blue-50 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#F5FAFF] font-semibold text-[#00297A]">
            <div className="col-span-3">Country</div>
            <div className="col-span-2">Processing</div>
            <div className="col-span-2">Validity</div>
            <div className="col-span-3">Slug</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {visas?.map((visa) => (
            <div
              key={visa.id}
              className="grid grid-cols-12 gap-4 px-6 py-5 border-t items-center"
            >
              <div className="col-span-3">{visa.country}</div>
              <div className="col-span-2">{visa.processing_time || "-"}</div>
              <div className="col-span-2">{visa.validity || "-"}</div>
              <div className="col-span-3">{visa.slug}</div>

              <div className="col-span-2 flex items-center justify-end gap-3">
                <Link href={`/admin/visa/${visa.id}/edit`}>
                  <Pencil className="w-4 h-4 text-blue-500" />
                </Link>
                <DeleteVisaButton id={visa.id} />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-5">
          {visas?.map((visa) => (
            <div
              key={visa.id}
              className="bg-white rounded-2xl p-5 shadow-md border"
            >
              <h2 className="text-lg font-bold text-[#00297A]">
                {visa.country}
              </h2>

              <div className="mt-3 space-y-1 text-sm text-gray-600">
                <p><strong>Processing:</strong> {visa.processing_time || "-"}</p>
                <p><strong>Validity:</strong> {visa.validity || "-"}</p>
                <p><strong>Slug:</strong> {visa.slug}</p>
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <Link href={`/admin/visa/${visa.id}/edit`}>
                  <Pencil className="w-5 h-5 text-blue-500" />
                </Link>
                <DeleteVisaButton id={visa.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}