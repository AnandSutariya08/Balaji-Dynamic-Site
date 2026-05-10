import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/admin/DashboardShell";
import { isAdminAuthenticated } from "@/lib/auth";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  return <DashboardShell>{children}</DashboardShell>;
}
