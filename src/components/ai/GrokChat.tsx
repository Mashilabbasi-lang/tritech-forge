import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle, Loader2, CheckCircle } from "lucide-react";
import { useChat } from "@/contexts/chat-context";
import {
  sendMessageToGrok,
  extractLeadFromResponse,
  submitLeadToFormspree,
  type LeadData,
} from "@/lib/grok-service";

export function GrokChat() {
  const { messages, addMessage, clearMessages, isOpen, setIsOpen } = useChat();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, submittedLead]);

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen && !submittedLead) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, submittedLead]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    addMessage("user", userMessage);
    setIsLoading(true);

    try {
      const allMessages = [...messages, { role: "user" as const, content: userMessage }];
      const response = await sendMessageToGrok(allMessages);

      // Check if AI has collected all lead info
      const lead = extractLeadFromResponse(response);
      if (lead) {
        // Clean message — strip the JSON line before showing to user
        const cleanResponse = response.replace(/LEAD_READY:\{.*?\}/s, "").trim();
        addMessage("assistant", cleanResponse || "Great, I've got everything I need!");

        // Submit to Formspree in background
        const ok = await submitLeadToFormspree(lead);
        if (ok) {
          setSubmittedLead(lead);
        } else {
          addMessage("assistant", "I've noted your details. Our team will reach out shortly!");
        }
      } else {
        addMessage("assistant", response);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage("assistant", "Sorry, I hit an error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    clearMessages();
    setSubmittedLead(null);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-linear-to-br from-primary to-primary/70 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-card border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "min(600px, calc(100vh - 8rem))" }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-linear-to-r from-primary/20 to-transparent shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <div>
                    <h3 className="font-semibold text-white">TriTech Assistant</h3>
                    <p className="text-xs text-muted-foreground">Always here to help</p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs text-muted-foreground hover:text-white transition-colors"
                  title="Clear conversation"
                >
                  ⟲
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && !submittedLead && (
                <div className="h-full flex flex-col items-center justify-center text-center py-8">
                  <MessageCircle className="w-12 h-12 text-primary/40 mb-3" />
                  <p className="text-sm text-muted-foreground mb-2">Welcome to TriTech Forge!</p>
                  <p className="text-xs text-muted-foreground">Ask about our services or book a demo.</p>
                </div>
              )}

              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-primary text-white"
                        : "bg-white/5 text-foreground border border-white/10"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </motion.div>
              )}

              {/* Lead submitted confirmation card */}
              {submittedLead && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center"
                >
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-white mb-1">Demo Booked!</p>
                  <p className="text-xs text-gray-400 mb-3">
                    Thanks {submittedLead.name?.split(" ")[0]}! We've received your request and will contact you within 2 hours.
                  </p>
                  <div className="text-xs text-left bg-white/5 rounded-lg p-3 space-y-1 text-gray-300">
                    {submittedLead.business && <p>🏢 {submittedLead.business}</p>}
                    {submittedLead.email && <p>✉️ {submittedLead.email}</p>}
                    {submittedLead.industry && <p>🔧 {submittedLead.industry}</p>}
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-3 text-xs text-primary hover:underline"
                  >
                    Start new conversation
                  </button>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {!submittedLead && (
              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 shrink-0">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    disabled={isLoading}
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors text-white"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
