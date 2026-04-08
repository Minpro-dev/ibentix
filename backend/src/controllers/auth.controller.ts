import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { authService } from "../services/auth.service";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/token.util";
import {
  REFRESH_COOKIE_OPTIONS,
  USER_EMAIL_OTP_COOKIE_OPTIONS,
} from "../config/cookie.config";
import { AppError } from "../utils/AppError";
import { prisma } from "../config/prismaClient.config";
import { formatUserResponse } from "../utils/formatUserResponse";
import { emailService } from "../services/email.service";
import {
  EditUserDetails,
  InsertReferral,
  LoginSchema,
  SignupSchema,
  updatePasswordSchema,
  updatePasswordSchemaBody,
  updatePasswordSchemaParams,
} from "../schemas/auth.schema";

export const authController = {
  //----------- SIGNUP
  signup: catchAsync(
    async (req: Request<{}, {}, SignupSchema>, res: Response) => {
      const user = await authService.registerUser(req.body);

      await emailService.sendOtp(
        user?.otp as string,
        user?.email as string,
        `${user?.firstName} ${user?.lastName}`,
      );

      const userResponse = formatUserResponse(user);

      res.cookie("emailForOtp", user?.email, USER_EMAIL_OTP_COOKIE_OPTIONS);

      return res.status(200).json({
        status: "Success",
        data: userResponse,
      });
    },
  ),

  //-------------- EDIT USER DETAILS
  editUserDetails: catchAsync(
    async (req: Request<{}, {}, EditUserDetails>, res: Response) => {
      const userId = req.user?.userId as string;
      const updatedUser = await authService.editUserDetails(
        userId,
        req.body,
        req?.file,
      );

      res.status(201).json({
        status: "success",
        message: "Update user info successfull",
        data: updatedUser,
      });
    },
  ),

  //----------- VERIFY OTP
  verifyOtp: catchAsync(async (req: Request, res: Response) => {
    const email = req.cookies.emailForOtp;
    const otp = req.body.otp;

    if (!email) {
      throw new AppError(401, "OTP has expired, resend to get a new OTP");
    }

    await authService.verifyOtp(otp, email);

    res.clearCookie("emailForOtp", USER_EMAIL_OTP_COOKIE_OPTIONS);

    res.status(200).json({
      status: "success",
      message: "Email verified successfully, you can now login",
    });
  }),

  //----------- RESEND OTP
  resendOtp: catchAsync(async (req: Request, res: Response) => {
    const email = req.cookies.emailForOtp;

    await authService.resendOtp(email);

    res.status(200).json({
      status: "success",
      message: "OTP has been resent, please check your email",
    });
  }),

  // ------------- POST REFERRAL
  addReferral: catchAsync(
    async (req: Request<{}, {}, InsertReferral>, res: Response) => {
      const { email, referralCode } = req.body;
      await authService.addReferral(email, referralCode);

      res.status(201).json({
        status: "success",
        message: "Referral code inserted successfully",
      });
    },
  ),

  //----------- LOGIN
  login: catchAsync(
    async (req: Request<{}, {}, LoginSchema>, res: Response) => {
      const user = await authService.validateUser(req.body);

      const payload = {
        userId: user?.userId,
        fullName: `${user?.firstName} ${user?.lastName}`,
        role: user?.role,
      };

      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      await authService.storeRefreshToken(
        refreshToken,
        user?.userId,
        expiresAt,
      );

      res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

      return res.status(200).json({
        status: "Success",
        data: { accessToken, user },
      });
    },
  ),

  //----------- REFRESH TOKEN
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

  //----------- RESET PASSWORD REQUEST
  resetPasswordRequest: catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;

    await authService.resetPasswordRequest(email);

    res.status(200).json({
      status: "success",
      message: "Request successful, link has been sent to the email",
    });
  }),

  // CREATE / PATCH NEW PASSWORD
  createNewPassword: catchAsync(
    async (
      req: Request<updatePasswordSchemaParams, {}, updatePasswordSchemaBody>,
      res: Response,
    ) => {
      const token = req.params.token;
      const { newPassword } = req.body;
      console.log("token , typeof", token, typeof token);
      await authService.createNewPassword(token, newPassword);

      res.status(200).json({
        status: "success",
      });
    },
  ),
};
