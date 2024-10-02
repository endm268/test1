import axios from "axios";
import https from "https";
import { NextResponse } from "next/server";

// Fetch asset data by asset number from external API
const fetchAssetByNumber = async (
  n1: number,
  n2: number,
  n3: number,
  n4: number
) => {
  const apiUrl = `http://10.10.10.74:2000/api/Main/Get-Asset-By-Number?n1=${n1}&n2=${n2}&n3=${n3}&n4=${n4}`;

  // Create an HTTPS agent that allows self-signed certificates
  const agent = new https.Agent({
    rejectUnauthorized: false, // Allow self-signed certificates
  });

  try {
    const response = await axios.get(apiUrl, {
      httpsAgent: agent,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching asset data:", error);
    throw error;
  }
};

// API GET handler for fetching asset by ID
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const n1 = Number(searchParams.get("n1"));
  const n2 = Number(searchParams.get("n2"));
  const n3 = Number(searchParams.get("n3"));
  const n4 = Number(searchParams.get("n4"));

  try {
    const data = await fetchAssetByNumber(n1, n2, n3, n4);
    return NextResponse.json(
      { success: true, data },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch asset data" },
      { status: 500 }
    );
  }
}
