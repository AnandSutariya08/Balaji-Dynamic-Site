"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Pencil, Trash2, Megaphone, Eye, EyeOff, RefreshCw } from "lucide-react";
import {
  getAds,
  deleteAd,
  updateAd,
  type Ad,
} from "@/lib/firestore/ads";
import { AdForm } from "./AdForm";

function TypeBadge({ type }: { type: Ad["type"] }) {
  const map = {
    full: { label: "Full", cls: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    image: { label: "Image", cls: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    text: { label: "Text", cls: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  };
  const { label, cls } = map[type] ?? map.full;
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${cls}`}>
      {label}
    </span>
  );
}

export function AdsPage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editAd, setEditAd] = useState<Ad | null>(null);

  async function load() {
    setLoading(true);
    try {
      setAds(await getAds());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleToggle(ad: Ad) {
    setToggling(ad.id);
    try {
      await updateAd(ad.id, { active: !ad.active });
      setAds((prev) =>
        prev.map((a) => (a.id === ad.id ? { ...a, active: !a.active } : a)),
      );
    } finally {
      setToggling(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this ad?")) return;
    setDeleting(id);
    try {
      await deleteAd(id);
      setAds((prev) => prev.filter((a) => a.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  function openCreate() {
    setEditAd(null);
    setFormOpen(true);
  }

  function openEdit(ad: Ad) {
    setEditAd(ad);
    setFormOpen(true);
  }

  function handleSaved() {
    setFormOpen(false);
    load();
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Ads</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage popup ads shown to site visitors
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:bg-white/10 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-[#AC3C3C] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#c44040]"
          >
            <Plus className="h-3.5 w-3.5" />
            New Ad
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-600" />
        </div>
      ) : ads.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 py-20 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
            <Megaphone className="h-6 w-6 text-zinc-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-400">No ads yet</p>
            <p className="mt-1 text-xs text-zinc-600">
              Create your first ad to start showing it to visitors.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="mt-1 flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-300 hover:bg-white/10"
          >
            <Plus className="h-3.5 w-3.5" />
            Create Ad
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className={`flex items-center gap-4 rounded-2xl border p-4 transition-colors ${
                ad.active
                  ? "border-white/8 bg-[#141414]"
                  : "border-white/5 bg-[#0f0f0f] opacity-60"
              }`}
            >
              {/* Thumbnail */}
              <div className="h-14 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-800 border border-white/8">
                {ad.image ? (
                  <img
                    src={ad.image}
                    alt={ad.title || "Ad"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Megaphone className="h-5 w-5 text-zinc-600" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-white truncate">
                    {ad.title || <span className="italic text-zinc-500">No title</span>}
                  </span>
                  <TypeBadge type={ad.type} />
                </div>
                {ad.description && (
                  <p className="mt-0.5 text-xs text-zinc-500 truncate max-w-xs">
                    {ad.description}
                  </p>
                )}
                <div className="mt-1 flex items-center gap-3 text-[10px] text-zinc-600">
                  <span>{ad.duration}s duration</span>
                  {ad.link && <span className="truncate max-w-[180px]">{ad.link}</span>}
                </div>
              </div>

              {/* Status badge */}
              <div className="shrink-0">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${
                    ad.active
                      ? "border-green-500/20 bg-green-500/10 text-green-400"
                      : "border-white/8 bg-white/5 text-zinc-500"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${ad.active ? "bg-green-400" : "bg-zinc-600"}`} />
                  {ad.active ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleToggle(ad)}
                  disabled={toggling === ad.id}
                  title={ad.active ? "Deactivate" : "Activate"}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white disabled:opacity-50"
                >
                  {toggling === ad.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : ad.active ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => openEdit(ad)}
                  title="Edit"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(ad.id)}
                  disabled={deleting === ad.id}
                  title="Delete"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                >
                  {deleting === ad.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form modal */}
      {formOpen && (
        <AdForm
          ad={editAd}
          onClose={() => setFormOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
