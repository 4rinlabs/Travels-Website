"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface DeleteVisaButtonProps {
  id: string;
  country: string;
}

export default function DeleteVisaButton({ id, country }: DeleteVisaButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the visa service for "${country}"? This action cannot be undone.`)) {
      setIsDeleting(true);
      const { error } = await supabase.from("visa_services").delete().eq("id", id);
      
      if (!error) {
        router.refresh();
      } else {
        alert("Failed to delete visa service: " + error.message);
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-900 disabled:opacity-50 transition-colors"
      title="Delete visa service"
    >
      <Trash2 className="w-5 h-5" />
      <span className="sr-only">Delete</span>
    </button>
  );
}