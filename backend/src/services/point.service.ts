import { prisma } from "../config/prismaClient.config";

export const pointService = {
  getAllUserPoints: async (userId: string) => {
    const userPoints = await prisma.point.aggregate({
      where: {
        userId,
        orderId: null,
      },
      _sum: {
        pointAmount: true,
      },
    });

    return userPoints._sum.pointAmount ? userPoints._sum.pointAmount : 0;
  },
};
