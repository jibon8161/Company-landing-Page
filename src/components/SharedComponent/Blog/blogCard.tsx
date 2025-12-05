import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: Blog }) => {
  if (!blog) return null;

  return (
    <div className="group relative flex flex-col bg-[#C5DDCE]/80 dark:bg-[#052624] border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full min-h-[400px] overflow-hidden">
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />

      {/* Image Section with multiple animations */}
      <div className="relative mb-5 overflow-hidden rounded-xl flex-shrink-0">
        <Link href={`/blog/${blog.slug}`} aria-label="blog cover">
          <div className="relative w-full aspect-video h-48">
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

            {/* Shine effect */}
            <div className="absolute inset-0 -left-[100%] w-[50%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 z-10" />

            {blog.coverImage && (
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
            )}
          </div>
        </Link>

        {/* Floating tags animation */}
        <div className="absolute top-3 right-3 z-20">
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-medium rounded-full transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              📖 Read
            </span>
            <span className="px-3 py-1 bg-amber-500/90 backdrop-blur-sm text-black text-xs font-bold rounded-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
              ✨ New
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow relative z-10">
        {/* Title with typing effect */}
        <h3 className="text-xl font-semibold mb-3 min-h-[56px] line-clamp-2">
          <Link
            href={`/blog/${blog.slug}`}
            className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 relative inline-block"
          >
            <span className="relative">
              {blog.title}
              {/* Underline animation */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 group-hover:w-full transition-all duration-500"></span>
            </span>
          </Link>
        </h3>

        {/* Excerpt with fade-in lines */}
        <div className="flex-grow mb-4 overflow-hidden">
          <p className="text-gray-800 dark:text-gray-300 line-clamp-3 h-[72px] overflow-hidden">
            {blog.excerpt ? (
              blog.excerpt.split(" ").map((word, index) => (
                <span
                  key={index}
                  className="inline-block transition-all duration-300 group-hover:translate-x-0 translate-x-[-5px] opacity-90 group-hover:opacity-100"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {word}&nbsp;
                </span>
              ))
            ) : (
              <span className="text-gray-500 italic">No excerpt available</span>
            )}
          </p>
        </div>

        {/* Animated separator */}
        <div className="relative my-4 overflow-hidden">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent w-full" />
          <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 delay-300" />
        </div>

        {/* Read More Button with enhanced animations */}
        <div className="mt-auto">
          <Link
            href={`/blog/${blog.slug}`}
            className="relative inline-flex items-center gap-2 font-medium text-gray-900 dark:text-gray-900 hover:text-white dark:hover:text-white transition-all duration-500 bg-amber-300 hover:bg-gradient-to-r hover:from-amber-400 hover:to-indigo-500 px-4 py-3 rounded-bl-xl rounded-tr-xl overflow-hidden group/btn"
          >
            {/* Button background shine */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover/btn:translate-x-full transition-transform duration-1000" />

            {/* Button text and icon */}
            <span className="relative z-10 flex items-center gap-2">
              Read More
              <svg
                className="w-4 h-4 transition-all duration-500 group-hover/btn:translate-x-1 group-hover/btn:scale-125 group-hover/btn:text-white"
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
            </span>

            {/* Floating dots animation */}
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full opacity-0 group-hover/btn:opacity-100 animate-ping" />
            <span
              className="absolute -bottom-1 -left-1 w-2 h-2 bg-indigo-500 rounded-full opacity-0 group-hover/btn:opacity-100 animate-ping"
              style={{ animationDelay: "0.2s" }}
            />
          </Link>

          {/* Reading time indicator */}
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {Math.ceil((blog.excerpt?.length || 0) / 200)} min read
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-indigo-400 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" />
    </div>
  );
};

export default BlogCard;
