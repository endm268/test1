"use client";
import React, { useEffect, useState } from "react";
import MobileNav from "@/components/shared/mobileNav";
import Sidebar from "@/components/shared/sidebar";
import Header from "@/components/shared/header";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState(null);
  const router = useRouter();

  // Fetch the session on the client side
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/getSession", {
          credentials: "include",
        });
        const data = await res.json();

        // Check if session exists and user is logged in
        console.log(data.isLoggedIn); // Ensure correct casing
        if (data.isLoggedIn === true) {
          // Access with correct case
          setSession(data);
        } else {
          // Redirect to login if session is invalid or user is not logged in
          router.push("/login");
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
        router.push("/login");
      }
    };

    fetchSession();
  }, [router]);

  // Render loading state or main layout based on session
  // if (!session) {
  //   return <div>Loading...</div>; // Optionally show a loading state
  // }

  return (
    <main className="root">
      <Sidebar />
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
