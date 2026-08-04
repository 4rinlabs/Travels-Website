"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function BlogForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    content: initialData?.content || "",
    image: initialData?.image || "",
    author: initialData?.author || "EazyFly Travels",
    published: initialData?.published || false,
  });

  // Auto-generate slug from title if slug is empty
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => {
      // Only auto-update slug if we are creating new and haven't manually edited slug
      if (!initialData && prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) {
        return {
          ...prev,
          title,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        };
      }
      return { ...prev, title };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (initialData) {
        // Update
        const { error: updateError } = await supabase
          .from("blogs")
          .update(formData)
          .eq("id", initialData.id);
        
        if (updateError) throw updateError;
      } else {
        // Create
        const { error: insertError } = await supabase
          .from("blogs")
          .insert([formData]);
          
        if (insertError) throw insertError;
      }
      
      router.push("/admin/blogs");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save blog post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm font-medium">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={handleTitleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
            placeholder="e.g. Top 10 Places in Dubai"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Slug (URL)</label>
          <input
            type="text"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-') })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500 font-mono text-sm"
            placeholder="e.g. top-10-places-dubai"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
            placeholder="e.g. /blog/dubai.jpg"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Content (Markdown supported)
        </label>
        <textarea
          required
          rows={15}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500 font-mono text-sm leading-relaxed"
          placeholder="Write your blog post here... You can use Markdown like # Heading, **bold**, *italic*, [links](http)..."
        />
        <p className="text-xs text-gray-500">
          Tip: Use Markdown syntax for rich formatting.
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
        />
        <label htmlFor="published" className="block text-sm font-medium text-gray-700">
          Publish instantly? (If unchecked, saves as Draft)
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 px-6 rounded-md disabled:opacity-50"
        >
          {loading ? "Saving..." : (initialData ? "Update Blog" : "Create Blog")}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blogs")}
          className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-2 px-6 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
