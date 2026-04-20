import { prisma } from "../config/prismaClient.config";
import { formatChartData } from "../utils/formatChartData";
import { handlePrismaError } from "../utils/prismaErrorHandler";

export const getOrganizerStatsService = async (
  userId: string,
  range: string,
) => {
  try {
    // Get Summary Stats
    const summary = await prisma.order.aggregate({
      where: {
        event: { userId },
        payment: { paymentStatus: "DONE" },
      },
      _sum: { totalAmount: true, ticketQuantity: true },
      _count: { orderId: true },
    });

    // Get Event Category Distribution
    const categoryStats = await prisma.event.groupBy({
      by: ["category"],
      where: { userId },
      _count: { eventId: true },
    });

    const totalEvents = await prisma.event.count({
      where: {
        userId,
        deletedAt: null, // Pastikan event yang sudah dihapus tidak terhitung
      },
    });

    // Time Series Data

    const orders = await prisma.order.findMany({
      where: {
        event: { userId },
        payment: { paymentStatus: "DONE" },
      },
      select: {
        totalAmount: true,
        ticketQuantity: true,
        createdAt: true,
      },
    });

    // Helper grouping based on range
    const chartData = formatChartData(orders, range);

    return {
      summary: {
        totalRevenue: summary._sum.totalAmount || 0,
        totalTickets: summary._sum.ticketQuantity || 0,
        totalOrders: summary._count.orderId || 0,
        totalEvents: totalEvents,
      },
      categoryStats,
      chartData,
    };
  } catch (error) {
    handlePrismaError(error);
  }
};
