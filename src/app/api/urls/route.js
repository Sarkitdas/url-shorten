import Url from "@/models/Url";
import { connectDB } from "@/config/dbclient";
import { VerificationToken } from "@/utility/JWT_helper";
import { NextResponse } from "next/server";

// GET all URLs for logged-in user
export async function GET(req) {
  try {
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

    const urls = await Url.findMany({ email }); // ✅ returns array
    return NextResponse.json(urls); // ✅ send array
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}


// DELETE a URL
export async function DELETE(req) {
  try {
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

    const { shortCode } = await req.json();
    if (!shortCode)
      return NextResponse.json({ error: "shortCode required" }, { status: 400 });

    const db = await connectDB();
    const res = await db.collection("urls").deleteOne({ shortCode, email });

    if (res.deletedCount === 0)
      return NextResponse.json({ error: "URL not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
