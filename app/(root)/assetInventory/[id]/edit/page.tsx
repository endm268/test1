"use client";
import React from "react";
import HeaderPage from "@/components/shared/headerPage";
import AssetInventoryFormEdit from "@/components/shared/AssetInventoryFormEdit";

const Edit = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col gap-2 py-2">
      <HeaderPage title={"تعديل اصل الجرد"} />
      <div className="container mx-auto py-10">
        <AssetInventoryFormEdit id={params.id} />
      </div>
    </div>
  );
};

export default Edit;
