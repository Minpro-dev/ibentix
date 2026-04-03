import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { authService } from "../services/auth.service";
import { generateAccessToken, generateRefreshToken } from "../utils/token.util";
import { referralCodeGenerator } from "../utils/referralCodeGenerator";
import { REFRESH_COOKIE_OPTIONS } from "../config/cookie.config";

export const authController = {
  signup: catchAsync(async (req: Request, res: Response) => {
    const user = await authService.registerUser(req.body, req?.file);

    return res.status(200).json({
      status: "Success",
      data: user,
    });
  }),

  login: catchAsync(async (req: Request, res: Response) => {
    const user = await authService.validateUser(req.body);

    const payload = {
      userId: user?.userId,
      fullName: `${user?.firstName} ${user?.lastName}`,
      role: user?.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await authService.storeRefreshToken(refreshToken, user?.userId, expiresAt);

    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

    return res.status(200).json({
      status: "Success",
      data: { accessToken, user },
    });
  }),

  refresh: catchAsync(async (req: Request, res: Response) => {
    const oldRefreshToken = req.cookies.refreshToken;
    console.log("oldRefreshToken -->", oldRefreshToken);
  }),
};
