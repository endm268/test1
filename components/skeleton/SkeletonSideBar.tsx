"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { navLinks } from "@/constants";

const SkeletonSideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        {/* Sidebar toggle button */}
        <div className="sidebar-toggle">
          <Skeleton className="h-[125px] w-full rounded-xl" />
        </div>

        {/* Sidebar content */}
        <div className="sidebar-expanded mt-8">
          {/* Navigation */}
          <nav className="flex flex-col overflow-auto lg:flex">
            <ul className="flex w-full flex-col items-start gap-2 md:flex">
              {navLinks.map((link) => {
                return (
                  <Skeleton
                    key={link.id} // Adding a unique key prop
                    className="h-[25px] w-[250px] rounded-xl"
                  />
                );
              })}
            </ul>
          </nav>
        </div>

        <Skeleton className="h-[25px] rounded-xl mt-4" />
      </div>
    </div>
  );
};

export default SkeletonSideBar;
