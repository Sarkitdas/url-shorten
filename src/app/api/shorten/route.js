import { NextResponse } from "next/server";
import Url from "@/models/Url";
import { connectDB } from "@/config/dbclient";
import { customAlphabet } from "nanoid";
import { VerificationToken } from "@/utility/JWT_helper";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { longUrl } = body;

    // Extract token from Cookie header
    const cookieHeader = req.headers.get("cookie") || "";
    const tokenValue = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];
    if (!tokenValue)
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const payload = await VerificationToken(tokenValue);
    const email = payload?.email;
    if (!email)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    if (!longUrl)
      return NextResponse.json({ error: "URL required" }, { status: 400 });

    // Check if this user already has this URL
    let url = await Url.findOne({ longUrl, email });
    if (url) return NextResponse.json({ shortCode: url.shortCode });

    // Count the user's URLs first
    const existingUrls = await Url.findMany({ email });
    if (existingUrls.length >= 5) {
      return NextResponse.json(
        { error: "You have reached the maximum of 100 URLs" },
        { status: 403 }
      );
    }

    // Generate unique short code
    const nanoid = customAlphabet(
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      7
    );
    let shortCode;
    let attempts = 0;
    const maxAttempts = 5;
    while (true) {
      attempts++;
      shortCode = nanoid();
      const exists = await Url.findOne({ shortCode });
      if (!exists) break;
      if (attempts >= maxAttempts)
        throw new Error("Failed to generate unique code");
    }

    url = await Url.create({
      longUrl,
      shortCode,
      email,
      clicks: 0,
      createdAt: new Date(),
    });

    return NextResponse.json({
      shortCode,
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`,
    });
  } catch (err) {
    console.error("POST /api/shorten Error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
