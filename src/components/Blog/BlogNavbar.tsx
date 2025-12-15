// components/Blog/BlogNavbar.tsx
"use client";

import { ArrowLeft, Heart, Share2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BlogNavbar() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  // Get or create user identifier
  const getUserIdentifier = () => {
    if (typeof window === "undefined") return "";
    let identifier = localStorage.getItem("blog_user_id");
    if (!identifier) {
      identifier = `user_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("blog_user_id", identifier);
    }
    return identifier;
  };

  // Fetch initial like status
  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!slug) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}/stats`
        );
        const data = await response.json();

        if (data.success) {
          setLikes(data.data.likes);

          // Check if current user has liked this post
          const userIdentifier = getUserIdentifier();
          if (data.data.likedBy && data.data.likedBy.includes(userIdentifier)) {
            setLiked(true);
          }
        }
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };

    fetchLikeStatus();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleLike = async () => {
    if (loading || !slug) return;

    setLoading(true);
    try {
      const userIdentifier = getUserIdentifier();
      const action = liked ? "unlike" : "like";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}/stats`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action,
            userIdentifier,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setLiked(!liked);
        setLikes(data.data.likes);
      }
    } catch (error) {
      console.error("Error updating like:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-green-100/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">All Posts</span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all duration-300 relative group"
            >
              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />

              {/* Tooltip */}
              <div className="absolute top-full mt-2 right-0 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Share this post
              </div>
            </button>

            <button
              onClick={handleLike}
              disabled={loading}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative group"
            >
              <Heart
                className={`w-5 h-5 transition-colors duration-300 ${
                  liked
                    ? "text-red-500 fill-red-500"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              />

              {likes > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {likes}
                </span>
              )}

              {/* Tooltip */}
              <div className="absolute top-full mt-2 right-0 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {liked ? "Unlike" : "Like"} ({likes})
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
