// components/Blog/BlogActionButtons.tsx
"use client";

import { Heart, Eye, Sparkles, MessageSquare, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BlogActionButtons() {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [animateLike, setAnimateLike] = useState(false);
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

  // Fetch initial stats
  useEffect(() => {
    const fetchStats = async () => {
      if (!slug) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}/stats`
        );
        const data = await response.json();

        if (data.success) {
          setLikes(data.data.likes);
          setViews(data.data.views);

          // Check if current user has liked this post
          const userIdentifier = getUserIdentifier();
          if (data.data.likedBy && data.data.likedBy.includes(userIdentifier)) {
            setLiked(true);
          }
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [slug]);

  const handleLike = async () => {
    if (loading || !slug) return;

    setLoading(true);
    setAnimateLike(true);

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

        // Reset animation after 600ms
        setTimeout(() => setAnimateLike(false), 600);
      }
    } catch (error) {
      console.error("Error updating like:", error);
      setAnimateLike(false);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleView = async () => {
    if (!slug) return;

    try {
      const userIdentifier = getUserIdentifier();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}/stats`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "view",
            userIdentifier,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setViews(data.data.views);
      }
    } catch (error) {
      console.error("Error updating view:", error);
    }
  };

  // Track view on page load (only once per session)
  useEffect(() => {
    if (!slug) return;

    const hasViewed = sessionStorage.getItem(`viewed_${slug}`);

    if (!hasViewed) {
      handleView();
      sessionStorage.setItem(`viewed_${slug}`, "true");
    }
  }, [slug]);

  return (
    <div className="sticky top-32 left-0 hidden xl:block">
      <div className="absolute flex flex-col gap-3">
        {/* Like Button */}
        <div className="relative">
          <button
            onClick={handleLike}
            disabled={loading}
            className="p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-800/50 hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
          >
            {/* Background glow effect when liked */}
            {liked && (
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10" />
            )}

            {/* Like animation particles */}
            {animateLike && !liked && (
              <>
                <div className="absolute inset-0 bg-blue-500/5 animate-ping rounded-xl" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-75" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-150" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-200" />
              </>
            )}

            <div className="relative z-10">
              <Heart
                className={`w-5 h-5 transition-all duration-300 ${
                  liked
                    ? "text-red-500 fill-red-500 scale-110"
                    : "text-gray-500 dark:text-gray-400 group-hover:text-red-400 dark:group-hover:text-red-400"
                }`}
              />
            </div>

            {/* Counter badge */}
            {likes > 0 && (
              <span className="absolute -top-2 -right-2 text-xs font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                {likes}
              </span>
            )}

            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 pointer-events-none shadow-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                <span>{liked ? "Liked!" : "Show appreciation"}</span>
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 border-r-8 border-r-gray-800 dark:border-r-gray-700 border-t-8 border-t-transparent border-b-8 border-b-transparent" />
            </div>
          </button>
        </div>

        {/* Views Button */}
        <div className="relative">
          <button className="p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-800/50 hover:shadow-md transition-all duration-300 group">
            <div className="relative">
              <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" />
            </div>

            {/* Counter badge */}
            {views > 0 && (
              <span className="absolute -top-2 -right-2 text-xs font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                {views}
              </span>
            )}

            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 pointer-events-none shadow-lg">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3 h-3" />
                <span>{views.toLocaleString()} views</span>
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 border-r-8 border-r-gray-800 dark:border-r-gray-700 border-t-8 border-t-transparent border-b-8 border-b-transparent" />
            </div>
          </button>
        </div>

        {/* Bookmark Button */}
        <div className="relative">
          <button
            onClick={handleBookmark}
            className="p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-800/50 hover:shadow-md transition-all duration-300 group"
          >
            <Bookmark
              className={`w-5 h-5 transition-all duration-300 ${
                bookmarked
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-500 dark:text-gray-400 group-hover:text-yellow-500 dark:group-hover:text-yellow-400"
              }`}
            />

            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 pointer-events-none shadow-lg">
              <div className="flex items-center gap-2">
                <Bookmark className="w-3 h-3" />
                <span>{bookmarked ? "Saved" : "Save for later"}</span>
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 border-r-8 border-r-gray-800 dark:border-r-gray-700 border-t-8 border-t-transparent border-b-8 border-b-transparent" />
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300/50 dark:via-gray-700/50 to-transparent mx-3" />

        {/* Quick Actions */}
        <div className="relative">
          <button className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-xl shadow-sm border border-blue-200/30 dark:border-blue-800/30 hover:shadow-md transition-all duration-300 group">
            <Sparkles className="w-5 h-5 text-blue-500 dark:text-blue-400" />

            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 pointer-events-none shadow-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                <span>Quick actions</span>
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 border-r-8 border-r-gray-800 dark:border-r-gray-700 border-t-8 border-t-transparent border-b-8 border-b-transparent" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
