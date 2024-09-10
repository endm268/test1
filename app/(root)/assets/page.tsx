"use client";

import { DataTable } from "@/components/shared/data-table";
import { AssetData } from "@/constants";
import { AssetFetchData } from "@/lib/actions/assets";
import React, { useEffect, useState } from "react";
import { Assetcolumns } from "./columns";
import HeaderPage from "@/components/shared/headerPage";

const Assets = () => {
  const [data, setData] = useState<any>([]);
  const [columns, setColumns] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch("/api/assets");
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
    setColumns(Assetcolumns);
  }, []);

  if (loading) {
    return <div>تحميل...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-2 py-2">
      <HeaderPage title={"عرض كل الاصول في الاودو"} disabled={true} />
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Assets;
