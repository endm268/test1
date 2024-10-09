import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    // Encode the name parameter to handle spaces and special characters like Arabic names
    const encodedName = encodeURIComponent(params.name);

    // Send request to the backend with the encoded name
    const response = await axios.get(
      `http://10.10.10.74:5000/hr/employees/search/${encodedName}`
    );

    if (response.data) {
      return NextResponse.json({
        success: true,
        data: response.data,
      });
    }

    return NextResponse.json({
      success: false,
      message: "Employee not found",
    });
  } catch (error) {
    console.error("Error fetching employee data:", error);
    return NextResponse.json({
      success: false,
      message: "Error fetching employee data",
    });
  }
}
