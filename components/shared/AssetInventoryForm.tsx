"use client";
import React from "react";
// react
import { useEffect, useState } from "react";
// zod
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// shadcn ui
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
//asset add Schema
import { formAddAssetInventorySchema } from "@/constants/Schema";
//date format
import { format } from "date-fns";
//costum components
import Dropdown from "./Dropdown";
//array for dropdwon
import {
  asset_Number_class,
  asset_Number_detail,
  asset_Number_subclass,
  asset_State,
} from "@/constants";
import { toast } from "@/hooks/use-toast";

const AssetInventoryForm = () => {
  const [assetnumber, setAssetNumber] = useState<string>("");
  const [assetVehicle, setAssetVehicle] = useState<boolean>(false);
  // init value
  const form = useForm<z.infer<typeof formAddAssetInventorySchema>>({
    resolver: zodResolver(formAddAssetInventorySchema),
    defaultValues: {
      asset_Name: "",
      asset_Number_class: "",
      asset_Number_subclass: "",
      asset_Number_detail: "",
      asset_Number_id: "",
      asset_Date_Use: new Date(),
      asset_State: "جيد",
      asset_place: "",
      asset_reciever: "",
      boardNumber: "null",
      motorNumber: "null",
      structureNumber: "null",
      yearCreate: new Date("1900"),
      devicid: "system",
    },
  });

  useEffect(() => {
    const {
      asset_Number_class = "",
      asset_Number_subclass,
      asset_Number_detail,
      asset_Number_id,
    } = form.getValues();

    if (asset_Number_class) {
      setAssetNumber(
        `${asset_Number_id}-${asset_Number_detail}-${asset_Number_subclass}-${asset_Number_class}`
      );
    } else {
      setAssetNumber("");
    }
  }, [
    form.watch("asset_Number_class"),
    form.watch("asset_Number_subclass"),
    form.watch("asset_Number_detail"),
    form.watch("asset_Number_id"),
  ]);

  function onSubmit(values: z.infer<typeof formAddAssetInventorySchema>) {
    toast({
      title: "ثم اضافة بنجاح",
      className: "success-toast",
    });
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Asset Name Field */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="asset_Name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>اسم الاصل</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-rose-700" />
              </FormItem>
            )}
          />
        </div>

        {/* Show asset tag number */}
        {assetnumber ? (
          <div className="flex items-center gap-2">
            <span className="p-14-medium">رقم الأصل</span>
            {assetnumber}
          </div>
        ) : null}

        {/* Asset Numbers Fields */}
        <div className="flex flex-col gap-5 md:flex-row">
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
                    title="تصنف الاساسي"
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
                    dependencyClassNmber={form.getValues("asset_Number_class")}
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
                    dependencyClassNmber={form.getValues("asset_Number_class")}
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
              <FormItem className="w-full">
                <FormLabel>رقم الاصل</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-rose-700" />
              </FormItem>
            )}
          />
        </div>

        {/* Asset aother Field */}
        <div className="flex flex-col gap-5 md:flex-row">
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
          {/* Asset Place Field */}
          <FormField
            control={form.control}
            name="asset_place"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>مكان الاصل</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-rose-700" />
              </FormItem>
            )}
          />
          {/* Asset Receiver Field */}
          <FormField
            control={form.control}
            name="asset_reciever"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>اسم المستلم</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-rose-700" />
              </FormItem>
            )}
          />
          {/* Asset Date of Use Field */}
          <FormField
            control={form.control}
            name="asset_Date_Use"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>تاريخ استلام الاصل</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
                        ) : (
                          <span>اختر تاريخ</span>
                        )}
                        <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto bg-black text-white p-0"
                    align="start"
                  >
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
                <FormMessage className="text-rose-700" />
              </FormItem>
            )}
          />
        </div>

        {/* Asset Vehicle Field */}
        <div className="flex items-center gap-2">
          <Checkbox
            onClick={() => {
              setAssetVehicle(!assetVehicle);
            }}
          />
          مركبة
        </div>
        {assetVehicle ? (
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="boardNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>رقم اللوحة</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-rose-700" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="motorNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>رقم المحرك</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-rose-700" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="structureNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>رقم الهيكل</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-rose-700" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearCreate"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>تاريخ الانتاج</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy")
                          ) : (
                            <span>اختر تاريخ</span>
                          )}
                          <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-black text-white"
                      align="start"
                    >
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
                  <FormMessage className="text-rose-700" />
                </FormItem>
              )}
            />
          </div>
        ) : null}

        {/* Submit Button */}
        <Button
          type="submit"
          className="flex justify-start items-center gap-4 p-16-semibold whitespace-nowrap rounded-xl p-6 font-cairo"
        >
          اضافة
        </Button>
      </form>
    </Form>
  );
};

export default AssetInventoryForm;
