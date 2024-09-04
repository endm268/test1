import { z } from "zod";
import { format } from "date-fns";


export const formAddAssetInventorySchema = z.object({
  asset_Name: z.string().min(2, {
    message: "اسم الأصل يجب أن يكون على الأقل 2 أحرف.",
  }),
  asset_Date_Use: z.date({
    required_error: "تاريخ الاستخدام مطلوب.",
    invalid_type_error: "يرجى اختيار تاريخ صالح.",
  }),
  asset_Number_class: z.string().nonempty({
    message: "تصنيف الأصل الأساسي مطلوب.",
  }),
  asset_Number_subclass: z.string().nonempty({
    message: "تصنيف الأصل الفرعي مطلوب.",
  }),
  asset_Number_detail: z.string().nonempty({
    message: "تصنيف الأصل التفصيلي مطلوب.",
  }),
  asset_Number_id: z
    .string()
    .min(2, { message: "رقم الأصل يجب أن يكون بين 2 و 6 أحرف." })
    .max(6, { message: "رقم الأصل يجب أن يكون بين 2 و 6 أحرف." }),

  asset_State: z.enum(["مستهلك", "جيد", "عاطل"], {
    required_error: "حالة الأصل مطلوبة.",
    invalid_type_error: "يرجى اختيار حالة صالحة للأصل.",
  }),

  asset_place: z.string().nonempty({
    message: "مكان الأصل مطلوب.",
  }),

  asset_reciever: z.string().nonempty({
    message: "اسم المستلم مطلوب.",
  }),

  boardNumber: z.string().min(2, {
    message: "رقم اللوحة يجب أن يكون على الأقل 2 أحرف.",
  }),

  motorNumber: z.string().min(2, {
    message: "رقم المحرك يجب أن يكون على الأقل 2 أحرف.",
  }),

  structureNumber: z.string().min(2, {
    message: "رقم الهيكل يجب أن يكون على الأقل 2 أحرف.",
  }),

  yearCreate: z.date({
    required_error: "تاريخ  الانتياج او سنة الصنع.",
    invalid_type_error: "يرجى اختيار تاريخ صالح.",
  }),

  devicid: z.string().min(2, {
    message: "رقم الهيكل يجب أن يكون على الأقل 2 أحرف.",
  }),
});
