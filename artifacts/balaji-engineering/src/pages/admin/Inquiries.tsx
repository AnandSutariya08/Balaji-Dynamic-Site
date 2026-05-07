import { useState, useEffect } from "react";
import AdminLayout from "./Layout";
import { getInquiries, updateInquiryStatus } from "@/lib/firestore/inquiries";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { Inquiry, InquiryStatus } from "@/lib/firestore/types";
import { MessageSquare, Phone, Mail, ChevronDown, Inbox, RefreshCw, AlertCircle, Loader2 } from "lucide-react";

const ALL_STATUSES: InquiryStatus[] = ["new", "in-progress", "replied", "closed"];

const STATUS_LABELS: Record<InquiryStatus, string> = {
  "new": "New",
  "in-progress": "In Progress",
  "replied": "Replied",
  "closed": "Closed",
};

const STATUS_COLORS: Record<InquiryStatus, string> = {
  "new": "bg-red-500/10 text-red-400 border-red-500/25",
  "in-progress": "bg-yellow-500/10 text-yellow-400 border-yellow-500/25",
  "replied": "bg-blue-500/10 text-blue-400 border-blue-500/25",
  "closed": "bg-zinc-500/10 text-zinc-400 border-zinc-500/25",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: InquiryStatus }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${STATUS_COLORS[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

function InquiryCard({ inquiry, onStatusChange }: { inquiry: Inquiry; onStatusChange: (id: string, s: InquiryStatus) => void }) {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleStatus = async (status: InquiryStatus) => {
    setUpdating(true);
    await onStatusChange(inquiry.id, status);
    setUpdating(false);
  };

  return (
    <div className={`bg-[#1a1a1a] border rounded-xl overflow-hidden transition-all ${inquiry.status === "new" ? "border-[#AC3C3C]/30" : "border-white/6"}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/3 transition-colors"
      >
        <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
          <MessageSquare className="w-4 h-4 text-zinc-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="text-white font-semibold text-sm truncate">{inquiry.name}</span>
            <StatusBadge status={inquiry.status} />
          </div>
          <div className="text-zinc-500 text-xs truncate">{inquiry.service} · {formatDate(inquiry.createdAt)}</div>
        </div>
        <ChevronDown className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="border-t border-white/6 p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Phone</div>
              <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1.5 text-sm text-white hover:text-[#e05555] transition-colors">
                <Phone className="w-3.5 h-3.5" />{inquiry.phone}
              </a>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Email</div>
              <a href={`mailto:${inquiry.email}`} className="flex items-center gap-1.5 text-sm text-white hover:text-[#e05555] transition-colors truncate">
                <Mail className="w-3.5 h-3.5 shrink-0" />{inquiry.email}
              </a>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Service</div>
              <div className="text-sm text-white">{inquiry.service}</div>
            </div>
          </div>

          {(inquiry.quantity || inquiry.material) && (
            <div className="grid grid-cols-2 gap-3">
              {inquiry.quantity && (
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Quantity</div>
                  <div className="text-sm text-white">{inquiry.quantity}</div>
                </div>
              )}
              {inquiry.material && (
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Material</div>
                  <div className="text-sm text-white">{inquiry.material}</div>
                </div>
              )}
            </div>
          )}

          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Project Details</div>
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>
          </div>

          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Update Status:</span>
            {ALL_STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => handleStatus(s)}
                disabled={inquiry.status === s || updating}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all disabled:opacity-40 disabled:cursor-default ${
                  inquiry.status === s ? STATUS_COLORS[s] : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
            {updating && <Loader2 className="w-3.5 h-3.5 text-zinc-500 animate-spin" />}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminInquiries() {
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
    } catch (e: any) {
      setError(e.message || "Failed to load inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id: string, status: InquiryStatus) => {
    await updateInquiryStatus(id, status);
    setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, status } : i));
  };

  const filtered = filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);
  const counts = ALL_STATUSES.reduce((acc, s) => { acc[s] = inquiries.filter((i) => i.status === s).length; return acc; }, {} as Record<InquiryStatus, number>);

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Inquiries</h1>
            <p className="text-zinc-500 text-sm mt-0.5">{inquiries.length} total submissions</p>
          </div>
          {configured && (
            <button onClick={load} disabled={loading} className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm transition-colors disabled:opacity-50">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
          )}
        </div>

        {!configured && (
          <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/25 rounded-xl p-4 mb-5 text-amber-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Firebase not configured</p>
              <p className="text-amber-400/80 mt-0.5">Add your <code className="font-mono bg-black/30 px-1 rounded">VITE_FIREBASE_*</code> secrets — inquiries submitted through the contact form will appear here automatically.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-xl p-4 mb-5 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />{error}
          </div>
        )}

        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {([["all", "All"] as const, ...ALL_STATUSES.map(s => [s, STATUS_LABELS[s]] as const)]).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                filter === val ? "bg-[#AC3C3C] border-[#AC3C3C] text-white" : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {label}
              <span className="ml-1.5 opacity-60">
                {val === "all" ? inquiries.length : counts[val as InquiryStatus]}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24 text-zinc-500 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading from Firestore...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Inbox className="w-10 h-10 text-zinc-700 mb-3" />
            <p className="text-zinc-500 font-medium">No inquiries yet</p>
            <p className="text-zinc-600 text-sm mt-1">Submissions from the contact form will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((inq) => (
              <InquiryCard key={inq.id} inquiry={inq} onStatusChange={handleStatusChange} />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
