import { Role } from "../../generated/prisma/enums";
import jwt from "jsonwebtoken";
import { AppError } from "./AppError";
import crypto from "crypto";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../config/dotenv.config";

export interface TokenPayload {
  userId: string;
  fullName: string;
  role: Role;
}

// GENERATE ACCESS TOKEN
export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_ACCESS_SECRET!, {
    expiresIn: "1h",
  });
};

// GENERATE REFRESH TOKEN
export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET!, {
    expiresIn: "14d",
  });
};

// VERIFY ACCESS TOKEN
export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_ACCESS_SECRET!) as TokenPayload;
};

// VERIFY REFRESH TOKEN
export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET!) as TokenPayload;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new AppError(401, "Session finished");
    } else {
      throw new AppError(401, "Invalid refresh token");
    }
  }
};

// ------- GENERATE RANDOM TOKEN
export const generateRawToken = (length: number = 32): string => {
  return crypto.randomBytes(length).toString("hex");
};
