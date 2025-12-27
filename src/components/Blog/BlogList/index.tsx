// app/blog/page.tsx - UPDATED WITH RESPONSIVE PAGINATION
"use client";

import { useState, useEffect, useMemo } from "react";
import BlogCard from "@/components/SharedComponent/Blog/blogCard";
import { Blog } from "@/types/blog";
import ResponsivePagination from "@/components/SharedComponent/PaginationControls";

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
    cache: "force-cache",
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const json = await res.json();
  return json.data.map((blog: any) => ({
    ...blog,
    _id: blog._id.toString(),
  }));
}

const BlogList = () => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlogs() {
      try {
        setLoading(true);
        const fetchedPosts = await getBlogs();
        setPosts(fetchedPosts);
        setError(null);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []);

  const processedPosts = useMemo(() => {
    if (posts.length === 0) return [];

    let sortedPosts = [...posts];

    // Sort by date (newest first)
    sortedPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    // Add star default if missing
    const postsWithStar = sortedPosts.map((post) => ({
      ...post,
      star: post.star || "no",
    }));

    // Move starred posts to the top
    const starredPosts = postsWithStar.filter((post) => post.star === "yes");
    const nonStarredPosts = postsWithStar.filter((post) => post.star !== "yes");

    return [...starredPosts, ...nonStarredPosts];
  }, [posts]);

  const totalPages = Math.ceil(processedPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = processedPosts.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  if (loading) {
    return (
      <section
        className="flex flex-wrap justify-center pt-8 md:pb-24 pb-16 dark:bg-transparent"
        id="blog"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-12 gap-4 sm:gap-5 md:gap-7">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="w-full col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4"
              >
                <div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl h-[350px] sm:h-[380px] md:h-[400px]"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="flex flex-wrap justify-center pt-8 md:pb-24 pb-16 dark:bg-transparent"
        id="blog"
      >
        <div className="container mx-auto max-w-6xl text-center py-12 px-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">
            {error}
          </h3>
          <button
            onClick={() => window.location.reload()}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="flex flex-wrap justify-center pt-8 md:pb-24 pb-16 dark:bg-transparent"
      id="blog"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Blog Grid */}
        <div className="grid grid-cols-12 gap-4 sm:gap-5 md:gap-7 mb-8 sm:mb-10 md:mb-12">
          {currentPosts.map((blog: Blog) => (
            <div
              key={blog._id}
              className="w-full col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>

        {/* Responsive Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 sm:mt-10">
            <ResponsivePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalPosts={processedPosts.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        )}

        {processedPosts.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
              No blog posts found
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Check back later for new articles!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;
