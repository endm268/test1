"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const users = [
  {
    id: "1",
    name: "malik",
    email: "admin@mfz.com",
    password: "123456",
    role: "admin",
    device: "admin malik",
  },
  {
    id: "2",
    name: "mohamed",
    email: "user@mfz.com",
    password: "123456",
    role: "user",
    device: "user mohamed",
  },
  {
    id: "3",
    name: "ali",
    email: "ali@mfz.com",
    password: "123456",
    role: "noter",
    device: "ali mohamed",
  },
];

export async function login(formData: FormData) {
  const cookieStore = cookies();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return { error: "Invalid credentials" };
  }

  // Set session cookie
  const cookieValue = JSON.stringify({
    id: user.id,
    name: user.name,
    role: user.role,
    email:user.email,
    device:user.device,
    isLoggedIn: true,
  });

  cookieStore.set("session", cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 15,
    path: "/",
  });

  // Redirect based on user role
  if (user.role === "admin") {
    redirect("/");
  } else if (user.role === "user") {
    redirect("/assetInventory");
  }
  if (user.role === "noter") {
    redirect("/noteis");
  }
}
