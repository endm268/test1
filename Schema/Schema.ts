import { z } from "zod";

export const assetInventorySchema = z.object({
  asset_Name: z
    .string()
    .min(2, { message: "Asset Name must be at least 2 characters." }),
  asset_Number_class: z
    .string()
    .min(1, { message: "Asset Number subclass is required." }),
  asset_Number_subclass: z
    .string()
    .min(1, { message: "Asset Number Detail is required." }),
  asset_Number_detail: z
    .string()
    .min(1, { message: "Asset Number Class is required." }),
  asset_Number_id: z
    .string()
    .min(4, { message: "Asset Number ID is required." }),
  asset_State: z.string().min(1, { message: "Asset State is required." }),
  asset_Place: z.string().min(1, { message: "Asset Place is required." }),
  asset_Reciever: z.string().min(1, { message: "Asset Reciever is required." }),
  asset_Date_Use: z.date({
    required_error: "Asset Date Use is required.",
  }),
  board_Number: z
    .string()
    .min(1, { message: "Board Number is required." })
    .nullable(),
  motor_Number: z
    .string()
    .min(1, { message: "Motor Number is required." })
    .nullable(),
  structure_Number: z
    .string()
    .min(1, { message: "Structure Number is required." })
    .nullable(),
  year_Create: z
    .date({
      required_error: "Year Create is required.",
    })
    .nullable(),

  // empluyee_id: z.string().min(1, { message: "Empluyee Id is required." }),
  // empluyee_job_id: z.string().min(1, { message: "Empluyee Job Id is required." }),
  // empluyee_Name: z.string().min(1, { message: "Empluyee Name is required." }),
});

export const formloginSchema = z.object({
  email: z
    .string()
    .email("يجب أن يكون بريدًا إلكترونيًا صالحًا")
    .min(2, "يجب أن يحتوي البريد الإلكتروني على حرفين على الأقل")
    .max(50, "يجب ألا يتجاوز البريد الإلكتروني 50 حرفًا"),
  password: z
    .string()
    .min(6, "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل")
    .max(150, "يجب ألا تتجاوز كلمة المرور 150 حرفًا"),
});



export const noteSchema = z.object({
  note_Name: z
    .string()
    .min(2, { message: "Asset Name must be at least 2 characters." }),
  asset_Name: z
    .string()
    .min(2, { message: "Asset Name must be at least 2 characters." }),
  asset_Number_class: z
    .string()
    .min(1, { message: "Asset Number subclass is required." }),
  asset_Number_subclass: z
    .string()
    .min(1, { message: "Asset Number Detail is required." }),
  asset_Number_detail: z
    .string()
    .min(1, { message: "Asset Number Class is required." }),
  asset_Number_id: z
    .string()
    .min(4, { message: "Asset Number ID is required." }),
  asset_State: z.string().min(1, { message: "Asset State is required." }),
  asset_Place: z.string().min(1, { message: "Asset Place is required." }),
  note_Detail: z
    .string()
    .min(10, {
      message: "Note Detail must be at least 10 characters.",
    }),
});