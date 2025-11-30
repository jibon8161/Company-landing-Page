// Blog.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BlogCard from "./blogCard";
import { Blog } from "@/types/blog";

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

  if (loading) {
    return (
      <section
        className="flex flex-wrap justify-center dark:bg-darkmode py-16"
        id="blog"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-midnight_text dark:text-white">
              Loading blogs...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="flex flex-wrap justify-center dark:bg-darkmode relative overflow-hidden py-20"
      id="blog"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto max-w-7xl relative z-10 px-4">
        {/* Modern Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-primary to-blue-600 rounded-full animate-pulse"></div>
            <span className="font-medium text-primary text-sm tracking-wider uppercase">
              Latest Updates
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-midnight_text dark:text-white mb-6">
            Latest{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Blog
            </span>{" "}
            & News
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest insights, trends, and news from our
            industry experts
          </p>
        </div>

        {/* Modern Blog Cards Grid with your BlogCard component */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {posts.map((blog, index) => (
            <ModernBlogCardWrapper key={blog._id} blog={blog} index={index} />
          ))}
        </div>

        {/* Modern CTA */}
        <div className="text-center">
          <Link
            href="/blog"
            className="group relative inline-flex items-center gap-4 bg-transparent border-2 border-primary/20 text-primary dark:text-white px-8 py-4 rounded-2xl font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25"
          >
            <span className="relative z-10">Explore All Articles</span>
            <Icon
              icon="solar:arrow-right-outline"
              width="20"
              height="20"
              className="group-hover:translate-x-1 transition-transform duration-300 relative z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Modern wrapper for your existing BlogCard component
const ModernBlogCardWrapper = ({
  blog,
  index,
}: {
  blog: Blog;
  index: number;
}) => {
  const getGradient = (index: number) => {
    const gradients = [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500",
      "from-teal-500 to-blue-500",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <article className="group relative bg-[#173427] dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-gray-100 dark:border-gray-700">
      {/* Gradient Background Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getGradient(
          index
        )} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      ></div>

      {/* Animated Border Gradient */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${getGradient(
          index
        )} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        style={{
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "2px",
        }}
      ></div>

      {/* Card Content */}
      <div className="relative z-10 h-full bg-[#173427] dark:bg-gray-800 rounded-3xl p-1">
        {/* Gradient Accent Bar */}
        <div
          className={`w-full h-1 bg-gradient-to-r ${getGradient(
            index
          )} mb-6 rounded-full`}
        ></div>

        {/* Your BlogCard Component */}
        <div className="px-6 pb-6">
          <BlogCard blog={blog} />
        </div>

        {/* Hover Indicator */}
        <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
          <div
            className={`w-6 h-0.5 bg-gradient-to-r ${getGradient(
              index
            )} rounded-full`}
          ></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-current opacity-0 group-hover:opacity-20 rounded-full transition-all duration-500 delay-75"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-current opacity-0 group-hover:opacity-20 rounded-full transition-all duration-500 delay-150"></div>
    </article>
  );
};

export default BlogSection;
