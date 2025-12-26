// app/blog/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import BlogList from "@/components/Blog/BlogList/index";


export const metadata: Metadata = {
  title: "Blog Articles | Your Site Name",
  description: "Browse our collection of articles, tutorials, and insights",
  keywords: ["blog", "articles", "tutorials", "insights", "web development"],
};

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-900/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Blog
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover insights, tutorials, and stories from our team of experts
            </p>

            {/* Optional: Search or Filter Bar */}
            {/* <BlogFilters /> */}
          </div>
        </div>
      </div>

      {/* Main Content with Suspense Boundary */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex flex-col items-center justify-center ">
              <div className="relative">
                <div className="h-32 w-32 rounded-full border-4 border-blue-200 dark:border-blue-900/30"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="h-24 w-24 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Loading Articles
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Fetching the latest content for you...
                </p>
              </div>
            </div>
          }
        >
          <BlogList />
        </Suspense>
      </div>

      {/* Optional: Newsletter CTA */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Never miss an update
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Subscribe to our newsletter and get the latest articles delivered
              to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
