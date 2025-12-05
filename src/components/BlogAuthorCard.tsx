// components/BlogAuthorCard.tsx
import { Mail, Globe, Twitter } from "lucide-react";
import Image from "next/image";

interface Props {
  author?: string;
  authorImage?: string; // Add this line
}

export default function BlogAuthorCard({ author, authorImage }: Props) {
  if (!author) return null;

  return (
    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className=" gap-4 mb-4">
        {authorImage ? (
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            {/* <Image
              src={authorImage}
              alt={author}
              fill
              className="object-cover"
              sizes="64px"
            /> */}
          </div>
        ) : (
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {author.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h3 className="font-bold text-xl text-blue-500">{author}</h3>
          <p className="text-gray-600">Content Writer & Editor</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">
        Passionate about sharing knowledge and insights through writing. Loves
        exploring new technologies and trends.
      </p>
      <div className="flex gap-3">
        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <Twitter className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <Mail className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <Globe className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
