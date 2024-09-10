import React from "react";
import AssetInventoryForm from "@/components/shared/AssetInventoryForm";
import HeaderPage from "@/components/shared/headerPage";
const NewAssetInventory = () => {
  return (
    <div className="flex flex-col gap-2 py-2">
      <HeaderPage title={"اضافة اصل للجرد"} />
      <div className="container mx-auto py-10">
        <AssetInventoryForm />
      </div>
    </div>
  );
};

export default NewAssetInventory;
