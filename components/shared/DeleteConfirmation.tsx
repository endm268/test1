"use client";

import { useEffect, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { OctagonAlert, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

// Define the interface for the props
interface DeleteConfirmationProps {
  id: string;
  type: string; // You can change this type if you have specific types
  title: string;
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  id,
  type,
  title,
}) => {
   const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    // Start the transition
    startTransition(async () => {
      if (type === "odoo") {
        console.log("delete odoo id:" + id);
        try {
          const response = await fetch(`/api/assets/delete/${id}`, {
            method: "DELETE",
          });

          const data = await response.json();

          if (data.success) {
             router.push("/assets");
          } else {
            console.log(data.message);
          }
        } catch (error) {
          console.error("Error deleting asset:", error);
        }
       
      } 
    });
  };


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500 text-white">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent dir="rtl">
        <AlertDialogHeader className="flex flex-col items-start gap-2">
          <AlertDialogTitle>
            <div className="flex items-center justify-start gap-4">
              <OctagonAlert className="w-16 h-16 text-red-600" />
              <div className="flex gap-2">
                <span>هل انت متاكيد من حذف</span>
                <span>{title}</span>
                <span>؟</span>
              </div>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            <span>سيؤدي هذا الاجراء الى حذف جميع البيانات المتعلقه بالاصل</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-4">
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            {isPending ? "يحدف..." : "حدف"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
