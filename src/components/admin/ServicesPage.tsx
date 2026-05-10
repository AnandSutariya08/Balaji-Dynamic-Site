"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Settings,
  Trash2,
} from "lucide-react";
import { ServiceForm } from "./ServiceForm";
import { getServices, deleteService } from "@/lib/firestore/services";
import { isFirebaseConfigured } from "@/lib/firebase";
import { triggerCacheRefresh } from "@/lib/apiCache";
import type { Service } from "@/lib/firestore/types";

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const configured = isFirebaseConfigured();

  const load = async () => {
    if (!configured) return;
    setLoading(true);
    setError("");
    try {
      const data = await getServices();
      setServices(data);
    } catch (error_) {
      const message = error_ instanceof Error ? error_.message : "Failed to load services.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteService(id);
      setServices((current) => current.filter((service) => service.id !== id));
      await triggerCacheRefresh();
    } catch (error_) {
      const message = error_ instanceof Error ? error_.message : "Failed to delete.";
      setError(message);
    } finally {
      setDeleting(null);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  const handleSaved = async () => {
    await load();
    await triggerCacheRefresh();
  };

  return (
    <>
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Services</h1>
            <p className="mt-0.5 text-sm text-zinc-500">{services.length} services in Firestore</p>
          </div>
          <div className="flex items-center gap-2">
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
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 rounded-xl bg-[#AC3C3C] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#c44040]"
            >
              <Plus className="h-4 w-4" />
              New Service
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
                variables to load and manage services from Firestore.
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

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-24 text-zinc-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading from Firestore...
          </div>
        ) : services.length === 0 && configured ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Settings className="mb-3 h-10 w-10 text-zinc-700" />
            <p className="font-medium text-zinc-500">No services yet</p>
            <p className="mb-4 mt-1 text-sm text-zinc-600">
              Add your first service or seed from your existing content.
            </p>
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 rounded-xl border border-[#AC3C3C]/30 bg-[#AC3C3C]/10 px-4 py-2 text-sm font-semibold text-[#e05555] transition-all hover:bg-[#AC3C3C]/20"
            >
              <Plus className="h-4 w-4" />
              Add First Service
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="group rounded-xl border border-white/6 bg-[#1a1a1a] p-4 transition-colors hover:border-white/12"
              >
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                    {service.image && (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover opacity-70"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-0.5 text-sm font-semibold text-white">{service.title}</h3>
                    <p className="mb-1.5 text-xs font-medium text-[#e05555]">{service.tagline}</p>
                    <p className="mb-2 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.features.slice(0, 4).map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1 rounded-full border border-white/6 bg-white/4 px-2 py-0.5 text-[10px] text-zinc-400"
                        >
                          <CheckCircle2 className="h-2.5 w-2.5 text-[#AC3C3C]" />
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 4 && (
                        <span className="text-[10px] text-zinc-600">
                          +{service.features.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <a
                      href="/services"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg p-2 text-zinc-500 transition-all hover:bg-white/5 hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(service);
                        setShowForm(true);
                      }}
                      className="rounded-lg p-2 text-zinc-500 transition-all hover:bg-white/5 hover:text-white"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(service.id, service.title)}
                      disabled={deleting === service.id}
                      className="rounded-lg p-2 text-zinc-500 transition-all hover:bg-red-400/5 hover:text-red-400 disabled:opacity-50"
                    >
                      {deleting === service.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                {service.specs.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-4 border-t border-white/6 pt-3">
                    {service.specs.map((spec) => (
                      <div key={spec.label}>
                        <div className="text-[10px] uppercase tracking-wider text-zinc-600">
                          {spec.label}
                        </div>
                        <div className="text-xs font-semibold text-white">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <ServiceForm service={editing} onClose={closeForm} onSaved={() => void handleSaved()} />
      )}
    </>
  );
}
