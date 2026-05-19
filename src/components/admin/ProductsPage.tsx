"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  Boxes,
  ExternalLink,
  Loader2,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { ProductForm } from "./ProductForm";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { deleteProduct } from "@/lib/firestore/products";
import type { Product } from "@/lib/firestore/types";

function mapDoc(id: string, data: Record<string, unknown>): Product {
  return {
    id,
    title: String(data.title ?? ""),
    tagline: String(data.tagline ?? ""),
    description: String(data.description ?? ""),
    image: String(data.image ?? ""),
    features: Array.isArray(data.features) ? data.features.map(String) : [],
    specs: Array.isArray(data.specs)
      ? data.specs
          .map((item) => {
            if (!item || typeof item !== "object") return null;
            const spec = item as Record<string, unknown>;
            const label = String(spec.label ?? "").trim();
            const value = String(spec.value ?? "").trim();
            if (!label || !value) return null;
            return { label, value };
          })
          .filter(Boolean) as Product["specs"]
      : [],
    applications: Array.isArray(data.applications)
      ? data.applications.map(String)
      : [],
    process: Array.isArray(data.process) ? data.process.map(String) : [],
    faqs: Array.isArray(data.faqs)
      ? data.faqs
          .map((item) => {
            if (!item || typeof item !== "object") return null;
            const faq = item as Record<string, unknown>;
            const question = String(faq.question ?? "").trim();
            const answer = String(faq.answer ?? "").trim();
            if (!question || !answer) return null;
            return { question, answer };
          })
          .filter(Boolean) as Product["faqs"]
      : [],
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    metaTitle: String(data.metaTitle ?? ""),
    metaDescription: String(data.metaDescription ?? ""),
    createdAt:
      typeof data.createdAt === "string"
        ? data.createdAt
        : (data.createdAt as { toDate?: () => Date } | undefined)?.toDate?.().toISOString(),
    updatedAt:
      typeof data.updatedAt === "string"
        ? data.updatedAt
        : (data.updatedAt as { toDate?: () => Date } | undefined)?.toDate?.().toISOString(),
  };
}

export function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const configured = isFirebaseConfigured();

  useEffect(() => {
    if (!configured) return;
    setLoading(true);
    setError("");

    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const nextProducts = snap.docs.map((docSnap) =>
          mapDoc(docSnap.id, docSnap.data() as Record<string, unknown>),
        );
        setProducts(nextProducts);
        setLoading(false);
      },
      (err) => {
        setError(err.message || "Failed to load products.");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [configured]);

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;

    setDeleting(id);
    try {
      await deleteProduct(id);
    } catch (error_) {
      const message =
        error_ instanceof Error ? error_.message : "Failed to delete product.";
      setError(message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      <div className="w-full p-4 md:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-white">Products</h1>
            <p className="mt-0.5 text-sm text-zinc-500">
              {products.length} product records in Firestore
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-[#AC3C3C] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#c44040]"
          >
            <Plus className="h-4 w-4" />
            New Product
          </button>
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
                variables to manage products from admin.
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
        ) : products.length === 0 && configured ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Boxes className="mb-3 h-10 w-10 text-zinc-700" />
            <p className="font-medium text-zinc-500">No products yet</p>
            <p className="mb-4 mt-1 text-sm text-zinc-600">
              Add your first product directly in Firebase from admin.
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
              Add First Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-2xl border border-white/6 bg-[#1a1a1a] transition-colors hover:border-white/12"
              >
                <div className="relative aspect-[16/10] w-full bg-zinc-900">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover opacity-75"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-800" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-xl border border-white/10 bg-black/50 p-1.5 backdrop-blur transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                  <a
                    href={`/products/${product.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg p-2 text-zinc-200 transition-all hover:bg-white/10"
                    aria-label="Open product"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(product);
                      setShowForm(true);
                    }}
                    className="rounded-lg p-2 text-zinc-200 transition-all hover:bg-white/10"
                    aria-label="Edit product"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(product.id, product.title)}
                    disabled={deleting === product.id}
                    className="rounded-lg p-2 text-zinc-200 transition-all hover:bg-red-400/15 hover:text-red-300 disabled:opacity-50"
                    aria-label="Delete product"
                  >
                    {deleting === product.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="space-y-3 p-4">
                  <div>
                    <div className="truncate text-sm font-semibold text-white">
                      {product.title}
                    </div>
                    <div className="mt-1 truncate font-mono text-[11px] text-zinc-500">
                      /products/{product.id}
                    </div>
                  </div>

                  <p className="line-clamp-2 text-xs leading-relaxed text-zinc-500">
                    {product.tagline}
                  </p>

                  <div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                      {product.specs.length} Specs
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                      {product.features.length} Features
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                      {product.faqs.length} FAQs
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <ProductForm product={editing} onClose={closeForm} onSaved={() => undefined} />
      )}
    </>
  );
}
