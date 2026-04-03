import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { authService } from "../services/auth.service";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/token.util";
import { REFRESH_COOKIE_OPTIONS } from "../config/cookie.config";
import { AppError } from "../utils/AppError";
import { prisma } from "../config/prismaClient.config";
import { formatUserResponse } from "../utils/formatUserResponse";

export const authController = {
  // SIGNUP
  signup: catchAsync(async (req: Request, res: Response) => {
    const user = await authService.registerUser(req.body, req?.file);

    return res.status(200).json({
      status: "Success",
      data: user,
    });
  }),

  // LOGIN
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

  // REFRESH TOKEN
  refresh: catchAsync(async (req: Request, res: Response) => {
    const oldRefreshToken = req.cookies.refreshToken;

    if (!oldRefreshToken) {
      throw new AppError(401, "Your session has finished, re-login");
    }

    const decode = verifyRefreshToken(oldRefreshToken);

    const storedToken = await prisma.refreshToken.findUnique({
      where: {
        token: oldRefreshToken,
      },
      include: {
        user: true,
      },
    });

    if (!storedToken) {
      throw new AppError(401, "Suspecious activity detected");
    }

    const payload = {
      userId: storedToken.userId,
      role: storedToken.user.role,
      fullName: `${storedToken.user.firstName} ${storedToken.user.lastName}`,
    };

    // generate both tokens
    const data = await authService.rotateToken(oldRefreshToken, payload);

    const newAccessToken = generateAccessToken(payload);
    const userResponse = formatUserResponse(data.user);

    res.cookie("refreshToken", data.token, REFRESH_COOKIE_OPTIONS);

    res.status(200).json({
      status: "successful",
      data: {
        accessToken: newAccessToken,
        user: userResponse,
      },
    });
  }),
};
