import BlogCard from "@/components/SharedComponent/Blog/blogCard";
import { Blog } from "@/types/blog";

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
    next: { revalidate: 60 },
  });
  const json = await res.json();

  return json.data.map((blog: any) => ({
    ...blog,
    _id: blog._id.toString(),
  }));
}

const BlogList = async () => {
  let posts = await getBlogs();

  console.log("=== DEBUG INFO ===");
  console.log("Total posts:", posts.length);
  console.log("Sample post fields:", Object.keys(posts[0]));
  console.log("Checking for 'star' field:", posts[0].star);
  console.log("Date field value:", posts[0].date);

  // 1. Sort all posts by date (newest first) - using 'date' field
  posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime(); // Newest first
  });

  console.log("=== AFTER DATE SORT ===");
  posts.forEach((post, index) => {
    console.log(
      `${index + 1}. ${post.title} - Date: ${post.date} - Star: ${
        post.star || "no"
      }`
    );
  });

  // 2. Check if 'star' field exists, if not add default
  // Your data doesn't have 'star' field yet, so we need to handle it
  const postsWithStar = posts.map((post) => ({
    ...post,
    star: post.star || "no", // Default to "no" if not present
  }));

  // 3. Move starred posts to the top while keeping their relative order
  const starredPosts = postsWithStar.filter((post) => post.star === "yes");
  const nonStarredPosts = postsWithStar.filter((post) => post.star !== "yes");

  console.log("=== FINAL GROUPING ===");
  console.log(`Starred posts: ${starredPosts.length}`);
  console.log(`Non-starred posts: ${nonStarredPosts.length}`);

  // Combine: starred posts first, then the rest (already sorted by date)
  const sortedPosts = [...starredPosts, ...nonStarredPosts];

  console.log("=== FINAL ORDER ===");
  sortedPosts.forEach((post, index) => {
    console.log(
      `${index + 1}. ${post.title} - Star: ${post.star} - Date: ${post.date}`
    );
  });

  return (
    <section
      className="flex flex-wrap justify-center pt-8 md:pb-24 pb-16 dark:bg-transparent"
      id="blog"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-12 gap-7">
          {sortedPosts.map((blog: Blog) => (
            <div
              key={blog._id}
              className="w-full lg:col-span-4 md:col-span-6 col-span-12"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
