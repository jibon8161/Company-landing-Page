// types/blog.ts
export interface Blog {
  _id: string;
  slug: string;
  title: string;
  excerpt: string; // This exists in your API
  content: string;
  coverImage?: string;
  author?: string;
  authorImage?: string; // Add this
  date: string;
  // These are optional since they don't exist in your API
  category?: string;
  tags?: string[];
}
