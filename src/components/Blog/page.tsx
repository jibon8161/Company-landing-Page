// app/blog/page.tsx
import type { Metadata } from "next";
import BlogListWrapper from "@/components/BlogListWrapper";

export const metadata: Metadata = {
  title: "Blog Articles | Your Site Name",
  description: "Browse our collection of articles, tutorials, and insights",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Blog
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Insights and tutorials from our team
            </p>
          </div>
        </div>
      </div>

      {/* Blog List with Wrapper */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <BlogListWrapper />
      </div>
    </main>
  );
}
