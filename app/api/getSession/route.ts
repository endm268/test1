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
    const sessionData = JSON.parse(cookieHeader.value);

    if (!sessionData || !sessionData.isLoggedIn) {
      return new Response(JSON.stringify({ error: "User not logged in" }), {
        status: 401,
      });
    }

    return new Response(JSON.stringify(sessionData), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid session" }), {
      status: 401,
    });
  }
}
