"use client";
import React, { useEffect, useState } from "react";
import MobileNav from "@/components/shared/mobileNav";
import Sidebar from "@/components/shared/sidebar";
import Header from "@/components/shared/header";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import SkeletonSideBar from "@/components/skeleton/SkeletonSideBar"; // Import the skeleton
import SkeletonHeader from "@/components/skeleton/SkeletonHeader";
import SkeletonChildren from "@/components/skeleton/SkeletonChildren";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any>(null); // Define session as 'any'
  const [loading, setLoading] = useState(true); // Add a loading state
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/getSession", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.isLoggedIn) {
          setSession(data);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
        router.push("/login");
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };

    fetchSession();
  }, [router]);

  if (loading) {
    return (
      <main className="root">
        <SkeletonSideBar />
        <MobileNav />
        <div className="root-container">
          <SkeletonHeader />
          <Separator className="my-4 hidden lg:flex" />
          <SkeletonChildren />
        </div>
        <Toaster />
      </main>
    );
  }

  return (
    <main className="root">
      <Sidebar role={session.role}/>
      <MobileNav />
      <div className="root-container">
        <Header />
        <Separator className="my-4 hidden lg:flex" />
        <div className="wrapper">{children}</div>
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
