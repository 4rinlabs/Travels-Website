import { notFound } from "next/navigation";
import PackageForm from "@/components/admin/PackageForm";
import { supabase } from "@/lib/supabase";

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: pkg } = await supabase
    .from("packages")
    .select("*")
    .eq("id", slug)
    .single();

  if (!pkg) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F5FAFF] px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#05A7FF]">
          Admin / Packages
        </p>

        <h1 className="text-4xl font-bold text-[#00297A] mt-3 mb-8">
          Edit Package
        </h1>

        <PackageForm mode="edit" initialData={pkg} />
      </div>
    </main>
  );
}