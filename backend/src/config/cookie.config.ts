import { CookieOptions } from "express";
import { NODE_ENV } from "./dotenv.config";

export const REFRESH_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true, // xss protections
  secure: NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000 * 7, // 7 days
};

export const USER_EMAIL_OTP_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true, // xss protections
  secure: NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  // maxAge: 60 * 60 * 1000 * 5, // 5 minutes
};
