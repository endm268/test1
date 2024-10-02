import AssetInventoryEditeForm from "@/components/forms/AssetInventoryEditeForm";
import HeaderPage from "@/components/shared/headerPage";
import React from "react";


const NewAssetInventory = () => {
  return (
    <div className="flex flex-col gap-2 py-2">
      <HeaderPage title={"تعديل اصل المجرود"} />
      <div className="container mx-auto py-10">
        <AssetInventoryEditeForm />
      </div>
    </div>
  );
};

export default NewAssetInventory;
