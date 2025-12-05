// components/BlogTableOfContents.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

interface Props {
  content: string;
}

export default function BlogTableOfContents({ content }: Props) {
  const [headings, setHeadings] = useState<
    Array<{ id: string; text: string; level: number }>
  >([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings and assign IDs
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headingElements = Array.from(doc.querySelectorAll("h1, h2, h3, h4"));

    const extractedHeadings = headingElements
      .filter((heading) => heading.textContent?.trim()) // Filter out empty headings
      .map((heading, index) => {
        // Create ID from text or use index
        const id =
          heading.id ||
          `heading-${index}-${heading.textContent
            ?.toLowerCase()
            .replace(/[^\w]+/g, "-")
            .replace(/^-+|-+$/g, "")}`;

        // Set the ID back to the heading element (for scrolling)
        heading.id = id;

        return {
          id,
          text: heading.textContent || "",
          level: parseInt(heading.tagName.charAt(1)),
        };
      });

    setHeadings(extractedHeadings);

    // Set up intersection observer for active heading detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -65% 0%", threshold: 1 }
    );

    // Observe all heading elements in the actual document
    const actualHeadings = document.querySelectorAll("h1, h2, h3, h4");
    actualHeadings.forEach((heading) => observer.observe(heading));

    return () => {
      actualHeadings.forEach((heading) => observer.unobserve(heading));
    };
  }, [content]);

  // Function to scroll to heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          Table of Contents
        </h3>
        <p className="text-sm text-gray-500 italic">
          No headings found in this article.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200 sticky top-24">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        Table of Contents
      </h3>
      <nav className="space-y-1">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const paddingLeft =
            heading.level === 2
              ? "pl-0"
              : heading.level === 3
              ? "pl-4"
              : heading.level === 4
              ? "pl-8"
              : "pl-0";

          return (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`group flex items-start w-full text-left py-2 px-2 rounded-lg transition-all duration-200 ${paddingLeft} ${
                isActive
                  ? "bg-blue-50 text-blue-700 border-l-2 border-blue-500"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <ChevronRight
                className={`w-3 h-3 mt-0.5 mr-2 flex-shrink-0 transition-transform ${
                  isActive
                    ? "text-blue-500 rotate-90"
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
              />
              <span
                className={`text-sm leading-snug ${
                  heading.level === 2 ? "font-medium" : "font-normal"
                }`}
              >
                {heading.text}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Progress indicator */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>Reading progress</span>
          <span>
            {headings.length > 0
              ? `${Math.round(
                  ((headings.findIndex((h) => h.id === activeId) + 1) /
                    headings.length) *
                    100
                )}%`
              : "0%"}
          </span>
        </div>
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{
              width:
                headings.length > 0
                  ? `${Math.round(
                      ((headings.findIndex((h) => h.id === activeId) + 1) /
                        headings.length) *
                        100
                    )}%`
                  : "0%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
