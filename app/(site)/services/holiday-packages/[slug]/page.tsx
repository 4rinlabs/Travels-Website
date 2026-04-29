import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PackageDetailClient from "@/components/packages/PackageDetailClient";

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: pkg } = await supabase
    .from("packages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!pkg) {
    notFound();
  }

  return <PackageDetailClient pkg={pkg} />;
}