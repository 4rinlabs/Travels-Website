// components/admin/VisaForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type VisaData = {
  id?: string;
  country: string;
  slug: string;
  image: string;
  processing_time: string;
  validity: string;
  requirements: string[];
};

type VisaFormProps = {
  mode: "create" | "edit";
  initialData?: VisaData;
};

export default function VisaForm({
  mode,
  initialData,
}: VisaFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    country: initialData?.country || "",
    slug: initialData?.slug || "",
    image: initialData?.image || "",
    processing_time: initialData?.processing_time || "",
    validity: initialData?.validity || "",
    requirements:
      initialData?.requirements?.join("\n") || "",
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

    // Auto slug from country
    if (name === "country") {
      setForm((prev) => ({
        ...prev,
        country: value,
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
     IMAGE UPLOAD FROM DEVICE
  ---------------------------- */
  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);
    setError("");

    const ext = file.name.split(".").pop();

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("visas")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const { data } = supabase.storage
      .from("visas")
      .getPublicUrl(fileName);

    setForm((prev) => ({
      ...prev,
      image: data.publicUrl,
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
    setError("");

    const payload = {
      country: form.country.trim(),
      slug: form.slug.trim(),
      image: form.image.trim(),
      processing_time:
        form.processing_time.trim(),
      validity: form.validity.trim(),
      requirements: form.requirements
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean),
    };

    if (!payload.country || !payload.slug) {
      setError("Country and slug are required.");
      setLoading(false);
      return;
    }

    let result;

    if (mode === "create") {
      result = await supabase
        .from("visa_services")
        .insert([payload]);
    } else {
      result = await supabase
        .from("visa_services")
        .update(payload)
        .eq("id", initialData?.id);
    }

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
      return;
    }

    router.push("/admin/visa");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-md border border-blue-50 p-8 space-y-6"
    >
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl">
          {error}
        </div>
      )}

      {/* BASIC */}
      <div className="grid md:grid-cols-2 gap-6">

        <InputField
          label="Country Name"
          name="country"
          value={form.country}
          onChange={handleChange}
        />

        <InputField
          label="Slug"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="dubai-visa"
        />

        <InputField
          label="Processing Time"
          name="processing_time"
          value={form.processing_time}
          onChange={handleChange}
          placeholder="3-5 Working Days"
        />

        <InputField
          label="Validity"
          name="validity"
          value={form.validity}
          onChange={handleChange}
          placeholder="30 Days"
        />

      </div>

      {/* IMAGE UPLOAD */}
      <div>
        <label className="block text-sm font-semibold text-[#00297A] mb-2">
          Visa Image Upload
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border border-blue-100 rounded-2xl px-4 py-3"
        />

        {form.image && (
          <img
            src={form.image}
            alt="preview"
            className="mt-4 h-44 w-full object-cover rounded-2xl"
          />
        )}
      </div>

      {/* REQUIREMENTS */}
      <TextAreaField
        label="Requirements (one item per line)"
        name="requirements"
        value={form.requirements}
        onChange={handleChange}
        rows={6}
      />

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-3 rounded-full font-semibold text-white shadow-md disabled:opacity-70"
        style={{
          background:
            "linear-gradient(135deg,#2B67FF,#05A7FF)",
        }}
      >
        {loading
          ? "Saving..."
          : mode === "create"
          ? "Save Visa"
          : "Update Visa"}
      </button>
    </form>
  );
}

/* ---------------------------
   INPUT FIELD
---------------------------- */
function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
}: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#00297A] mb-2">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-blue-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2B67FF]"
      />
    </div>
  );
}

/* ---------------------------
   TEXTAREA
---------------------------- */
function TextAreaField({
  label,
  name,
  value,
  onChange,
  rows,
}: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#00297A] mb-2">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows || 4}
        className="w-full border border-blue-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2B67FF]"
      />
    </div>
  );
}