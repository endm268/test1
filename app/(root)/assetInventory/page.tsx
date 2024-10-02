"use client";

import { DataTable } from "@/components/data-table/data-table";
import React, { useEffect, useState } from "react";
import HeaderPage from "@/components/shared/headerPage";
import { assetInventoryColumn } from "./columns";

const assetInventory = () => {
  const [data, setData] = useState<any>([]);
  const [columns, setColumns] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


 useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch("api/assetInventory");
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || "Failed to fetch data");
        }
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };


    
    fetchDataAsync();
    setColumns(assetInventoryColumn);
   
  }, []);

  if (loading) {
    return <div>تحميل...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-8 py-2">
      <HeaderPage title={"عرض كل الاصول في الجرد "} disabled={true} />
      <div className="container mx-auto w-full">
        <DataTable columns={columns} data={data} disabled={true} />
      </div>
    </div>
  );
};

export default assetInventory;
