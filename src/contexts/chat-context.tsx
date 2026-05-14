import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { GrokMessage } from "@/lib/grok-service";

interface ChatContextType {
  messages: GrokMessage[];
  addMessage: (role: "user" | "assistant", content: string) => void;
  clearMessages: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<GrokMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addMessage = (role: "user" | "assistant", content: string) => {
    setMessages((prev) => [...prev, { role, content }]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{ messages, addMessage, clearMessages, isOpen, setIsOpen }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
