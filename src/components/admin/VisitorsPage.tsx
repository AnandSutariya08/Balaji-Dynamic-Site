"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Filter,
  Globe,
  Loader2,
  Monitor,
  RefreshCw,
  Smartphone,
  Tablet,
  Trash2,
} from "lucide-react";
import {
  deleteVisitor,
  getVisitors,
  type VisitorRecord,
} from "@/lib/firestore/visitors";
import { isFirebaseConfigured } from "@/lib/firebase";

function DeviceIcon({ device }: { device: string }) {
  if (device === "Mobile")
    return <Smartphone className="h-3.5 w-3.5 text-blue-400" />;
  if (device === "Tablet")
    return <Tablet className="h-3.5 w-3.5 text-purple-400" />;
  return <Monitor className="h-3.5 w-3.5 text-zinc-400" />;
}

function formatDateTime(ts: string): string {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(ts));
  } catch {
    return ts;
  }
}

export function VisitorsPage() {
  const [visitors, setVisitors] = useState<VisitorRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setError("Firebase not configured.");
      setLoading(false);
      return;
    }
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await getVisitors();
      setVisitors(data);
    } catch {
      setError("Failed to load visitors. Check Firestore rules.");
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    return visitors.filter((v) => {
      if (fromDate && v.date < fromDate) return false;
      if (toDate && v.date > toDate) return false;
      return true;
    });
  }, [visitors, fromDate, toDate]);

  async function handleDelete(id: string) {
    setDeleting(id);
    try {
      await deleteVisitor(id);
      setVisitors((prev) => prev.filter((v) => v.id !== id));
    } catch {
      setError("Failed to delete record.");
    } finally {
      setDeleting(null);
    }
  }

  const hasFilter = Boolean(fromDate || toDate);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Website Visitors</h1>
          <p className="mt-1 text-xs text-zinc-500">
            {loading
              ? "Loading…"
              : `${filtered.length} record${filtered.length !== 1 ? "s" : ""}${hasFilter ? " (filtered)" : ""} · ${visitors.length} total`}
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:bg-white/10 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Date filter */}
      <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-white/8 bg-[#141414] p-4">
        <Filter className="h-4 w-4 shrink-0 text-zinc-500" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          Filter by date
        </span>
        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-400">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="rounded-lg border border-white/10 bg-[#0f0f0f] px-3 py-1.5 text-xs text-white outline-none focus:border-[#AC3C3C]/60"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-400">To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="rounded-lg border border-white/10 bg-[#0f0f0f] px-3 py-1.5 text-xs text-white outline-none focus:border-[#AC3C3C]/60"
          />
        </div>
        {hasFilter && (
          <button
            type="button"
            onClick={() => {
              setFromDate("");
              setToDate("");
            }}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/10"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-600" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Globe className="mb-3 h-10 w-10 text-zinc-700" />
          <div className="text-sm font-bold text-zinc-500">No visitor records</div>
          <div className="mt-1 text-xs text-zinc-600">
            {hasFilter
              ? "No records match the selected date range."
              : "Records appear here after visitors grant permission on the site."}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/8">
          <table className="w-full min-w-[900px] text-xs">
            <thead>
              <tr className="border-b border-white/8 bg-[#141414]">
                {[
                  "Date & Time",
                  "Site",
                  "Page",
                  "IP Address",
                  "Location",
                  "Browser",
                  "OS",
                  "Device",
                  "Language",
                  "Screen",
                  "ISP",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="whitespace-nowrap px-3 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr
                  key={v.id}
                  className={`border-b border-white/5 transition-colors hover:bg-white/[0.03] ${
                    i % 2 === 0 ? "bg-[#0f0f0f]" : "bg-[#111111]"
                  }`}
                >
                  <td className="whitespace-nowrap px-3 py-3 text-zinc-300">
                    {formatDateTime(v.timestamp)}
                  </td>
                  <td className="max-w-[100px] truncate px-3 py-3 text-zinc-400" title={v.site}>
                    {v.site || "—"}
                  </td>
                  <td className="max-w-[120px] truncate px-3 py-3 text-zinc-400" title={v.url}>
                    {v.url || "/"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-zinc-300">
                    {v.ip || "—"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-zinc-300">
                    {[v.city, v.region, v.country].filter(Boolean).join(", ") || "—"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-zinc-300">
                    {v.browser || "—"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-zinc-300">
                    {v.os || "—"}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      <DeviceIcon device={v.device} />
                      <span className="text-zinc-300">{v.device || "—"}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-zinc-400">
                    {v.language || "—"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-zinc-500">
                    {v.screenW && v.screenH ? `${v.screenW}×${v.screenH}` : "—"}
                  </td>
                  <td className="max-w-[130px] truncate px-3 py-3 text-zinc-500" title={v.isp}>
                    {v.isp || "—"}
                  </td>
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      onClick={() => handleDelete(v.id)}
                      disabled={deleting === v.id}
                      title="Delete record"
                      className="rounded-lg p-1.5 text-zinc-600 transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-40"
                    >
                      {deleting === v.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
