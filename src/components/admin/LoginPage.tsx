"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, EyeOff, Lock, User } from "lucide-react";

export function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        setError(data.message || "Invalid username or password.");
        return;
      }

      router.push("/admin/inquiries");
      router.refresh();
    } catch {
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#AC3C3C]">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Admin Panel</h1>
          <p className="mt-1 text-sm text-zinc-500">Balaji Engineering Works</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/8 bg-[#1a1a1a] p-6"
        >
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2.5 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                placeholder="admin"
                className="w-full rounded-xl border border-white/10 bg-[#111] py-3 pl-9 pr-4 text-sm text-white transition-colors placeholder:text-zinc-600 focus:border-[#AC3C3C] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                placeholder="Enter your password"
                className="w-full rounded-xl border border-white/10 bg-[#111] py-3 pl-9 pr-11 text-sm text-white transition-colors placeholder:text-zinc-600 focus:border-[#AC3C3C] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-[#AC3C3C] py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#c44040] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-600">
          Secure admin access for Balaji Engineering Works
        </p>
      </div>
    </div>
  );
}
