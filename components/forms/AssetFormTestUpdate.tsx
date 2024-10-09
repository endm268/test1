"use client";

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
import { useEffect, useState } from "react";
import { asset_category, asset_Number_class, asset_Number_detail, asset_Number_subclass, asset_State } from "@/constants";
import Dropdown from "../dropdown/Dropdown";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { DropdownEmployeeNumber } from "../dropdown/DropdownEmployeeNumber";
import { DropdownEmployee } from "../dropdown/DropdownEmployee";
import DropdownTest from "../dropdown/DropdownTest";

const formSchema = z.object({
  asset_Name: z.string().min(2, {
    message: "Asset Name must be at least 2 characters.",
  }),
  asset_Number_class: z
    .string()
    .min(1, { message: "Asset Number class is required." }),
  asset_Number_subclass: z
    .string()
    .min(1, { message: "Asset Number subclass is required." }),
  asset_Number_detail: z
    .string()
    .min(1, { message: "Asset Number detail is required." }),
  asset_Number_id: z
    .string()
    .min(2, { message: "Asset Number ID is required." }),
  asset_State: z.string().min(1, { message: "Asset State is required." }),
  asset_Value: z.string().min(1, { message: "Asset Value is required." }),
  asset_Place: z.string().min(1, { message: "Asset Place is required." }),
  asset_Reciever_pin: z
    .string()
    .min(1, { message: "Asset Reciever Pin is required." }),
  asset_Reciever: z.string().min(1, { message: "Asset Reciever is required." }),
  asset_Date_of_useing: z
    .string()
    .min(1, { message: "Asset Date of using is required." }),
  asset_Category: z.string().min(1, { message: "Asset Category is required." }),
  asset_Plate_number: z.string().optional(),
  asset_Chassis_number: z.string().optional(),
  asset_Engine_Seria_number: z.string().optional(),
  asset_Year_of_manufacture: z.string().optional(),
  asset_Note: z.string().optional(),
});


interface AssetFormTestUpdateProps {
  id: string;
}

