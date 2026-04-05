import { Role } from "../../generated/prisma/enums";
import jwt from "jsonwebtoken";
import { AppError } from "./AppError";

export interface TokenPayload {
  userId: string;
  fullName: string;
  role: Role;
}

// GENERATE ACCESS TOKEN
export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: "5s" });
};

// GENERATE REFRESH TOKEN
export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "10s",
  });
};

// VERIFY ACCESS TOKEN
export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as TokenPayload;
};

// VERIFY REFRESH TOKEN
export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as TokenPayload;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new AppError(401, "Session finished");
    } else {
      throw new AppError(401, "Invalid refresh token");
    }
  }
};
