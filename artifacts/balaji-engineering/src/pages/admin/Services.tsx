import AdminLayout from "./Layout";
import { Link } from "wouter";
import { Settings, ExternalLink, Download, CheckCircle2 } from "lucide-react";
import servicesJson from "@/lib/seed/services.json";

const services = servicesJson;

export default function AdminServices() {
  const handleDownloadSeed = () => {
    const blob = new Blob([JSON.stringify(servicesJson, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "services-seed.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Services</h1>
            <p className="text-zinc-500 text-sm mt-0.5">{services.length} services · read-only preview</p>
          </div>
          <button
            onClick={handleDownloadSeed}
            className="flex items-center gap-2 px-4 py-2 bg-[#AC3C3C]/10 hover:bg-[#AC3C3C]/20 border border-[#AC3C3C]/30 text-[#e05555] text-sm font-semibold rounded-xl transition-all"
          >
            <Download className="w-4 h-4" />
            Download Seed JSON
          </button>
        </div>

        <div className="bg-[#1a1a1a] border border-white/6 rounded-xl p-4 mb-5 text-sm text-zinc-400">
          <p>
            Services are currently stored in code. Download the seed JSON and upload to Firestore
            to enable full editing from this panel once Firebase is connected.
          </p>
        </div>

        <div className="space-y-3">
          {services.map((svc) => (
            <div key={svc.id} className="bg-[#1a1a1a] border border-white/6 rounded-xl p-4 hover:border-white/12 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-zinc-800">
                  <img src={svc.image} alt={svc.title} className="w-full h-full object-cover opacity-70" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-white font-semibold text-sm">{svc.title}</h3>
                  </div>
                  <p className="text-[#e05555] text-xs font-medium mb-1.5">{svc.tagline}</p>
                  <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 mb-2">{svc.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {svc.features.map((f) => (
                      <span key={f} className="inline-flex items-center gap-1 text-[10px] text-zinc-400 bg-white/4 border border-white/6 rounded-full px-2 py-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#AC3C3C]" />{f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 space-y-2">
                  {svc.specs.map((spec) => (
                    <div key={spec.label} className="text-right">
                      <div className="text-[10px] text-zinc-600 uppercase tracking-wider">{spec.label}</div>
                      <div className="text-xs text-white font-semibold">{spec.value}</div>
                    </div>
                  ))}
                  <a
                    href={`/services#${svc.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-end gap-1 text-xs text-zinc-500 hover:text-white transition-colors mt-1"
                  >
                    <ExternalLink className="w-3 h-3" /> Preview
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
