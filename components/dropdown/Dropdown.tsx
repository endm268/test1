"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { asset_State } from "@/constants"; // Assuming asset_State contains options

type DropdownProps = {
  title: string;
  value?: string;
  onChangeHandler?: (value: string, label: string) => void; // Optional handler
  options: { id: number; label: string; value: string }[]; // Add options prop
};

const Dropdown: React.FC<DropdownProps> = ({
  title,
  value,
  onChangeHandler, // Optional
  options, // Use the options prop
}) => {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null); // State to store selected label

  const filteredOptions = useMemo(() => {
    return options; // Remove filtering logic
  }, [options]);

  // Update selectedLabel when the `value` changes
  useEffect(() => {
    const selectedOption = options.find(
      (option) => option.value.toString() === value
    );
    if (selectedOption) {
      setSelectedLabel(selectedOption.label);
    }
  }, [value, options]); // Run when `value` or `options` changes

  const handleSelect = (selectedValue: string) => {
    // Find the selected option by value
    const selectedOption = options.find(
      (option) => option.value.toString() === selectedValue
    );

    // Set the selected label in state
    if (selectedOption) {
      setSelectedLabel(selectedOption.label);
    }

    // Only call onChangeHandler if it exists
    if (selectedOption && onChangeHandler) {
      onChangeHandler(selectedOption.value.toString(), selectedOption.label);
    }
  };

  return (
    <Select value={value} onValueChange={handleSelect} dir="rtl">
      <SelectTrigger className="select-field">
        <SelectValue placeholder={selectedLabel || title} />
      </SelectTrigger>
      <SelectContent className="flex flex-col py-2 bg-black text-white">
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
