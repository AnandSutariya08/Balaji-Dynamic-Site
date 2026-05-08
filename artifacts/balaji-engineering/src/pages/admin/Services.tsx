import { useState, useEffect } from "react";
import AdminLayout from "./Layout";
import ServiceForm from "./ServiceForm";
import { getServices, deleteService } from "@/lib/firestore/services";
import { isFirebaseConfigured } from "@/lib/firebase";
import { triggerCacheRefresh } from "@/lib/apiCache";
import type { Service } from "@/lib/firestore/types";
import {
  Settings, Plus, Pencil, Trash2, ExternalLink,
  CheckCircle2, RefreshCw, AlertCircle, Loader2
} from "lucide-react";

export default function AdminServices() {
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
    } catch (e: any) {
      setError(e.message || "Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteService(id);
      setServices((s) => s.filter((svc) => svc.id !== id));
      triggerCacheRefresh();
    } catch (e: any) {
      setError(e.message || "Failed to delete.");
    } finally {
      setDeleting(null);
    }
  };

  const openEdit = (svc: Service) => { setEditing(svc); setShowForm(true); };
  const openAdd = () => { setEditing(null); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };
  const handleSaved = () => { load(); triggerCacheRefresh(); };

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Services</h1>
            <p className="text-zinc-500 text-sm mt-0.5">{services.length} services in Firestore</p>
          </div>
          <div className="flex items-center gap-2">
            {configured && (
              <button onClick={load} disabled={loading} className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm transition-colors disabled:opacity-50">
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
              </button>
            )}
            <button
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#AC3C3C] hover:bg-[#c44040] text-white text-sm font-bold rounded-xl transition-all"
            >
              <Plus className="w-4 h-4" /> New Service
            </button>
          </div>
        </div>

        {!configured && (
          <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/25 rounded-xl p-4 mb-5 text-amber-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Firebase not configured</p>
              <p className="text-amber-400/80 mt-0.5">Add your <code className="font-mono bg-black/30 px-1 rounded">VITE_FIREBASE_*</code> secrets to load and manage services from Firestore.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-xl p-4 mb-5 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />{error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24 text-zinc-500 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading from Firestore...
          </div>
        ) : services.length === 0 && configured ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Settings className="w-10 h-10 text-zinc-700 mb-3" />
            <p className="text-zinc-500 font-medium">No services yet</p>
            <p className="text-zinc-600 text-sm mt-1 mb-4">Add your first service or seed from the JSON file you downloaded.</p>
            <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-[#AC3C3C]/10 border border-[#AC3C3C]/30 text-[#e05555] text-sm font-semibold rounded-xl hover:bg-[#AC3C3C]/20 transition-all">
              <Plus className="w-4 h-4" /> Add First Service
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((svc) => (
              <div key={svc.id} className="bg-[#1a1a1a] border border-white/6 rounded-xl p-4 hover:border-white/12 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-zinc-800">
                    {svc.image && <img src={svc.image} alt={svc.title} className="w-full h-full object-cover opacity-70" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm mb-0.5">{svc.title}</h3>
                    <p className="text-[#e05555] text-xs font-medium mb-1.5">{svc.tagline}</p>
                    <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 mb-2">{svc.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {svc.features.slice(0, 4).map((f) => (
                        <span key={f} className="inline-flex items-center gap-1 text-[10px] text-zinc-400 bg-white/4 border border-white/6 rounded-full px-2 py-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5 text-[#AC3C3C]" />{f}
                        </span>
                      ))}
                      {svc.features.length > 4 && <span className="text-[10px] text-zinc-600">+{svc.features.length - 4} more</span>}
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href="/services" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button onClick={() => openEdit(svc)} className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(svc.id, svc.title)}
                      disabled={deleting === svc.id}
                      className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all disabled:opacity-50"
                    >
                      {deleting === svc.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {svc.specs.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/6 flex flex-wrap gap-4">
                    {svc.specs.map((spec) => (
                      <div key={spec.label}>
                        <div className="text-[10px] text-zinc-600 uppercase tracking-wider">{spec.label}</div>
                        <div className="text-xs text-white font-semibold">{spec.value}</div>
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
        <ServiceForm
          service={editing}
          onClose={closeForm}
          onSaved={handleSaved}
        />
      )}
    </AdminLayout>
  );
}
