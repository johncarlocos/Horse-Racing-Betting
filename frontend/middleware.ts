import { type NextRequest, NextResponse } from "next/server";
import { ROUTES } from "@/lib/constants";

const PUBLIC_ROUTES = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.SIGNUP];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes and static assets through
  const isPublic = PUBLIC_ROUTES.some((route) => pathname === route) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/api");

  if (isPublic) {
    return NextResponse.next();
  }

  // TODO: Replace with real session/token check once auth is implemented
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
