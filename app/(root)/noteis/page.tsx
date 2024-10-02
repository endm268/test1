import HeaderPage from '@/components/shared/headerPage';
import React from 'react'

const noteis = () => {
  return (
    <div className="flex flex-col gap-2 py-2">
      <HeaderPage title={"ملاحظات"} />
      <div className="container mx-auto py-10"></div>
    </div>
  );
}

export default noteis