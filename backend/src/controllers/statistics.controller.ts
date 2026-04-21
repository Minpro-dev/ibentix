import { Request, Response } from "express";
import * as StatisticsService from "../services/statistics.service";
import { catchAsync } from "../utils/catchAsync";

export const getDashboardStats = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { range = "year" } = req.query;

    const stats = await StatisticsService.getOrganizerStatsService(
      userId as string,
      range as string,
    );

    return res.status(200).json({
      status: "success",
      data: stats,
    });
  },
);
