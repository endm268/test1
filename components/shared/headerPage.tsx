"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface HeaderPageProps {
  title: string;
  disabled?: boolean;
}

const HeaderPage = ({ title, disabled }: HeaderPageProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <div className="header-page bg-muted p-4 rounded-xl flex justify-between items-center">
      <h1 className="text-2xl font-semibold">{title}</h1>

      {!disabled ? <Button onClick={handleBack}>رجوع</Button> : <></>}
    </div>
  );
};

export default HeaderPage;
