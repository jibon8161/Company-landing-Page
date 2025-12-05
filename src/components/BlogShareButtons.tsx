// components/BlogShareButtons.tsx
"use client";

import {
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
  title: string;
  slug: string;
}

export default function BlogShareButtons({ title, slug }: Props) {
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setIsClient(true);
    setShareUrl(`${window.location.origin}/blog/${slug}`);
  }, [slug]);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Don't render links on server to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Share this post</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg">
            <Twitter className="w-5 h-5" />
            <span className="font-medium">Twitter</span>
          </div>
          <div className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg">
            <Linkedin className="w-5 h-5" />
            <span className="font-medium">LinkedIn</span>
          </div>
          <div className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg">
            <LinkIcon className="w-5 h-5" />
            <span className="font-medium">Copy Link</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-900 mb-4">Share this post</h3>
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title
          )}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-3 rounded-lg transition-colors"
        >
          <Twitter className="w-5 h-5" />
          <span className="font-medium">Twitter</span>
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            shareUrl
          )}&title=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-3 rounded-lg transition-colors"
        >
          <Linkedin className="w-5 h-5" />
          <span className="font-medium">LinkedIn</span>
        </a>
        <button
          onClick={handleCopyLink}
          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-3 rounded-lg transition-colors"
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <LinkIcon className="w-5 h-5" />
          )}
          <span className="font-medium">
            {copied ? "Copied!" : "Copy Link"}
          </span>
        </button>
      </div>
    </div>
  );
}
