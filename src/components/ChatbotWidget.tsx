"use client";

import { useChat, Message } from "../hooks/use-chat";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";

export default function ChatbotWidget() {
  // Simple markdown-to-JSX renderer for assistant messages
  const renderFormatted = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      // Convert **bold** to <strong>
      const parts = line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      // Detect bullet lines (• or - at start)
      const trimmed = line.trim();
      if (trimmed.startsWith("•") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        return (
          <div key={i} className="flex gap-1.5 ml-1 my-0.5">
            <span className="text-primary mt-0.5">•</span>
            <span>{parts}</span>
          </div>
        );
      }

      // Empty lines become spacing
      if (trimmed === "") return <div key={i} className="h-2" />;

      return <div key={i}>{parts}</div>;
    });
  };


  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "initial-message",
        role: "assistant",
        content: "Hi! I'm L2 IT's AI assistant. I can help you find the right CCTV, network, or cabling solution. What are you looking to set up?",
      },
    ],
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-black/5"
          >
            {/* Header */}
            <div className="bg-secondary p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="bg-white/10 p-2 rounded-xl text-white">
                    <Bot className="h-6 w-6" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">L2 Assistant</h3>
                  <p className="text-[10px] text-white/50">Online now</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 text-white rounded-full bg-transparent"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50">
              {messages.map((m: Message) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex max-w-[85%] flex-col gap-1",
                    m.role === "user" ? "ml-auto items-end" : "items-start"
                  )}
                >
                   <span className="text-[10px] font-black text-secondary/30 uppercase tracking-widest px-2">
                      {m.role === "user" ? "You" : "L2 Assistant"}
                   </span>
                  <div
                    className={cn(
                      "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-secondary text-white rounded-tr-none shadow-md"
                        : "bg-white text-text-main rounded-tl-none border border-black/5 shadow-sm"
                    )}
                  >
                    {m.role === "assistant" ? renderFormatted(m.content) : m.content}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex items-start max-w-[85%]">
                   <div className="px-4 py-3 rounded-2xl text-sm bg-white text-text-main rounded-tl-none border border-black/5 shadow-sm">
                      <div className="flex gap-1 py-1">
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                      </div>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-black/5">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about CCTV, WiFi..."
                  className="rounded-xl bg-page-bg border-none"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-secondary hover:bg-primary text-white rounded-xl h-12 w-12 p-0 shadow-lg shadow-secondary/10"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-16 w-16 bg-primary rounded-full flex items-center justify-center text-white shadow-xl shadow-primary/30 z-[60]"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
            >
              <X className="h-8 w-8" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <MessageCircle className="h-8 w-8" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="absolute -inset-1 border-2 border-primary rounded-full animate-ping opacity-20 pointer-events-none" />
      </motion.button>
    </div>
  );
}
