import { redirect } from "next/navigation";
import { LoginPage } from "@/components/admin/LoginPage";
import { isAdminAuthenticated } from "@/lib/auth";

export default async function Page() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/inquiries");
  }

  return <LoginPage />;
}
