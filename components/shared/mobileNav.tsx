"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Separator } from "../ui/separator";
import { ModeToggle } from "../ModeToggle";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <header className="header ">
      {/* Logo text */}
      <Link href="/">
        <h1 className="text-2xl font-cairo dark:text-black">
          نظام ادارة الاصول
        </h1>
      </Link>
      {/* Mode Toggle Button */}
      <div className="flex-between gap-5">
        <ModeToggle />
        {/* Menu Toggle Button */}
        <Sheet>
          <SheetTrigger asChild>
            <button aria-label="Open Menu">
              <Menu className="h-6 w-6 text-gray-800" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-64 bg-white">
            <SheetHeader className="mt-4 flex justify-start items-center">
              <SheetTitle className="font-cairo">نظام ادارة الاصول</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <Separator className="my-2" />
            <div>
              <nav>
                <ul className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = link.route === pathname;
                    const IconComponent = link.icon;

                    return (
                      <li key={link.route} className="w-full">
                        <Link
                          href={link.route}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                            isActive
                              ? "bg-gray-800 text-white"
                              : "text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <IconComponent className="h-5 w-5" />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default MobileNav;
