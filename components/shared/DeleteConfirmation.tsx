"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";

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
import { TrashIcon } from "lucide-react";

// import { deleteEvent } from "@/lib/actions/event.actions";

export const DeleteConfirmation = ({ assetid }: { assetid: string }) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-500 text-white">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent dir="rtl">
        <AlertDialogHeader className="flex flex-col items-start gap-2">
          <AlertDialogTitle>هل أنت متأكد أنك تريد الحذف؟</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            سيؤدي هذا إلى حذف هذا الاصل المجرود بشكل دائم
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-4">
          <AlertDialogCancel>إلغاء</AlertDialogCancel>

          <AlertDialogAction
          // onClick={() =>
          //   startTransition(async () => {
          //     await deleteEvent({ eventId, path: pathname });
          //   })
          // }
          >
            {isPending ? "يحدف..." : "حدف"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
