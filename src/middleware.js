//src/middleware.js

import { NextResponse } from "next/server";
import { CheckCookieAuth } from "./utility/Middleware_utility";

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/components/Dashboard")) {
    return CheckCookieAuth(req);
  }

  return NextResponse.next();
}


