// app/blog/[slug]/page.tsx
import { Blog } from "@/types/blog";
import Image from "next/image";
import { notFound } from "next/navigation";
import { marked } from "marked";
import {
  CalendarDays,
  User,
  Tag,
  BookOpen,
  Heart,
  Eye,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

// Components
import BlogTableOfContents from "@/components/BlogTableOfContents";
import BlogAuthorCard from "@/components/BlogAuthorCard";
import BlogRelatedPosts from "@/components/BlogRelatedPosts";
import BlogShareButtons from "@/components/BlogShareButtons";
import BlogNavbar from "@/components/Blog/BlogNavbar";
import BlogActionButtons from "@/components/Blog/BlogActionButtons";
import BackToTopButton from "@/components/Blog/BackToTopButton";
import NewsletterSubscribe from "@/components/Blog/NewsletterSubscribe";
import BlogComments from "@/components/Blog/BlogComments";
import BlogFormatter from "@/components/Blog/BlogFormatter";

type Props = { params: Promise<{ slug: string }> };

async function getAllSlugs(): Promise<string[]> {
  if (!process.env.NEXT_PUBLIC_API_URL) return [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];
    const json = await res.json();
    const blogs = json.data || json.blogs || json || [];

    return blogs
      .map((blog: any) => blog.slug || blog._id || blog.id)
      .filter(Boolean);
  } catch (error) {
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs();
    return slugs.length > 0
      ? slugs.map((slug) => ({ slug }))
      : [{ slug: "welcome" }, { slug: "getting-started" }];
  } catch (error) {
    return [{ slug: "welcome" }];
  }
}

export const revalidate = 3600;

const BlogPage = async ({ params }: Props) => {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`,
      { cache: "no-store", next: { revalidate: 3600 } }
    );

    if (!res.ok) return notFound();

    const json = await res.json();
    const blogData = json.data || json;

    if (!blogData) return notFound();

    const blog: Blog = {
      ...blogData,
      _id: blogData._id?.toString(),
      tags: blogData.tags || [],
      category: blogData.category || "",
      likes: Number(blogData.likes) || 0,
      views: Number(blogData.views) || 0,
    };

    const formattedDate = blog.date
      ? format(new Date(blog.date), "MMMM dd, yyyy")
      : "Unknown date";

    const wordCount = blog.content ? blog.content.split(/\s+/).length : 0;
    const readingTime = Math.ceil(wordCount / 200);

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50/50 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        {/* Clean Navigation */}
        <BlogNavbar />

        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors mb-6 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform bg-[#FFD230]" />
            <span className="text-sm font-medium text-black dark:text-[#ffffff] rounded-4xl p-2">
              Back to all articles
            </span>
          </Link>
        </div>

        {/* Hero Section - Full Width */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Minimal Category */}
            {blog.category && blog.category.trim() !== "" && (
              <div className="inline-block mb-6">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                  {blog.category}
                </span>
              </div>
            )}

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 dark:text-white mb-8 leading-tight tracking-tight">
              {blog.title}
            </h1>

            {/* Minimal Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300 mb-12 pb-8 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm">
                  {blog.author || "Unknown Author"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <time dateTime={blog.date} className="text-sm">
                  {formattedDate}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">{readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm">{blog.likes}</span>
                <Eye className="w-4 h-4 ml-4 text-blue-400" />
                <span className="text-sm">{blog.views}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Sidebar - Minimal & Collapsible */}
            <aside className="lg:w-64 lg:sticky lg:top-32 lg:self-start shrink-0">
              <div className="space-y-6">
                {/* Tags - Vertical Display */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Tags
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {blog.tags
                        .filter((tag) => tag.trim() !== "")
                        .map((tag: string) => (
                          <Link
                            key={tag}
                            href={`/blog?tag=${tag}`}
                            className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 hover:pl-2 transition-all duration-200"
                          >
                            #{tag}
                          </Link>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Main Content Area - FULL WIDTH */}
            <article className="flex-1 min-w-0">
              {/* Featured Image - Full Width */}
              {blog.coverImage && (
                <div className="mb-10 -mx-4 sm:mx-0">
                  <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                </div>
              )}

              {/* Excerpt */}
              {blog.excerpt && (
                <div className="mb-10 text-xl text-gray-700 dark:text-gray-300 italic font-light leading-relaxed border-l-4 border-blue-400 dark:border-blue-600 pl-6 py-2 bg-blue-50/30 dark:bg-blue-900/10 rounded-r-lg">
                  "{blog.excerpt}"
                </div>
              )}

              <div className="max-w-none">
                <div className="font-sans">
                  <BlogFormatter content={blog.content} />
                </div>
              </div>

              {/* Author & Share Section */}
              <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
                {/* Share Section */}
                <div className="mb-10">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">
                    Share this article
                  </h3>
                  <BlogShareButtons title={blog.title} slug={slug} />
                </div>

                {/* Author Section */}
                <BlogAuthorCard
                  author={blog.author}
                  authorImage={blog.authorImage}
                />
              </div>
            </article>

            {/* Right Sidebar - Related Posts */}
            <aside className="lg:w-80 lg:sticky lg:top-32 lg:self-start shrink-0">
              <div className="space-y-6">
                {/* Newsletter */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                  <NewsletterSubscribe />
                </div>

                {/* Related Posts */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Read Next
                    </h3>
                  </div>
                  <BlogRelatedPosts
                    currentSlug={slug}
                    category={
                      blog.category || blog.title.split(":")[0].trim() || ""
                    }
                  />
                </div>
              </div>
              <BlogComments />
            </aside>
          </div>
        </div>

        {/* Back to Top */}
        <BackToTopButton />
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    return notFound();
  }
};

export default BlogPage;
