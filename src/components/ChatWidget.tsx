"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Phone,
  Mail,
  HelpCircle,
  Briefcase,
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  "What services do you offer?",
  "Who built this website?",
  "How can I contact you?",
  "Tell me about pricing",
  "Do you do custom projects?",
  "What technologies do you use?",
  "How long does a project take?",
];

export default function ChatWidget() {
  // REMOVED async keyword - client components can't be async
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hello! I'm your AI assistant for Jibon Project. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add session state
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // SEND MESSAGE FUNCTION (ADD THIS BACK)
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      console.log("Sending message:", currentInput);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          sessionId: sessionId,
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      const botMessage: Message = {
        id: messages.length + 2,
        text:
          data.message || "I apologize, but I couldn't process your request.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I'm having connection issues. Please try again or contact us directly.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = async (question: string) => {
    if (!isOpen) setIsOpen(true);

    // Add user question immediately
    const userMessage: Message = {
      id: messages.length + 1,
      text: question,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
          sessionId: sessionId,
        }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: messages.length + 2,
        text: data.success
          ? data.message
          : "Sorry, I couldn't process your question. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error with quick question:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Oops! Something went wrong. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleContactClick = (type: string) => {
    let message = "";
    switch (type) {
      case "call":
        message = "What's the phone number to contact?";
        break;
      case "email":
        message = "What's the email address?";
        break;
      case "services":
        message = "What services do you offer?";
        break;
      case "help":
        message = "I need help with something. Can you assist me?";
        break;
    }
    handleQuickQuestion(message);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "👋 Hello! I'm your AI assistant for Jibon Project. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-100 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/40 dark:shadow-blue-900/30"
        aria-label="Open chat assistant"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-2 border-white"></span>
          </span>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-99 w-full max-w-[calc(100vw-3rem)] sm:w-96 sm:max-w-96 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 shadow-2xl transition-all duration-300 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-purple-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Bess Zone</h3>
                <p className="text-sm text-blue-100">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="text-sm text-white/80 hover:text-white transition-colors"
              title="Clear chat"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-3">
          <p className="mb-2 text-xs font-medium text-gray-600 dark:text-gray-300">
            Quick questions:
          </p>
          <div className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((question, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickQuestion(question)}
                className="rounded-full bg-white dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 shadow-sm ring-1 ring-gray-200 dark:ring-gray-600 transition-all hover:bg-blue-50 dark:hover:bg-gray-600 hover:ring-blue-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Container */}
        <div className="h-25 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.sender === "user"
                    ? "rounded-br-none bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    : "rounded-bl-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {msg.sender === "bot" ? (
                    <Bot className="h-4 w-4 text-purple-500" />
                  ) : (
                    <User className="h-4 w-4 text-blue-200" />
                  )}
                  <span className="text-xs font-medium">
                    {msg.sender === "bot" ? "Assistant" : "You"}
                  </span>
                </div>
                <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
                <div className="mt-1 text-right">
                  <span className="text-xs opacity-70">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="max-w-[80%] rounded-2xl rounded-bl-none bg-white dark:bg-gray-800 px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-purple-500" />
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Typing...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message here..."
              className="flex-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-white"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white transition-all hover:from-blue-700 hover:to-blue-800 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="mt-3 flex justify-center gap-4">
            <button
              onClick={() => handleContactClick("call")}
              className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Phone className="h-3 w-3" />
              <span>Call</span>
            </button>
            <button
              onClick={() => handleContactClick("email")}
              className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Mail className="h-3 w-3" />
              <span>Email</span>
            </button>
            <button
              onClick={() => handleContactClick("services")}
              className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Briefcase className="h-3 w-3" />
              <span>Services</span>
            </button>
            <button
              onClick={() => handleContactClick("help")}
              className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <HelpCircle className="h-3 w-3" />
              <span>Help</span>
            </button>
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-transparent"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
