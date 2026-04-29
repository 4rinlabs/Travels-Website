import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import DeleteVisaButton from "@/components/admin/DeleteVisaButton";
export default async function AdminVisaPage() {
  const { data: visas, error } = await supabase
    .from("visa_services")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#F5FAFF] px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#05A7FF]">
              Admin / Visa
            </p>

            <h1 className="text-4xl font-bold text-[#00297A] mt-3">
              Manage Visa Services
            </h1>

            <p className="text-gray-600 mt-2">
              View, edit and manage visa services.
            </p>
          </div>

          <Link
            href="/admin/visa/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold shadow-md"
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

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-md border border-blue-50 overflow-hidden">

          {/* Heading Row */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#F5FAFF] font-semibold text-[#00297A]">
            <div className="col-span-3">Country</div>
            <div className="col-span-2">Processing</div>
            <div className="col-span-2">Validity</div>
            <div className="col-span-3">Slug</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Rows */}
          {visas?.map((visa) => (
            <div
              key={visa.id}
              className="grid grid-cols-12 gap-4 px-6 py-5 border-t border-blue-50 items-center"
            >
              <div className="col-span-3 font-semibold text-gray-800">
                {visa.country}
              </div>

              <div className="col-span-2 text-gray-600">
                {visa.processing_time || "-"}
              </div>

              <div className="col-span-2 text-gray-600">
                {visa.validity || "-"}
              </div>

              <div className="col-span-3 text-gray-500">
                {visa.slug}
              </div>

              <div className="col-span-2 flex justify-end gap-3">
                <Link
                  href={`/admin/visa/${visa.id}/edit`}
                  className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition"
                >
                  <Pencil className="w-4 h-4 text-[#2B67FF]" />
                </Link>

                <DeleteVisaButton id={visa.id} />

              </div>
            </div>
          ))}

          {/* Empty */}
          {visas?.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No visa services found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}