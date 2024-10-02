// app/api/getSession/route.ts
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.get("session");

  if (!cookieHeader) {
    return new Response(JSON.stringify({ error: "No session found" }), {
      status: 401,
    });
  }

  try {
    // Parse the session data from the cookie
    const sessionData = JSON.parse(cookieHeader.value);

    if (!sessionData || !sessionData.isLoggedIn) {
      return new Response(JSON.stringify({ error: "User not logged in" }), {
        status: 401,
      });
    }

    // Return all session data
    return new Response(JSON.stringify(sessionData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid session data" }), {
      status: 500,
    });
  }
}
