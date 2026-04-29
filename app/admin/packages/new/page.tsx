import PackageForm from "@/components/admin/PackageForm";

export default function NewPackagePage() {
  return (
    <main className="min-h-screen bg-[#F5FAFF] px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#05A7FF]">
          Admin / Packages
        </p>

        <h1 className="text-4xl font-bold text-[#00297A] mt-3 mb-8">
          Add New Package
        </h1>

        <PackageForm mode="create" />
      </div>
    </main>
  );
}