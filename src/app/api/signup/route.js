// src/app/api/signup/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbclient";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password)
      return NextResponse.json(
        { status: false, message: "Name, email and password are required" },
        { status: 400 }
      );

    const db = await connectDB();
    const users = db.collection("user");

    const existingUser = await users.findOne({ email });
    if (existingUser)
      return NextResponse.json(
        { status: false, message: "User already exists" },
        { status: 409 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    await users.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { status: true, message: "Signup successful" },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { status: false, message: "Server error" },
      { status: 500 }
    );
  }
}
