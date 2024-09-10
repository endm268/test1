// app/api/login/route.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@admin.com",
    password: "123456",
    isdamin: true,
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@admin.com",
    password: "123456",
    isdamin: false,
  },
];

export async function login(formData: FormData) {
  const cookieStore = cookies();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return { error: "بيانات غير صالحة" }; // Invalid credentials
  }

  // Set session cookie
  const cookieValue = JSON.stringify({
    id: user.id,
    name: user.name,
    isdamin: user.isdamin, // assuming you have an admin flag
    isLoggedIn: true, // this field should be added
  });
  
  cookieStore.set("session", cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  redirect("/");
}
