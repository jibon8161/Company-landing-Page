// app/blog/[slug]/page.tsx
import { Blog } from "@/types/blog";
import Image from "next/image";
import { notFound } from "next/navigation";
// Add this import at the top with your other imports
import { Suspense } from "react";
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
      <div className=" min-h-screen bg-linear-to-b from-gray-50/50 via-white to-black-50/20 dark: dark:via-gray-900 dark:">
        {/* Clean Navigation */}
        <BlogNavbar />

        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 ">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors mb-6 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform bg-[#FFD230]" />
            <span className="  text-sm font-medium text-black dark:text-[#ffffff] rounded-4xl p-2 ">
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 dark:text-[#ffffff] mb-8 leading-tight tracking-tight ">
              {blog.title}
            </h1>

            {/* Minimal Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-white mb-12 pb-8 border-b border-gray-200 dark:border-gray-800">
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
                <Heart className="w-8 h-8 text-red-400" />
                <span className="text-sm">{blog.likes}</span>
                <Eye className="w-8 h-8 ml-4 text-blue-400" />
                <span className="text-sm">{blog.views}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Sidebar - Minimal & Collapsible */}
            <aside className="lg:w-64 lg:sticky lg:top-32 lg:self-start shrink-0">
              <div className="space-y-6">
                {/* Table of Contents */}
                {/* <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4">
                    Contents
                  </h3>
                  <BlogTableOfContents content={blog.content} />
                </div> */}

                {/* Floating Actions */}
                {/* <BlogActionButtons /> */}

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
                  <div className="relative aspect-21/9 w-full overflow-hidden">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
                  </div>
                </div>
              )}

              {/* Excerpt */}
              {blog.excerpt && (
                <div className="mb-10 text-xl text-gray-700 dark:text-gray-300 italic font-light leading-relaxed border-l-4 border-blue-400 dark:border-blue-600 pl-6 py-2 bg-blue-50/30 dark:bg-blue-900/10 rounded-r-lg">
                  "{blog.excerpt}"
                </div>
              )}

              {/* Article Content - Wide Layout */}
              <div className="max-w-none">
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:font-serif prose-headings:font-light
                    prose-h1:text-5xl prose-h1:mt-12 prose-h1:mb-8 prose-h1:text-gray-900 dark:prose-h1:text-gray-100
                    prose-h2:text-4xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:text-gray-800 dark:prose-h2:text-gray-200
                    prose-h3:text-3xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-700 dark:prose-h3:text-gray-300
                    prose-h4:text-2xl prose-h4:mt-6 prose-h4:mb-4 prose-h4:text-gray-600 dark:prose-h4:text-gray-400
                    prose-p:text-gray-700 dark:prose-p:text-gray-400 prose-p:leading-relaxed prose-p:text-xl prose-p:mb-6
                    prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900 dark:prose-strong:text-gray-200 prose-strong:font-normal
                    prose-ul:text-gray-700 dark:prose-ul:text-gray-400 prose-ul:text-xl prose-ul:my-6
                    prose-ol:text-gray-700 dark:prose-ol:text-gray-400 prose-ol:text-xl prose-ol:my-6
                    prose-li:my-2
                    prose-blockquote:text-2xl prose-blockquote:font-light prose-blockquote:italic
                    prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-300 dark:prose-blockquote:border-blue-700
                    prose-blockquote:pl-8 prose-blockquote:my-10
                    prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                    prose-code:text-lg prose-code:font-mono
                    prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100
                    prose-pre:p-8 prose-pre:rounded-xl prose-pre:my-10 prose-pre:overflow-x-auto
                    prose-pre:border prose-pre:border-gray-800
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:my-10
                    prose-img:mx-auto prose-img:w-full prose-img:h-auto
                    prose-table:w-full prose-table:my-10
                    prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:font-normal prose-th:p-4
                    prose-td:p-4 prose-td:border-t prose-td:border-gray-200 dark:prose-td:border-gray-800
                    prose-figcaption:text-center prose-figcaption:text-gray-500 dark:prose-figcaption:text-gray-500
                    prose-figcaption:text-sm prose-figcaption:mt-2"
                >
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
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
                  <Suspense
                    fallback={
                      <div className="text-sm text-gray-500 py-4">
                        Loading related posts....
                      </div>
                    }
                  >
                    <BlogRelatedPosts
                      currentSlug={slug}
                      category={
                        blog.category || blog.title.split(":")[0].trim() || ""
                      }
                    />
                  </Suspense>
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


export const dynamic = "force-dynamic";
export default BlogPage;
