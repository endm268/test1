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
    // const fetchDataAsync = async () => {
    //   try {
    //     const result = await AssetFetchData();
    //     setData(result);
    //   } catch (err) {
    //     setError("Failed to fetch data. Please try again later.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchDataAsync();
    setData(AssetData);
    setColumns(Assetcolumns);
    setLoading(false);
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

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
