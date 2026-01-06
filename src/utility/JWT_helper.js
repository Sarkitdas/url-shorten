// src/utility/JWT_helper.js
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function Create_Token(email) {
  return await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER)
    .setExpirationTime("7d")
    .sign(secret);
}

export async function VerificationToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: process.env.JWT_ISSUER,
    });
    return payload;
  } catch (e) {
    console.error("JWT verify error:", e.code);
    throw e;
  }
}
