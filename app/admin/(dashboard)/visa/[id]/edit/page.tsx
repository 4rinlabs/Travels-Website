import { createClient } from "@/lib/supabase/server";
import { VisaService } from "@/lib/types";
import VisaForm from "@/components/admin/VisaForm";
import { redirect } from "next/navigation";

export default async function EditVisaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: visa, error } = await supabase
    .from("visa_services")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !visa) {
    redirect("/admin/visa");
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Visa Service</h1>
        <p className="mt-2 text-sm text-gray-600">
          Update the details of your visa service here.
        </p>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--card-shadow)] p-6 md:p-8">
        <VisaForm initialData={visa as VisaService} mode="edit" />
      </div>
    </div>
  );
}
