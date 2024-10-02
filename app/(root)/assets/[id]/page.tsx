"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { AssetDetail } from "@/Types/Types";
import HeaderPage from "@/components/shared/headerPage";

const Asset = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<AssetDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      const fetchAsset = async () => {
        try {
          const [n1, n2, n3, n4] = params.id.toString().split("-").map(Number);
          const response = await axios.get(`/api/assetInventory/${params.id}`, {
            params: { n1, n2, n3, n4 },
          });
          if (response.data.success) {
            setData(response.data.data);
          } else {
            setError("Asset not found");
          }
        } catch (err) {
          setError("Error fetching asset data");
        } finally {
          setLoading(false);
        }
      };

      fetchAsset();
    }
  }, [params.id]);

  if (loading) return <div>تحميل...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-2 py-2">
      <HeaderPage title={"تفصيل الاصل في الاودو"} />
      <div className="container mx-auto py-10">
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted dark:text-white rounded-xl">
              <div>الاسم الكامل:</div> {data.fullName}
            </div>
            <div className="p-4 bg-muted dark:text-white rounded-xl">
              <div>الرقم التسلسلي:</div> {data.serialNumber}
            </div>
            <div className="p-4 bg-muted dark:text-white rounded-xl">
              <div>العلامة:</div> {data.tag}
            </div>
            <div className="p-4 bg-muted dark:text-white rounded-xl">
              <div>الحالة:</div> {data.status}
            </div>
            <div className="p-4 bg-muted dark:text-white rounded-xl">
              <div>المكان:</div> {data.place}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Asset;
