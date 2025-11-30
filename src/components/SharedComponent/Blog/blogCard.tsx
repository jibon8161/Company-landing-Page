import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: Blog }) => {
  if (!blog) return null;

  return (
    <div className="group mb-0 relative bg-Sky-blue-mist">
      <div className="mb-8 overflow-hidden rounded-lg">
        <Link
          href={`/blog/${blog.slug}`}
          aria-label="blog cover"
          className="block"
        >
          {blog.coverImage && (
            <Image
              src={blog.coverImage}
              alt={blog.title}
              className="w-full transition group-hover:scale-110 duration-500"
              width={408}
              height={272}
              style={{ width: "100%", height: "auto" }}
              quality={100}
            />
          )}
        </Link>
      </div>

      <h3>
        <Link
          href={`/blog/${blog.slug}`}
          className="mb-4 inline-block font-semibold text-[#81A78E] dark:text-[#1F4D41] hover:text-[#6b8f7a] dark:hover:text-[#173a30] text-xl leading-tight transition-colors duration-300"
        >
          {blog.title}
        </Link>
      </h3>

      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        {blog.excerpt}
      </p>

      <Link
        href={`/blog/${blog.slug}`}
        className="inline-flex items-center text-[#81A78E] dark:text-[#1F4D41] font-semibold hover:text-[#6b8f7a] dark:hover:text-[#173a30] transition-colors duration-300 group/link"
      >
        Read More
        <svg
          className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  );
};

export default BlogCard;
