// components/BlogListWrapper.tsx
"use client";

import { Suspense } from "react";
import BlogList from "./Blog/BlogList/index";

export default function BlogListWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Loading blog posts...
            </p>
          </div>
        </div>
      }
    >
      <BlogList />
    </Suspense>
  );
}
