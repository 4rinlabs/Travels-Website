// components/admin/PackageForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type PackageFormProps = {
  mode: "create" | "edit";
  initialData?: any;
};

export default function PackageForm({
  mode,
  initialData,
}: PackageFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    image: initialData?.image || "",
    duration: initialData?.duration || "",
    price: initialData?.price || "",
    overview: initialData?.overview || "",

    itinerary: initialData?.itinerary?.join("\n") || "",
    inclusions: initialData?.inclusions?.join("\n") || "",
    exclusions: initialData?.exclusions?.join("\n") || "",
    gallery: initialData?.gallery?.join("\n") || "",
  });

  /* ---------------------------
     INPUT CHANGE
  ---------------------------- */
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    // auto slug from title
    if (name === "title") {
      setForm((prev) => ({
        ...prev,
        title: value,
        slug:
          prev.slug ||
          value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-"),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  /* ---------------------------
     BANNER IMAGE UPLOAD
  ---------------------------- */
  async function handleBannerUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("packages")
      .upload(fileName, file);

    if (error) {
      alert("Banner upload failed");
      setLoading(false);
      return;
    }

    const { data } = supabase.storage
      .from("packages")
      .getPublicUrl(fileName);

    setForm((prev) => ({
      ...prev,
      image: data.publicUrl,
    }));

    setLoading(false);
  }

  /* ---------------------------
     MULTI GALLERY UPLOAD
  ---------------------------- */
  async function handleGalleryUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    setLoading(true);

    const urls: string[] = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();

      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;

      const { error } = await supabase.storage
        .from("packages")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (!error) {
        const { data } = supabase.storage
          .from("packages")
          .getPublicUrl(fileName);

        urls.push(data.publicUrl);
      }
    }

    setForm((prev) => ({
      ...prev,
      gallery: prev.gallery
        ? prev.gallery + "\n" + urls.join("\n")
        : urls.join("\n"),
    }));

    setLoading(false);
  }

  /* ---------------------------
     SUBMIT
  ---------------------------- */
  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      image: form.image.trim(),
      duration: form.duration.trim(),
      price: form.price.trim(),
      overview: form.overview.trim(),

      itinerary: form.itinerary
        .split("\n")
        .map((x: string) => x.trim())
        .filter(Boolean),

      inclusions: form.inclusions
        .split("\n")
        .map((x: string) => x.trim())
        .filter(Boolean),

      exclusions: form.exclusions
        .split("\n")
        .map((x: string) => x.trim())
        .filter(Boolean),

      gallery: form.gallery
        .split("\n")
        .map((x: string) => x.trim())
        .filter(Boolean),
    };

    if (mode === "create") {
      await supabase
        .from("packages")
        .insert([payload]);
    } else {
      await supabase
        .from("packages")
        .update(payload)
        .eq("id", initialData.id);
    }

    setLoading(false);

    router.push("/admin/packages");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-10 rounded-3xl shadow-md"
    >
      {/* BASIC */}
      <div className="grid md:grid-cols-2 gap-6">

        <InputField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <InputField
          label="Slug"
          name="slug"
          value={form.slug}
          onChange={handleChange}
        />

        <InputField
          label="Duration"
          name="duration"
          value={form.duration}
          onChange={handleChange}
        />

        <InputField
          label="Price"
          name="price"
          value={form.price}
          onChange={handleChange}
        />

      </div>

      {/* BANNER */}
      <div>
        <label className="block mb-2 font-semibold text-sm">
          Banner Image Upload
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleBannerUpload}
          className="w-full border rounded-2xl px-4 py-3"
        />

        {form.image && (
          <img
            src={form.image}
            alt="banner"
            className="mt-4 h-40 w-full object-cover rounded-2xl"
          />
        )}
      </div>

      {/* OVERVIEW */}
      <TextAreaField
        label="Overview"
        name="overview"
        value={form.overview}
        onChange={handleChange}
        rows={5}
      />

      {/* ITINERARY */}
      <TextAreaField
        label="Itinerary (one line each)"
        name="itinerary"
        value={form.itinerary}
        onChange={handleChange}
        rows={6}
      />

      {/* INCLUSION */}
      <TextAreaField
        label="Inclusions (one line each)"
        name="inclusions"
        value={form.inclusions}
        onChange={handleChange}
        rows={6}
      />

      {/* EXCLUSION */}
      <TextAreaField
        label="Exclusions (one line each)"
        name="exclusions"
        value={form.exclusions}
        onChange={handleChange}
        rows={6}
      />

      {/* GALLERY */}
      <div>
        <label className="block mb-2 font-semibold text-sm">
          Gallery Upload (Multiple)
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryUpload}
          className="w-full border rounded-2xl px-4 py-3"
        />
      </div>

      <TextAreaField
        label="Gallery URLs (Auto Added)"
        name="gallery"
        value={form.gallery}
        onChange={handleChange}
        rows={6}
      />

      {/* BUTTON */}
      <button
        disabled={loading}
        className="px-8 py-4 rounded-full text-white font-semibold"
        style={{
          background:
            "linear-gradient(135deg,#00297A,#2B67FF,#05A7FF)",
        }}
      >
        {loading
          ? "Saving..."
          : mode === "create"
          ? "Create Package"
          : "Update Package"}
      </button>
    </form>
  );
}

/* ---------------------------
   REUSABLE INPUT
---------------------------- */
function InputField({
  label,
  ...props
}: any) {
  return (
    <div>
      <label className="block mb-2 font-semibold text-sm">
        {label}
      </label>

      <input
        {...props}
        className="w-full border rounded-2xl px-4 py-3"
      />
    </div>
  );
}

/* ---------------------------
   REUSABLE TEXTAREA
---------------------------- */
function TextAreaField({
  label,
  ...props
}: any) {
  return (
    <div>
      <label className="block mb-2 font-semibold text-sm">
        {label}
      </label>

      <textarea
        {...props}
        className="w-full border rounded-2xl px-4 py-3"
      />
    </div>
  );
}