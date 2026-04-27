import { prisma } from "../config/prismaClient.config";
import { AppError } from "../utils/AppError";
import { uploadSingle } from "../utils/cloudinaryUploader";
import { handlePrismaError } from "../utils/prismaErrorHandler";

export const organizerService = {
  createOrganizer: async (
    userId: string,
    name: string,
    file: Express.Multer.File | undefined,
  ) => {
    try {
      const MAX_FILE_SIZE = 2 * 1024 * 1024;

      if (file && Number(file.size) > MAX_FILE_SIZE) {
        throw new AppError(400, "File size too large. Maximum allowed is 2MB");
      }

      const image = await uploadSingle(file, "organizer-profile");
      const organizerProfile = await prisma.organizerProfile.create({
        data: {
          userId,
          name,
          image,
        },
      });

      return organizerProfile;
    } catch (error) {
      handlePrismaError(error);
    }
  },

  getAllOrganizerProfiles: async (userId: string) => {
    const organizerProfiles = await prisma.organizerProfile.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return organizerProfiles;
  },

  deleteOrganizerProfile: async (organizerProfileId: string) => {
    try {
      await prisma.organizerProfile.update({
        where: {
          organizerId: organizerProfileId,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  },
};
