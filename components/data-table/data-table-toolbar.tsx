"use client";

import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { ArrowDown, ArrowUp, CircleX, TrashIcon } from "lucide-react";
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
import {
  asset_Number_class,
  asset_Number_detail,
  asset_Number_subclass,
  asset_State,
  columnNamesSearch,
} from "@/constants";
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
  const [selectedAssetNumber1, setSelectedAssetNumber1] = useState<
    string | undefined
  >(undefined);
  const [selectedAssetNumber2, setSelectedAssetNumber2] = useState<
    string | undefined
  >(undefined);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );

  const isFiltered = table.getState().columnFilters.length > 0;
  const [searchcolumn, setSearchColumn] = useState<string>("name");

  // Handle sorting by using date
  const handleSortUsingDate = () => {
    if (sortDirection === "asc") {
      table.getColumn("using_date")?.toggleSorting(true);
      setSortDirection("desc");
    } else {
      table.getColumn("using_date")?.toggleSorting(false);
      setSortDirection("asc");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-row justify-between w-full items-center gap-2">
        <div className="flex flex-row items-center gap-4">
          {/* Search */}
          <Input
            placeholder={`البحث في ${columnNamesSearch[searchcolumn]}`}
            value={
              (table.getColumn(searchcolumn)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchcolumn)?.setFilterValue(event.target.value)
            }
            className="max-w-sm h-8"
          />

          {/* Search column */}
          <Select
            dir="rtl"
            value={searchcolumn}
            onValueChange={(value) => setSearchColumn(value)}
          >
            <SelectTrigger className="w-[180px] flex items-center h-8 border-dashed">
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
      </div>

      <div className="flex flex-wrap md:flex-row justify-start items-center w-full gap-2">
        {/* Filter options */}
        {table.getColumn("asset_status") && (
          <DataTableFacetedFilter
            column={table.getColumn("asset_status")}
            title="حالة الاصل"
            options={asset_State}
          />
        )}

        {table.getColumn("asset_number_1") && (
          <DataTableFacetedFilter
            column={table.getColumn("asset_number_1")}
            title="رقم تصنيف الاساسي "
            options={asset_Number_class}
            onSelect={(selectedValue) => setSelectedAssetNumber1(selectedValue)}
          />
        )}

        {table.getColumn("asset_number_2") && (
          <DataTableFacetedFilter
            column={table.getColumn("asset_number_2")}
            title="رقم تصنيف فرعي"
            options={asset_Number_subclass}
            onSelect={(selectedValue) => setSelectedAssetNumber2(selectedValue)}
            filter={selectedAssetNumber1}
            isDisabled={!selectedAssetNumber1}
          />
        )}

        {table.getColumn("asset_number_3") && (
          <DataTableFacetedFilter
            column={table.getColumn("asset_number_3")}
            title="رقم تصنيف تفصيلي"
            options={asset_Number_detail}
            filter={selectedAssetNumber1}
            filter1={selectedAssetNumber2}
            isDisabled={!selectedAssetNumber1 || !selectedAssetNumber2}
          />
        )}

        {/* Clear filters */}
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

        {/* Sort by using_date */}
        {table.getColumn("using_date") && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleSortUsingDate}
            className="h-8 border-dashed"
          >
            {sortDirection === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
            فرز حسب استخدام التاريخ
          </Button>
        )}

        <DataTableViewOptions table={table} />

      </div>

      <div className="flex items-center gap-2">
        {/* Optional delete button or other actions */}
      </div>
    </div>
  );
}
