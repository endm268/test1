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
  department_id: [];
  id: number;
  name: string;
}

type DropdownEmployeeProps = {
  title?: string;
  value: string; // Controlled value for the component
  onSelect: (value: string) => void; // Called when an employee is selected
};

export function DropdownEmployee({
  title,
  value,
  onSelect,
}: DropdownEmployeeProps) {
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
        `/api/employees/search/${encodeURIComponent(searchQuery)}`
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
    setSearchQuery(e.target.value);
    onSelect(e.target.value); // Allow the user to input their own name
  };

  return (
    <div>
      {/* Input for manual name entry */}
      <div className="flex mb-4">
        <Input
          type="text"
          placeholder="بحث أو أدخل اسم الموظف"
          value={searchQuery || value}
          onChange={handleInputChange}
        />
      </div>

      {/* Show dropdown only if the user is searching */}
      {searchQuery !== "" && (
        <Select
          onValueChange={(selectedValue) => {
            if (selectedValue === "reset") {
              onSelect(""); // Reset the form field value
              setSearchQuery(""); // Reset the search query
              setEmployees([]); // Clear employee options
            } else {
              onSelect(selectedValue); // Update the form field with the selected value
              setSearchQuery(selectedValue); // Update input with the selected value
              setEmployees([]); // Clear employee list after selection
            }
          }}
          dir="rtl"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={title || "اختر موظف"} />
          </SelectTrigger>

          <SelectContent className="flex flex-col gap-4 py-2">
            <div className="flex px-4">ابحث عن موظف</div>
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
                  {employee.name}
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
