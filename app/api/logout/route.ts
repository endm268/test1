// app/api/logout/route.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const cookieStore = cookies();

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
