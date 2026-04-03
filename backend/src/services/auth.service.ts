import { prisma } from "../config/prismaClient.config";
import { generateOtp } from "../utils/generateOtp";
import { handlePrismaError } from "../utils/prismaErrorHandler";
import bcrypt from "bcrypt";
import { referralCodeGenerator } from "../utils/referralCodeGenerator";
import { formatUserResponse } from "../utils/formatUserResponse";
import { uploadSingle } from "../utils/cloudinaryUploader";
import { AppError } from "../utils/AppError";
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

      return formatUserResponse(user);
    } catch (error) {
      handlePrismaError(error);
    }
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
};
