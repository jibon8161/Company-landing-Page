// /app/blog/[slug]/page.tsx
import { Blog } from "@/types/blog";
import Image from "next/image";
import { notFound } from "next/navigation";

// Props type
type Props = { params: { slug: string } };

// Fetch all blog slugs from backend
async function getAllSlugs(): Promise<string[]> {
  const res = await fetch("http://localhost:5000/blogs");
  const json = await res.json();
  return json.data.map((blog: any) => blog.slug);
}

// This is required for `output: export` and dynamic routes
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

const BlogPage = async ({ params }: Props) => {
  const res = await fetch(`http://localhost:5000/blogs/${params.slug}`, {
    cache: "no-store",
  });
  const json = await res.json();

  if (!json.success || !json.data) return notFound();

  const blog: Blog = { ...json.data, _id: json.data._id.toString() };

  return (
    <div className="pt-40 container mx-auto w-full py-10">
      <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
      <p className="text-gray-600 mb-6">{blog.date}</p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Image on the left */}
        {blog.coverImage && (
          <div className="md:w-1/2 flex-shrink-0">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              width={800}
              height={400}
              className="rounded-xl w-full h-auto"
            />
          </div>
        )}

        {/* Content on the right */}
        <div className="md:w-1/2">
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="prose max-w-none"
          />
          <p className="mt-6 text-gray-500">
            Author: {blog.author || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
