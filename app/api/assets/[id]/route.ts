import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(
      `https://10.10.32.53:7120/api/Main/Check-Data-By-Tag`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: params.id }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data from backend");
    }

    const result = await res.json();
    return NextResponse.json(result);
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


