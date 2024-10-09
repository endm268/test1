// app/layout.tsx or wherever your layout component is located
import { cookies } from "next/headers";
import MobileNav from "@/components/shared/mobileNav";
import Sidebar from "@/components/shared/sidebar";
import Header from "@/components/shared/header";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";

import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session");


  if (!sessionCookie) {
    redirect("/login"); 
  }

  let role: string | null = null;
  try {
    const sessionData = JSON.parse(sessionCookie?.value || "{}");
    role = sessionData.role;
  } catch (error) {
    console.error("Error parsing session data", error);
    redirect("/login"); 
  }


  if (!role) {
    redirect("/login");
  }

  // Layout rendering
  return (
    <main className="root">
      <Sidebar role={role} />
      <MobileNav />
      <div className="root-container">
        <Header />
        <Separator className="my-4 hidden lg:flex" />
        <div className="wrapper my-8">{children}</div>
      </div>
      <Toaster />
    </main>
  );
}
