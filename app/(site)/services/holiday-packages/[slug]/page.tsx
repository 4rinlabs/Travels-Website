import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PackageDetailClient from "@/components/packages/PackageDetailClient";
import { packages as mockPackages } from "@/data/packages";

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let { data: pkg } = await supabase
    .from("packages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!pkg) {
    pkg = mockPackages.find((p) => p.slug === slug) as any;
  }

  if (!pkg) {
    notFound();
  }

  // Ensure itinerary strings are provided if they are objects in mock data
  const processedPkg = {
    ...pkg,
    itinerary: pkg.itinerary?.map((i: any) => typeof i === 'string' ? i : `${i.title}: ${i.description}`)
  };

  return <PackageDetailClient pkg={processedPkg as any} />;
}