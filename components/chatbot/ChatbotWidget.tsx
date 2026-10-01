"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, t: allT } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = allT.chatbot;

  // Initialize or update welcome message
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 0) {
        return [
          {
            id: "welcome",
            role: "assistant",
            content: t.welcomeMessage,
          },
        ];
      }
      // If user hasn't started a custom chat conversation yet, update the welcome message language
      if (prev.length === 1 && prev[0].id === "welcome") {
        return [
          {
            id: "welcome",
            role: "assistant",
            content: t.welcomeMessage,
          },
        ];
      }
      return prev;
    });
  }, [t.welcomeMessage]);

  // Auto-scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen, scrollToBottom]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle Escape key listener for closing drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleToggleOpen = (openState: boolean) => {
    setIsOpen(openState);
    if (!openState) {
      setTimeout(() => triggerRef.current?.focus(), 50);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsgId = Date.now().toString();
    const userMsg: Message = { id: userMsgId, role: "user", content: query };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const historyPayload = messages
        .filter((m) => !m.isError && m.id !== "welcome")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
      });

      const data = await res.json();

      if (data.success && data.message) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.message,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.message || t.errorMessage,
            isError: true,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: t.errorMessage,
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMsg) {
      setMessages((prev) => {
        const lastErrIndex = prev.findLastIndex((m) => m.isError);
        if (lastErrIndex !== -1) {
          return prev.slice(0, lastErrIndex);
        }
        return prev;
      });
      handleSend(lastUserMsg.content);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 rtl:right-auto rtl:left-5 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          ref={triggerRef}
          onClick={() => handleToggleOpen(true)}
          aria-expanded={false}
          aria-controls="chatbot-dialog"
          aria-label={t.floatingBtn}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-ring cursor-pointer"
        >
          <span className="text-xl leading-none" aria-hidden="true">
            💬
          </span>
          <span className="hidden sm:inline font-semibold">
            {t.floatingBtn}
          </span>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          id="chatbot-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatbot-title"
          className="flex flex-col w-[calc(100vw-2.5rem)] sm:w-[400px] h-[540px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-slate-900 text-white">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold shadow-inner"
                aria-hidden="true"
              >
                ✨
              </div>
              <div>
                <h2 id="chatbot-title" className="text-sm font-bold leading-tight">
                  {t.title}
                </h2>
                <p className="text-[11px] text-slate-300 leading-tight">
                  {t.subtitle}
                </p>
              </div>
            </div>
            <button
              ref={closeBtnRef}
              onClick={() => handleToggleOpen(false)}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors focus-ring cursor-pointer"
              aria-label="Close chat assistant"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50"
            aria-live="polite"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-emerald-600 text-white rounded-br-none shadow-xs"
                      : msg.isError
                      ? "bg-rose-50 text-rose-900 border border-rose-200 rounded-bl-none"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs"
                  }`}
                >
                  {msg.content}
                </div>

                {msg.isError && (
                  <button
                    onClick={handleRetry}
                    className="mt-1.5 text-xs text-rose-600 hover:text-rose-700 underline font-medium flex items-center gap-1 focus-ring rounded cursor-pointer"
                  >
                    🔄 {t.retryBtn}
                  </button>
                )}
              </div>
            ))}

            {/* Typing / Loading indicator */}
            {loading && (
              <div
                className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-2xl px-3.5 py-2.5 w-fit shadow-xs animate-pulse"
                aria-live="polite"
              >
                <span aria-hidden="true">✨</span>
                <span>{t.thinking}</span>
              </div>
            )}

            {/* Suggested Questions Section */}
            {messages.length <= 2 && !loading && (
              <div className="pt-2 space-y-2">
                <p className="text-[11px] font-semibold text-slate-500 px-1">
                  {t.suggestedTitle}
                </p>
                <div className="flex flex-col gap-1.5">
                  {t.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="text-left rtl:text-right text-xs px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 text-emerald-900 transition-colors font-medium focus-ring cursor-pointer"
                    >
                      💡 {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                id="chatbot-message-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder={t.placeholder}
                aria-label={t.placeholder}
                maxLength={1000}
                disabled={loading}
                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus-ring text-slate-900 placeholder:text-slate-400 bg-white"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 disabled:cursor-not-allowed text-white font-medium text-xs sm:text-sm transition-colors shadow-xs focus-ring cursor-pointer"
              >
                {t.sendBtn}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
