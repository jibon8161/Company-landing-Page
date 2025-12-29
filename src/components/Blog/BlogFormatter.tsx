'use client';

interface BlogFormatterProps {
  content: string;
}

const BlogFormatter = ({ content }: BlogFormatterProps) => {
  const formatContent = () => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let inList = false;
    let isOrderedList = false;

    const renderCurrentList = () => {
      if (currentList.length === 0) return null;
      
      if (isOrderedList) {
        return (
          <ol className="list-decimal pl-6 my-4 space-y-2" key={`list-${elements.length}`}>
            {currentList.map((item, index) => (
              <li 
                key={index}
                className="ml-4"
                dangerouslySetInnerHTML={{
                  __html: item
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                }}
              />
            ))}
          </ol>
        );
      } else {
        return (
          <ul className="list-disc pl-6 my-4 space-y-2" key={`list-${elements.length}`}>
            {currentList.map((item, index) => (
              <li 
                key={index}
                dangerouslySetInnerHTML={{
                  __html: item
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                }}
              />
            ))}
          </ul>
        );
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Empty line
      if (trimmed === '') {
        if (inList && currentList.length > 0) {
          elements.push(renderCurrentList()!);
          currentList = [];
          inList = false;
        }
        return;
      }

      // Headings with colon formatting
      if (trimmed.startsWith('# ')) {
        if (inList) {
          elements.push(renderCurrentList()!);
          currentList = [];
          inList = false;
        }
        const headingText = trimmed.substring(2);
        
        if (headingText.includes(':')) {
          const [beforeColon, ...afterColon] = headingText.split(':');
          const afterColonText = afterColon.join(':').trim();
          
          elements.push(
            <h1 key={index} className="text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
              {beforeColon}: <strong className="font-bold">{afterColonText}</strong>
            </h1>
          );
        } else {
          elements.push(
            <h1 key={index} className="text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
              {headingText}
            </h1>
          );
        }
        return;
      }
      
      if (trimmed.startsWith('## ')) {
        if (inList) {
          elements.push(renderCurrentList()!);
          currentList = [];
          inList = false;
        }
        const headingText = trimmed.substring(3);
        
        if (headingText.includes(':')) {
          const [beforeColon, ...afterColon] = headingText.split(':');
          const afterColonText = afterColon.join(':').trim();
          
          elements.push(
            <h2 key={index} className="text-3xl font-semibold mt-10 mb-4 text-gray-900 dark:text-gray-100">
              {beforeColon}: <strong className="font-bold">{afterColonText}</strong>
            </h2>
          );
        } else {
          elements.push(
            <h2 key={index} className="text-3xl font-semibold mt-10 mb-4 text-gray-900 dark:text-gray-100">
              {headingText}
            </h2>
          );
        }
        return;
      }
      
      if (trimmed.startsWith('### ')) {
        if (inList) {
          elements.push(renderCurrentList()!);
          currentList = [];
          inList = false;
        }
        const headingText = trimmed.substring(4);
        
        if (headingText.includes(':')) {
          const [beforeColon, ...afterColon] = headingText.split(':');
          const afterColonText = afterColon.join(':').trim();
          
          elements.push(
            <h3 key={index} className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
              {beforeColon}: <strong className="font-bold">{afterColonText}</strong>
            </h3>
          );
        } else {
          elements.push(
            <h3 key={index} className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
              {headingText}
            </h3>
          );
        }
        return;
      }

      // Bullet points
      if (trimmed.match(/^[-*•]\s/)) {
        if (!inList) {
          inList = true;
          isOrderedList = false;
        }
        currentList.push(trimmed.replace(/^[-*•]\s+/, ''));
        return;
      }

      // Numbered lists
      if (trimmed.match(/^\d+\.\s/)) {
        if (!inList) {
          inList = true;
          isOrderedList = true;
        }
        currentList.push(trimmed.replace(/^\d+\.\s+/, ''));
        return;
      }

      // Regular text
      if (inList) {
        elements.push(renderCurrentList()!);
        currentList = [];
        inList = false;
      }

      const formattedText = trimmed
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-gray-100">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

      elements.push(
        <p
          key={index}
          className="my-4 text-gray-700 dark:text-gray-300 text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      );
    });

    if (inList && currentList.length > 0) {
      elements.push(renderCurrentList()!);
    }

    return elements;
  };

  return <div className="font-sans">{formatContent()}</div>;
};

export default BlogFormatter;