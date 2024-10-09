"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";
const SkeletonHeader = () => {
  return (
    <div className="hidden lg:flex justify-between items-center mb-4">
      <div>
        <Skeleton className="h-10 w-40 rounded-xl" />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-8 rounded-xl" />
      </div>
    </div>
  );
};

export default SkeletonHeader;
