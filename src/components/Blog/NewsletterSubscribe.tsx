// components/blog/NewsletterSubscribe.tsx
"use client";

import { Send, Mail } from "lucide-react";
import { useState } from "react";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      setEmail("");
      // Reset after 5 seconds
      setTimeout(() => setSubscribed(false), 5000);
    }, 1500);
  };

  return (
    <div className="p-6 bg-gradient-to-b from-white/60 to-gray-50/50 dark:from-gray-900/30 dark:to-gray-900/20 rounded-xl border border-gray-200/60 dark:border-gray-800/50 shadow-sm">
      {/* Header with subtle icon */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100/50 dark:bg-blue-900/20 rounded-lg">
          <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
            Newsletter
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Thoughtful content delivered weekly
          </p>
        </div>
      </div>

      {/* Content */}
      {subscribed ? (
        <div className="text-center py-5 px-4 bg-gradient-to-r from-green-50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg border border-green-200/50 dark:border-green-800/30">
          <div className="mb-2">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-2">
              <Send className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-green-700 dark:text-green-400 font-medium mb-1">
            Welcome aboard! 🎉
          </p>
         
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
            Get the latest articles
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/60 border border-gray-300/50 dark:border-gray-700/50 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500/90 to-blue-600/90 dark:from-blue-600 dark:to-blue-700 text-white font-medium rounded-lg hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm group"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          </form>

          {/* Privacy Note */}
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-4 pt-3 border-t border-gray-200/30 dark:border-gray-800/30">
           Bees Zone
          </p>
        </>
      )}
    </div>
  );
}
