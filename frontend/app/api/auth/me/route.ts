import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) return NextResponse.json({ authenticated: false });

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY ?? "");
    const { payload } = await jwtVerify(token, secret);
    return NextResponse.json({ authenticated: true, role: payload.role });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
