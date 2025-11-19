// /types/blog.ts
export interface Blog {
  _id: string; // converted from MongoDB ObjectId
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  date: string;
  content: string;
  author?: string;
  authorImage?: string;
}
