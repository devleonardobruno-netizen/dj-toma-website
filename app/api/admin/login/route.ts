import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ error: "Password errata" }, { status: 401 });
  }

  // Return the admin secret as the token (simple auth for single-user admin)
  return NextResponse.json({ token: process.env.ADMIN_SECRET });
}
