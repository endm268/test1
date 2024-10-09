import AssetFormTestUpdate from '@/components/forms/AssetFormTestUpdate';
import HeaderPage from '@/components/shared/headerPage';
import React from 'react'

const UpdatePage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col gap-2 py-2">
      <HeaderPage title={"تعديل اصل في لاودو"} />
      <div className="container mx-auto py-10">
        {/* <AssetForm /> */}
        <AssetFormTestUpdate id={params.id} />
      </div>
    </div>
  );
};

export default UpdatePage