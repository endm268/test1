"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

type Option = {
  id: number;
  label: string;
  value: string | number;
  asset_Number_class?: string | number;
  asset_Number_subclass?: string | number;
  asset_Number_detail?: string | number;
};

type DropdownProps = {
  title: string;
  value?: string;
  options?: Option[];
  onChangeHandler?: (value: string) => void;
  dependencyClassNmber?: string | number;
  dependencysubClassNmber?: string | number;
};

const Dropdown = ({
  title,
  value,
  options = [],
  onChangeHandler,
  dependencyClassNmber,
  dependencysubClassNmber,
}: DropdownProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  const filteredOptions = React.useMemo(() => {
    return options.filter((option) => {
      const matchesQuery = option.label.includes(searchQuery);
      const matchesDependencyAssetClassNamber =
        dependencyClassNmber !== undefined
          ? option.asset_Number_class === dependencyClassNmber
          : true;
      const matchesDependencyAssetSubClassNamber =
        dependencysubClassNmber !== undefined
          ? option.asset_Number_class === dependencyClassNmber &&
            option.asset_Number_subclass === dependencysubClassNmber
          : true;
      return (
        matchesQuery &&
        matchesDependencyAssetClassNamber &&
        matchesDependencyAssetSubClassNamber
      );
    });
  }, [searchQuery, options, dependencyClassNmber, dependencysubClassNmber]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchQuery, filteredOptions]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Select value={value} onValueChange={onChangeHandler} dir="rtl">
      <SelectTrigger className="select-field">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent className="flex flex-col py-2 bg-black text-white">
        <Input
          placeholder="بحث"
          className="bg-black text-white"
          value={searchQuery}
          onChange={handleSearchChange}
          ref={inputRef}
        />
        <Separator className="my-4" />
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <SelectItem
              key={option.id}
              value={option.value.toString()}
              className="select-item p-regular-14"
            >
              {option.label}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no-options" disabled>
            لا يتوفر خيارات
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
