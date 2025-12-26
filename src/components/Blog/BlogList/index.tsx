"use client";

import BlogCard from "@/components/SharedComponent/Blog/blogCard";
import { Blog } from "@/types/blog";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Constants
const POSTS_PER_PAGE = 6;

const BlogList = () => {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Get page from URL
  const page = searchParams.get("page") || "1";
  const currentPage = parseInt(page);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
        const json = await res.json();

        const blogs = json.data.map((blog: any) => ({
          ...blog,
          _id: blog._id.toString(),
          likes: blog.likes || 0,
          views: blog.views || 0,
          star: blog.star || "no",
        }));

        setPosts(blogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []); // Re-fetch when page changes

  if (loading) {
    return (
      <section className="flex flex-wrap justify-center pt-8 md:pb-12 pb-8 dark:bg-transparent">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Loading blogs...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // 1. Sort all posts by date (newest first)
  const sortedByDate = [...posts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // 2. Move starred posts to the top
  const starredPosts = sortedByDate.filter((post) => post.star === "yes");
  const nonStarredPosts = sortedByDate.filter((post) => post.star !== "yes");

  // Combine: starred posts first, then the rest
  const sortedPosts = [...starredPosts, ...nonStarredPosts];

  // 3. Pagination logic
  const totalPosts = sortedPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Validate current page
  const validPage = isNaN(currentPage)
    ? 1
    : Math.min(Math.max(1, currentPage), totalPages);

  // Get posts for current page
  const startIndex = (validPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const displayedPosts = sortedPosts.slice(startIndex, endIndex);

  return (
    <section
      className="flex flex-wrap justify-center pt-8 md:pb-12 pb-8 dark:bg-transparent"
      id="blog"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Blog Info */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Latest Blogs
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Showing {displayedPosts.length} of {totalPosts} blogs
            {totalPages > 1 && ` - Page ${validPage} of ${totalPages}`}
          </p>
        </div>

        {/* Blog posts grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {displayedPosts.map((blog: Blog) => (
            <div
              key={blog._id}
              className="w-full transform transition-transform duration-300 hover:scale-[1.02]"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 sm:mt-12">
            <Pagination
              totalPosts={totalPosts}
              postsPerPage={POSTS_PER_PAGE}
              currentPage={validPage}
              totalPages={totalPages}
            />
          </div>
        )}

        {/* Mobile-friendly page info */}
        <div className="mt-6 sm:hidden text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Page {validPage} of {totalPages}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogList;
