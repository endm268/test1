"use cleint";
import React, { useState } from "react";
//next js
import Link from "next/link";
import { usePathname } from "next/navigation";
//menu
import { navLinks } from "@/constants";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const pathname = usePathname();

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
                {navLinks.map((link) => {
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
          <div className="sidebar-collapse-close ">
            {/* nav */}
            <nav className="flex flex-coll overflow-auto lg:flex">
              <ul className="hidden w-full flex-col items-start gap-2 md:flex">
                {navLinks.map((link) => {
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
      </div>
    </div>
  );
};

export default Sidebar;
