"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { submitInquiryLead } from "@/lib/inquirySubmission";

type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
  inquiryData?: InquiryPayload | null;
}

interface InquiryPayload {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const INQUIRY_MARKER = "%%INQUIRY_READY%%";

function parseInquiry(raw: string): { clean: string; inquiry: InquiryPayload | null; markerFound: boolean } {
  const idx = raw.indexOf(INQUIRY_MARKER);
  if (idx === -1) return { clean: raw, inquiry: null, markerFound: false };

  const clean = raw.slice(0, idx).trim();
  const afterMarker = raw.slice(idx + INQUIRY_MARKER.length);

  // Try to extract JSON object anywhere after the marker
  const jsonMatch = afterMarker.match(/\{[\s\S]*?\}/);
  if (!jsonMatch) return { clean, inquiry: null, markerFound: true };

  try {
    const inquiry = JSON.parse(jsonMatch[0]) as InquiryPayload;
    return { clean, inquiry, markerFound: true };
  } catch {
    // Try to grab everything up to closing %% or end of string
    const jsonEnd = afterMarker.indexOf("%%");
    const jsonStr = (jsonEnd !== -1 ? afterMarker.slice(0, jsonEnd) : afterMarker).trim();
    try {
      const inquiry = JSON.parse(jsonStr) as InquiryPayload;
      return { clean, inquiry, markerFound: true };
    } catch {
      return { clean, inquiry: null, markerFound: true };
    }
  }
}

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Welcome to **Balaji Engineering Works**.\n\nPlease select your preferred language:\n\n**1.** English\n**2.** Gujarati (ગુજરાતી)\n**3.** Hindi (हिंदी)",
  inquiryData: null,
};

function Bubble({ msg }: {
  msg: Message;
}) {
  const isUser = msg.role === "user";

  function renderMarkdown(text: string) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>");
  }

  return (
    <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"} mb-3`}>
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full border border-white/10 bg-[#1a0a0a] flex items-center justify-center shadow">
          <img src="/logo.png" alt="Balaji AI" className="h-6 w-6 object-contain" />
        </div>
      )}

      <div className={`max-w-[78%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1.5`}>
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
            isUser
              ? "bg-primary text-white rounded-tr-sm"
              : "bg-[#1e1212] border border-white/8 text-white/90 rounded-tl-sm"
          }`}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
        />
      </div>

      {isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-xs font-bold">
          U
        </div>
      )}
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-2.5 flex-row mb-3">
      <div className="flex-shrink-0 h-8 w-8 rounded-full border border-white/10 bg-[#1a0a0a] flex items-center justify-center shadow">
        <img src="/logo.png" alt="Balaji AI" className="h-6 w-6 object-contain" />
      </div>
      <div className="bg-[#1e1212] border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1 shadow-sm">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-1.5 w-1.5 rounded-full bg-white/40"
            style={{ animation: `balajiDot 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}

