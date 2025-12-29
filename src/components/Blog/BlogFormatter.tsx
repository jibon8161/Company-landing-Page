"use client";

interface BlogFormatterProps {
  content: string;
}

const BlogFormatter = ({ content }: BlogFormatterProps) => {
  // Helper function to format inline text (bold, italic, etc.)
  const formatInlineText = (text: string) => {
    return (
      text
        // Bold text: **bold**
        .replace(
          /\*\*(.*?)\*\*/g,
          '<strong class="font-bold text-gray-900 dark:text-gray-100">$1</strong>'
        )
        // Italic text: *italic*
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        // Code: `code`
        .replace(
          /`(.*?)`/g,
          '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>'
        )
    );
  };

  // This function detects the format of each line and applies appropriate styling
  const formatContent = (text: string) => {
    const lines = text.split("\n");
    let inList = false;
    let listItems: string[] = [];
    const result: string[] = [];

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      // Skip empty lines (but close lists if needed)
      if (trimmedLine === "") {
        if (inList && listItems.length > 0) {
          const listHtml = `<ul class="list-disc pl-6 my-4 space-y-1">${listItems
            .map((item) => `<li>${item}</li>`)
            .join("")}</ul>`;
          result.push(listHtml);
          listItems = [];
          inList = false;
        }
        return;
      }

      // DETECT HEADINGS (lines starting with #)
      if (trimmedLine.startsWith("#### ")) {
        if (inList && listItems.length > 0) {
          const listHtml = `<ul class="list-disc pl-6 my-4 space-y-1">${listItems
            .map((item) => `<li>${item}</li>`)
            .join("")}</ul>`;
          result.push(listHtml);
          listItems = [];
          inList = false;
        }
        result.push(
          `<h4 class="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-200">${trimmedLine.substring(
            5
          )}</h4>`
        );
        return;
      }

      if (trimmedLine.startsWith("### ")) {
        if (inList && listItems.length > 0) {
          const listHtml = `<ul class="list-disc pl-6 my-4 space-y-1">${listItems
            .map((item) => `<li>${item}</li>`)
            .join("")}</ul>`;
          result.push(listHtml);
          listItems = [];
          inList = false;
        }
        result.push(
          `<h3 class="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">${trimmedLine.substring(
            4
          )}</h3>`
        );
        return;
      }

      if (trimmedLine.startsWith("## ")) {
        if (inList && listItems.length > 0) {
          const listHtml = `<ul class="list-disc pl-6 my-4 space-y-1">${listItems
            .map((item) => `<li>${item}</li>`)
            .join("")}</ul>`;
          result.push(listHtml);
          listItems = [];
          inList = false;
        }
        result.push(
          `<h2 class="text-3xl font-semibold mt-10 mb-4 text-gray-900 dark:text-gray-100">${trimmedLine.substring(
            3
          )}</h2>`
        );
        return;
      }

      if (trimmedLine.startsWith("# ")) {
        if (inList && listItems.length > 0) {
          const listHtml = `<ul class="list-disc pl-6 my-4 space-y-1">${listItems
            .map((item) => `<li>${item}</li>`)
            .join("")}</ul>`;
          result.push(listHtml);
          listItems = [];
          inList = false;
        }
        result.push(
          `<h1 class="text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">${trimmedLine.substring(
            2
          )}</h1>`
        );
        return;
      }

      // DETECT BULLET POINTS (lines starting with -, *, •, or ◦)
      if (trimmedLine.match(/^[-*•◦]\s/)) {
        // Remove the bullet symbol and trim
        const listItem = trimmedLine.replace(/^[-*•◦]\s+/, "").trim();

        // Format bold text within list items
        const formattedItem = formatInlineText(listItem);

        if (!inList) {
          inList = true;
        }
        listItems.push(formattedItem);
        return;
      }

      // DETECT NUMBERED LISTS (lines starting with 1., 2., etc.)
      if (trimmedLine.match(/^\d+\.\s/)) {
        const listItem = trimmedLine.replace(/^\d+\.\s+/, "").trim();
        const formattedItem = formatInlineText(listItem);

        if (!inList) {
          inList = true;
        }
        listItems.push(formattedItem);
        return;
      }

      // If we were in a list but this line is not a list item, close the list
      if (inList && listItems.length > 0) {
        const listHtml = `<ul class="list-disc pl-6 my-4 space-y-1">${listItems
          .map((item) => `<li>${item}</li>`)
          .join("")}</ul>`;
        result.push(listHtml);
        listItems = [];
        inList = false;
      }

      // REGULAR PARAGRAPHS with inline formatting
      const formattedLine = formatInlineText(trimmedLine);
      result.push(
        `<p class="my-4 text-gray-700 dark:text-gray-300 text-base leading-relaxed">${formattedLine}</p>`
      );
    });

    // Close any open list at the end
    if (inList && listItems.length > 0) {
      const listHtml = `<ul class="list-disc pl-6 my-4 space-y-1">${listItems
        .map((item) => `<li>${item}</li>`)
        .join("")}</ul>`;
      result.push(listHtml);
    }

    return result.join("");
  };

  const formattedHtml = formatContent(content);

  return <div dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
};

export default BlogFormatter;
