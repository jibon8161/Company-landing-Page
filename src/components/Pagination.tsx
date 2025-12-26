"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  totalPages,
  currentPage: propCurrentPage, // Rename to avoid confusion
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);

  // Fix: Ensure currentPage is always a valid number
  const currentPage =
    isNaN(propCurrentPage) || propCurrentPage < 1 ? 1 : propCurrentPage;

  useEffect(() => {
    setIsMounted(true);
    console.log("Pagination mounted. Prop currentPage:", propCurrentPage);
    console.log("Pagination - Validated currentPage:", currentPage);
    console.log("Pagination - Type of currentPage:", typeof currentPage);
    console.log("Pagination - Total pages:", totalPages);
  }, [propCurrentPage, currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    console.log("=== CLICKED ===");
    console.log("Changing to page:", page);
    console.log("Current page:", currentPage);
    console.log("Type of page:", typeof page);

    if (page < 1 || page > totalPages) {
      console.log("Invalid page:", page);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }

    const newUrl = `${pathname}?${params.toString()}`;
    console.log("New URL:", newUrl);

    router.push(newUrl, { scroll: false });
  };

  if (!isMounted) {
    return (
      <div className="flex justify-center">
        <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center space-y-4">
 

      {/* Mobile version - Simple */}
      <div className="flex sm:hidden items-center justify-between w-full max-w-xs">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 
                     bg-[#ffffff] dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                     rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     active:scale-95 transition-all duration-200 
                     cursor-pointer shadow-sm hover:shadow-md"
          aria-label="Previous page"
        >
          <svg
            className="h-4 w-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Prev
        </button>

        <div className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 rounded-lg">
          {currentPage} / {totalPages}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 
                     bg-[#ffffff] dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                     rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     active:scale-95 transition-all duration-200 
                     cursor-pointer shadow-sm hover:shadow-md"
          aria-label="Next page"
        >
          Next
          <svg
            className="h-4 w-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Desktop version - Full */}
      <div className="hidden sm:flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 
                     bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                     rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     active:scale-95 transition-all duration-200 
                     cursor-pointer shadow-sm hover:shadow-md"
          aria-label="First page"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 
                     bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                     rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     active:scale-95 transition-all duration-200 
                     cursor-pointer shadow-sm hover:shadow-md"
          aria-label="Previous page"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`min-w-[42px] px-3 py-2.5 text-sm font-medium rounded-lg border 
                           active:scale-95 transition-all duration-200 cursor-pointer
                           ${
                             currentPage === pageNum
                               ? "bg-blue-600 border-blue-600 text-white shadow-md"
                               : "bg-[#ffffff] dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md"
                           }`}
                aria-label={`Page ${pageNum}`}
                aria-current={currentPage === pageNum ? "page" : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 
                     bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                     rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     active:scale-95 transition-all duration-200 
                     cursor-pointer shadow-sm hover:shadow-md"
          aria-label="Next page"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 
                     bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                     rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     active:scale-95 transition-all duration-200 
                     cursor-pointer shadow-sm hover:shadow-md"
          aria-label="Last page"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
