"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function DeletePackageButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package?"
    );

    if (!confirmDelete) return;

    setLoading(true);

    const { error } = await supabase
      .from("packages")
      .delete()
      .eq("id", id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition disabled:opacity-60"
    >
      <Trash2 className="w-4 h-4 text-red-500" />
    </button>
  );
}