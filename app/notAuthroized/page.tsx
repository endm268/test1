import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

const NotAuthorized = () => {
  return (
   <div className="flex items-center justify-center min-h-screen">
      <Card className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
        <div className="text-2xl font-bold mb-4">تم الرفض</div>
        <p className="mb-4">
      أنت غير مخول بالوصول إلى هذه الصفحة. يرجى الاتصال بمسؤول النظام لديك إذا كنت تعتقد أن هذا خطأ.
        </p>
      </Card>
    </div>
  );
};

export default NotAuthorized;
