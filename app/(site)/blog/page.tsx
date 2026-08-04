import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata = {
  title: "Blog & Travel Guides | EazyFly Travels",
  description: "Read our latest travel guides, tips, and news to make your next journey unforgettable.",
};

export default async function BlogListingPage() {
  const supabase = await createClient();
  
  // Only fetch published blogs
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="pt-32 pb-16 text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #00297A, #2B67FF, #05A7FF)",
        }}
      >
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-white/60 mb-3">
            EazyFly Travels
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Travel Guides & News
          </h1>

          <p className="text-white/70 max-w-2xl text-lg">
            Expert advice, hidden gems, and travel updates to inspire your next great adventure.
          </p>
        </div>
      </section>

      {/* BLOG LISTING */}
      <section className="bg-[#f8fafc] py-20 px-6 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {error ? (
            <div className="text-center py-20 text-red-500">
              <h2 className="text-2xl font-bold">Failed to load blogs</h2>
              <p>Please try again later.</p>
            </div>
          ) : !blogs || blogs.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-700">Coming Soon!</h2>
              <p className="text-gray-500 mt-2">We are currently writing some amazing travel guides for you.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative h-60 overflow-hidden bg-gray-200">
                    {blog.image ? (
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                        No Image Available
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <Calendar className="w-3 h-3" />
                      {new Date(blog.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#2B67FF] transition-colors duration-200 line-clamp-2 mb-3">
                      {blog.title}
                    </h2>

                    <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                      {/* Strip markdown/html simple way just for a preview snippet */}
                      {blog.content.replace(/[#*`_]/g, "").substring(0, 150)}...
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <span className="text-sm font-medium text-gray-900">{blog.author}</span>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-[#2B67FF] text-sm group-hover:gap-2.5 transition-all duration-200">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
