"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  asset_Number_class,
  asset_Number_detail,
  asset_Number_subclass,
  asset_State,
} from "@/constants";
import Dropdown from "@/components/shared/Dropdown";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { assetInventorySchema } from "@/Schema/Schema";



export default function NewAssetInventoryForm() {
  const [assetVehicle, setAssetVehicle] = useState<boolean>(false);
  const form = useForm<z.infer<typeof assetInventorySchema>>({
    resolver: zodResolver(assetInventorySchema),
    defaultValues: {
      asset_Name: "",
      asset_Number_class: "",
      asset_Number_subclass: "",
      asset_Number_detail: "",
      asset_Number_id: "",
      asset_State: "",
      asset_Place: "",
      asset_Reciever: "",
      board_Number: null,
      motor_Number: null,
      structure_Number: null,
      year_Create: null,
    },
  });

  const { toast } = useToast();

 function onSubmit(values: z.infer<typeof assetInventorySchema>) {
   // Log form values to check if they're correct
   console.log("Form values:", values);

   // Use a mapping for asset states for better readability
   const assetStateMap: Record<string, number> = {
     جيد: 1,
     مستهلك: 2,
     عاطل: 3,
   };

   // Determine the state using the map or default to 2
   const state = assetStateMap[values.asset_Name] || 2;

   // Map form values to the request body
   const requestBody = {
     tag: values.asset_Number_id,
     num1: Number(values.asset_Number_class),
     num2: Number(values.asset_Number_subclass),
     num3: Number(values.asset_Number_detail),
     num4: Number(values.asset_Number_id),
     fullName: values.asset_Name,
     placeName: values.asset_Place,
     state,
     userId: 2,
   };

   // API request configuration
   axios
     .post("/api/assetInventory/new", requestBody)
     .then((response) => {
       toast({
         title: "Success",
         description: "Asset created successfully.",
       });
       console.log("Response:", response.data);
     })
     .catch((error) => {
       const errorMessage = error.response?.data?.message || error.message;
       toast({
         title: "Error",
         description: "Failed to create asset. " + errorMessage,
         variant: "destructive",
       });
       console.error("Error:", errorMessage);
     });
 }


  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full bg-muted p-4 rounded-xl">
            <div className="flex items-start justify-start flex-col gap-4 w-full ">
              <span>
                رقم التصنيف الاساسي :{form.watch("asset_Number_class")}
              </span>
              <span>
                رقم التصنيف الفرعي :{form.watch("asset_Number_subclass")}
              </span>
              <span>
                رقم التصنيف التفصيلي : {form.watch("asset_Number_detail")}
              </span>
              <span>رقم التعريفي للاصل : {form.watch("asset_Number_id")}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* asset_Name */}
            <FormField
              control={form.control}
              name="asset_Name"
              render={({ field }) => (
                <FormItem className="w-full dark:border-white col-span-3">
                  <FormLabel>اسم الاصل</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ادخل اسم الاصل"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-700" />
                </FormItem>
              )}
            />

            {/* Asset Class Numbers Fields */}
            <FormField
              control={form.control}
              name="asset_Number_class"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>تصنيف الاساسي</FormLabel>
                  <FormControl>
                    <Dropdown
                      options={asset_Number_class}
                      title=" ادخل تصنف الاساسي "
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage className="text-rose-700" />
                </FormItem>
              )}
            />

            {/* Asset Subclass Numbers Fields */}
            <FormField
              control={form.control}
              name="asset_Number_subclass"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>تصنيف فرعي</FormLabel>
                  <FormControl>
                    <Dropdown
                      options={asset_Number_subclass}
                      title="تصنف فرعي"
                      onChangeHandler={field.onChange}
                      value={field.value}
                      dependencyClassNmber={form.getValues(
                        "asset_Number_class"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-rose-700" />
                </FormItem>
              )}
            />

            {/* Asset Detail Numbers Fields */}
            <FormField
              control={form.control}
              name="asset_Number_detail"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>تصنيف تفصيل</FormLabel>
                  <FormControl>
                    <Dropdown
                      options={asset_Number_detail}
                      title="تصنف تفصيل"
                      onChangeHandler={field.onChange}
                      value={field.value}
                      dependencyClassNmber={form.getValues(
                        "asset_Number_class"
                      )}
                      dependencysubClassNmber={form.getValues(
                        "asset_Number_subclass"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-rose-700" />
                </FormItem>
              )}
            />

            {/* Asset Id Numbers Fields */}
            <FormField
              control={form.control}
              name="asset_Number_id"
              render={({ field }) => (
                <FormItem className="w-full dark:border-white">
                  <FormLabel>  رقم الاصل</FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل اسم الاصل" {...field} />
                  </FormControl>
                  <FormMessage className="text-rose-700" />
                </FormItem>
              )}
            />

            {/* Asset State Field */}
            <FormField
              control={form.control}
              name="asset_State"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>حالة الاصل</FormLabel>
                  <FormControl>
                    <Dropdown
                      options={asset_State}
                      title="اختر حالة الاصل"
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage className="text-rose-700" />
                </FormItem>
              )}
            />

            {/* Asset place */}
            <FormField
              control={form.control}
              name="asset_Place"
              render={({ field }) => (
                <FormItem className="w-full dark:border-white">
                  <FormLabel>  مكان الاصل</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ادخل مكان الاصل"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-700" />
                </FormItem>
              )}
            />

            {/* Asset reciever */}
            <FormField
              control={form.control}
              name="asset_Reciever"
              render={({ field }) => (
                <FormItem className="w-full dark:border-white">
                  <FormLabel>  اسم مستلم لاصل</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ادخل اسم مستلم الاصل"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-700" />
                </FormItem>
              )}
            />

            <div className="w-full col-span-2"></div>

            {/* Asset date  */}
            <FormField
              control={form.control}
              name="asset_Date_Use"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>تاريخ الاستخدام</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>ادخل تاريخ استخدام</span>
                          )}
                          <CalendarIcon className="mr-auto h-4 w-4" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              onClick={() => {
                setAssetVehicle(!assetVehicle);
              }}
            />
            مركبة
          </div>

          {assetVehicle ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Asset board_Number */}
              <FormField
                control={form.control}
                name="board_Number"
                render={({ field }) => (
                  <FormItem className="w-full dark:border-white">
                    <FormLabel> رقم اللوحة </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ادخل رقم اللوحة"
                        {...field}
                        value={field.value ?? ""}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage className="text-rose-700" />
                  </FormItem>
                )}
              />

              {/* Asset motor_Number */}
              <FormField
                control={form.control}
                name="motor_Number"
                render={({ field }) => (
                  <FormItem className="w-full dark:border-white">
                    <FormLabel>  رقم المحرك </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ادخل رقم المحرك"
                        {...field}
                        value={field.value ?? ""}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage className="text-rose-700" />
                  </FormItem>
                )}
              />

              {/* Asset structure_Number */}
              <FormField
                control={form.control}
                name="structure_Number"
                render={({ field }) => (
                  <FormItem className="w-full dark:border-white">
                    <FormLabel>  رقم الهيكل </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ادخل رقم الهيكل"
                        {...field}
                        value={field.value ?? ""}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage className="text-rose-700" />
                  </FormItem>
                )}
              />

              {/* Asset year_Create  */}
              <FormField
                control={form.control}
                name="year_Create"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>تاريخ الصنع</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP") // Format the selected date
                            ) : (
                              <span>ادخل تاريخ الصنع</span> // Placeholder text when no date is selected
                            )}
                            <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={field.onChange}
                          disabled={
                            (date) =>
                              date > new Date() || date < new Date("1900-01-01") // Disable dates outside range
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : null}

          <div className="flex items-center">
            <Button type="submit">اضافة الاصل</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
