import { prisma } from "../config/prismaClient.config";
import { handlePrismaError } from "../utils/prismaErrorHandler";
import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;

export const authService = {
  // SIGNUP
  registerUser: async (data: any) => {
    try {
      const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

      //   const user = await prisma.user.create({});
    } catch (error) {
      handlePrismaError(error);
    }
  },
};
