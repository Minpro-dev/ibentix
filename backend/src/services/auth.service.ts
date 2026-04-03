import { prisma } from "../config/prismaClient.config";
import { generateOtp } from "../utils/generateOtp";
import { handlePrismaError } from "../utils/prismaErrorHandler";
import bcrypt from "bcrypt";
import { referralCodeGenerator } from "../utils/referralCodeGenerator";
import { formatUserResponse } from "../utils/formatUserResponse";
import { uploadSingle } from "../utils/cloudinaryUploader";
import { AppError } from "../utils/AppError";
import { generateRefreshToken, TokenPayload } from "../utils/token.util";
import { emailService } from "./email.service";
const SALT_ROUNDS = 10;

export const authService = {
  // SIGNUP
  registerUser: async (data: any, file: Express.Multer.File | undefined) => {
    try {
      const avatar = await uploadSingle(file);
      const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
      const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // expired 5 menit

      const otp = generateOtp();

      let myReferralCode = "";
      let isUnique = false;

      while (!isUnique) {
        myReferralCode = referralCodeGenerator(5);
        const isExisting = await prisma.user.findUnique({
          where: { myReferralCode },
        });

        if (!isExisting) {
          isUnique = true;
        }
      }

      const user = await prisma.user.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          gender: data.gender,
          address: data.address,
          countryId: data.countryId,
          role: data.role,
          password: hashedPassword,
          avatar: avatar || null,
          isVerified: false,
          otp,
          otpExpiresAt,
          myReferralCode,
          usedReferralCode: data.usedReferralCode || null,
        },
      });

      return user;
    } catch (error) {
      handlePrismaError(error);
    }
  },

  // VERIFY OTP
  verifyOtp: async (otp: string, email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new AppError(404, "User is not found");
    }

    if (user.isVerified) {
      throw new AppError(400, "User has been verified");
    }

    if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      throw new AppError(401, "OTP has expired, resend to get a new OTP");
    }

    if (otp !== user.otp) {
      throw new AppError(400, "Incorrect OTP");
    }

    return await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        otp: null,
        otpExpiresAt: null,
      },
    });
  },

  // LOGIN
  validateUser: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email, deletedAt: null },
      });

      if (!user) {
        throw new AppError(401, "Invalid credentials");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new AppError(401, "Invalid credentials");
      }

      return formatUserResponse(user);
    } catch (error) {
      handlePrismaError(error);
    }
  },

  // STORE REFRESH TOKEN
  storeRefreshToken: async (token: string, userId: string, expiresAt: Date) => {
    try {
      await prisma.refreshToken.create({
        data: {
          token,
          userId,
          expiresAt,
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  },

  // ROTATE TOKEN
  rotateToken: async (oldRefreshToken: string, payload: TokenPayload) => {
    // new token
    const newRefreshToken = generateRefreshToken(payload);

    return prisma.$transaction(async (tx) => {
      // delete prev token
      tx.refreshToken.deleteMany({ where: { token: oldRefreshToken } });

      // store new token in db
      return tx.refreshToken.create({
        data: {
          token: newRefreshToken,
          userId: payload.userId,
          expiresAt: new Date(Date.now() + 7 + 24 * 60 * 60 * 1000),
        },
        include: {
          user: true,
        },
      });
    });
  },
};
