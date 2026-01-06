// src/app/api/login/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbclient";
import { Create_TokenCookies } from "@/utility/Token_cookies";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { status: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const users = db.collection("user");

    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { status: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isMatched = bcrypt.compareSync(password, user.password);
    if (!isMatched) {
      return NextResponse.json(
        { status: false, message: "Incorrect password" },
        { status: 401 }
      );
    }

    // ✅ CLEAN & REUSABLE
    const cookie = await Create_TokenCookies(email);

    const res = NextResponse.json({
      status: true,
      message: "Login successful",
      email,
    });

    // ✅ APPLY COOKIE (ONE LINE)
    res.cookies.set(cookie.name, cookie.value, cookie.options);

    return res;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { status: false, message: "Server error" },
      { status: 500 }
    );
  }
}
