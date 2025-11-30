// app/blog/[slug]/page.tsx
import { Blog } from "@/types/blog";
import Image from "next/image";
import { notFound } from "next/navigation";

// Props type - UPDATED for Next.js 15
type Props = { params: Promise<{ slug: string }> };

// Fetch all blog slugs for static generation
async function getAllSlugs(): Promise<string[]> {
  // If no API URL is set, return empty array
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.warn("NEXT_PUBLIC_API_URL is not set");
    return [];
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`API responded with status: ${res.status}`);
      return [];
    }

    const json = await res.json();

    // Adjust this based on your actual API response structure
    const blogs = json.data || json.blogs || json || [];

    if (!Array.isArray(blogs)) {
      console.error("Expected array but got:", typeof blogs);
      return [];
    }

    // Extract slugs - adjust property name based on your API
    const slugs = blogs
      .map((blog: any) => blog.slug || blog._id || blog.id)
      .filter(Boolean);

    console.log("Generated slugs:", slugs);
    return slugs;
  } catch (error) {
    console.error("Error in getAllSlugs:", error);
    return [];
  }
}

// Generate static params with fallback
export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs();

    // If no slugs are returned, provide some fallback slugs
    // to prevent the build error
    if (slugs.length === 0) {
      console.warn("No slugs found, using fallback slugs");
      return [
        { slug: "welcome" },
        { slug: "getting-started" },
        { slug: "about" },
      ];
    }

    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    // Return fallback slugs to prevent build failure
    return [{ slug: "welcome" }, { slug: "getting-started" }];
  }
}

// Revalidate the page every hour
export const revalidate = 3600;

const BlogPage = async ({ params }: Props) => {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return notFound();
    }

    const json = await res.json();
    const blogData = json.data || json;

    if (!blogData) return notFound();

    const blog: Blog = { ...blogData, _id: blogData._id?.toString() };

    return (
      <div className="pt-40 container mx-auto w-full py-10">
        <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
        <p className="text-gray-600 mb-6">{blog.date}</p>

        <div className="flex flex-col md:flex-row gap-8">
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
  } catch (error) {
    console.error("Error fetching blog:", error);
    return notFound();
  }
};

export default BlogPage;
