// middleware.ts

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  const isAuthPage = request.nextUrl.pathname === "/sign-in";

  // If no token and trying to access protected route
  if (!accessToken && !isAuthPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Optional: prevent logged-in users from visiting sign-in page
  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Match all routes except:
      - api routes
      - next static files
      - images
      - favicon
    */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
