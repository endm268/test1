import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("body : ", body);

    // All fields including optional ones
    const requiredFields = [
      "name",
      "place_of_asset",
      "name_of_recepiet",
      "pin",
      "useing_date",
      "asset_status",
      "original_value",
      "asset_number_1",
      "asset_number_2",
      "asset_number_3",
      "asset_number_4",
      "asset_category",
      "plate_number",
      "chassis_no",
      "engine_serial_no",
      "year_of_manufacture",
      "note",
    ];

    // Check for required fields
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Call external API using Axios
    const response = await axios.post(
      "http://10.10.10.74:5000/odoo/assets/create",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(
      { success: true, data: response.data },
      { status: 201 }
    );
  } catch (error) {
    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.message || "Failed to create asset" },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
