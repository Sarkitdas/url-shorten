// src/app/api/auth/route.js
import { NextResponse } from "next/server";
import { VerificationToken } from "@/utility/JWT_helper";

export async function GET(req) {
  try {
    const cookie = req.cookies.get("token");
    if (!cookie) throw new Error("No token");

    const payload = await VerificationToken(cookie.value);
    return NextResponse.json({ loggedIn: true, email: payload.email });
  } catch {
    return NextResponse.json({ loggedIn: false });
  }
}
