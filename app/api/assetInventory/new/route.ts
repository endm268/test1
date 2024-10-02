import { NextResponse } from "next/server";
import axios from "axios";
import https from "https";

export async function POST(request: Request) {
  const apiUrl = "http://10.10.10.74:2000/api/Main/Add-Asset";

  
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const body = await request.json(); 
    console.log("Request body:", body); 

    // Send request to the external API
    const response = await axios.post(apiUrl, body, {
      httpsAgent: agent,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response from API:", response.data)

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error posting asset:", error);

    // Axios-specific error handling
    if (axios.isAxiosError(error) && error.response) {
      console.error("Axios error response:", error.response.data);
      return NextResponse.json(
        { error: error.response.data || "Failed to add asset" },
        { status: error.response.status }
      );
    }

    // Handle generic errors
    return NextResponse.json({ error: "Failed to add asset" }, { status: 500 });
  }
}
