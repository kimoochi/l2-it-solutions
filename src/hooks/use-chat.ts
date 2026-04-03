import { useState, useCallback, useRef, useEffect } from "react";

export type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

export interface UseChatOptions {
  api?: string;
  initialMessages?: Message[];
}

/**
 * useChat
 * Custom hook with typing animation for L2 IT Solutions chatbot.
 */
export function useChat({ api = "/api/chat", initialMessages = [] }: UseChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup any running typing animation on unmount
  useEffect(() => {
    return () => {
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  /**
   * Typing animation: reveals the full text character-by-character.
   * Speed: ~15ms per character for a natural feel.
   */
  const animateTyping = (assistantId: string, fullText: string) => {
    let charIndex = 0;
    const speed = 15; // ms per character

    typingRef.current = setInterval(() => {
      charIndex += 1;
      const visibleText = fullText.slice(0, charIndex);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: visibleText } : m
        )
      );

      if (charIndex >= fullText.length) {
        if (typingRef.current) clearInterval(typingRef.current);
        typingRef.current = null;
        setIsLoading(false);
      }
    }, speed);
  };

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!input.trim() || isLoading) return;

      // Stop any ongoing typing animation
      if (typingRef.current) {
        clearInterval(typingRef.current);
        typingRef.current = null;
      }

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: input,
      };

      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput("");
      setIsLoading(true);

      try {
        const response = await fetch(api, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        });

        if (!response.ok) throw new Error("Failed to fetch response");

        const data = await response.json();
        const fullText = data.content || "Sorry, I couldn't generate a response.";

        const assistantId = (Date.now() + 1).toString();
        const assistantMessage: Message = {
          id: assistantId,
          role: "assistant",
          content: "",
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Start typing animation
        animateTyping(assistantId, fullText);
      } catch (error) {
        console.error("Chat error:", error);

        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'm having trouble connecting. Please try again or contact us at +63 (032) 123-4567.",
        };
        setMessages((prev) => [...prev, errorMessage]);
        setIsLoading(false);
      }
    },
    [api, input, isLoading, messages]
  );

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  };
}
