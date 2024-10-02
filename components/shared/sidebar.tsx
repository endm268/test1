"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// icons
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LogoutButton from "./LogoutButton";
import { navLinks } from "@/constants";
import { useState } from "react";


interface SidebarProps {
  role: string;
}

// Sidebar component
const Sidebar = ({ role }: SidebarProps) => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const pathname = usePathname();


  return (
    <div className="sidebar">
      <div className="sidebar-container">
        {/* Sidebar toggle button */}
        <div className="sidebar-toggle">
          <Button
            onClick={() => {
              setCollapse(!collapse);
            }}
          >
            {!collapse ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Sidebar content */}
        {!collapse ? (
          <div className="sidebar-expanded mt-8">
            {/* Navigation */}
            <nav className="flex flex-col overflow-auto lg:flex">
              <ul className="flex w-full flex-col items-start gap-2 md:flex">
                {navLinks.map((link) => {
                  // Check if the current role is allowed to see the link
                  if (role && !link.visible?.includes(role)) return null;

                  const isActive = link.route === pathname;
                  const IconComponent = link.icon;

                  return (
                    <li
                      key={link.route}
                      className={`flex w-full whitespace-nowrap rounded-xl ${
                        isActive
                          ? "text-white bg-black dark:bg-white dark:text-black"
                          : ""
                      }`}
                    >
                      <Link
                        className="p-16-semibold flex justify-between size-full gap-4 p-4"
                        href={link.route}
                      >
                        <div className="flex items-center gap-4 text-xl">
                          <IconComponent className="h-5 w-5" />
                          {link.label}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        ) : (
          <div className="sidebar-collapsed mt-8">
            {/* Collapsed Navigation */}
            <nav className="flex flex-col overflow-auto lg:flex">
              <ul className="flex w-full flex-col items-start gap-2 md:flex">
                {navLinks.map((link) => {
                  // Check if the current role is allowed to see the link

                  const isActive = link.route === pathname;
                  const IconComponent = link.icon;

                  if (link.visible?.includes(role as string))
                    return (
                      <li
                        key={link.route}
                        className={`flex w-full whitespace-nowrap rounded-xl ${
                          isActive
                            ? "text-white bg-black dark:bg-white dark:text-black"
                            : ""
                        }`}
                      >
                        <Link
                          className="p-16-semibold flex justify-center size-full gap-4 p-4"
                          href={link.route}
                        >
                          <IconComponent className="h-5 w-5" />
                        </Link>
                      </li>
                    );
                })}
              </ul>
            </nav>
          </div>
        )}
        <LogoutButton collapse={collapse} />
      </div>
    </div>
  );
};

export default Sidebar;
