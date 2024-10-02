import { useState } from "react";
import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, ArrowUpDown, EyeOff } from "lucide-react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="flex justify-between items-center p-0"
        >
          <button className="flex justify-start items-center gap-2">
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="mr-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="mr-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="mr-2 h-4 w-4" />
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="flex flex-col bg-black text-white"
        >
          <DropdownMenuItem
            className="w-full flex justify-between items-center"
            onClick={() => column.toggleSorting(false)}
          >
            <ArrowUp className="h-4 w-4" />
            تصاعدي
          </DropdownMenuItem>
          <DropdownMenuItem
            className="w-full flex justify-between items-center"
            onClick={() => column.toggleSorting(true)}
          >
            <ArrowDown className="h-4 w-4" />
            تنازلي
          </DropdownMenuItem>

          <DropdownMenuItem
            className="w-full flex justify-between items-center"
            onClick={() => column.toggleSorting()}
          >
            <ArrowUpDown className="h-4 w-4" />
            لغاء الترتيب
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="w-full flex justify-between items-center"
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeOff className="h-4 w-4" />
            إخفاء
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
