// components/BlogRelatedPosts.tsx
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  date: string;
  coverImage?: string;
}

interface Props {
  currentSlug: string;
  category?: string;
}

export default async function BlogRelatedPosts({
  currentSlug,
  category,
}: Props) {
  // Fetch related posts
  const fetchRelatedPosts = async (): Promise<BlogPost[]> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
        next: { revalidate: 3600 },
      });

      if (!res.ok) return [];

      const json = await res.json();
      const blogs = json.data || json.blogs || json || [];

      // Filter out current post and get related ones
      return blogs
        .filter((blog: any) => blog.slug !== currentSlug)
        .slice(0, 3) // Just get the 3 most recent posts
        .map((blog: any) => ({
          id: blog._id || blog.id,
          slug: blog.slug,
          title: blog.title,
          excerpt: blog.excerpt || "Click to read more",
          date: blog.date,
          coverImage: blog.coverImage,
        }));
    } catch (error) {
      console.error("Error fetching related posts:", error);
      return [];
    }
  };

  const relatedPosts = await fetchRelatedPosts();

  if (relatedPosts.length === 0) return null;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="font-bold text-gray-900 mb-6">Related Posts</h3>
      <div className="space-y-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <div className="flex gap-4">
              {post.coverImage && (
                <div className="flex-shrink-0 w-20 h-20 relative rounded-lg overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    sizes="80px"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
