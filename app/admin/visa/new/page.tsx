import VisaForm from "@/components/admin/VisaForm";

export default function NewVisaPage() {
  return (
    <main className="min-h-screen bg-[#F5FAFF] px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#05A7FF]">
          Admin / Visa
        </p>

        <h1 className="text-4xl font-bold text-[#00297A] mt-3 mb-8">
          Add Visa Service
        </h1>

        <VisaForm mode="create" />
      </div>
    </main>
  );
}