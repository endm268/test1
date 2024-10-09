// app/api/getSession/route.ts
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.get("session");

  if (!cookieHeader) {
    return new Response(JSON.stringify({ error: "No session found" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Parse the session data from the cookie
    const sessionData = JSON.parse(cookieHeader.value);

    if (!sessionData || !sessionData.isLoggedIn) {
      return new Response(JSON.stringify({ error: "User not logged in" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return all session data, including permissions
    return new Response(JSON.stringify(sessionData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error:any) {
    return new Response(
      JSON.stringify({ error: "Invalid session data", details: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
