// src/utility/Token_cookies.js
import { Create_Token } from "./JWT_helper";

export async function Create_TokenCookies(email) {
  const token = await Create_Token(email);

  return {
    name: "token",
    value: token,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",     // IMPORTANT
      path: "/",           // REQUIRED
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  };
}
