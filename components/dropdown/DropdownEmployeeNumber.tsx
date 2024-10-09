"use client";

import * as React from "react";
import axios from "axios";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface EmployeeOption {
  id: number;
  name: string;
  pin_code: string;
}

type DropdownEmployeeNumberProps = {
  title?: string;
  value: string; // Controlled value for the component
  onSelectName: (value: string) => void; // Called when the employee's name is selected
  onSelectPin: (value: string) => void; // Called when the employee's pin code is selected
};

export function DropdownEmployeeNumber({
  title,
  value,
  onSelectName,
  onSelectPin,
}: DropdownEmployeeNumberProps) {
  const [employees, setEmployees] = React.useState<EmployeeOption[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>(""); // Track search query
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Debounce the search to avoid too many API calls
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      } else {
        setEmployees([]); // Clear results if no query
      }
    }, 1000); // 1 second delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/employees/search/pin/${searchQuery}`
      );

      if (response.data.success) {
        setEmployees(response.data.data);
      } else {
        setEmployees([]);
        setError("No employees found");
      }
    } catch (err) {
      setError("Error fetching employee data");
      setEmployees([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchQuery(input);

    // If input is numeric and no match, allow manual PIN input
    if (input.match(/^\d+$/)) {
      onSelectPin(input); // Set as PIN when manual input
    } else {
      onSelectName(input); // Set as name if not numeric
    }
  };

  const handleSelectChange = (selectedValue: string) => {
    if (selectedValue === "reset") {
      onSelectName("");
      onSelectPin("");
      setSearchQuery("");
      setEmployees([]);
    } else {
      const employee = employees.find((emp) => emp.name === selectedValue);
      if (employee) {
        onSelectName(employee.name);
        onSelectPin(employee.pin_code);
      } else {
        onSelectName("");
        onSelectPin(searchQuery); // Allow manual entry of PIN
      }
      setSearchQuery("");
      setEmployees([]);
    }
  };

  return (
    <div>
      <div className="flex mb-4">
        <Input
          type="text"
          placeholder="بحث برقم التعريف الشخصي أو أدخل رقمًا"
          value={searchQuery || value}
          onChange={handleInputChange} // Handle user input (both search and manual)
        />
      </div>

      {/* Dropdown will show if there's a search query */}
      {searchQuery !== "" && (
        <Select onValueChange={handleSelectChange} dir="rtl">
          <SelectTrigger className="w-full">
            <SelectValue placeholder={title || "اختر موظف"} />
          </SelectTrigger>

          <SelectContent className="flex flex-col gap-4 py-2">
            <div className="flex px-4">
              ابحث عن موظف أو أدخل رقم التعريف الشخصي
            </div>
            <Separator className="my-2" />

            {/* Add a reset option */}
            <SelectItem
              value="reset" // Use "reset" instead of an empty string
              className="select-item text-right text-red-500"
            >
              إعادة تعيين
            </SelectItem>

            <Separator className="my-2" />

            {employees.length > 0 ? (
              employees.map((employee) => (
                <SelectItem
                  key={employee.id}
                  value={employee.name}
                  className="select-item text-right"
                >
                  {employee.name} | {employee.pin_code}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-options" disabled>
                {isLoading ? "جاري التحميل..." : "لا يتوفر خيارات"}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
