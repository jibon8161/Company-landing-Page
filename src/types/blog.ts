// types/blog.ts
export interface Blog {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;

  // Optional fields
  coverImage?: string;
  author?: string;
  authorImage?: string;
  category?: string;
  tags?: string[];

  // Stats fields (with defaults)
  likes: number;
  views: number;
  likedBy?: string[];
  star?: string; // "yes" or "no"
}

// You might also want a create/update type
export interface BlogInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  coverImage?: string;
  author?: string;
  authorImage?: string;
  category?: string;
  tags?: string[];
  star?: string;
}
