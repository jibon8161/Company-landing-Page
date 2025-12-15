// components/Blog/BlogComments.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Heart,
  Send,
  Clock,
  AlertCircle,
  ChevronDown,
  RefreshCw,
  User,
  Sparkles,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface Comment {
  _id: string;
  author: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    isAuthor?: boolean;
  };
  content: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  likedBy: string[];
  replies: Comment[];
  parentId?: string | null;
  isEdited?: boolean;
  isDeleted?: boolean;
}

// Random names generator
const generateRandomName = () => {
  const adjectives = [
    "Cool",
    "Smart",
    "Happy",
    "Brave",
    "Wise",
    "Kind",
    "Bright",
    "Swift",
    "Calm",
    "Bold",
    "Clever",
    "Gentle",
    "Honest",
    "Lucky",
    "Proud",
    "Quick",
    "Royal",
    "Sharp",
    "Sweet",
    "True",
  ];
  const animals = [
    "Panda",
    "Tiger",
    "Lion",
    "Eagle",
    "Wolf",
    "Fox",
    "Bear",
    "Hawk",
    "Owl",
    "Shark",
    "Dolphin",
    "Falcon",
    "Raven",
    "Phoenix",
    "Dragon",
    "Griffin",
    "Unicorn",
    "Panther",
    "Jaguar",
    "Leopard",
  ];

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const number = Math.floor(Math.random() * 1000);

  return `${adj}${animal}${number}`;
};

