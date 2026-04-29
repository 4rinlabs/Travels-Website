import { notFound } from "next/navigation";
import VisaForm from "@/components/admin/VisaForm";
import { supabase } from "@/lib/supabase";

export default async function EditVisaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: visa } = await supabase
    .from("visa_services")
    .select("*")
    .eq("id", slug)
    .single();

  if (!visa) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F5FAFF] px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#05A7FF]">
          Admin / Visa
        </p>

        <h1 className="text-4xl font-bold text-[#00297A] mt-3 mb-8">
          Edit Visa Service
        </h1>

        <VisaForm mode="edit" initialData={visa} />
      </div>
    </main>
  );
}