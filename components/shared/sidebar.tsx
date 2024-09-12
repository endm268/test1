"use client";
import React, { useState, useEffect } from "react";
// next js
import Link from "next/link";
import { usePathname } from "next/navigation";
// menu
import { navLinks, usernavLinks } from "@/constants";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LogoutButton from "./LogoutButton";

// Example session fetching function (replace with actual session logic)
const getSessionData = async () => {
  const response = await fetch("/api/getSession");
  const data = await response.json();
  return data;
};

const Sidebar = () => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Fetch the session data on component mount
    const fetchSession = async () => {
      const session = await getSessionData();
      if (session?.isAdmin !== undefined) {
        setIsAdmin(session.isAdmin);
      }
    };
    fetchSession();
  }, []);

  // Conditional rendering based on the role
  const links = isAdmin ? navLinks : usernavLinks;

  return (
    <div className="sidebar">
      <div className="sidebar-contaner">
        <div className="sidebar-toggel">
          <Button
            onClick={() => {
              setCollapse(!collapse);
            }}
          >
            {!collapse ? (
              <div>
                <ChevronRight className="w-4 h-4" />
              </div>
            ) : (
              <div>
                <ChevronLeft className="w-4 h-4" />
              </div>
            )}
          </Button>
        </div>
        {/* content */}
        {!collapse ? (
          <div className="sidebar-collapse-open">
            {/* nav */}
            <nav className="flex flex-col overflow-auto lg:flex">
              <ul className="hidden w-full flex-col items-start gap-2 md:flex">
                {links.map((link) => {
                  const isActive = link.route === pathname;
                  const IconComponent = link.icon;
                  return (
                    <li
                      key={link.route}
                      className={`flex flex-col w-full whitespace-nowrap rounded-xl ${
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
          <div className="sidebar-collapse-close">
            {/* nav */}
            <nav className="flex flex-col overflow-auto lg:flex">
              <ul className="hidden w-full flex-col items-start gap-2 md:flex">
                {links.map((link) => {
                  const isActive = link.route === pathname;
                  const IconComponent = link.icon;
                  return (
                    <li
                      key={link.route}
                      className={`flex flex-col w-full whitespace-nowrap rounded-xl ${
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
                        </div>
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
