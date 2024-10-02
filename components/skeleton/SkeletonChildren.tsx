"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";
const SkeletonChildren = () => {
  return (
    <div className="hidden lg:flex justify-between items-center mb-4">
      <Skeleton className="h-full w-full rounded-xl" />
    </div>
  );
};

export default SkeletonChildren;
