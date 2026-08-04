"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface DeletePackageButtonProps {
  id: string;
  title: string;
}

export default function DeletePackageButton({ id, title }: DeletePackageButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the package "${title}"? This action cannot be undone.`)) {
      setIsDeleting(true);
      const { error } = await supabase.from("packages").delete().eq("id", id);
      
      if (!error) {
        router.refresh();
      } else {
        alert("Failed to delete package: " + error.message);
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-900 disabled:opacity-50 transition-colors"
      title="Delete package"
    >
      <Trash2 className="w-5 h-5" />
      <span className="sr-only">Delete</span>
    </button>
  );
}