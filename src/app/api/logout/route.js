// src/app/api/logout/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json({ success: true });

  // ✅ Properly remove cookie
  res.cookies.delete("token");

  return res;
}
