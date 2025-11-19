import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: Blog }) => {
  if (!blog) return null;

  return (
    <div className="group mb-0 relative">
      <div className="mb-8 overflow-hidden rounded-sm">
        <Link
          href={`/blog/${blog.slug}`}
          aria-label="blog cover"
          className="block"
        >
          {blog.coverImage && (
            <Image
              src={blog.coverImage}
              alt={blog.title}
              className="w-full transition group-hover:scale-125"
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
          className="mb-4 inline-block font-semibold text-dark hover:text-primary"
        >
          {blog.title}
        </Link>
      </h3>

      <p className="text-gray-600">{blog.excerpt}</p>

      <Link href={`/blog/${blog.slug}`} className="text-primary font-medium">
        See More
      </Link>
    </div>
  );
};

export default BlogCard;
