// Blog.tsx
import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BlogCard from "./blogCard";
import { Blog } from "@/types/blog";

// Fetch latest blogs from your MongoDB backend
const getLatestBlogs = async (): Promise<Blog[]> => {
  const res = await fetch("http://localhost:5000/blogs", { cache: "no-store" });
  const json = await res.json();
  if (!json.success) return [];

  // Sort by date descending and take latest 3
  return json.data
    .sort(
      (a: Blog, b: Blog) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 3)
    .map((blog: any) => ({
      ...blog,
      _id: blog._id.toString(),
      content: blog.content || "", // ensure content is always a string
    }));
};

const Blog = async () => {
  const posts = await getLatestBlogs();

  return (
    <section
      className="flex flex-wrap justify-center dark:bg-darkmode"
      id="blog"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-baseline justify-between flex-wrap mb-8">
          <h2 className="sm:mb-11 mb-3 text-4xl font-bold text-midnight_text dark:text-white">
            Latest Blog & News
          </h2>
          <Link
            href="/blog"
            className="flex items-center gap-3 text-base text-midnight_text dark:text-white dark:hover:text-primary font-medium hover:text-primary sm:pb-0 pb-3"
          >
            View More
            <Icon icon="solar:arrow-right-outline" width="30" height="30" />
          </Link>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-12 gap-7">
          {posts.map((blog) => (
            <div
              key={blog._id}
              className="w-full md:col-span-4 sm:col-span-6 col-span-12"
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
