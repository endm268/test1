import { NextResponse } from "next/server";

// Fetch data from the external API
const fetchExternalAssetsData = async () => {
  const apiUrl = "http://10.10.10.74:2000/api/Main/AllAssertData";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    // Parse the response as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching external assets data:", error);
    throw error;
  }
};

// GET request handler for /api/assets
export async function GET() {
  try {
    const data = await fetchExternalAssetsData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch assets data" },
      { status: 500 }
    );
  }
}
