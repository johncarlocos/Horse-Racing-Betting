import { jwtVerify } from "jose";
import { type NextRequest, NextResponse } from "next/server";
import { ROUTES } from "@/lib/constants";

const PUBLIC_ROUTES = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.SIGNUP, ROUTES.PRIVACY_POLICY];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic =
    PUBLIC_ROUTES.some((route) => pathname === route) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/api");

  if (isPublic) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY ?? "");
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    // Token invalid or expired — clear cookie and redirect
    const response = NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    response.cookies.set("auth_token", "", { maxAge: 0, path: "/" });
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
