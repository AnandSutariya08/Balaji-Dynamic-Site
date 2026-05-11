"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/admin/DashboardShell";

const ADMIN_SESSION_KEY = "balaji_admin_authed";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const authed = window.localStorage.getItem(ADMIN_SESSION_KEY) === "1";
    if (!authed) {
      router.replace("/admin");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return null;

  return <DashboardShell>{children}</DashboardShell>;
}
