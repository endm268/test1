import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware to check if a session exists and if the user is an admin
export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const loginUrl = new URL("/login", request.url);
  const notAuthorizedUrl = new URL("/notAuthroized", request.url);

  // Allow public routes
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/notAuthroized")
  ) {
    return NextResponse.next();
  }

  if (!session) {
    // If no session exists, redirect to login
    return NextResponse.redirect(loginUrl);
  }

  try {
      const sessionData = JSON.parse(session.value);

      // Check if the user is logged in
      if (!sessionData.isLoggedIn) {
        return NextResponse.redirect(loginUrl);
      }
    // Role-based routing logic
    if (sessionData.role === "admin") {
      // Admin can access all routes
      return NextResponse.next();
    } else if (sessionData.role === "user") {
      // User can access assetInventory only
      if (request.nextUrl.pathname.startsWith("/assetInventory")) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(notAuthorizedUrl);
      }
    } else if (sessionData.role === "noter") {
      // Noter can access noteis only
      if (request.nextUrl.pathname.startsWith("/noteis")) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(notAuthorizedUrl);
      }
    }

    // If the non-admin user tries to access other routes, redirect to "Not Authorized"
    return NextResponse.redirect(notAuthorizedUrl);
  } catch (error) {
    // If session data is invalid, redirect to login
    return NextResponse.redirect(loginUrl);
  }
}

// Apply the middleware to all routes except the specified public routes
export const config = {
  matcher: [
    "/((?!api|_next|static|favicon.ico|login|notAuthorized|logoMFZ.svg).*)",
  ],
};