export function BalajiAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [sendingInquiry, setSendingInquiry] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // iOS-safe scroll lock: position:fixed keeps page frozen without breaking inner scroll
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const autoSubmitInquiry = useCallback((data: InquiryPayload) => {
    // Show success message immediately — don't wait for network calls
    setInquirySent(true);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "✅ Your inquiry has been submitted successfully!\n\nOur team at Balaji Engineering Works will contact you on **" +
          data.phone +
          "** shortly. Thank you for reaching out!",
        inquiryData: null,
      },
    ]);

    // Fire Firebase + email in the background without blocking
    submitInquiryLead(
      {
        name: data.name,
        phone: data.phone,
        email: data.email,
        service: data.service,
        message: data.message,
        quantity: "",
        material: "",
      },
      "balaji-ai",
    ).catch(() => {
      setStatusMsg("Inquiry saved locally. Please call us at +91 99787 53398 to confirm.");
    });
  }, []);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const history = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const streamingId = (Date.now() + 1).toString();

    try {
      const res = await fetch("/api/balaji-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      if (!res.body) {
        throw new Error("No response body");
      }

      // Insert a blank streaming message immediately
      setMessages((prev) => [
        ...prev,
        { id: streamingId, role: "assistant", content: "", inquiryData: null },
      ]);
      setLoading(false);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;

        // Stream visible text only (hide the inquiry token line while typing)
        const visibleContent = fullContent.includes("%%INQUIRY_READY%%")
          ? fullContent.slice(0, fullContent.indexOf("%%INQUIRY_READY%%")).trim()
          : fullContent;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === streamingId ? { ...m, content: visibleContent } : m
          )
        );
      }

      // Once stream ends, parse for inquiry token
      const { clean, inquiry } = parseInquiry(fullContent);
      const finalContent = clean || fullContent;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === streamingId ? { ...m, content: finalContent } : m
        )
      );

      if (inquiry) {
        await autoSubmitInquiry(inquiry);
      }
    } catch {
      setMessages((prev) => {
        const hasStreaming = prev.some((m) => m.id === streamingId);
        if (hasStreaming) {
          return prev.map((m) =>
            m.id === streamingId
              ? { ...m, content: "Something went wrong. Please try again or call us at +91 99787 53398." }
              : m
          );
        }
        return [
          ...prev,
          {
            id: streamingId,
            role: "assistant" as const,
            content: "Something went wrong. Please try again or call us at +91 99787 53398.",
            inquiryData: null,
          },
        ];
      });
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [input, loading, messages, autoSubmitInquiry]);

  return (
    <>
      <style>{`
        @keyframes balajiDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Floating button — stacked above WhatsApp */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Balaji AI"
        className="fixed bottom-[5.5rem] right-4 sm:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1a0505] shadow-[0_4px_16px_rgba(172,60,60,0.4)] transition-shadow hover:shadow-[0_6px_24px_rgba(172,60,60,0.6)]"
      >
        <img
          src="/logo.png"
          alt="Balaji AI"
          className="h-10 w-10 object-contain"
        />
        <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-primary border-2 border-[#1a0505]" />
      </button>

      {/* Backdrop — sits above navbar (z-50) and floating buttons */}
      {open && (
        <div
          className="fixed inset-0 z-[55] bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Chat window — centered modal */}
      {open && (
        <div
          className="fixed z-[60] flex flex-col overflow-hidden
            inset-x-3 bottom-3 top-3 rounded-2xl
            sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[420px] sm:rounded-2xl"
          style={{
            maxHeight: "min(680px, calc(100dvh - 24px))",
            height: "calc(100dvh - 24px)",
            background: "linear-gradient(145deg, #140a0a 0%, #1c0c0c 50%, #120808 100%)",
            border: "1px solid rgba(172,60,60,0.25)",
            boxShadow: "0 32px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(172,60,60,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3.5"
            style={{
              background: "linear-gradient(135deg, #1f0a0a 0%, #2a0e0e 100%)",
              borderBottom: "1px solid rgba(172,60,60,0.2)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div className="relative flex-shrink-0">
              <span className="flex h-3 w-3 rounded-full bg-green-400 shadow" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-black text-white leading-tight tracking-wide">Balaji AI</p>
                <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider" style={{ background: "rgba(172,60,60,0.2)", color: "rgba(172,60,60,1)", border: "1px solid rgba(172,60,60,0.3)" }}>
                  Live
                </span>
              </div>
              <p className="text-[11px] text-white/40 leading-tight mt-0.5">Balaji Engineering Works · Online now</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-xl p-2 text-white/30 transition-all hover:bg-white/10 hover:text-white active:scale-95"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={messagesRef}
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            className="flex-1 min-h-0 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
            style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
          >
            {messages.map((msg) => (
              <Bubble
                key={msg.id}
                msg={msg}
              />
            ))}
            {loading && <TypingDots />}
            {sendingInquiry && (
              <div className="text-center text-xs text-white/40 py-2">Sending your inquiry…</div>
            )}
            {statusMsg && (
              <div className="text-center text-xs text-red-400 py-2">{statusMsg}</div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="px-4 py-4"
            style={{
              borderTop: "1px solid rgba(172,60,60,0.15)",
              background: "linear-gradient(135deg, #1a0a0a 0%, #1f0d0d 100%)",
            }}
          >
            <div
              className="flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onFocus={() => {}}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask about services, products, pricing…"
                className="flex-1 bg-transparent text-sm text-white placeholder-white/20 outline-none"
                disabled={loading}
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-white shadow-lg transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #ac3c3c, #c94848)" }}
                aria-label="Send"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
