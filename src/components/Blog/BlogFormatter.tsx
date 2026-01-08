"use client";

import { useEffect, useState } from "react";
import { marked } from "marked";

interface BlogFormatterProps {
  content: string;
}

marked.setOptions({
  gfm: true,
  breaks: true,
});

const BlogFormatter = ({ content }: BlogFormatterProps) => {
  const [mounted, setMounted] = useState(false);
  const [html, setHtml] = useState("");

  useEffect(() => {
    setMounted(true);

    const enhanceContent = (text: string) =>
      text
        .replace(/^([A-Z][^:\n]+):/gm, "**$1:**")
        .replace(/^Important:/gim, "**Important:**");

    const result = marked.parse(enhanceContent(content));
    if (result instanceof Promise) {
      result.then((htmlString) => setHtml(htmlString));
    } else {
      setHtml(result);
    }
  }, [content]);

  if (!mounted) return null;

  return (
    <article className="mx-auto max-w-3xl">
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        style={{
          fontSize: "18px",
          lineHeight: "1.75",
          color: "#374151",
        }}
        className="
          [&_a]:text-blue-600 
          [&_a:hover]:text-blue-800 
          [&_a]:underline
          [&_strong]:font-bold 
          [&_strong]:text-gray-800
          [&_ul]:list-disc 
          [&_ul]:pl-8 
          [&_ul]:my-5
          [&_ol]:list-decimal 
          [&_ol]:pl-8 
          [&_ol]:my-5
          [&_li]:my-2
          [&_h1]:text-4xl 
          [&_h1]:font-bold 
          [&_h1]:mt-10 
          [&_h1]:mb-8 
          [&_h1]:text-gray-800
          [&_h2]:text-3xl 
          [&_h2]:font-bold 
          [&_h2]:mt-8 
          [&_h2]:mb-6 
          [&_h2]:text-gray-800
          [&_h3]:text-2xl 
          [&_h3]:font-bold 
          [&_h3]:mt-6 
          [&_h3]:mb-4 
          [&_h3]:text-gray-800
          [&_p]:my-5
          [&_blockquote]:border-l-4 
          [&_blockquote]:border-blue-500 
          [&_blockquote]:pl-6 
          [&_blockquote]:my-6 
          [&_blockquote]:italic
          [&_code]:px-2 
          [&_code]:py-1 
          [&_code]:rounded 
          [&_code]:bg-gray-100 
          [&_code]:text-gray-800
          [&_pre]:bg-gray-900 
          [&_pre]:text-gray-100 
          [&_pre]:rounded-lg 
          [&_pre]:p-4 
          [&_pre]:my-6
          [&_img]:rounded-xl 
          [&_img]:shadow-lg 
          [&_img]:my-6
          dark:[&_a]:text-blue-400
          dark:[&_a:hover]:text-blue-300
          dark:[&_strong]:text-gray-200
          dark:[&_h1]:text-gray-100
          dark:[&_h2]:text-gray-100
          dark:[&_h3]:text-gray-100
          dark:[&_code]:bg-gray-800
          dark:[&_code]:text-gray-200
        "
      />
    </article>
  );
};

export default BlogFormatter;
