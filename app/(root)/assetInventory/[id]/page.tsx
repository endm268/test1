"use client";

import React, { useEffect, useState } from "react";
import { AssetData } from "@/constants";
import HeaderPage from "@/components/shared/headerPage";

// Updated Asset interface to handle nullable fields
interface Asset {
  assetNumber: string;
  fullName: string;
  state: string;
  place: string | null;
  mainValue: number | null;
  dateUse: string | null;
  reciever: string | null;
  boardNumber: string | null;
  motorNumber: string | null;
  structureNumber: string | null;
  yearCreate: string | null;
  oudoPlace: string | null;
  ramadanPlace: string | null;
}

const Read = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<Asset | null>(null);

  useEffect(() => {
    console.log("useEffect triggered with params.id:", params.id);

    const filteredData = AssetData.find(
      (asset) => asset.assetNumber === params.id
    );

    setData(filteredData || null);
  }, [params.id]);

  if (data === null) {
    return (
      <div>
        <p>Loading asset details...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 py-2">
      <HeaderPage title={"عرض اصل  في الجرد"} />
      <div className="container flex flex-col gap-2 mx-auto py-10">
        {data.assetNumber && (
          <p>
            <strong>الرقم التعريفي:</strong> {data.assetNumber}
          </p>
        )}
        {data.fullName && (
          <p>
            <strong>الاسم الكامل:</strong> {data.fullName}
          </p>
        )}
        {data.state && (
          <p>
            <strong>الحالة:</strong> {data.state}
          </p>
        )}
        {data.place && (
          <p>
            <strong>المكان:</strong> {data.place}
          </p>
        )}
        {data.mainValue !== null && (
          <p>
            <strong>القيمة الرئيسية:</strong> {data.mainValue.toLocaleString()}
          </p>
        )}
        {data.dateUse && (
          <p>
            <strong>تاريخ الاستخدام:</strong>{" "}
            {new Date(data.dateUse).toLocaleDateString()}
          </p>
        )}
        {data.reciever && (
          <p>
            <strong>المستلم:</strong> {data.reciever}
          </p>
        )}
        {data.boardNumber && (
          <p>
            <strong>رقم اللوحة:</strong> {data.boardNumber}
          </p>
        )}
        {data.motorNumber && (
          <p>
            <strong>رقم المحرك:</strong> {data.motorNumber}
          </p>
        )}
        {data.structureNumber && (
          <p>
            <strong>رقم الهيكل:</strong> {data.structureNumber}
          </p>
        )}
        {data.yearCreate && (
          <p>
            <strong>سنة الإنشاء:</strong> {data.yearCreate}
          </p>
        )}
        {data.oudoPlace && (
          <p>
            <strong>مكان أودو:</strong> {data.oudoPlace}
          </p>
        )}
        {data.ramadanPlace && (
          <p>
            <strong>مكان رمضان:</strong> {data.ramadanPlace}
          </p>
        )}
      </div>
    </div>
  );
};

export default Read;
