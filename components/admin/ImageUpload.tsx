"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { UploadCloud, Link as LinkIcon, Image as ImageIcon, Loader2 } from "lucide-react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  bucketName?: string;
  label?: string;
}

export default function ImageUpload({ value, onChange, bucketName = "images", label = "Image URL" }: Props) {
  const [mode, setMode] = useState<"url" | "upload">("url");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image. Please ensure the bucket exists and is public.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="flex bg-gray-100 rounded-md p-1">
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-3 py-1 text-xs rounded-sm flex items-center gap-1 transition-colors ${
              mode === "url" ? "bg-white shadow-sm font-medium text-brand-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <LinkIcon className="w-3 h-3" /> URL
          </button>
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-3 py-1 text-xs rounded-sm flex items-center gap-1 transition-colors ${
              mode === "upload" ? "bg-white shadow-sm font-medium text-brand-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <UploadCloud className="w-3 h-3" /> Upload
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
        />
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:bg-gray-50 transition-colors relative">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/*"
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          {uploading ? (
            <div className="flex flex-col items-center justify-center text-brand-600 py-2">
              <Loader2 className="w-6 h-6 animate-spin mb-2" />
              <span className="text-sm font-medium">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 py-2">
              <UploadCloud className="w-6 h-6 mb-2 text-gray-400" />
              <span className="text-sm font-medium">Click or drag image to upload</span>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      
      {value && mode === "upload" && !uploading && (
        <div className="mt-2 relative inline-block">
          <img src={value} alt="Preview" className="h-20 w-auto rounded-md object-cover border border-gray-200" />
          <p className="text-xs text-gray-500 mt-1 break-all">{value}</p>
        </div>
      )}
    </div>
  );
}
