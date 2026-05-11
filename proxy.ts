// proxy.ts

import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/sign-in", "/sign-up"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check auth token from cookies
  const accessToken = request.cookies.get("accessToken")?.value;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  /*
    If user is NOT logged in
    and trying to access protected route
  */
  if (!accessToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  /*
    If user IS logged in
    and trying to access auth pages
  */
  if (accessToken && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Match all routes except:
      - api
      - _next
      - static files
      - images
      - favicon
    */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
