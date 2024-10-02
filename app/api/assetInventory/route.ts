import axios from "axios";
import https from "https";
import { NextResponse } from "next/server";

const fetchExternalAssetsData = async () => {
  const apiUrl = "http://10.10.10.74:2000/api/Main/AllAssertData-Been-Jard";

  // Create an HTTPS agent that allows self-signed certificates
  const agent = new https.Agent({
    rejectUnauthorized: false, // Allow self-signed certificates
  });

  try {
    const response = await axios.get(apiUrl, {
      httpsAgent: agent, // Attach the agent to the Axios request
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data; // Axios returns data in `data` field
  } catch (error) {
    console.error("Error fetching external assets data:", error);
    throw error;
  }
};

// GET request handler for /api/assets
export async function GET() {
  try {
    const data = await fetchExternalAssetsData();
    return NextResponse.json(
      { success: true, data },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch assets data" },
      { status: 500 }
    );
  }
}
