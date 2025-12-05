// app/blog/[slug]/page.tsx
import { Blog } from "@/types/blog";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, User, ArrowLeft, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import BlogTableOfContents from "@/components/BlogTableOfContents";
import BlogAuthorCard from "@/components/BlogAuthorCard";
import BlogRelatedPosts from "@/components/BlogRelatedPosts";
import BlogShareButtons from "@/components/BlogShareButtons";

// Props type - UPDATED for Next.js 15
type Props = { params: Promise<{ slug: string }> };

// Fetch all blog slugs for static generation
async function getAllSlugs(): Promise<string[]> {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.warn("NEXT_PUBLIC_API_URL is not set");
    return [];
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`API responded with status: ${res.status}`);
      return [];
    }

    const json = await res.json();
    const blogs = json.data || json.blogs || json || [];

    if (!Array.isArray(blogs)) {
      console.error("Expected array but got:", typeof blogs);
      return [];
    }

    const slugs = blogs
      .map((blog: any) => blog.slug || blog._id || blog.id)
      .filter(Boolean);

    return slugs;
  } catch (error) {
    console.error("Error in getAllSlugs:", error);
    return [];
  }
}

// Generate static params with fallback
export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs();

    if (slugs.length === 0) {
      console.warn("No slugs found, using fallback slugs");
      return [
        { slug: "welcome" },
        { slug: "getting-started" },
        { slug: "about" },
      ];
    }

    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [{ slug: "welcome" }, { slug: "getting-started" }];
  }
}

// Revalidate the page every hour
export const revalidate = 3600;

const BlogPage = async ({ params }: Props) => {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return notFound();
    }

    const json = await res.json();
    const blogData = json.data || json;

    if (!blogData) return notFound();

    const blog: Blog = {
      ...blogData,
      _id: blogData._id?.toString(),
      // Add empty arrays for optional fields that don't exist in API
      tags: blogData.tags || [],
      category: blogData.category || "",
    };

    // Format date
    const formattedDate = blog.date
      ? format(new Date(blog.date), "MMMM dd, yyyy")
      : "Unknown date";

    // Estimate reading time
    const wordCount = blog.content ? blog.content.split(/\s+/).length : 0;
    const readingTime = Math.ceil(wordCount / 200);

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Back Navigation */}
        <div className="border-b border-gray-100 bg-white pt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4">
              <Link
                href="/blog"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to All Posts
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 py-16 md:py-24">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Category badge - only show if category exists */}
              {blog.category && blog.category.trim() !== "" && (
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <Tag className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">
                    {blog.category}
                  </span>
                </div>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">
                    {blog.author || "Unknown Author"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  <time dateTime={blog.date}>{formattedDate}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Table of Contents Sidebar */}
              <aside className="lg:w-1/4 lg:sticky lg:top-32 lg:self-start">
                <div className="space-y-6">
                  {/* <BlogTableOfContents content={blog.content} /> */}
                  <BlogShareButtons title={blog.title} slug={slug} />
                </div>
              </aside>

              {/* Main Article */}
              <article className="lg:w-2/4">
                {/* Featured Image */}
                {blog.coverImage && (
                  <div className="mb-10 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      width={1200}
                      height={630}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  </div>
                )}

                {/* Excerpt before content */}
                <div className="mb-10">
                  <p className="text-xl text-gray-700 italic border-l-4 border-blue-500 pl-6 py-2">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Article Content */}
                <div
                  className="prose prose-lg max-w-none 
                  prose-headings:text-gray-900
                  prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-gray-700 prose-p:leading-relaxed
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-ul:list-disc prose-ul:pl-6
                  prose-ol:list-decimal prose-ol:pl-6
                  prose-li:my-2
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
                  prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
                  prose-code:text-sm prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-xl
                  prose-img:rounded-lg prose-img:shadow-md
                  prose-table:min-w-full prose-table:divide-y prose-table:divide-gray-200
                  prose-th:px-6 prose-th:py-3 prose-th:text-left prose-th:text-sm prose-th:font-semibold prose-th:text-gray-800
                  prose-td:px-6 prose-td:py-4 prose-td:text-sm prose-td:text-gray-800"
                >
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>

                {/* Tags - only show if tags exist and are not empty */}
                {blog.tags &&
                  blog.tags.length > 0 &&
                  blog.tags.some((tag) => tag.trim() !== "") && (
                    <div className="mt-12 pt-8 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {blog.tags
                          .filter((tag) => tag.trim() !== "")
                          .map((tag: string) => (
                            <span
                              key={tag}
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                              #{tag}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                {/* Share & Author at Bottom */}
                <div className="mt-12 space-y-8">
                  <BlogShareButtons title={blog.title} slug={slug} />
                  {/* Updated BlogAuthorCard to include authorImage */}
                  <BlogAuthorCard
                    author={blog.author}
                    authorImage={blog.authorImage}
                  />
                </div>
              </article>

              {/* Related Posts Sidebar */}
              <aside className="lg:w-1/4">
                <BlogRelatedPosts
                  currentSlug={slug}
                  // Extract category from title or use empty
                  category={
                    blog.category || blog.title.split(":")[0].trim() || ""
                  }
                />
              </aside>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    return notFound();
  }
};

export default BlogPage;
