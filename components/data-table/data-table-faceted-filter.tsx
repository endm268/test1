import * as React from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  disabled?: boolean;
  isDisabled?: boolean;
  filter?: string;
  filter1?: string;
  options: {
    id: any;
    label: string;
    value: string;
    asset_Number_class?: any;
    asset_Number_subclass?: any;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  onSelect?: (selectedValue: string | undefined) => void;
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  disabled,
  isDisabled,
  filter,
  filter1,
  options,
  onSelect, // Added onSelect here
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValue = column?.getFilterValue() as string | undefined;

  const filteredOptions = useMemo(() => {
    return options.filter((option) => {
      const matchesFilter = filter
        ? option.asset_Number_class?.toString() === filter.toString()
        : true;
      const matchesFilter1 = filter1
        ? option.asset_Number_subclass?.toString() === filter1.toString()
        : true;
      return matchesFilter && matchesFilter1;
    });
  }, [filter, filter1, options]);

  

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed"
          disabled={isDisabled} // Disable button when both filter and filter1 are null or undefined
        >
          <PlusCircledIcon className="ml-2 h-4 w-4" />
          {title}
          {selectedValue && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              {/* Mobile View: Show selected value in a badge */}
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {
                  filteredOptions.find(
                    (option) => option.value === selectedValue
                  )?.label
                }
              </Badge>
              {/* Larger Screens: Show selected value */}
              <div className="hidden space-x-1 lg:flex">
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {
                    filteredOptions.find(
                      (option) => option.value === selectedValue
                    )?.label
                  }
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>لم يتم العثور على نتائج.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => {
                const isSelected = selectedValue === option.value;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      // If the selected value is already set, remove it
                      const newSelectedValue = isSelected
                        ? undefined
                        : option.value;
                      column?.setFilterValue(newSelectedValue);

                      // Call the onSelect prop with the selected value
                      if (onSelect) {
                        onSelect(newSelectedValue);
                      }
                    }}
                    disabled={!!selectedValue && !isSelected} // Disable others if one is selected
                  >
                    <div
                      className={cn(
                        "ml-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="ml-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValue && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      column?.setFilterValue(undefined);
                      // Call the onSelect with undefined to clear the filter
                      if (onSelect) {
                        onSelect(undefined);
                      }
                    }}
                    className="justify-center text-center"
                  >
                    مسح المرشحات
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
