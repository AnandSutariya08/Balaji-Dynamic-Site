"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

function parseInquiry(raw: string): { clean: string; inquiry: InquiryPayload | null } {
  const idx = raw.indexOf(INQUIRY_MARKER);
  if (idx === -1) return { clean: raw, inquiry: null };

  const clean = raw.slice(0, idx).trim();
  const jsonStart = idx + INQUIRY_MARKER.length;
  const jsonEnd = raw.indexOf("%%", jsonStart);
  if (jsonEnd === -1) return { clean, inquiry: null };

  try {
    const inquiry = JSON.parse(raw.slice(jsonStart, jsonEnd)) as InquiryPayload;
    return { clean, inquiry };
  } catch {
    return { clean, inquiry: null };
  }
}

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Jai Shree Krishna! 🙏 I'm **Balaji AI**, your assistant for Balaji Engineering Works. I can help you with information about our CNC laser cutting, plate bending, fabrication services, products, and more. How can I help you today?",
  inquiryData: null,
};

function Bubble({ msg, onSendInquiry, inquirySent }: {
  msg: Message;
  onSendInquiry: (d: InquiryPayload) => void;
  inquirySent: boolean;
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
        <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden border border-white/10 bg-[#1a0a0a] flex items-center justify-center shadow">
          <img src="/favicon.jpg" alt="Balaji AI" className="h-full w-full object-cover" />
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

        {msg.inquiryData && !inquirySent && (
          <button
            type="button"
            onClick={() => onSendInquiry(msg.inquiryData!)}
            className="mt-1 flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:bg-primary/90 transition-all active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            Send Inquiry to Team
          </button>
        )}

        {msg.inquiryData && inquirySent && (
          <div className="mt-1 flex items-center gap-2 rounded-xl bg-green-900/50 border border-green-500/30 px-4 py-2 text-xs font-semibold text-green-400">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Inquiry sent! Team will contact you soon.
          </div>
        )}
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
      <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden border border-white/10 bg-[#1a0a0a] flex items-center justify-center shadow">
        <img src="/favicon.jpg" alt="Balaji AI" className="h-full w-full object-cover" />
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

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

    const history = [...messages, userMsg]
      .filter((m) => m.id !== "welcome" || m.role !== "assistant")
      .map((m) => ({ role: m.role, content: m.content }));

    if (messages.length === 1 && messages[0].id === "welcome") {
      history.unshift({ role: "assistant" as Role, content: WELCOME.content });
    }

    try {
      const res = await fetch("/api/balaji-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();
      const raw: string = data.content ?? "Sorry, I could not process that. Please try again.";
      const { clean, inquiry } = parseInquiry(raw);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: clean,
        inquiryData: inquiry,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Connection error. Please check your network and try again.",
          inquiryData: null,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const handleSendInquiry = useCallback(async (data: InquiryPayload) => {
    setSendingInquiry(true);
    setStatusMsg(null);
    try {
      await submitInquiryLead(
        {
          name: data.name,
          phone: data.phone,
          email: data.email,
          service: data.service,
          message: data.message,
        },
        "contact-form",
      );
      setInquirySent(true);
      setStatusMsg(null);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "Your inquiry has been sent to our team! ✅ Someone from Balaji Engineering Works will contact you on **" +
            data.phone +
            "** shortly. Is there anything else I can help you with?",
          inquiryData: null,
        },
      ]);
    } catch {
      setStatusMsg("Failed to send inquiry. Please call us at +91 99787 53398.");
    } finally {
      setSendingInquiry(false);
    }
  }, []);

  return (
    <>
      <style>{`
        @keyframes balajiDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes balajiSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        .balaji-ai-window {
          animation: balajiSlideUp 0.22s cubic-bezier(0.34,1.56,0.64,1) both;
        }
      `}</style>

      {/* Floating button — above WhatsApp */}
      <div className="fixed bottom-[5.5rem] right-6 z-50 flex flex-col items-center gap-1">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open Balaji AI"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/60 bg-[#1a0505] shadow-[0_8px_32px_rgba(172,60,60,0.45)] transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_12px_40px_rgba(172,60,60,0.55)] active:translate-y-0"
        >
          <img
            src="/favicon.jpg"
            alt="Balaji AI"
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
          </span>
        </button>
        <span className="rounded-full bg-[#1a0505] border border-primary/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary shadow-md">
          Balaji AI
        </span>
      </div>

      {/* Chat window */}
      {open && (
        <div
          className="balaji-ai-window fixed bottom-[11rem] right-6 z-50 flex w-[360px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#120808] shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
          style={{ height: "520px" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/8 bg-[#1a0a0a] px-4 py-3">
            <div className="relative">
              <img
                src="/favicon.jpg"
                alt="Balaji AI"
                className="h-10 w-10 rounded-full border-2 border-primary/50 object-cover shadow"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#1a0a0a] bg-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white leading-tight">Balaji AI</p>
              <p className="text-[11px] text-white/50 leading-tight">Balaji Engineering Works · Online</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
            {messages.map((msg) => (
              <Bubble
                key={msg.id}
                msg={msg}
                onSendInquiry={handleSendInquiry}
                inquirySent={inquirySent}
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
          <div className="border-t border-white/8 bg-[#1a0a0a] px-3 py-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0e0606] px-3 py-2 focus-within:border-primary/50 transition-colors">
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
                className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none"
                disabled={loading}
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow transition-all hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                aria-label="Send"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-white/20">
              Powered by Sarvam AI · Balaji Engineering Works
            </p>
          </div>
        </div>
      )}
    </>
  );
}
