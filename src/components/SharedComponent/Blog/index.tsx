// Blog.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BlogCard from "./blogCard";
import { Blog } from "@/types/blog";

const GhostBlogCard = ({ delay }: { delay: number }) => {
  return (
    <article
      className="group relative h-full"
      style={{
        animation: `fadeUp 0.8s ease-out forwards ${delay}ms`,
        opacity: 0,
        transform: "translateY(40px)",
      }}
    >
      <div className="relative h-full bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-800 overflow-hidden shadow-xl">
        {/* Ghost Gradient Orb */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-gray-100/30 to-gray-300/30 dark:from-gray-800/30 dark:to-gray-700/30 rounded-full blur-3xl animate-pulse" />

        {/* Ghost Content */}
        <div className="relative z-10 p-8 pb-12 space-y-6">
          {/* Category Badge */}
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full animate-pulse"></div>
            <div className="h-6 w-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full animate-pulse"></div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <div className="h-7 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl animate-pulse"></div>
            <div className="h-7 w-4/5 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl animate-pulse"></div>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded animate-pulse"></div>
          </div>

          {/* Author */}
          <div className="flex items-center gap-4 pt-6">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full animate-pulse"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded animate-pulse"></div>
              <div className="h-3 w-1/3 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Ghost Bottom Bar */}
        <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />

        {/* Ghost Arrow */}
        <div className="absolute bottom-8 right-8">
          <div className="p-4 bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl">
            <div className="w-7 h-7 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Ghost Glows */}
        <div className="absolute top-0 left-0 w-28 h-28 bg-gray-100/20 dark:bg-gray-800/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-36 h-36 bg-gray-300/20 dark:bg-gray-700/20 rounded-full blur-3xl animate-pulse" />
      </div>
    </article>
  );
};

const BlogSection = () => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
          cache: "no-store",
        });
        const json = await res.json();

        if (json.success) {
          const sortedBlogs = json.data
            .sort(
              (a: Blog, b: Blog) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(0, 3)
            .map((blog: any) => ({
              ...blog,
              _id: blog._id.toString(),
              content: blog.content || "",
            }));

          setPosts(sortedBlogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Blog.tsx - Updated loading section
  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden" id="blog">
        {/* Background elements (same as original) */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-10 w-[28rem] h-[28rem] bg-primary/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-20 right-10 w-[28rem] h-[28rem] bg-blue-600/20 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto max-w-7xl px-6">
          {/* Ghost Loading Header */}
          <div className="text-center mb-20">
            <div className="inline-block px-6 py-2 mb-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse rounded-full border border-gray-300/20 dark:border-gray-700/20">
              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>

            <div className="h-16 md:h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse rounded-2xl max-w-2xl mx-auto mb-4"></div>

            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse rounded-xl max-w-3xl mx-auto mt-6"></div>
          </div>

          {/* Ghost Loading Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(3)].map((_, index) => (
              <GhostBlogCard key={index} delay={index * 100} />
            ))}
          </div>

          {/* Ghost Loading Button */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center gap-3 px-12 py-5 animate-pulse">
              <div className="h-7 w-32 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Ghost Loading Card Component
  

  // Add to your global styles
  const globalStyles = `
  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = globalStyles;
    document.head.appendChild(style);
  }

  return (
    <section
      className="relative py-24 overflow-hidden"
      id="blog"
      style={{ background: "transparent" }}
    >
      {/* Soft Background Accents */}
      <div className="absolute inset-0  from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-20 left-10 w-[28rem] h-[28rem] bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-20 right-10 w-[28rem] h-[28rem] bg-blue-600/20 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-6 py-2 text-sm font-semibold tracking-widest uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
            Blog & Insights
          </span>

          <h2 className="mt-6 text-5xl md:text-7xl font-bold bg-clip-text">
            Latest From The Blog
          </h2>

          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Fresh perspectives, deep dives, and cutting-edge ideas — curated for
            modern readers.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((blog, index) => (
            <PremiumBlogCard key={blog._id} blog={blog} delay={index * 150} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-20 ">
          <Link
            href="/blog"
            className="group text-black rounded-full relative inline-flex items-center gap-3 px-12 py-5 text-lg font-medium  bg-gradient-to-r  bg-amber-300 p-1  shadow-xl shadow-primary/30 hover:shadow-primary/40 transition-all duration-500 hover:scale-105 overflow-hidden "
          >
            <span className="relative z-10 ">Read All Articles</span>
            <Icon
              icon="solar:arrow-right-bold"
              className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300"
            />

            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 opacity-40" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// PREMIUM CARD COMPONENT
const PremiumBlogCard = ({ blog, delay }: { blog: Blog; delay: number }) => {
  return (
    <article
      className="group relative h-full"
      style={{
        animation: `fadeUp 0.8s ease-out forwards ${delay}ms`,
        opacity: 0,
        transform: "translateY(40px)",
      }}
    >
      <div className="relative h-full bg-[#052624] dark:bg-[#D9EEDB] backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-800 overflow-hidden shadow-xl transition-all duration-700 group-hover:shadow-3xl group-hover:-translate-y-1">
        {/* Animated Gradient Orb */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-primary/40 to-blue-600/40 rounded-full blur-3xl scale-0 group-hover:scale-100 transition-all duration-1000" />

        {/* Actual Blog Content (Your BlogCard Component) */}
        <div className="relative z-10 p-8 pb-12">
          <BlogCard blog={blog} />
        </div>

        {/* Bottom Gradient Bar */}
        <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-primary via-blue-500 to-purple-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />

        {/* Hover Arrow */}
        <div className="absolute bottom-14 right-12 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <div className="p-4 bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl">
            <Icon
              icon="solar:arrow-right-bold-duotone"
              className="w-7 h-7 text-primary"
            />
          </div>
        </div>

        {/* Soft Glows */}
        <div className="absolute top-0 left-0 w-28 h-28 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute bottom-0 right-0 w-36 h-36 bg-blue-600/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
      </div>
    </article>
  );
};

// Global Animation
const globalStyles = `
  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = globalStyles;
  document.head.appendChild(style);
}

export default BlogSection;
