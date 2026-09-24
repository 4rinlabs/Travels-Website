"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, X, UploadCloud, Link as LinkIcon, Loader2, ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  bucketName?: string;
}

export default function ImageGalleryUpload({ label, items, onChange, bucketName = "images" }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [mode, setMode] = useState<"url" | "upload">("url");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleAddUrl = () => {
    if (inputValue.trim()) {
      onChange([...items, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const handleMove = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= items.length) return;
    const newItems = [...items];
    const [moved] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, moved);
    onChange(newItems);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const files = e.target.files;
      if (!files || files.length === 0) return;

      setUploading(true);
      
      const newUrls: string[] = [];
      
      // Upload multiple files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from(bucketName)
          .getPublicUrl(fileName);
          
        newUrls.push(publicUrl);
      }

      onChange([...items, ...newUrls]);
    } catch (err: any) {
      console.error("Gallery upload error:", err);
      setError(err.message || "Failed to upload images. Check if bucket exists and is public.");
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
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddUrl();
              }
            }}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="bg-brand-50 text-brand-600 hover:bg-brand-100 px-4 py-2 rounded-md border border-brand-200 transition-colors flex items-center justify-center"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:bg-gray-50 transition-colors relative">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/*"
            multiple
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          {uploading ? (
            <div className="flex flex-col items-center justify-center text-brand-600 py-2">
              <Loader2 className="w-6 h-6 animate-spin mb-2" />
              <span className="text-sm font-medium">Uploading Images...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 py-2">
              <UploadCloud className="w-6 h-6 mb-2 text-gray-400" />
              <span className="text-sm font-medium">Click or drag images to upload (Multiple allowed)</span>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      {items.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, idx) => (
            <div key={idx} className="relative group aspect-square rounded-md overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
              <img src={item} alt={`Gallery item ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-1 right-1 bg-white/80 hover:bg-white text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-1 left-1 right-1 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                  type="button"
                  onClick={() => handleMove(idx, idx - 1)}
                  disabled={idx === 0}
                  className="bg-black/60 hover:bg-black/80 text-white p-1 rounded disabled:opacity-20"
                  title="Move Left"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(idx, idx + 1)}
                  disabled={idx === items.length - 1}
                  className="bg-black/60 hover:bg-black/80 text-white p-1 rounded disabled:opacity-20"
                  title="Move Right"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
