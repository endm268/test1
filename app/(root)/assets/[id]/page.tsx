"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { AssetOdoo } from "@/Types/Types";
import HeaderPage from "@/components/shared/headerPage";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { useRouter } from "next/navigation";

const AssetDetail = ({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined | boolean;
}) => {
  let displayValue: string;

  if (value === null || value === undefined || typeof value === "boolean") {
    displayValue = "غير متوفر"; // Fallback message
  } else {
    displayValue =
      value === "new"
        ? "جديد"
        : value === "used"
        ? "مستعمل"
        : value === "damaged"
        ? "عاطل"
        : value;
  }

  return (
    <div className="flex justify-start items-center gap-4 p-4 bg-muted dark:text-white rounded-xl">
      <div className="flex items-start gap-1">
        <span>{label}</span>
        <span>:</span>
      </div>
      <span>{displayValue}</span>
    </div>
  );
};

const AssetInventory = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [data, setData] = useState<AssetOdoo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await axios.get(`/api/assets/${params.id}`);
        if (response.data.success) {
          setData(response.data.data);
        } else {
          setError("Asset not found");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Error fetching asset data");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAsset();
    }
  }, [params.id]);

  if (loading) return <div>جار التحميل...</div>;
  if (error) return <div>{error}</div>;

  const handleEdit = () => {
    router.push(`/assets/${params.id}/update`);
  };

  return (
    <div className="flex flex-col gap-2 py-2">
      <HeaderPage title={"تفصيل الاصل المجرود"} />

      {/* Edit and DeleteConfirmation Buttons in a grid format */}
      <div className="w-full flex flex-row items-center justify-end gap-4 my-4">
        <Button className="bg-green-500 text-white" onClick={handleEdit}>
          <Edit />
        </Button>

        <DeleteConfirmation
          id={params.id}
          type={"odoo"}
          title={"الاصل من الاودو"}
        />
      </div>

      {/* Asset Details */}
      <div className="container mx-auto">
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AssetDetail label="رقم التعريف" value={data.id.toString()} />
            <AssetDetail label="اسم الاصل" value={data.name} />
            <AssetDetail label="تاغ الاصل" value={data.asset_tags} />
            <AssetDetail label="حالة الاصل" value={data.asset_status} />
            <AssetDetail
              label="رقم الاصل"
              value={`${data.asset_number_1}-${data.asset_number_2}-${data.asset_number_3}-${data.asset_number_4}`}
            />
            <AssetDetail
              label="تاريخ الاستحواذ"
              value={data.acquisition_date}
            />
            <AssetDetail label="تاريخ الاستخدام" value={data.using_date} />
            <AssetDetail
              label="قيمة الاصل"
              value={data.original_value.toString()}
            />
            <AssetDetail label="مكان الاصل" value={data.place_of_asset} />
            <AssetDetail label="مستلم الاصل" value={data.name_of_recepiet} />
            <AssetDetail label="رقم الوظيفي" value={data.pin} />
            <AssetDetail label="رقم لوحة مركبة" value={data.plate_number} />
            <AssetDetail label="رقم تعريف المركبة" value={data.chassis_no} />
            <AssetDetail
              label="رقم محرك المركبة"
              value={data.engine_serial_no}
            />
            <AssetDetail
              label="سنة تصنيع المركبة"
              value={data.year_of_manufacture}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetInventory;
