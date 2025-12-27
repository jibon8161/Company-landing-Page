// components/SharedComponent/Blog/ResponsivePagination.tsx
"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

interface ResponsivePaginationProps {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (limit: number) => void;
}

const ResponsivePagination = ({
  currentPage,
  totalPages,
  totalPosts,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: ResponsivePaginationProps) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate range of posts showing
  const startPost = (currentPage - 1) * itemsPerPage + 1;
  const endPost = Math.min(currentPage * itemsPerPage, totalPosts);

  // Generate page numbers based on device
  const getPageNumbers = () => {
    if (isMobile) {
      // Mobile: Show only first, last, current, and adjacent pages
      const pages: (number | string)[] = [];

      if (totalPages <= 5) {
        // Show all pages on mobile if less than 5
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
        return pages;
      }

      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show current page and adjacent pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page if not already shown
      if (totalPages > 1 && !pages.includes(totalPages)) {
        pages.push(totalPages);
      }

      return pages;
    } else {
      // Desktop: Show more pages
      const pages: (number | string)[] = [];
      const maxVisible = 7;

      if (totalPages <= maxVisible) {
        // Show all pages
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
        return pages;
      }

      // Always show first page
      pages.push(1);

      // Calculate start and end
      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);

      // Adjust if near edges
      if (currentPage <= 3) {
        end = 5;
      }

      if (currentPage >= totalPages - 2) {
        start = totalPages - 4;
      }

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }

      return pages;
    }
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className="w-full">
      {/* Posts info - Responsive */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 order-2 sm:order-1">
          Showing <span className="font-semibold">{startPost}</span> to{" "}
          <span className="font-semibold">{endPost}</span> of{" "}
          <span className="font-semibold">{totalPosts}</span> posts
        </div>

        {/* Items per page selector - Mobile first */}
        <div className="flex items-center space-x-2 order-1 sm:order-2 w-full sm:w-auto justify-between sm:justify-start">
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Show per page:
          </span>
          <select
            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 
              px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 
              focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-blue-500 focus:border-transparent
              w-20 sm:w-24"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
          </select>
        </div>
      </div>

      {/* Pagination Controls - Responsive Design */}
      <div className="w-full overflow-x-auto">
        <nav
          className="flex items-center justify-center sm:justify-between min-w-min"
          aria-label="Pagination"
        >
          {/* Previous buttons - Hidden on mobile, shown on desktop */}
          <div className="hidden sm:flex items-center space-x-1">
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium
                ${
                  currentPage === 1
                    ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                } transition-colors duration-200`}
              aria-disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
              <span className="sr-only">First page</span>
            </button>

            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium
                ${
                  currentPage === 1
                    ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                } transition-colors duration-200`}
              aria-disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Previous</span>
              <span className="sr-only">Previous page</span>
            </button>
          </div>

          {/* Page Numbers - Center aligned on all screens */}
          <div className="flex items-center space-x-1 mx-2 sm:mx-4">
            {pageNumbers.map((page, index) =>
              page === "..." ? (
                <span
                  key={`dots-${index}`}
                  className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page as number)}
                  className={`inline-flex items-center justify-center rounded-lg px-3 py-2 min-w-[40px] sm:min-w-[44px] text-xs sm:text-sm font-medium transition-colors duration-200
                    ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-800"
                    }`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              )
            )}
          </div>

          {/* Next buttons - Hidden on mobile, shown on desktop */}
          <div className="hidden sm:flex items-center space-x-1">
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium
                ${
                  currentPage === totalPages
                    ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                } transition-colors duration-200`}
              aria-disabled={currentPage === totalPages}
            >
              <span className="hidden sm:inline mr-1">Next</span>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </button>

            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium
                ${
                  currentPage === totalPages
                    ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                } transition-colors duration-200`}
              aria-disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
              <span className="sr-only">Last page</span>
            </button>
          </div>

          {/* Mobile Navigation - Simple Previous/Next */}
          <div className="flex sm:hidden items-center space-x-2 ml-4">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium
                ${
                  currentPage === 1
                    ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                } transition-colors duration-200`}
              aria-disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium
                ${
                  currentPage === totalPages
                    ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                } transition-colors duration-200`}
              aria-disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Info - Page numbers */}
      <div className="mt-4 text-center sm:hidden">
        <div className="text-xs text-gray-500 dark:text-gray-500">
          Page <span className="font-semibold">{currentPage}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </div>
      </div>
    </div>
  );
};

export default ResponsivePagination;
