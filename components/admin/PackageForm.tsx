"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Package, PackageFormProps } from "@/lib/types";
import DynamicListInput from "./DynamicListInput";
import ImageUpload from "./ImageUpload";
import ImageGalleryUpload from "./ImageGalleryUpload";
import ItineraryEditor from "./ItineraryEditor";
import { normalizeItinerary } from "@/lib/itinerary";

export default function PackageForm({ initialData }: PackageFormProps) {
  const [formData, setFormData] = useState<Partial<Package>>(() => {
    const base = initialData || {
      title: "",
      slug: "",
      duration: "",
      price: "",
      overview: "",
      image: "",
      itinerary: [],
      inclusions: [],
      exclusions: [],
      gallery: []
    };
    return {
      ...base,
      itinerary: normalizeItinerary(base.itinerary)
    };
  });
  
  const parsedDays = initialData?.duration ? parseInt(initialData.duration.match(/(\d+)\s*(D|Day)/i)?.[1] || "0") : 0;
  const parsedNights = initialData?.duration ? parseInt(initialData.duration.match(/(\d+)\s*(N|Night)/i)?.[1] || "0") : 0;
  
  const [durationDays, setDurationDays] = useState<number>(parsedDays || 1);
  const [durationNights, setDurationNights] = useState<number>(parsedNights || 1);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSlugify = () => {
    if (formData.title) {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData({ ...formData, slug });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const cleanedItinerary = normalizeItinerary(formData.itinerary);

    const payload = {
      ...formData,
      duration: `${durationDays} Days / ${durationNights} Nights`,
      itinerary: cleanedItinerary,
      inclusions: formData.inclusions || [],
      exclusions: formData.exclusions || [],
      gallery: formData.gallery || []
    };

    if (initialData?.id) {
      // Update
      const { error: submitError } = await supabase
        .from("packages")
        .update(payload)
        .eq("id", initialData.id);
      
      if (submitError) {
        setError(submitError.message);
        setLoading(false);
        return;
      }
    } else {
      // Insert
      const { error: submitError } = await supabase
        .from("packages")
        .insert([payload]);
        
      if (submitError) {
        setError(submitError.message);
        setLoading(false);
        return;
      }
    }

    router.push("/admin/packages");
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
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
          />
        </div>
        
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <div className="flex space-x-2">
            <input
              id="slug"
              name="slug"
              type="text"
              required
              value={formData.slug}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
            />
            <button
              type="button"
              onClick={handleSlugify}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-md border border-gray-300 text-sm transition-colors"
            >
              Generate
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-brand-500 focus-within:border-brand-500">
              <input
                type="number"
                min="1"
                required
                value={durationDays}
                onChange={(e) => setDurationDays(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 outline-none"
              />
              <span className="bg-gray-50 px-3 py-2 text-gray-500 text-sm border-l border-gray-300">Days</span>
            </div>
            <div className="flex-1 flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-brand-500 focus-within:border-brand-500">
              <input
                type="number"
                min="0"
                required
                value={durationNights}
                onChange={(e) => setDurationNights(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 outline-none"
              />
              <span className="bg-gray-50 px-3 py-2 text-gray-500 text-sm border-l border-gray-300">Nights</span>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input
            id="price"
            name="price"
            type="text"
            required
            value={formData.price || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
            placeholder="e.g. ₹25,000"
          />
        </div>

        <div className="md:col-span-2">
          <ImageUpload
            label="Main Image"
            value={formData.image || ""}
            onChange={(url) => setFormData({ ...formData, image: url })}
            bucketName="packages"
          />
        </div>
      </div>

      <div>
        <label htmlFor="overview" className="block text-sm font-medium text-gray-700 mb-1">Overview</label>
        <textarea
          id="overview"
          name="overview"
          required
          rows={4}
          value={formData.overview || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Itinerary</h3>
        <ItineraryEditor
          items={formData.itinerary || []}
          onChange={(items) => setFormData({ ...formData, itinerary: items })}
        />
      </div>

      <div className="border-t border-gray-200 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <DynamicListInput
          label="Inclusions"
          items={formData.inclusions || []}
          onChange={(items) => setFormData({ ...formData, inclusions: items })}
          placeholder="e.g. Breakfast included"
        />
        <DynamicListInput
          label="Exclusions"
          items={formData.exclusions || []}
          onChange={(items) => setFormData({ ...formData, exclusions: items })}
          placeholder="e.g. Visa fees"
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <ImageGalleryUpload
          label="Gallery Images"
          items={formData.gallery || []}
          onChange={(items) => setFormData({ ...formData, gallery: items })}
          bucketName="packages"
        />
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
          {loading ? "Saving..." : initialData ? "Update Package" : "Create Package"}
        </button>
      </div>
    </form>
  );
}