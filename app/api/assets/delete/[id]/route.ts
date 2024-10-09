import { NextResponse } from "next/server";
import axios from "axios";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await axios.delete(
      `http://10.10.10.74:5000/odoo/assets/delete/${params.id}/`
    );

    if (response.data && response.data.status === "success") {
      return NextResponse.json({
        success: true,
        message: response.data.detail,
      });
    }

    return NextResponse.json({
      success: false,
      message: "Asset not found or could not be deleted.",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error deleting asset data",
    });
  }
}
