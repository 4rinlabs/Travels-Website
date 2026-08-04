import PackageForm from "@/components/admin/PackageForm";

export default function NewPackagePage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Package</h1>
        <p className="mt-2 text-sm text-gray-600">
          Create a new holiday package to display on your website.
        </p>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--card-shadow)] p-6 md:p-8">
        <PackageForm mode="create" />
      </div>
    </div>
  );
}