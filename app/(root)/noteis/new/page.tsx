
import NoteForm from '@/components/forms/noteForm';
import HeaderPage from '@/components/shared/headerPage';
import React from 'react'

const NewNote = () => {
  return (
    <div className="flex flex-col gap-4 py-2">
      <HeaderPage title={"اضافة ملاحظة"} />
      <div className="container mx-auto py-10">
        <NoteForm />
      </div>
    </div>
  );
}

export default NewNote