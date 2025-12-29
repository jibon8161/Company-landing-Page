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
        className="
          prose prose-lg max-w-none
          prose-headings:font-bold
          prose-h1:text-5xl prose-h1:mt-20 prose-h1:mb-20
          prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-16
          prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-12

          prose-p:text-lg prose-p:leading-relaxed prose-p:my-6

          prose-ol:list-decimal prose-ol:pl-8 prose-ol:my-6
          prose-li:my-4

          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:my-12

          prose-img:rounded-xl prose-img:shadow-lg prose-img:my-12
          prose-code:px-2 prose-code:rounded

          dark:prose-invert
        "
        style={
          {
            // Override bold color via Typography's CSS variables
            "--tw-prose-bold": "#2563eb", // blue-600 in light mode
            "--tw-prose-bold-dark": "#60a5fa", // blue-400 in dark mode (matches your original intent)
          } as React.CSSProperties
        }
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
};

export default BlogFormatter;
