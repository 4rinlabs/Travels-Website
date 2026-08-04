import { createClient } from "@/lib/supabase/server";
import { VisaService } from "@/lib/types";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import DeleteVisaButton from "@/components/admin/DeleteVisaButton";

export default async function AdminVisaPage() {
  const supabase = await createClient();
  const { data: visas, error } = await supabase
    .from("visa_services")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visa Services</h1>
          <p className="mt-2 text-sm text-gray-600">Manage all your visa processing services here.</p>
        </div>
        <Link
          href="/admin/visa/new"
          className="flex items-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Visa</span>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          Failed to load visa services. Please try again later.
        </div>
      )}

      <div className="bg-white shadow-[var(--card-shadow)] rounded-[var(--radius-card)] overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processing Time</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirements</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {visas?.map((visa: VisaService) => (
              <tr key={visa.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{visa.country}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visa.validity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visa.processing_time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-600">{visa.requirements?.length || 0} docs</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-3">
                    <Link href={`/admin/visa/${visa.id}/edit`} className="text-blue-600 hover:text-blue-900">
                      <Edit className="w-5 h-5" />
                      <span className="sr-only">Edit</span>
                    </Link>
                    <DeleteVisaButton id={visa.id} country={visa.country} />
                  </div>
                </td>
              </tr>
            ))}
            {(!visas || visas.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No visa services found. Click "Add Visa" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}