export default function AssetFormTestUpdate({ id }: AssetFormTestUpdateProps) {
  const { toast } = useToast();
  const [assetVehicle, setAssetVehicle] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

 const form = useForm<z.infer<typeof formSchema>>({
   resolver: zodResolver(formSchema),
   defaultValues: {
     asset_Name: "",
     asset_Number_class: "",
     asset_Number_subclass: "",
     asset_Number_detail: "",
     asset_Number_id: "",
     asset_State: "",
     asset_Value: "",
     asset_Place: "",
     asset_Reciever_pin: "",
     asset_Reciever: "",
     asset_Date_of_useing: "",
     asset_Category: "",
     asset_Plate_number: "",
     asset_Chassis_number: "",
     asset_Engine_Seria_number: "",
     asset_Year_of_manufacture: "",
     asset_Note: "",
   },
 });

   useEffect(() => {
     const fetchAsset = async () => {
       setLoading(true);
       try {
         const response = await axios.get(`/api/assets/${id}`);
         if (response.data.success) {
           const assetData = response.data.data;
            const formattedDate = assetData.using_date
              ? new Date(assetData.using_date).toISOString().split("T")[0]
              : "hi";

            console.log(formattedDate);
              

           form.reset({
             asset_Name: assetData.name || "",
             asset_Number_class: assetData.asset_number_1 || "",
             asset_Number_subclass: assetData.asset_number_2 || "",
             asset_Number_detail: assetData.asset_number_3 || "",
             asset_Number_id: assetData.asset_number_4 || "",
             asset_State: assetData.asset_status || "",
             asset_Value: assetData.original_value || "",
             asset_Place: assetData.place_of_asset || "",
             asset_Reciever_pin: assetData.pin || "",
             asset_Reciever: assetData.name_of_recepiet || "",
             asset_Date_of_useing: formattedDate,
             asset_Category: assetData.asset_category || "",
             asset_Plate_number: assetData.plate_number || "",
             asset_Chassis_number: assetData.chassis_no || "",
             asset_Engine_Seria_number: assetData.engine_serial_no || "",
             asset_Year_of_manufacture: assetData.year_of_manufacture || "",
             asset_Note: assetData.note || "",
           });
         } else {
           setError("Asset not found");
         }
       } catch (err: any) {
         setError(err.response?.data?.message || "Error fetching asset data");
       } finally {
         setLoading(false);
       }
     };

     if (id) {
       fetchAsset();
     }
   }, [id, form]);

   
  const { watch, setValue } = form;
  const assetNumberClass = watch("asset_Number_class");
  const assetNumberSubclass = watch("asset_Number_subclass");
  const assetNumberDetail = watch("asset_Number_detail");

  // update page base on Asset Category
  useEffect(() => {
    const selectedCategory = watch("asset_Category");

    // Check the selected category
    if (selectedCategory === "transportation" || selectedCategory === "cargo") {
      setAssetVehicle(true);
    } else {
      setAssetVehicle(false);
    }
  }, [watch("asset_Category")]);

  // Fetch the assetNumberId when all parts of the asset number are available
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/assets/number/${assetNumberClass}/${assetNumberSubclass}/${assetNumberDetail}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // Assuming data is { max_asset_number_4: someValue }
        setValue("asset_Number_id", String(data.data.max_asset_number_4)); // Access the value inside the object
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (assetNumberClass && assetNumberSubclass && assetNumberDetail) {
      fetchData();
    }
  }, [assetNumberClass, assetNumberSubclass, assetNumberDetail]);

  //onSubmit
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    const requestBody = {
      name: values.asset_Name,
      place_of_asset: values.asset_Place,
      name_of_recepiet: values.asset_Reciever,
      pin: values.asset_Reciever_pin,
      useing_date: values.asset_Date_of_useing,
      asset_status: values.asset_State,
      original_value: Number(values.asset_Value),
      asset_number_1: Number(values.asset_Number_class),
      asset_number_2: Number(values.asset_Number_subclass),
      asset_number_3: Number(values.asset_Number_detail),
      asset_number_4: Number(values.asset_Number_id),
      asset_category: values.asset_Category,
      plate_number: values.asset_Plate_number || "null",
      chassis_no: values.asset_Chassis_number || "null",
      engine_serial_no: values.asset_Engine_Seria_number || "null",
      year_of_manufacture: values.asset_Year_of_manufacture || "null",
      note: values.asset_Note || "null",
    };

    try {
      await axios.post("/api/assets/create", requestBody);
      toast({
        title: "Success",
        description: "Asset created successfully.",
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Unknown error occurred";
      toast({
        title: "Error",
        description: "Failed to create asset. " + errorMessage,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full bg-muted p-4 rounded-xl">
            <div className="flex flex-wrap md:flex-row items-center justify-between gap-8 w-full ">
              <span>رقم التصنيف الاساسي: {assetNumberClass}</span>
              <span>رقم التصنيف الفرعي: {assetNumberSubclass}</span>
              <span>رقم التصنيف التفصيلي: {assetNumberDetail}</span>
              <span>رقم التعريفي للاصل: {watch("asset_Number_id")}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* asset_Name */}
            <FormField
              control={form.control}
              name="asset_Name"
              render={({ field }) => (
                <FormItem className="w-full md:col-span-3">
                  <FormLabel>اسم الاصل</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ادخل اسم الاصل"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* asset_Number_class */}
            <FormField
              control={form.control}
              name="asset_Number_class"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>رقم الاصل الاساسي</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ادخل رقم الاصل الاساسي"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* asset_Number_subclass */}
            <FormField
              control={form.control}
              name="asset_Number_subclass"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>رقم الاصل الفرعي</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ادخل رقم الاصل الفرعي"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* asset_Number_detail */}
            <FormField
              control={form.control}
              name="asset_Number_detail"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>رقم الاصل التفصيلي</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ادخل رقم الاصل التفصيلي"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* asset_Number_id */}
            <FormField
              control={form.control}
              name="asset_Number_id"
              render={({ field }) => {
                const isDisabled =
                  !assetNumberClass ||
                  !assetNumberSubclass ||
                  !assetNumberDetail;
                return (
                  <FormItem className="w-full">
                    <FormLabel>رقم الاصل التعريفي</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ادخل رقم الاصل التعريفي"
                        {...field}
                        type="number"
                        disabled={isDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Spase */}
            <div className="w-full md:col-span-2"></div>

            {/* Asset Class Numbers Fields */}
            <FormField
              control={form.control}
              name="asset_Number_class"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>تصنيف الاساسي</FormLabel>
                  <FormControl>
                    <DropdownTest
                      options={asset_Number_class}
                      title=" ادخل تصنف الاساسي "
                      onChangeHandler={field.onChange}
                      value={field.value || ""}
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
                    <DropdownTest
                      options={asset_Number_subclass}
                      title="تصنف فرعي"
                      onChangeHandler={field.onChange}
                      value={field.value}
                      dependencyClassNmber={assetNumberClass}
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
                    <DropdownTest
                      options={asset_Number_detail}
                      title="تصنف تفصيل"
                      onChangeHandler={field.onChange}
                      value={field.value}
                      dependencyClassNmber={form.getValues(
                        "asset_Number_class"
                      )}
                      dependencysubClassNmber={assetNumberSubclass}
                    />
                  </FormControl>
                  <FormMessage className="text-rose-700" />
                </FormItem>
              )}
            />

            {/* Asset dropdown asset stutes Fields */}
            <FormField
              control={form.control}
              name="asset_State"
              render={({ field }) => (
                <FormItem className="w-full dark:border-white">
                  <FormLabel> حالة الاصل </FormLabel>
                  <FormControl>
                    <Dropdown
                      options={asset_State}
                      title=" ادخل حالة الاصل "
                      value={field.value}
                      onChangeHandler={(value, label) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage className="text-rose-700" />
                </FormItem>
              )}
            />

            {/* Asset Value */}
            <FormField
              control={form.control}
              name="asset_Value"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>قيمة الاصل</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="ادخل قيمة الاصل"
                        {...field}
                        type="number"
                        className="pl-10"
                      />
                    </FormControl>
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      د ل
                    </span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* asset_Place */}
            <FormField
              control={form.control}
              name="asset_Place"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>مكان الاصل</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ادخل مكان الاصل"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* asset_Reciever_pin */}
            <FormField
              control={form.control}
              name="asset_Reciever_pin"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>رقم الوظفي لمستلم الاصل</FormLabel>
                  <FormControl>
                    <DropdownEmployeeNumber
                      title="رقم الوظفي لمستلم الاصل"
                      value={field.value} // Pass form field value
                      onSelectName={
                        (selectedName) =>
                          setValue("asset_Reciever", selectedName) // Update name field
                      }
                      onSelectPin={
                        (selectedPin) =>
                          setValue("asset_Reciever_pin", selectedPin.toString()) // Update pin field
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* asset_Reciever */}
            <FormField
              control={form.control}
              name="asset_Reciever"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>اسم مستلم الاصل</FormLabel>
                  <FormControl>
                    <DropdownEmployee
                      title="اسم مستلم الاصل"
                      value={field.value} // Pass form field value
                      onSelect={(selectedValue) =>
                        setValue("asset_Reciever", selectedValue)
                      } // Update form field when value changes
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* asset_Date_of_useing */}
            <FormField
              control={form.control}
              name="asset_Date_of_useing"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>تاريخ استلام الاصل</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ادخل تاريخ استلام الاصل"
                      {...field}
                      type="date"
                      className="flex justify-end"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Asset dropdown asset stutes Fields */}
            <FormField
              control={form.control}
              name="asset_Category"
              render={({ field }) => (
                <FormItem className="w-full dark:border-white">
                  <FormLabel> فئة الاصل </FormLabel>
                  <FormControl>
                    <Dropdown
                      options={asset_category}
                      title=" ادخل فئة الاصل "
                      value={field.value}
                      onChangeHandler={(value, label) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage className="text-rose-700" />
                </FormItem>
              )}
            />
            {/* Spase */}
            <div className="w-full md:col-span-2"></div>

            {/* asset Vehicle */}
            {assetVehicle ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 col-span-3">
                {/* asset_Plate_number */}
                <FormField
                  control={form.control}
                  name="asset_Plate_number"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>رقم لوحة مركبة</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ادخل  رقم لوحة مركبة"
                          {...field}
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* asset_Chassis_number */}
                <FormField
                  control={form.control}
                  name="asset_Chassis_number"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>رقم هيكل مركبة</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ادخل  رقم هيكل مركبة"
                          {...field}
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* asset_Engine_Seria_number */}
                <FormField
                  control={form.control}
                  name="asset_Engine_Seria_number"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>رقم محرك مركبة</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ادخل  رقم محرك مركبة"
                          {...field}
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* asset_Year_of_manufacture */}
                <FormField
                  control={form.control}
                  name="asset_Year_of_manufacture"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel> تاريخ تصنيع مركبة</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ادخل  تاريخ تصنيع مركبة"
                          {...field}
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Spase */}
                <div className="w-full md:col-span-2"></div>

                {/* asset_Note */}
                <FormField
                  control={form.control}
                  name="asset_Note"
                  render={({ field }) => (
                    <FormItem className="w-full col-span-3">
                      <FormLabel>ملاحظة</FormLabel>
                      <FormControl>
                        <Textarea className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : null}
          </div>

          <div className="flex items-center">
            <Button type="submit" disabled={loading}>
              {submitting ? " ارسال..." : "اضافة اصل"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
