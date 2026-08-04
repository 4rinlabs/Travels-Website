import { createClient } from "@/lib/supabase/server";
import { Package } from "@/lib/types";
import PackageForm from "@/components/admin/PackageForm";
import { redirect } from "next/navigation";

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: pkg, error } = await supabase
    .from("packages")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !pkg) {
    redirect("/admin/packages");
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Package</h1>
        <p className="mt-2 text-sm text-gray-600">
          Update the details of your holiday package here.
        </p>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--card-shadow)] p-6 md:p-8">
        <PackageForm initialData={pkg as Package} mode="edit" />
      </div>
    </div>
  );
}
