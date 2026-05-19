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
          quantity: "",
          material: "",
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
        @keyframes balajiRing {
          0%   { transform: scale(1);    opacity: 0.9; }
          60%  { transform: scale(1.55); opacity: 0;   }
          100% { transform: scale(1.55); opacity: 0;   }
        }
        .balaji-ai-window {
          animation: balajiSlideUp 0.22s cubic-bezier(0.34,1.56,0.64,1) both;
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
          src="/favicon.jpg"
          alt="Balaji AI"
          className="h-10 w-10 rounded-full object-cover"
        />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Chat window — centered modal */}
      {open && (
        <div
          className="balaji-ai-window fixed z-50 flex flex-col overflow-hidden
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
            <div className="relative">
              <div className="relative h-11 w-11 rounded-full overflow-hidden border-2 shadow-[0_0_16px_rgba(172,60,60,0.4)]" style={{ borderColor: "rgba(172,60,60,0.6)" }}>
                <img
                  src="/favicon.jpg"
                  alt="Balaji AI"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#1f0a0a] bg-green-400 shadow" />
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
