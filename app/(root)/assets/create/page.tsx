import AssetForm from '@/components/forms/AssetForm';
import AssetFormTest from '@/components/forms/AssetFormTest';
import HeaderPage from '@/components/shared/headerPage';
import React from 'react'

const AssetCreate = () => {
  return (
    <div className="flex flex-col gap-2 py-2">
      <HeaderPage title={"اضافة اصل لاودو"} />
      <div className="container mx-auto py-10">
        {/* <AssetForm /> */}
        <AssetFormTest />
      </div>
    </div>
  );
}

export default AssetCreate