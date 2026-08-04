import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  const { data: blog } = await supabase.from("blogs").select("title, content, image").eq("slug", params.slug).single();
  
  if (!blog) return { title: "Blog Not Found" };
  
  return {
    title: `${blog.title} | EazyFly Travels Blog`,
    description: blog.content.substring(0, 150),
    openGraph: {
      images: [blog.image || "/logo.png"],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !blog) {
    notFound();
  }

  return (
    <article className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Blog Header Image (if exists) */}
      {blog.image && (
        <div className="w-full h-[40vh] md:h-[60vh] relative">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Blog Content Container */}
      <div className={`max-w-4xl mx-auto px-6 ${blog.image ? '-mt-32 relative z-10' : 'pt-32'}`}>
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          
          <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-[#2B67FF] hover:text-[#00297A] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
          </Link>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-10 pb-10 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#2B67FF]" />
              <span className="font-medium text-gray-700">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2B67FF]" />
              <span>{new Date(blog.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </div>
          </div>

          {/* Markdown Content rendered via react-markdown with prose (typography) */}
          <div className="prose prose-lg prose-blue max-w-none prose-headings:font-bold prose-a:text-[#2B67FF] prose-img:rounded-xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </div>
          
        </div>
      </div>
    </article>
  );
}
