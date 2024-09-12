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

    // Check if user is logged in
    if (!sessionData.isLoggedIn) {
      return NextResponse.redirect(loginUrl);
    }

    // Check if the user is an admin
    if (sessionData.isAdmin) {
      return NextResponse.next(); // Admins can access all routes
    }

    // Non-admin users:
    // Allow access only to `/assetInventory` and its subpages
    if (request.nextUrl.pathname.startsWith("/assetInventory")) {
      return NextResponse.next(); // Allow access for non-admin users to assetInventory
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
    "/((?!api|_next|static|favicon.ico|login|notAuthroized).*)", // All routes except public pages
  ],
};
