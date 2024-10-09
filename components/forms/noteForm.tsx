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
import {
  asset_Number_class,
  asset_Number_detail,
  asset_Number_subclass,
  asset_State,
} from "@/constants";
import Dropdown from "@/components/dropdown/Dropdown";
import { noteSchema } from "@/Schema/Schema";
import { Textarea } from "../ui/textarea";

export default function NoteForm() {
  const form = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      note_Name: "",
      asset_Name: "",
      asset_Number_class: "",
      asset_Number_subclass: "",
      asset_Number_detail: "",
      asset_Number_id: "",
      asset_State: "",
      asset_Place: "",
    },
  });

  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof noteSchema>) {
    console.log(values);
    toast({
      title: "Success",
      description: "Teacher created successfully.",
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
            {/* note_Name */}
            <FormField
              control={form.control}
              name="note_Name"
              render={({ field }) => (
                <FormItem className="w-full dark:border-white col-span-3">
                  <FormLabel>عنوان الملاحظة </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ادخل عنوان الملاحظة"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-700" />
                </FormItem>
              )}
            />

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
                  <FormLabel> رقم الاصل</FormLabel>
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
                  <FormLabel> مكان الاصل</FormLabel>
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

            <FormField
              control={form.control}
              name="note_Detail"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>تفصيل الملاحظة</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ادخال تفصيل الملاحظة"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-rose-700" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center">
            <Button type="submit">اضافة ملاحظة</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