// Generate a consistent user ID
const getOrCreateUserId = () => {
  if (typeof window === "undefined") return "anonymous";

  let userId = localStorage.getItem("comment_user_id");
  if (!userId) {
    userId = `user_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("comment_user_id", userId);
  }
  return userId;
};

// Generate a consistent username for the user
const getOrCreateUsername = () => {
  if (typeof window === "undefined") return generateRandomName();

  let username = localStorage.getItem("comment_username");
  if (!username) {
    username = generateRandomName();
    localStorage.setItem("comment_username", username);
  }
  return username;
};

// Get random color for avatar
const getRandomColor = () => {
  const colors = [
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600",
    "from-pink-500 to-pink-600",
    "from-red-500 to-red-600",
    "from-orange-500 to-orange-600",
    "from-green-500 to-green-600",
    "from-teal-500 to-teal-600",
    "from-indigo-500 to-indigo-600",
    "from-yellow-500 to-yellow-600",
    "from-rose-500 to-rose-600",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function BlogComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);

  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest");
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(
    new Set()
  );

  const commentFormRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  // Load saved username from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = getOrCreateUsername();
      setUserName(savedName);
    }
  }, []);

  // Fetch comments
  useEffect(() => {
    if (slug) {
      fetchComments();
    }
  }, [slug, sortBy]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}/comments?sort=${sortBy}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();

      if (data.success) {
        setComments(data.data || data.comments || []);
      } else {
        setError(data.message || "Failed to load comments");
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Unable to load comments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    }).format(date);
  };

  // Submit new comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim() || !slug) {
      setError("Please write a comment");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const userId = getOrCreateUserId();
      const authorName = userName || getOrCreateUsername();

      const commentData = {
        content: newComment.trim(),
        parentId: null,
        authorName: authorName,
        authorEmail: `${userId}@anonymous.com`, // Generate a fake email from user ID
        authorAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          authorName
        )}&background=random`,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setComments((prev) => [data.data, ...prev]);
        setNewComment("");
        setShowCommentForm(false);
        if (commentFormRef.current) {
          commentFormRef.current.reset();
        }
        setError(null);
      } else {
        setError(data.message || "Failed to post comment");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
      setError("Unable to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Submit reply
  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim() || !slug) {
      setError("Please write a reply");
      return;
    }

    setSubmitting(true);

    try {
      const userId = getOrCreateUserId();
      const authorName = userName || getOrCreateUsername();

      const commentData = {
        content: replyContent.trim(),
        parentId,
        authorName: authorName,
        authorEmail: `${userId}@anonymous.com`, // Generate a fake email from user ID
        authorAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          authorName
        )}&background=random`,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Add reply to the parent comment
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === parentId
              ? { ...comment, replies: [data.data, ...(comment.replies || [])] }
              : comment
          )
        );
        setReplyContent("");
        setReplyTo(null);
        // Expand replies for this comment
        setExpandedReplies((prev) => new Set(prev).add(parentId));
        setError(null);
      } else {
        setError(data.message || "Failed to post reply");
      }
    } catch (err) {
      console.error("Error posting reply:", err);
      setError("Unable to post reply. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle like/unlike
  const handleLike = async (commentId: string) => {
    try {
      const userId = getOrCreateUserId();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}/comments/${commentId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Update comments state
        const updateCommentLikes = (comment: Comment): Comment => {
          if (comment._id === commentId) {
            return {
              ...comment,
              likes: data.data.likes,
              likedBy: data.data.likedBy || [],
            };
          }
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: comment.replies.map(updateCommentLikes),
            };
          }
          return comment;
        };

        setComments((prev) => prev.map(updateCommentLikes));
      }
    } catch (err) {
      console.error("Error liking comment:", err);
    }
  };

  // Toggle reply form
  const toggleReplyForm = (commentId: string) => {
    if (replyTo === commentId) {
      setReplyTo(null);
      setReplyContent("");
    } else {
      setReplyTo(commentId);
      setReplyContent("");
    }
  };

  // Toggle expanded replies
  const toggleExpandedReplies = (commentId: string) => {
    const newExpanded = new Set(expandedReplies);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedReplies(newExpanded);
  };

  // Check if user liked the comment
  const isLikedByUser = (comment: Comment) => {
    if (typeof window === "undefined") return false;
    const userId = getOrCreateUserId();
    return userId ? comment.likedBy?.includes(userId) || false : false;
  };

  // Change username
  const changeUsername = () => {
    const newName = generateRandomName();
    setUserName(newName);
    if (typeof window !== "undefined") {
      localStorage.setItem("comment_username", newName);
    }
  };

  // Render comment component
  const CommentItem = ({
    comment,
    depth = 0,
  }: {
    comment: Comment;
    depth?: number;
  }) => {
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isExpanded = expandedReplies.has(comment._id);
    const avatarColor = getRandomColor();

    return (
      <div className={`${depth > 0 ? "ml-8 md:ml-12" : ""}`}>
        <div
          className={`p-5 rounded-xl mb-4 transition-all duration-300 ${
            depth === 0
              ? "bg-white/50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-800/50"
              : "bg-gray-50/50 dark:bg-gray-800/30 border border-gray-200/30 dark:border-gray-700/30"
          }`}
        >
          {/* Comment Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-semibold text-sm`}
              >
                {comment.author.avatar ? (
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  comment.author.name.charAt(0)
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {comment.author.name}
                  </h4>
                  {comment.author.isAuthor && (
                    <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full">
                      Author
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3" />
                  <time dateTime={comment.createdAt}>
                    {formatDate(comment.createdAt)}
                  </time>
                  {comment.isEdited && (
                    <span className="text-gray-400 dark:text-gray-500">
                      • Edited
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Comment Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleLike(comment._id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  isLikedByUser(comment)
                    ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                    : "text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isLikedByUser(comment) ? "fill-current" : ""
                  }`}
                />
                <span className="text-sm font-medium">{comment.likes}</span>
              </button>

              <button
                onClick={() => toggleReplyForm(comment._id)}
                className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                aria-label="Reply"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Comment Content */}
          <div className="mb-4">
            {comment.isDeleted ? (
              <p className="text-gray-400 dark:text-gray-500 italic">
                This comment has been deleted.
              </p>
            ) : (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {comment.content}
              </p>
            )}
          </div>

          {/* Reply Form */}
          {replyTo === comment._id && (
            <div className="mb-4 mt-6 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitReply(comment._id);
                }}
                className="space-y-3"
              >
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  autoFocus
                  required
                />
                <div className="flex flex-col gap-3 items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{userName}</span>
                      <button
                        type="button"
                        onClick={changeUsername}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        title="Change username"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting || !replyContent.trim()}
                    className="px-4 py-2 bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {submitting ? "Sending..." : "Post Reply"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* View Replies Toggle */}
          {hasReplies && (
            <button
              onClick={() => toggleExpandedReplies(comment._id)}
              className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mt-2"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
              {isExpanded ? "Hide" : "View"} {comment.replies.length}{" "}
              {comment.replies.length === 1 ? "reply" : "replies"}
            </button>
          )}
        </div>

        {/* Nested Replies */}
        {hasReplies && isExpanded && (
          <div className="space-y-3 mt-3">
            {comment.replies.map((reply) => (
              <CommentItem key={reply._id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="flex flex-col gap-4 items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Discussion({comments.length})
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Join the conversation
            </p>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "newest" | "popular")}
            className="px-3 py-1.5 bg-white border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-purple-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Liked</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-red-700 dark:text-red-400">{error}</p>
            <button
              onClick={fetchComments}
              className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Comment Toggle Button */}
      {!showCommentForm && (
        <button
          onClick={() => setShowCommentForm(true)}
          className="w-full mb-8 p-4 bg-linear-to-r from-blue-50 to-purple-50 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200/50 dark:border-gray-800/50 rounded-xl hover:shadow-md transition-all duration-300 text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Add a comment
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Share your thoughts with the community
                </p>
              </div>
            </div>
            <div className="px-4 py-2 bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg">
              Write Comment
            </div>
          </div>
        </button>
      )}

      {/* New Comment Form */}
      {showCommentForm && (
        <div className="mb-10 p-6 bg-linear-to-b from-white to-gray-50/50 dark:from-gray-900/50 dark:to-gray-900/30 rounded-xl border border-gray-200/50 dark:border-gray-800/50 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Write your comment
            </h4>
            <div className="flex items-center gap-2 text-sm">
              {/* <span className="text-gray-600 dark:text-gray-400">
                Posting as:
              </span> */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {userName}
                </span>
                <button
                  type="button"
                  onClick={changeUsername}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  title="Change username"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <form
            ref={commentFormRef}
            onSubmit={handleSubmitComment}
            className="space-y-4"
          >
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What are your thoughts about this article?"
              rows={4}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setShowCommentForm(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>

              <div className="flex items-center gap-3">
              
                <button
                  type="submit"
                  disabled={submitting || !newComment.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Post Comment
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          // Loading Skeleton
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-white/30 dark:bg-gray-900/30 border border-gray-200/30 dark:border-gray-800/30 animate-pulse"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
                  <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded" />
              </div>
            </div>
          ))
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))
        ) : (
          // Empty State
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No comments yet
            </h4>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
              Be the first to share your thoughts on this article!
            </p>
            {!showCommentForm && (
              <button
                onClick={() => setShowCommentForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4" />
                Start the Discussion
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
