"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  ChevronDown,
  Inbox,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
} from "lucide-react";
import { getInquiries, updateInquiryStatus } from "@/lib/firestore/inquiries";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { Inquiry, InquiryStatus } from "@/lib/firestore/types";

const ALL_STATUSES: InquiryStatus[] = ["new", "in-progress", "replied", "closed"];

const STATUS_LABELS: Record<InquiryStatus, string> = {
  new: "New",
  "in-progress": "In Progress",
  replied: "Replied",
  closed: "Closed",
};

const STATUS_COLORS: Record<InquiryStatus, string> = {
  new: "bg-red-500/10 text-red-400 border-red-500/25",
  "in-progress": "bg-yellow-500/10 text-yellow-400 border-yellow-500/25",
  replied: "bg-blue-500/10 text-blue-400 border-blue-500/25",
  closed: "bg-zinc-500/10 text-zinc-400 border-zinc-500/25",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: InquiryStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function InquiryCard({
  inquiry,
  onStatusChange,
}: {
  inquiry: Inquiry;
  onStatusChange: (id: string, status: InquiryStatus) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleStatus = async (status: InquiryStatus) => {
    setUpdating(true);
    await onStatusChange(inquiry.id, status);
    setUpdating(false);
  };

  return (
    <div
      className={`overflow-hidden rounded-xl border bg-[#1a1a1a] transition-all ${
        inquiry.status === "new" ? "border-[#AC3C3C]/30" : "border-white/6"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-white/3"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
          <MessageSquare className="h-4 w-4 text-zinc-400" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex flex-wrap items-center gap-2">
            <span className="truncate text-sm font-semibold text-white">{inquiry.name}</span>
            <StatusBadge status={inquiry.status} />
          </div>
          <div className="truncate text-xs text-zinc-500">
            {inquiry.service} · {formatDate(inquiry.createdAt)}
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="space-y-4 border-t border-white/6 p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Phone
              </div>
              <a
                href={`tel:${inquiry.phone}`}
                className="flex items-center gap-1.5 text-sm text-white transition-colors hover:text-[#e05555]"
              >
                <Phone className="h-3.5 w-3.5" />
                {inquiry.phone}
              </a>
            </div>
            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Email
              </div>
              <a
                href={`mailto:${inquiry.email}`}
                className="flex items-center gap-1.5 truncate text-sm text-white transition-colors hover:text-[#e05555]"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {inquiry.email}
              </a>
            </div>
            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Service
              </div>
              <div className="text-sm text-white">{inquiry.service}</div>
            </div>
          </div>

          {(inquiry.quantity || inquiry.material) && (
            <div className="grid grid-cols-2 gap-3">
              {inquiry.quantity && (
                <div>
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                    Quantity
                  </div>
                  <div className="text-sm text-white">{inquiry.quantity}</div>
                </div>
              )}
              {inquiry.material && (
                <div>
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                    Material
                  </div>
                  <div className="text-sm text-white">{inquiry.material}</div>
                </div>
              )}
            </div>
          )}

          <div>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Project Details
            </div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
              {inquiry.message}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Update Status:
            </span>
            {ALL_STATUSES.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => handleStatus(status)}
                disabled={inquiry.status === status || updating}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all disabled:cursor-default disabled:opacity-40 ${
                  inquiry.status === status
                    ? STATUS_COLORS[status]
                    : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {STATUS_LABELS[status]}
              </button>
            ))}
            {updating && <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-500" />}
          </div>
        </div>
      )}
    </div>
  );
}

export function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<InquiryStatus | "all">("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const configured = isFirebaseConfigured();

  const load = async () => {
    if (!configured) return;
    setLoading(true);
    setError("");
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (error_) {
      const message = error_ instanceof Error ? error_.message : "Failed to load inquiries.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleStatusChange = async (id: string, status: InquiryStatus) => {
    await updateInquiryStatus(id, status);
    setInquiries((current) =>
      current.map((inquiry) => (inquiry.id === id ? { ...inquiry, status } : inquiry)),
    );
  };

  const filtered =
    filter === "all" ? inquiries : inquiries.filter((inquiry) => inquiry.status === filter);
  const counts = ALL_STATUSES.reduce(
    (accumulator, status) => {
      accumulator[status] = inquiries.filter((inquiry) => inquiry.status === status).length;
      return accumulator;
    },
    {} as Record<InquiryStatus, number>,
  );

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Inquiries</h1>
          <p className="mt-0.5 text-sm text-zinc-500">{inquiries.length} total submissions</p>
        </div>
        {configured && (
          <button
            type="button"
            onClick={() => void load()}
            disabled={loading}
            className="flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        )}
      </div>

      {!configured && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-amber-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">Firebase not configured</p>
            <p className="mt-0.5 text-amber-400/80">
              Add your{" "}
              <code className="rounded bg-black/30 px-1 font-mono">
                NEXT_PUBLIC_FIREBASE_*
              </code>{" "}
              variables and contact-form submissions will appear here automatically.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="mb-5 flex flex-wrap items-center gap-2">
        {([["all", "All"] as const, ...ALL_STATUSES.map((status) => [status, STATUS_LABELS[status]] as const)]).map(
          ([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                filter === value
                  ? "border-[#AC3C3C] bg-[#AC3C3C] text-white"
                  : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {label}
              <span className="ml-1.5 opacity-60">
                {value === "all" ? inquiries.length : counts[value as InquiryStatus]}
              </span>
            </button>
          ),
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-24 text-zinc-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading from Firestore...
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Inbox className="mb-3 h-10 w-10 text-zinc-700" />
          <p className="font-medium text-zinc-500">No inquiries yet</p>
          <p className="mt-1 text-sm text-zinc-600">
            Submissions from the contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((inquiry) => (
            <InquiryCard
              key={inquiry.id}
              inquiry={inquiry}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
