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
    permissions: {
      canOdooDelete: true,
      canOdooUpdate: true,
      canOdooCreate: true,
      canOdooShowlist: true,
      canOdooShow: true,
    },
  },
  {
    id: "2",
    name: "mohamed",
    email: "user@mfz.com",
    password: "123456",
    role: "user",
    device: "user mohamed",
    permissions: {
      canOdooDelete: false,
      canOdooUpdate: true,
      canOdooCreate: false,
      canOdooShowlist: true,
      canOdooShow: true,
    },
  },
  {
    id: "3",
    name: "ali",
    email: "ali@mfz.com",
    password: "123456",
    role: "noter",
    device: "ali mohamed",
    permissions: {
      canOdooDelete: false,
      canOdooUpdate: false,
      canOdooCreate: false,
      canOdooShowlist: true,
      canOdooShow: true,
    },
  },
  {
    id: "4",
    name: "ramadan",
    email: "ramadan@mfz.com",
    password: "ramadan",
    role: "odoo",
    device: "ramadan",
    permissions: {
      canOdooDelete: true,
      canOdooUpdate: true,
      canOdooCreate: true,
      canOdooShowlist: true,
      canOdooShow: true,
    },
  },
  {
    id: "4",
    name: "test",
    email: "test@mfz.com",
    password: "test",
    role: "odoo",
    device: "test",
    permissions: {
      canOdooDelete: false,
      canOdooUpdate: true,
      canOdooCreate: true,
      canOdooShowlist: true,
      canOdooShow: true,
    },
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

  // Set session cookie with all user data, including permissions
  const cookieValue = JSON.stringify({
    id: user.id,
    name: user.name,
    role: user.role,
    email: user.email,
    device: user.device,
    permissions: user.permissions, // Include permissions in the cookie
    isLoggedIn: true,
  });

  cookieStore.set("session", cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 1, // 15 minutes
    path: "/",
  });

  // Redirect based on user role
  if (user.role === "admin") {
    redirect("/");
  } else if (user.role === "user") {
    redirect("/assetInventory");
  } else if (user.role === "noter") {
    redirect("/noteis");
  } else if (user.role === "odoo") {
    redirect("/assets");
  }
}
