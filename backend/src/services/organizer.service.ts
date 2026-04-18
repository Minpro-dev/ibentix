import { prisma } from "../config/prismaClient.config";
import { uploadSingle } from "../utils/cloudinaryUploader";
import { handlePrismaError } from "../utils/prismaErrorHandler";

export const organizerService = {
  createOrganizer: async (
    userId: string,
    name: string,
    file: Express.Multer.File | undefined,
  ) => {
    try {
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
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return organizerProfiles;
  },
};
