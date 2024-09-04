"use client";
import React from "react";
import MobileNav from "@/components/shared/mobileNav";
import Sidebar from "@/components/shared/sidebar";
import Header from "@/components/shared/header";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";

const layout = ({ children }: { children: React.ReactNode }) => {
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

export default layout;
