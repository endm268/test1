"use client";
import React from "react";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <div className="hidden lg:flex justify-between items-center mb-4">
      <div>
        <h1 className="text-2xl font-cairo">نظام ادارة الاصول</h1>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
