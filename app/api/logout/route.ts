// app/api/logout/route.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { serialize } from "cookie";

export async function logout() {
  const cookieStore = cookies();

  // Serialize the cookie with an expired date
  const cookie = serialize("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), // Expire the cookie
    path: "/",
  });

  // Set the cookie in the response
  cookieStore.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), // Expire the cookie
    path: "/",
  });

  // Redirect to the login page
  redirect("/login");
}
