"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { VisaService, VisaFormProps } from "@/lib/types";

export default function VisaForm({ initialData }: VisaFormProps) {
  const [formData, setFormData] = useState<Partial<VisaService>>(
    initialData || {
      country: "",
      slug: "",
      validity: "",
      processing_time: "",
      image: "",
      requirements: []
    }
  );
  
  const [docInput, setDocInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addDocument = () => {
    if (docInput.trim() && !formData.requirements?.includes(docInput.trim())) {
      setFormData({
        ...formData,
        requirements: [...(formData.requirements || []), docInput.trim()]
      });
      setDocInput("");
    }
  };

  const removeRequirement = (indexToRemove: number) => {
    setFormData({
      ...formData,
      requirements: (formData.requirements || []).filter((_, index) => index !== indexToRemove)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...formData,
      requirements: formData.requirements || []
    };

    if (initialData?.id) {
      const { error: submitError } = await supabase
        .from("visa_services")
        .update(payload)
        .eq("id", initialData.id);
      
      if (submitError) {
        setError(submitError.message);
        setLoading(false);
        return;
      }
    } else {
      const { error: submitError } = await supabase
        .from("visa_services")
        .insert([payload]);
        
      if (submitError) {
        setError(submitError.message);
        setLoading(false);
        return;
      }
    }

    router.push("/admin/visa");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <input
            id="country"
            name="country"
            type="text"
            required
            value={formData.country || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
          />
        </div>

        <div>
          <label htmlFor="validity" className="block text-sm font-medium text-gray-700 mb-1">Validity</label>
          <input
            id="validity"
            name="validity"
            type="text"
            required
            value={formData.validity || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
            placeholder="e.g. 30 Days"
          />
        </div>

        <div>
          <label htmlFor="processing_time" className="block text-sm font-medium text-gray-700 mb-1">Processing Time</label>
          <input
            id="processing_time"
            name="processing_time"
            type="text"
            required
            value={formData.processing_time || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
            placeholder="e.g. 5-7 Working Days"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Country Flag/Image URL</label>
        <input
          id="image"
          name="image"
          type="text"
          value={formData.image || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
        <div className="flex space-x-2 mb-3">
          <input
            type="text"
            value={docInput}
            onChange={(e) => setDocInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDocument())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
            placeholder="Add a document requirement..."
          />
          <button
            type="button"
            onClick={addDocument}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md border border-gray-300 transition-colors"
          >
            Add
          </button>
        </div>
        
        <ul className="space-y-2">
          {formData.requirements?.map((doc, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
              <span className="text-sm text-gray-700">{doc}</span>
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="text-red-500 hover:text-red-700 font-medium text-sm"
              >
                Remove
              </button>
            </li>
          ))}
          {(!formData.requirements || formData.requirements.length === 0) && (
            <li className="text-sm text-gray-500 italic">No requirements added yet.</li>
          )}
        </ul>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => router.back()}
          className="mr-4 px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : initialData ? "Update Visa Service" : "Create Visa Service"}
        </button>
      </div>
    </form>
  );
}