import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await axios.get(
      `http://10.10.10.74:5000/hr/employees/${params.id}`
    );

    if (response.data) {
      return NextResponse.json({
        success: true,
        data: response.data,
      });
    }

    return NextResponse.json({
      success: false,
      message: "Asset not found",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetching employe data",
    });
  }
}
