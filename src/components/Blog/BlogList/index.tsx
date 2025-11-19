import BlogCard from "@/components/SharedComponent/Blog/blogCard";
import { Blog } from "@/types/blog";

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch("http://localhost:5000/blogs", {
    next: { revalidate: 60 },
  });
  const json = await res.json();

  return json.data.map((blog: any) => ({
    ...blog,
    _id: blog._id.toString(),
  }));
}

const BlogList = async () => {
  const posts = await getBlogs();

  return (
    <section
      className="flex flex-wrap justify-center pt-8 md:pb-24 pb-16 dark:bg-darkmode"
      id="blog"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-12 gap-7">
          {posts.map((blog: Blog) => (
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
