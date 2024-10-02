"use client";

import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { CircleX, TrashIcon } from "lucide-react";
import { DataTableViewOptions } from "./data-table-view-options";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { asset_State, asset_Value, columnNamesSearch } from "@/constants";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  option?: any[];
  disabled?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  disabled = false,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [searchcolumn, setSearchColumn] = useState<string>("");




  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <div className="flex items-center gap-4">
          {/* Search */}
          <Input
            placeholder={`البحث في ${
              columnNamesSearch[searchcolumn ]
            }`}
            value={
              (table
                .getColumn(searchcolumn )
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(searchcolumn)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          {/* Search column */}
          <Select
            dir="rtl"
            value={searchcolumn}
            onValueChange={(value) => setSearchColumn(value)}
          >
            <SelectTrigger className="w-[180px] flex items-center">
              <SelectValue placeholder="عمود البحث" />
            </SelectTrigger>
            <SelectContent>
              {table.getAllColumns().map((column) => {
                if (!columnNamesSearch[column.id]) {
                  return null;
                }

                return (
                  <SelectItem
                    className="flex justify-start items-center"
                    key={column.id}
                    value={column.id}
                  >
                    {columnNamesSearch[column.id]}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {!disabled ? (
          <>
            {table.getColumn("state") && (
              <DataTableFacetedFilter
                column={table.getColumn("state")}
                title="حالة الاصل"
                options={asset_State}
              />
            )}{" "}
          </>
        ) : null}

        {!disabled ? (
          <>
            {table.getColumn("mainValue") && (
              <DataTableFacetedFilter
                column={table.getColumn("mainValue")}
                title="مدي قيمة الاصل"
                options={asset_Value}
              />
            )}
          </>
        ): null}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            مسح الفلترة
            <CircleX className="mr-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        ) : null}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
