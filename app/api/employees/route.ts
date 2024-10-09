import { NextResponse } from "next/server";

// API route for fetching assets
export async function GET() {
  // Construct the API URL based on the query parameters
  const url = `http://10.10.10.74:5000/hr/employees/?page_number=1&page_size=5000`;

  try {
    // Fetch data from the external API
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch employees" },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    // Respond with the fetched data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Handle any errors during the fetch
    console.error(error); // Log the error for debugging
    return NextResponse.json(
      { error: "An error occurred while fetching employees" },
      { status: 500 }
    );
  }
}
