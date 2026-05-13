"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  AlertCircle,
  Inbox,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  X,
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

function MobileInquiryRow({ inquiry, onOpen }: { inquiry: Inquiry; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full rounded-2xl border border-white/6 bg-[#141414] px-4 py-3 text-left transition-colors hover:bg-white/3"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5">
          <MessageSquare className="h-4 w-4 text-zinc-400" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="truncate text-sm font-semibold text-white">{inquiry.name}</div>
            <StatusBadge status={inquiry.status} />
          </div>
          <div className="mt-0.5 truncate text-xs text-zinc-500">
            {inquiry.service} · {formatDate(inquiry.createdAt)}
          </div>
          {inquiry.message && (
            <div className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-400">
              {inquiry.message}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

function DetailField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        {label}
      </div>
      {children}
    </div>
  );
}

function InquiryDetail({
  inquiry,
  onCloseMobile,
  onStatusChange,
}: {
  inquiry: Inquiry;
  onCloseMobile: () => void;
  onStatusChange: (id: string, status: InquiryStatus) => Promise<void>;
}) {
  const [updating, setUpdating] = useState(false);

  const handleStatus = async (status: InquiryStatus) => {
    setUpdating(true);
    try {
      await onStatusChange(inquiry.id, status);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/6 bg-[#141414]">
      <div className="flex items-start justify-between gap-3 border-b border-white/6 px-5 py-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="truncate text-sm font-bold text-white">{inquiry.name}</div>
            <StatusBadge status={inquiry.status} />
          </div>
          <div className="mt-0.5 text-xs text-zinc-500">
            {inquiry.service} · {formatDate(inquiry.createdAt)}
          </div>
        </div>
        <button
          type="button"
          onClick={onCloseMobile}
          className="rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close inquiry details"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-5 px-5 py-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <DetailField label="Phone">
            <a
              href={`tel:${inquiry.phone}`}
              className="flex items-center gap-1.5 text-sm text-white transition-colors hover:text-[#e05555]"
            >
              <Phone className="h-3.5 w-3.5" />
              {inquiry.phone}
            </a>
          </DetailField>
          <DetailField label="Email">
            <a
              href={`mailto:${inquiry.email}`}
              className="flex items-center gap-1.5 truncate text-sm text-white transition-colors hover:text-[#e05555]"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" />
              {inquiry.email}
            </a>
          </DetailField>
          <DetailField label="Service">
            <div className="text-sm text-white">{inquiry.service}</div>
          </DetailField>
        </div>

        {(inquiry.quantity || inquiry.material) && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {inquiry.quantity && (
              <DetailField label="Quantity">
                <div className="text-sm text-white">{inquiry.quantity}</div>
              </DetailField>
            )}
            {inquiry.material && (
              <DetailField label="Material">
                <div className="text-sm text-white">{inquiry.material}</div>
              </DetailField>
            )}
          </div>
        )}

        {inquiry.message && (
          <DetailField label="Project Details">
            <div className="whitespace-pre-line rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-relaxed text-zinc-200">
              {inquiry.message}
            </div>
          </DetailField>
        )}

        <div className="border-t border-white/6 pt-4">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            Update Status
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {ALL_STATUSES.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => handleStatus(status)}
                disabled={inquiry.status === status || updating}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all disabled:cursor-default disabled:opacity-40 ${
                  inquiry.status === status
                    ? STATUS_COLORS[status]
                    : "border-white/10 text-zinc-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
                }`}
              >
                {STATUS_LABELS[status]}
              </button>
            ))}
            {updating && <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />}
          </div>
        </div>
      </div>
    </div>
  );
}

function InquiriesTable({
  inquiries,
  onOpen,
}: {
  inquiries: Inquiry[];
  onOpen: (inquiry: Inquiry) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/6 bg-[#141414]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-black/25">
            <tr className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr
                key={inquiry.id}
                className="border-t border-white/6 hover:bg-white/3 transition-colors cursor-pointer"
                onClick={() => onOpen(inquiry)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
                      <MessageSquare className="h-4 w-4 text-zinc-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-white">{inquiry.name}</div>
                      <div className="mt-0.5 flex items-center gap-3 text-xs text-zinc-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5" />
                          {inquiry.phone}
                        </span>
                        <span className="inline-flex items-center gap-1.5 truncate">
                          <Mail className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate max-w-[220px]">{inquiry.email}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-zinc-200">
                  <div className="max-w-[240px] truncate">{inquiry.service}</div>
                </td>
                <td className="px-4 py-3 text-zinc-400">{formatDate(inquiry.createdAt)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={inquiry.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InquiryDrawer({
  open,
  inquiry,
  onClose,
  onStatusChange,
}: {
  open: boolean;
  inquiry: Inquiry | null;
  onClose: () => void;
  onStatusChange: (id: string, status: InquiryStatus) => Promise<void>;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || !inquiry) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close inquiry drawer"
      />
      <div className="absolute inset-y-0 right-0 w-full max-w-[560px] p-3 sm:p-4">
        <div className="h-full overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f0f] shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
          <div className="h-full overflow-y-auto p-3 sm:p-4">
            <InquiryDetail inquiry={inquiry} onCloseMobile={onClose} onStatusChange={onStatusChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<InquiryStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const counts = useMemo(
    () =>
      ALL_STATUSES.reduce(
        (accumulator, status) => {
          accumulator[status] = inquiries.filter((inquiry) => inquiry.status === status).length;
          return accumulator;
        },
        {} as Record<InquiryStatus, number>,
      ),
    [inquiries],
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const statusFiltered =
      filter === "all" ? inquiries : inquiries.filter((inquiry) => inquiry.status === filter);
    if (!normalized) return statusFiltered;
    return statusFiltered.filter((inquiry) => {
      const haystack = [
        inquiry.name,
        inquiry.email,
        inquiry.phone,
        inquiry.service,
        inquiry.material ?? "",
        inquiry.quantity ?? "",
        inquiry.message ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [filter, inquiries, query]);

  const selected = useMemo(
    () => filtered.find((inquiry) => inquiry.id === selectedId) ?? filtered[0] ?? null,
    [filtered, selectedId],
  );

  useEffect(() => {
    if (!selected && filtered.length === 0) setSelectedId(null);
  }, [filtered, selected]);

  return (
    <div className="w-full p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Inquiries</h1>
          <p className="mt-0.5 text-sm text-zinc-500">
            {inquiries.length} total submissions
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:items-center">
          <div className="relative w-full sm:w-[340px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, phone, email, service..."
              className="h-10 w-full rounded-xl border border-white/8 bg-[#141414] pl-9 pr-9 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-[#AC3C3C]/40 focus:ring-2 focus:ring-[#AC3C3C]/15"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => void load()}
            disabled={!configured || loading}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:bg-white/10 disabled:cursor-default disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
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
        <>
          <div className="hidden md:block">
            <InquiriesTable
              inquiries={filtered}
              onOpen={(inquiry) => {
                setSelectedId(inquiry.id);
                setDrawerOpen(true);
              }}
            />
          </div>

          <div className="space-y-3 md:hidden">
            {filtered.map((inquiry) => (
              <MobileInquiryRow
                key={inquiry.id}
                inquiry={inquiry}
                onOpen={() => {
                  setSelectedId(inquiry.id);
                  setDrawerOpen(true);
                }}
              />
            ))}
          </div>

          <InquiryDrawer
            open={drawerOpen}
            inquiry={selected}
            onClose={() => setDrawerOpen(false)}
            onStatusChange={handleStatusChange}
          />
        </>
      )}
    </div>
  );
}
