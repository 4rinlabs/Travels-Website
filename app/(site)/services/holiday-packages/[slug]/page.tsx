import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import PackageDetailClient from "@/components/packages/PackageDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: pkg } = await supabase.from("packages").select("title, image, overview").eq("slug", slug).single();
  if (!pkg) return { title: "Package Not Found" };
  return { 
    title: `${pkg.title} | EazyFly Travels`, 
    description: pkg.overview || `Explore the ${pkg.title} holiday package with EazyFly Travels.`, 
    openGraph: { images: pkg.image ? [pkg.image] : [] } 
  };
}

export default async function PackageDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: pkg, error } = await supabase.from("packages").select("*").eq("slug", slug).single();

  if (error || !pkg) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Package not found</h1>
        <Link href="/services/holiday-packages" className="text-brand-600 hover:underline">
          Return to Packages
        </Link>
      </div>
    );
  }

  return <PackageDetailClient pkg={pkg} />;
}