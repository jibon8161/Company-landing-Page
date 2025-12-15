// components/blog/BackToTopButton.tsx
"use client";

import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 bg-[#FFFFFF] dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 hover:scale-110 transition-all duration-300 z-40 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <ArrowUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
    </button>
  );
}
